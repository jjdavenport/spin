import { Users, Plane, Hotel, Compass } from "lucide-react";

const partners = [
  { icon: Plane, name: "Skyscanner" },
  { icon: Hotel, name: "Booking.com" },
  { icon: Compass, name: "Viator" },
];

export function SocialProof() {
  return (
    <section className="px-4 py-24 sm:py-32 border-y border-border/50">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Waitlist counter */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            Growing community
          </div>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight">
            2,800+
          </p>
          <p className="text-muted-foreground">
            future adventurers on the waitlist
          </p>
        </div>

        {/* Partners */}
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground uppercase tracking-widest">
            Book through partners you trust
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {partners.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <p.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
