-- Additional tables for Spin app
-- Waitlist, email subscriptions, affiliate clicks

-- Waitlist table
create table public.waitlist (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;

create policy "Anyone can join waitlist"
  on public.waitlist for insert
  with check (true);

create policy "Service role can read waitlist"
  on public.waitlist for select
  using (true);

-- Email subscriptions table
create table public.email_subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  destination_id text references public.destinations,
  created_at timestamptz default now(),
  unique (email, destination_id)
);

alter table public.email_subscriptions enable row level security;

create policy "Anyone can subscribe"
  on public.email_subscriptions for insert
  with check (true);

create policy "Service role can read subscriptions"
  on public.email_subscriptions for select
  using (true);

-- Affiliate clicks table
create table public.affiliate_clicks (
  id uuid default gen_random_uuid() primary key,
  partner text not null,
  destination text not null,
  context text,
  page_url text,
  clicked_at timestamptz default now()
);

alter table public.affiliate_clicks enable row level security;

create policy "Service role can insert affiliate clicks"
  on public.affiliate_clicks for insert
  with check (true);

create policy "Service role can read affiliate clicks"
  on public.affiliate_clicks for select
  using (true);

-- Missing INSERT policies on existing tables

create policy "Users can insert own spin history"
  on public.spin_history for insert
  with check (auth.uid() = user_id);

create policy "Users can insert own credits"
  on public.credit_ledger for insert
  with check (auth.uid() = user_id);

-- Allow service role to insert destinations (for seeding)
create policy "Anyone can read destinations"
  on public.destinations for insert
  with check (true);
