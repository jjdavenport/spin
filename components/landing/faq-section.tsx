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
  return (
    <section className="px-4 py-24 sm:py-32">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Questions? Answers.
          </h2>
        </div>

        <div className="divide-y divide-border/50">
          {faqs.map((faq) => (
            <details key={faq.question} className="group">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none text-left font-medium hover:text-primary transition-colors">
                {faq.question}
                <span className="ml-4 text-muted-foreground group-open:rotate-45 transition-transform duration-200 text-lg">
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm text-muted-foreground leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
