import { Footer } from "@/components/landing/footer";

export const metadata = {
  title: "Terms of Service – Spin",
  description: "Terms of service for Spin, the destination discovery platform.",
};

export default function TermsPage() {
  return (
    <>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Last updated: [Date]
        </p>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {/* 1 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              1. Introduction
            </h2>
            <p>
              Welcome to [App Name]. These Terms of Service
              (&ldquo;Terms&rdquo;) govern your use of our website and services
              located at [your website URL] (&ldquo;the Service&rdquo;),
              operated by [Your Company Name / Your Full Name] (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
            </p>
            <p className="mt-3">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you do not agree, please do not use the Service.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              2. What the Service Does
            </h2>
            <p>
              [App Name] is an entertainment and travel inspiration platform
              that allows you to spin a virtual globe to receive a randomly
              selected travel destination, along with curated travel information
              and links to third-party booking services.
            </p>
            <p className="mt-3">
              We do not sell travel products or services directly. We are not a
              travel agency, tour operator, airline, hotel, or insurance
              provider. All bookings are made through third-party partners, and
              any resulting contract is between you and that third party.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              3. Eligibility
            </h2>
            <p>
              You must be at least 16 years old to use the Service. By using the
              Service, you confirm that you meet this age requirement.
            </p>
            <p className="mt-3">
              If you create an account, you are responsible for maintaining the
              confidentiality of your login credentials and for all activity that
              occurs under your account.
            </p>
          </section>

          {/* 4 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              4. Accounts
            </h2>
            <p>
              Account creation is optional. Some features of the Service, such
              as saved destinations, travel preferences, and trip history, may
              require an account.
            </p>
            <p className="mt-3">
              You agree to provide accurate and complete information when
              creating an account and to keep this information up to date. We
              reserve the right to suspend or terminate accounts that violate
              these Terms or that appear to be fraudulent.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              5. Free and Premium Services
            </h2>
            <p>
              Certain features of the Service are available for free. We may
              offer additional features through a paid subscription plan
              (&ldquo;Premium&rdquo;). If you subscribe to Premium:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                Pricing and features will be clearly displayed before purchase
              </li>
              <li>
                Payment will be processed through a third-party payment provider
              </li>
              <li>
                Subscriptions will renew automatically unless cancelled before
                the renewal date
              </li>
              <li>
                You may cancel your subscription at any time through your
                account settings
              </li>
              <li>
                Refunds will be handled in accordance with applicable UK
                consumer protection law
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to change pricing or features of Premium with
              reasonable notice. Existing subscribers will be notified of any
              changes before their next renewal date.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              6. Affiliate Links and Third-Party Services
            </h2>
            <p>
              The Service contains affiliate links to third-party travel
              providers, including but not limited to flight search engines,
              hotel booking platforms, tour operators, and travel insurance
              providers.
            </p>
            <p className="mt-3">When you click an affiliate link:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                You leave our Service and are redirected to a third-party
                website
              </li>
              <li>
                Your use of that website is governed by their own terms and
                privacy policies
              </li>
              <li>
                Any booking, purchase, or transaction you make is between you
                and that third party
              </li>
              <li>
                We earn a commission on qualifying bookings at no additional
                cost to you
              </li>
            </ul>
            <p className="mt-3">
              We make reasonable efforts to link to reputable partners, but we
              do not control, endorse, or guarantee the accuracy, safety, or
              quality of any third-party products, services, prices, or content.
              We are not liable for any loss, damage, or dispute arising from
              your use of third-party services.
            </p>
            <p className="mt-3">
              Travel information displayed on our Service, including prices,
              availability, visa requirements, and destination details, is
              provided for general guidance only and may not be current or
              accurate at the time of viewing. Always verify details directly
              with the relevant provider or official source before making travel
              decisions.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              7. Destination Recommendations
            </h2>
            <p>
              Destinations are generated randomly or based on filters you
              select. Our recommendations are for entertainment and inspiration
              purposes only.
            </p>
            <p className="mt-3">
              We do not guarantee the safety, suitability, or accessibility of
              any destination. It is your sole responsibility to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                Check travel advisories issued by the UK Foreign, Commonwealth
                &amp; Development Office (FCDO) or equivalent authority for your
                country
              </li>
              <li>
                Verify visa, passport, and entry requirements for your
                nationality
              </li>
              <li>Obtain appropriate travel insurance</li>
              <li>
                Assess your own health, safety, and personal circumstances
                before travelling
              </li>
              <li>
                Comply with all local laws and regulations at your destination
              </li>
            </ul>
            <p className="mt-3">
              We accept no liability for any loss, injury, or damage arising
              from travel to a destination suggested by the Service.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              8. Intellectual Property
            </h2>
            <p>
              All content on the Service, including but not limited to the
              website design, logo, text, graphics, animations, code, and the
              globe interface, is owned by us or licensed to us and is protected
              by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not copy, reproduce, distribute, modify, or create
              derivative works from any part of the Service without our prior
              written permission.
            </p>
            <p className="mt-3">
              Destination images and travel content may be sourced from third
              parties under licence. Such content remains the property of the
              respective rights holders.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              9. User Conduct
            </h2>
            <p className="mb-3">
              When using the Service, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>
                Attempt to gain unauthorised access to the Service, other
                accounts, or our systems
              </li>
              <li>
                Use automated tools, bots, scrapers, or similar technology to
                access or interact with the Service without our written
                permission
              </li>
              <li>
                Interfere with or disrupt the Service or the servers and
                networks connected to it
              </li>
              <li>Impersonate any person or entity</li>
              <li>
                Use the Service to send spam or unsolicited communications
              </li>
              <li>
                Reverse engineer, decompile, or disassemble any part of the
                Service
              </li>
            </ul>
            <p className="mt-3">
              We reserve the right to suspend or terminate your access to the
              Service if you breach any of these terms.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              10. Disclaimer of Warranties
            </h2>
            <p>
              The Service is provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis. To the fullest extent permitted by law, we
              disclaim all warranties, whether express, implied, or statutory,
              including but not limited to implied warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement.
            </p>
            <p className="mt-3">We do not warrant that:</p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>
                The Service will be uninterrupted, error-free, or secure
              </li>
              <li>
                Any information provided through the Service is accurate,
                complete, or current
              </li>
              <li>
                The Service will meet your specific requirements or expectations
              </li>
            </ul>
            <p className="mt-3">
              Nothing in these Terms excludes or limits our liability for death
              or personal injury caused by our negligence, fraud or fraudulent
              misrepresentation, or any other liability that cannot be excluded
              or limited under applicable UK law.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              11. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, we shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages, including but not limited to loss of profits, data, or
              goodwill, arising from or in connection with your use of the
              Service.
            </p>
            <p className="mt-3">
              Our total aggregate liability to you for any claims arising from
              or related to the Service shall not exceed the amount you have
              paid to us (if any) in the 12 months preceding the claim.
            </p>
            <p className="mt-3">
              This limitation applies whether the claim is based in contract,
              tort (including negligence), strict liability, or any other legal
              theory.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              12. Indemnification
            </h2>
            <p>
              You agree to indemnify, defend, and hold harmless [Your Company
              Name / Your Full Name], its officers, directors, employees, and
              agents from and against any claims, damages, losses, liabilities,
              and expenses (including reasonable legal fees) arising from or
              related to:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-3">
              <li>Your use of the Service</li>
              <li>Your breach of these Terms</li>
              <li>
                Your violation of any law or the rights of any third party
              </li>
              <li>
                Any booking or transaction you make through a third-party
                service accessed via the Service
              </li>
            </ul>
          </section>

          {/* 13 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              13. Changes to the Service
            </h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part
              of the Service at any time, with or without notice. This includes
              adding or removing features, changing free features to paid
              features (with reasonable notice), and updating the globe interface
              or destination database.
            </p>
            <p className="mt-3">
              We shall not be liable to you or any third party for any
              modification, suspension, or discontinuation of the Service.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              14. Changes to These Terms
            </h2>
            <p>
              We may update these Terms from time to time. When we do, we will
              update the &ldquo;Last updated&rdquo; date at the top of this
              page. If changes are material, we will notify you by email (if you
              have an account) or by a prominent notice on the Service.
            </p>
            <p className="mt-3">
              Your continued use of the Service after any changes constitutes
              acceptance of the updated Terms. If you do not agree to the
              changes, you should stop using the Service.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              15. Governing Law and Disputes
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of England and Wales.
            </p>
            <p className="mt-3">
              Any disputes arising from or in connection with these Terms or the
              Service shall be subject to the exclusive jurisdiction of the
              courts of England and Wales.
            </p>
            <p className="mt-3">
              If you are a consumer, nothing in these Terms affects your
              statutory rights under the Consumer Rights Act 2015 or other
              applicable UK consumer protection legislation.
            </p>
          </section>

          {/* 16 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              16. Severability
            </h2>
            <p>
              If any provision of these Terms is found to be invalid, illegal,
              or unenforceable by a court of competent jurisdiction, the
              remaining provisions shall continue in full force and effect.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              17. Entire Agreement
            </h2>
            <p>
              These Terms, together with our{" "}
              <a
                href="/privacy"
                className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>{" "}
              and any other policies referenced herein, constitute the entire
              agreement between you and us regarding your use of the Service.
            </p>
          </section>

          {/* 18 */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              18. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <address className="mt-3 not-italic">
              <p>[Your Full Name or Company Name]</p>
              <p>Email: [your email address]</p>
              <p>Address: [your business address, if applicable]</p>
            </address>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
