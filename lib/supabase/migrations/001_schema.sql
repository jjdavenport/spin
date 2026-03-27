-- Spin App Database Schema
-- Apply this to your Supabase project when ready

-- Profiles table (auto-created on auth signup)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  -- Give new users free credits
  insert into public.credit_ledger (user_id, amount, transaction_type)
  values (new.id, 3, 'bonus');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Destinations table
create table public.destinations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  country text not null,
  region text not null,
  latitude double precision not null,
  longitude double precision not null,
  description text not null,
  image_url text
);

alter table public.destinations enable row level security;

create policy "Anyone can read destinations"
  on public.destinations for select
  to authenticated
  using (true);

-- Credit ledger (append-only)
create table public.credit_ledger (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  amount integer not null,
  transaction_type text not null check (transaction_type in ('purchase', 'spin', 'refund', 'bonus')),
  reference_id text,
  created_at timestamptz default now()
);

alter table public.credit_ledger enable row level security;

create policy "Users can view own credits"
  on public.credit_ledger for select
  using (auth.uid() = user_id);

-- Balance function
create or replace function public.get_credit_balance(p_user_id uuid)
returns integer as $$
  select coalesce(sum(amount), 0)::integer
  from public.credit_ledger
  where user_id = p_user_id;
$$ language sql security definer;

-- Spin history
create table public.spin_history (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles on delete cascade not null,
  destination_id uuid references public.destinations not null,
  region_filter text,
  created_at timestamptz default now()
);

alter table public.spin_history enable row level security;

create policy "Users can view own spin history"
  on public.spin_history for select
  using (auth.uid() = user_id);
