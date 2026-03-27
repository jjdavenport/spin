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
    question: "Is it free?",
    answer:
      "You get 3 free spins when you sign up. Additional spins start at just $2.99 for a 5-pack. We also earn from our booking partners, so the spin experience stays affordable.",
  },
  {
    question: "How random is it?",
    answer:
      "Completely random — across all 57 destinations worldwide, or filtered by your preferred region. Every spin is a fresh roll of the dice.",
  },
  {
    question: "Can I re-spin?",
    answer:
      "Absolutely. Each spin costs one credit, and you can spin as many times as you like. Save the destinations you love and skip the rest.",
  },
  {
    question: "Do I have to book?",
    answer:
      "No obligation at all. Spin for fun, explore destination details, save your favorites, and book only when you're ready.",
  },
  {
    question: "When does it launch?",
    answer:
      "We're in early access right now. Join the waitlist to be first in line — we'll notify you the moment it's your turn.",
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

        <Accordion>
          {faqs.map((faq, i) => (
            <AccordionItem
              key={faq.question}
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
