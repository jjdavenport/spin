import Image from "next/image";

export function EmotionalSell() {
  return (
    <section className="relative overflow-hidden py-32 sm:py-40 px-4">
      {/* Background image — Santorini sunset */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&q=80&auto=format"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <p className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
          Stop scrolling.
          <br />
          Start exploring.
        </p>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto">
          Let the globe decide and we&apos;ll handle the rest. Your next story
          starts with a single spin.
        </p>
      </div>
    </section>
  );
}
