import { FooterExpanded } from "@/components/landing/footer-expanded";
import {
  LegalPageLayout,
  RevealSection,
} from "@/components/legal-page-layout";

export const metadata = {
  title: "Affiliate Disclosure – Spin",
  description:
    "How Spin earns revenue through affiliate partnerships with travel booking services.",
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <LegalPageLayout
        title="Affiliate Disclosure"
        lastUpdated="Last updated: March 2026"
      >
        <RevealSection index={0}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              How Spin Earns Revenue
            </h2>
            <p>
              Spin contains affiliate links to third-party travel booking
              services. When you click one of these links and make a purchase or
              booking, we may earn a small commission at no extra cost to you.
              This revenue helps us keep Spin free and continue building new
              features for travellers.
            </p>
            <p className="mt-3">
              Affiliate partnerships do not influence which destinations appear
              when you spin the globe. Every destination has an equal chance of
              being selected, regardless of any commercial relationship.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={1}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Our Affiliate Partners
            </h2>
            <p className="mb-4">
              We currently partner with the following travel services:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-foreground">Skyscanner</strong> — Flight
                comparison and booking. When you search for flights through our
                links, Skyscanner may pay us a referral fee if you complete a
                booking.
              </li>
              <li>
                <strong className="text-foreground">Booking.com</strong> — Hotel
                and accommodation search. We earn a commission when you book
                accommodation through our links.
              </li>
              <li>
                <strong className="text-foreground">Viator</strong> — Tours,
                activities, and experiences. We earn a commission when you book
                an experience through our links.
              </li>
            </ul>
            <p className="mt-4">
              Each partner&rsquo;s own terms, conditions, and privacy policy
              govern your interaction with their platform once you leave our
              site.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={2}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Our Promise to You
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong className="text-foreground">No extra cost</strong> — You
                pay the same price whether you use our affiliate link or go
                directly to the partner&rsquo;s website.
              </li>
              <li>
                <strong className="text-foreground">Editorial independence</strong>{" "}
                — Our destination recommendations are randomised and never
                influenced by affiliate relationships.
              </li>
              <li>
                <strong className="text-foreground">Transparency</strong> — All
                booking links on Spin that earn us a commission are marked with
                an external link icon and use{" "}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                  rel=&quot;sponsored&quot;
                </code>{" "}
                for search engine transparency.
              </li>
            </ul>
          </section>
        </RevealSection>

        <RevealSection index={3}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Questions?
            </h2>
            <p>
              If you have any questions about our affiliate relationships or how
              we earn revenue, please contact us at{" "}
              <a
                href="mailto:hello@spintheglobe.com"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                hello@spintheglobe.com
              </a>
              .
            </p>
          </section>
        </RevealSection>
      </LegalPageLayout>

      <FooterExpanded />
    </>
  );
}
