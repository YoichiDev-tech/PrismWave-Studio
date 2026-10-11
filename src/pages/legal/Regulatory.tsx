import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Regulatory() {
  return (
    <LegalLayout
      eyebrow="Transparency"
      title="Business Information"
      updated="October 11, 2026"
      path="/regulatory"
      description="Business contact information, service scope, and transparency information for PrismWave Studio."
    >
      <p>
        This page provides business and service information for PrismWave
        Studio. It should be read alongside the Privacy Notice and Terms
        of Use.
      </p>

      <LegalSection title="Business identity and contact">
        <p>
          Trading name: PrismWave Studio.
        </p>
        <p>
          Business activity: website strategy, design, development,
          automated website audits, and related digital services.
        </p>
        <p>
          Contact email:{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
        </p>
        <p>
          The operator's full legal name, business address, operating
          jurisdiction, registration number, and tax or VAT details must
          be added where required by the laws applicable to the business.
          These details must be verified by the owner before this page
          is treated as complete.
        </p>
      </LegalSection>

      <LegalSection title="Services and commercial agreements">
        <p>
          PrismWave Studio provides digital services. The precise scope,
          price, delivery schedule, payment terms, revisions, and
          responsibilities for paid work are confirmed in a written
          project agreement.
        </p>
        <p>
          Website copy, examples, estimates, and starting prices are
          not a binding offer unless explicitly stated in writing.
        </p>
      </LegalSection>

      <LegalSection title="Automated audit limitations">
        <p>
          The free website audit uses automated checks and publicly
          accessible website information where available. Results can
          be incomplete, and a positive or negative result is not a
          guarantee of security, accessibility compliance, search
          performance, legal compliance, or business outcomes.
        </p>
        <p>
          The audit is not a substitute for a professional assessment
          where one is required.
        </p>
      </LegalSection>

      <LegalSection title="Accessibility and technical standards">
        <p>
          The studio aims to consider responsive layouts, semantic
          structure, keyboard usability, and performance when delivering
          work. A particular legal or technical standard is not certified
          unless that specific assessment and scope are expressly agreed
          in writing.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          The website may rely on hosting, database, email, scheduling,
          analytics, or chat providers. Each provider operates under its
          own terms and privacy practices. The studio's Privacy Notice
          should identify the providers actually enabled in production.
        </p>
      </LegalSection>

      <LegalSection title="Applicable laws and mandatory rights">
        <p>
          The applicable law and any required consumer, tax, business
          registration, online-service, or dispute-resolution disclosures
          depend on the operator's actual establishment, the services
          offered, and the customers served. No governing country is
          stated here until it has been verified.
        </p>
        <p>
          Nothing on this page removes mandatory rights that apply under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          For business or service questions, contact{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}