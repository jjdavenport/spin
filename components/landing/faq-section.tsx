"use client";

import { useScrollReveal } from "@/lib/hooks/use-scroll-reveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Completely free. We earn a small commission from our booking partners when you book a trip — at no extra cost to you. No hidden fees, no premium tier, no catch.",
  },
  {
    question: "How random is it?",
    answer:
      "Genuinely random. Every spin picks from our full database of destinations with equal probability. No weighting, no algorithms trying to push you somewhere specific.",
  },
  {
    question: "Can I spin again?",
    answer:
      "As many times as you like. There are no limits on spins. Keep going until the globe picks somewhere that excites you.",
  },
  {
    question: "Do I have to book?",
    answer:
      "Not at all. Use it for inspiration, daydreaming, or planning. There's zero obligation to book anything. But when you're ready, the links are right there.",
  },
  {
    question: "How do you make money?",
    answer:
      "When you click through to a booking partner (like Booking.com or Skyscanner) and make a purchase, we receive a small affiliate commission. You pay the same price as going directly — it costs you nothing extra.",
  },
  {
    question: "Do I need an account?",
    answer:
      "Nope. You can spin and browse without signing up. If you want to save destinations for later, creating a free account unlocks that — but it's entirely optional.",
  },
];

export function FaqSection() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section className="px-4 py-24 sm:py-32" ref={ref}>
      <div className="max-w-2xl mx-auto">
        <div
          className={`text-center mb-12 ${
            isVisible ? "animate-reveal-slide-up" : "opacity-0"
          }`}
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Questions? Answers.
          </h2>
        </div>

        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className={`border-border/50 ${
                isVisible
                  ? i % 2 === 0
                    ? "animate-reveal-slide-left"
                    : "animate-reveal-slide-right"
                  : "opacity-0"
              }`}
              style={
                isVisible
                  ? { animationDelay: `${0.2 + i * 0.1}s` }
                  : undefined
              }
            >
              <AccordionTrigger className="py-5 font-medium hover:no-underline hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
