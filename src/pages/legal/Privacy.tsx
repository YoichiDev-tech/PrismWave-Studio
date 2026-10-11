import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Data and privacy"
      title="Privacy Notice"
      updated="October 11, 2026"
      path="/privacy"
      description="How PrismWave Studio collects, uses, stores, and protects personal information."
    >
      <p>
        This Privacy Notice explains how PrismWave Studio handles personal
        information when you visit the website, use the free website audit,
        request a report, or contact the studio. It must be read alongside
        the actual services and tracking technologies enabled on the website.
      </p>

      <LegalSection title="Who is responsible for your data">
        <p>
          PrismWave Studio is an independent web design and development
          studio operated by its owner. The owner's full legal name, business
          address, operating jurisdiction, and registration details must be
          published here where required by applicable law.
        </p>
        <p>
          For privacy questions or requests, contact{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
        </p>
      </LegalSection>

      <LegalSection title="Information we may collect">
        <p>
          Depending on how you use the website, information may include:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Contact details you submit, such as your name, email address,
            business name, website URL, and message.
          </li>
          <li>
            Audit information, including the submitted website URL, generated
            scores, findings, and report requests.
          </li>
          <li>
            Project details, service preferences, and correspondence you
            choose to send us.
          </li>
          <li>
            Website interaction data, such as page views, audit events,
            conversion events, referral information, campaign parameters,
            and session identifiers, where these are enabled.
          </li>
          <li>
            Technical information that may be processed by hosting,
            security, email, or embedded third-party services, such as
            browser and request information.
          </li>
        </ul>
        <p>
          Please do not submit sensitive personal information or information
          about another person unless it is necessary and you are entitled
          to provide it.
        </p>
      </LegalSection>

      <LegalSection title="Why we use information and our legal bases">
        <p>
          We use information to operate and secure the website, run the
          requested audit, send requested reports, answer enquiries, prepare
          project proposals, deliver agreed services, prevent abuse, and
          understand whether our services are useful.
        </p>
        <p>
          Depending on the specific activity, processing may be necessary
          to take steps at your request before entering a contract, perform
          a contract, comply with a legal obligation, or pursue legitimate
          interests such as maintaining site security and improving our
          services. Where consent is legally required, we rely on consent
          and provide a way to withdraw it.
        </p>
        <p>
          The final legal basis for each activity must match the actual
          implementation. Optional analytics, advertising, or similar
          tracking must not be described as consent-based unless valid
          consent is obtained where required.
        </p>
      </LegalSection>

      <LegalSection title="Website audit submissions">
        <p>
          When you submit a URL, the audit tool processes that URL to
          perform automated checks and generate findings. If you request
          a report, the email address and report-related information you
          submit may be stored and used to deliver the report and respond
          to your request.
        </p>
        <p>
          Only submit URLs you are authorised to provide. The audit is
          automated and may be incomplete or inaccurate. Do not submit
          passwords, private URLs, or confidential material.
        </p>
      </LegalSection>

      <LegalSection title="Service providers and recipients">
        <p>
          The website may use Vercel for hosting, Supabase for database
          services, Resend for email delivery, Calendly for scheduling,
          and Crisp for chat, depending on which integrations are enabled.
          These services may process information needed to provide their
          functions.
        </p>
        <p>
          The published list must be checked against the integrations
          actually active in production. Information may also be disclosed
          where required by law or where necessary to protect the website,
          its users, or our legal rights.
        </p>
      </LegalSection>

      <LegalSection title="Cookies and similar technologies">
        <p>
          The website or its third-party integrations may use cookies,
          local storage, session storage, or similar technologies. Their
          actual names, purposes, providers, and lifetimes depend on the
          deployed implementation.
        </p>
        <p>
          Technologies that are strictly necessary for a service you
          explicitly request may be treated differently from optional
          analytics, advertising, or cross-site tracking technologies.
          Where prior consent is legally required, optional technologies
          must remain disabled until consent is given. You must be able
          to refuse or withdraw consent as required by law.
        </p>
        <p>
          This section is not a substitute for auditing the production
          website. A cookie inventory and a consent mechanism should be
          added if the technologies in use require them.
        </p>
      </LegalSection>

      <LegalSection title="International transfers">
        <p>
          Our service providers may process information in countries
          outside your country of residence or outside the European
          Economic Area. Where data protection law requires safeguards
          for an international transfer, the applicable safeguards must
          be in place and information about them made available.
        </p>
        <p>
          The actual provider locations, transfer arrangements, and
          safeguards must be verified against the services and account
          configurations in use.
        </p>
      </LegalSection>

      <LegalSection title="How long we retain information">
        <p>
          We keep personal information only for as long as reasonably
          necessary for the purpose for which it was collected, including
          responding to requests, providing services, maintaining required
          business records, resolving disputes, and protecting the website.
        </p>
        <p>
          The studio must define and apply retention periods for audit
          records, interaction events, leads, email correspondence, and
          technical logs. Data should be deleted or anonymised when it is
          no longer needed, unless a legal obligation requires retention.
        </p>
      </LegalSection>

      <LegalSection title="Your privacy rights">
        <p>
          Subject to applicable law, you may have the right to request
          access to your personal information, correction, deletion,
          restriction of processing, data portability, or to object to
          certain processing. Where processing relies on consent, you
          may withdraw consent without affecting processing that was
          lawful before withdrawal.
        </p>
        <p>
          To make a request, email{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
          You may also have the right to complain to the data protection
          authority competent for your circumstances.
        </p>
      </LegalSection>

      <LegalSection title="Security and third-party services">
        <p>
          We use reasonable measures intended to protect information, but
          no website or transmission method can be guaranteed completely
          secure. External services and links are governed by their own
          privacy notices and practices.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This website and its services are intended for people seeking
          web design, development, audits, or related business services.
          The studio does not knowingly seek to collect personal
          information from children.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this notice">
        <p>
          This notice may be updated when our services, data practices,
          or legal obligations change. The date at the top indicates
          when this page was last updated.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Privacy requests and questions:{" "}
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