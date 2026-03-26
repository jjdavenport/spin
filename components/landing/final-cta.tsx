import { WaitlistForm } from "./waitlist-form";

export function FinalCta() {
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Ready to let the globe decide?
        </h2>
        <p className="text-muted-foreground">
          Join thousands of future adventurers. No spam, just your ticket to
          somewhere new.
        </p>
        <div className="flex justify-center pt-2">
          <WaitlistForm buttonText="Count Me In" />
        </div>
      </div>
    </section>
  );
}
