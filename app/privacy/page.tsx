import { Footer } from "@/components/landing/footer";
import { LegalPageLayout, RevealSection } from "@/components/legal-page-layout";

export const metadata = {
  title: "Privacy Policy – Spin",
  description: "Privacy policy for Spin, the destination discovery platform.",
};

export default function PrivacyPage() {
  return (
    <>
      <LegalPageLayout title="Privacy Policy" lastUpdated="Last updated: [Date]">
        <RevealSection index={0}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Who We Are
            </h2>
            <p>
              [App Name] is operated by [Your Company Name / Your Full Name],
              registered in [England and Wales / Scotland / Northern Ireland].
              When we say &ldquo;we,&rdquo; &ldquo;us,&rdquo; or
              &ldquo;our&rdquo; in this policy, that&rsquo;s who we mean. When
              we say &ldquo;you,&rdquo; we mean you — the person using our
              website and services.
            </p>
            <p className="mt-3">
              If you have any questions about this policy, you can reach us at
              [your email address].
            </p>
          </section>
        </RevealSection>

        <RevealSection index={1}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. What Information We Collect
            </h2>

            <h3 className="text-base font-medium text-foreground mt-4 mb-2">
              Information you give us directly:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Email address — when you join our waitlist, create an account, or
                subscribe to our emails
              </li>
              <li>Name — if you create an account</li>
              <li>
                Destination preferences — such as budget range, preferred
                climates, or travel style, if you choose to set filters
              </li>
              <li>
                Account login credentials — if you create an account with us
              </li>
            </ul>

            <h3 className="text-base font-medium text-foreground mt-4 mb-2">
              Information we collect automatically:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Device and browser information — such as your device type,
                operating system, browser type, and screen resolution
              </li>
              <li>
                IP address — which gives us a rough idea of your general
                location (we use this to show relevant flight options and
                currency)
              </li>
              <li>
                Usage data — how you interact with the site, including pages
                visited, spins made, destinations viewed, links clicked, and
                time spent on the site
              </li>
              <li>
                Cookies and similar technologies — see Section 6 below for full
                details
              </li>
            </ul>

            <h3 className="text-base font-medium text-foreground mt-4 mb-2">
              Information we do not collect:
            </h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Payment or credit card details — all bookings happen on
                third-party partner sites, not on ours
              </li>
              <li>
                Precise GPS location — unless you explicitly grant permission,
                and only to show relevant travel options
              </li>
            </ul>
          </section>
        </RevealSection>

        <RevealSection index={2}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Provide and improve our service — including generating
                destination recommendations and showing relevant booking options
              </li>
              <li>
                Send you emails — such as waitlist updates, launch
                announcements, destination deals, and travel inspiration (only
                if you&rsquo;ve signed up for these)
              </li>
              <li>
                Personalise your experience — such as remembering your
                preferences, showing prices in your local currency, and
                suggesting flights from your nearest airport
              </li>
              <li>
                Analyse usage patterns — to understand how people use the site
                and make it better
              </li>
              <li>
                Prevent misuse — to detect and prevent fraud, spam, or abuse of
                our services
              </li>
            </ul>
            <p className="mt-3 font-medium text-foreground">
              We will never sell your personal information to third parties.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={3}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Affiliate Links and Third-Party Booking Partners
            </h2>
            <p>
              Our site contains affiliate links to third-party travel services,
              which may include but are not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                Flight booking platforms (e.g., Skyscanner, Expedia, Kiwi.com)
              </li>
              <li>
                Hotel and accommodation providers (e.g., Booking.com, Trivago,
                Hostelworld)
              </li>
              <li>
                Tour and experience providers (e.g., Viator, GetYourGuide)
              </li>
              <li>Travel insurance providers</li>
            </ul>
            <p className="mt-3">
              When you click an affiliate link, you leave our site and are
              directed to the third-party partner&rsquo;s website. At that
              point, the partner&rsquo;s own privacy policy governs how your
              data is handled. We earn a commission on qualifying bookings made
              through these links, at no additional cost to you.
            </p>
            <p className="mt-3">
              We may share non-personally-identifiable information with affiliate
              partners (such as the fact that a click originated from our site),
              but we do not share your name, email address, or any personal
              details with these partners.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={4}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Legal Basis for Processing (GDPR)
            </h2>
            <p className="mb-3">
              If you are in the United Kingdom or European Economic Area, we
              rely on the following legal bases for processing your data:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">Consent</strong> — when you
                sign up for our waitlist or email updates, or accept
                non-essential cookies
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests</strong>{" "}
                — for analytics, fraud prevention, and improving our services,
                where these interests do not override your rights
              </li>
              <li>
                <strong className="text-foreground">
                  Contractual necessity
                </strong>{" "}
                — when processing is needed to provide you with the service
                you&rsquo;ve requested (e.g., generating destination
                recommendations based on your preferences)
              </li>
            </ul>
            <p className="mt-3">
              You can withdraw your consent at any time by contacting us or
              using the unsubscribe link in any email.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={5}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Cookies
            </h2>
            <p className="mb-3">
              We use cookies and similar technologies on our site. Here&rsquo;s
              what they do:
            </p>
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong className="text-foreground">Essential cookies</strong> —
                these are necessary for the site to function. They keep you
                logged in, remember your cookie preferences, and ensure the site
                works properly. You cannot opt out of these.
              </li>
              <li>
                <strong className="text-foreground">Analytics cookies</strong> —
                these help us understand how visitors use the site. We use tools
                such as Google Analytics to track page views, session duration,
                and user flows. These cookies collect anonymised data.
              </li>
              <li>
                <strong className="text-foreground">
                  Affiliate tracking cookies
                </strong>{" "}
                — when you click an affiliate link, our partners may place a
                cookie on your device to track the referral. This is how we earn
                commission on any resulting bookings. These cookies are placed by
                the third-party partner, not by us.
              </li>
              <li>
                <strong className="text-foreground">Preference cookies</strong>{" "}
                — these remember your settings, such as preferred currency,
                language, or destination filters.
              </li>
            </ul>
            <p className="mt-3">
              You can manage your cookie preferences at any time through our
              cookie banner or your browser settings. Note that disabling
              certain cookies may affect your experience on the site.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={6}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. How We Store and Protect Your Data
            </h2>
            <p>
              Your data is stored securely using industry-standard measures,
              including encryption in transit (HTTPS) and at rest. We use
              reputable third-party service providers for hosting, email
              delivery, and analytics, all of whom are contractually required to
              protect your data.
            </p>
            <p className="mt-3">
              We retain your personal data only for as long as necessary to
              fulfil the purposes described in this policy, or as required by
              law. Specifically:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                Waitlist and account data — retained for as long as your account
                is active, or until you ask us to delete it
              </li>
              <li>
                Usage and analytics data — retained in anonymised form for up to
                26 months
              </li>
              <li>
                Email marketing data — retained until you unsubscribe
              </li>
            </ul>
          </section>
        </RevealSection>

        <RevealSection index={7}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Your Rights
            </h2>
            <p className="mb-3">
              Under UK GDPR and the Data Protection Act 2018, you have the right
              to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong className="text-foreground">Access</strong> — request a
                copy of the personal data we hold about you
              </li>
              <li>
                <strong className="text-foreground">Rectification</strong> — ask
                us to correct inaccurate or incomplete data
              </li>
              <li>
                <strong className="text-foreground">Erasure</strong> — ask us to
                delete your personal data (&ldquo;right to be forgotten&rdquo;)
              </li>
              <li>
                <strong className="text-foreground">Restriction</strong> — ask
                us to limit how we use your data
              </li>
              <li>
                <strong className="text-foreground">Portability</strong> —
                request your data in a structured, commonly used format
              </li>
              <li>
                <strong className="text-foreground">Object</strong> — object to
                processing based on legitimate interests or for direct marketing
              </li>
              <li>
                <strong className="text-foreground">Withdraw consent</strong> —
                where processing is based on consent, withdraw it at any time
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at [your email address].
              We will respond within 30 days.
            </p>
            <p className="mt-3">
              If you are not satisfied with how we handle your request, you have
              the right to lodge a complaint with the Information
              Commissioner&rsquo;s Office (ICO) at{" "}
              <a
                href="https://ico.org.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                ico.org.uk
              </a>
              .
            </p>
          </section>
        </RevealSection>

        <RevealSection index={8}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              9. Children&rsquo;s Privacy
            </h2>
            <p>
              Our service is not directed at children under the age of 16. We do
              not knowingly collect personal information from children under 16.
              If we become aware that we have collected such data, we will delete
              it promptly. If you believe a child has provided us with personal
              information, please contact us at [your email address].
            </p>
          </section>
        </RevealSection>

        <RevealSection index={9}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              10. International Data Transfers
            </h2>
            <p>
              Some of our third-party service providers may process your data
              outside the United Kingdom. Where this happens, we ensure
              appropriate safeguards are in place, such as Standard Contractual
              Clauses approved by the UK Government, or transfers to countries
              deemed adequate by the UK Secretary of State.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={10}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              11. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. When we do,
              we will update the &ldquo;Last updated&rdquo; date at the top of
              this page. If changes are significant, we will notify you by email
              or with a prominent notice on our site.
            </p>
          </section>
        </RevealSection>

        <RevealSection index={11}>
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              12. Contact Us
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this
              privacy policy or your personal data, please contact us at:
            </p>
            <address className="mt-3 not-italic">
              <p>[Your Full Name or Company Name]</p>
              <p>Email: [your email address]</p>
              <p>Address: [your business address, if applicable]</p>
            </address>
          </section>
        </RevealSection>
      </LegalPageLayout>

      <Footer />
    </>
  );
}
