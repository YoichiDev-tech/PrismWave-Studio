import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Studio terms"
      title="Terms of Use"
      updated="October 11, 2026"
      path="/terms"
      description="Terms for using the PrismWave Studio website, free audit tools, and web design and development services."
    >
      <p>
        These Terms of Use apply to your access to the PrismWave Studio
        website and its tools. By using the website, you agree to comply
        with these terms and applicable law. Mandatory rights under
        applicable consumer or other laws are not excluded or limited
        by these terms.
      </p>

      <LegalSection title="About the services">
        <p>
          PrismWave Studio offers website strategy, design, development,
          automated website audits, and related digital services. The
          exact services available may change over time.
        </p>
        <p>
          Website descriptions, example work, starting prices, estimates,
          and timelines are informational unless expressly confirmed in
          a written project agreement.
        </p>
      </LegalSection>

      <LegalSection title="Paid projects and payment">
        <p>
          Before a paid project begins, the studio and client should agree
          in writing on the scope, deliverables, price, timeline, payment
          schedule, revision process, responsibilities, and any relevant
          third-party costs.
        </p>
        <p>
          Work begins according to that agreement. Changes to the agreed
          scope may require a revised price or timeline. Any cancellation,
          refund, warranty, or remedy will be governed by the project
          agreement and applicable law.
        </p>
        <p>
          Nothing in these terms removes a mandatory right or remedy that
          applies to a customer under the law governing the transaction.
        </p>
      </LegalSection>

      <LegalSection title="Free website audit">
        <p>
          The free audit provides automated, directional checks based on
          the submitted URL and the content or signals accessible to the
          tool. Results may be incomplete, outdated, or inaccurate and
          should be reviewed by a qualified person before important
          decisions are made.
        </p>
        <p>
          The audit is not a security penetration test, legal opinion,
          accessibility certification, SEO guarantee, or promise of
          traffic, revenue, rankings, or business performance.
        </p>
        <p>
          The audit is provided without a charge unless a separate written
          agreement says otherwise. Any optional paid work must be agreed
          separately before it begins.
        </p>
      </LegalSection>

      <LegalSection title="Your responsibilities when using the audit">
        <p>
          You must be authorised to submit the URL and must not use the
          audit to interfere with another service, bypass access controls,
          send malicious input, or perform unlawful or abusive activity.
        </p>
        <p>
          Do not submit passwords, private access links, confidential
          information, or personal data you do not have permission to
          share. The audit may not work with every website or configuration.
        </p>
      </LegalSection>

      <LegalSection title="Intellectual property and deliverables">
        <p>
          The website, its branding, original content, and studio tools
          belong to the studio or their respective rights holders, except
          where a different licence or ownership arrangement applies.
          You may not copy or redistribute protected material except as
          permitted by law or an applicable licence.
        </p>
        <p>
          Ownership and usage rights for client deliverables are governed
          by the relevant written project agreement. Unless that agreement
          says otherwise, third-party software, fonts, stock assets,
          hosting, domains, and licensed materials remain subject to
          their own terms.
        </p>
        <p>
          The studio may show completed client work in its portfolio only
          where the project agreement permits it or the client has
          separately approved that use.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          The website may link to or integrate with services operated by
          third parties. Those services have their own terms, privacy
          notices, availability, and security practices. The studio does
          not control third-party services and is not responsible for
          their independent operation.
        </p>
      </LegalSection>

      <LegalSection title="Availability and changes">
        <p>
          We may update, suspend, or discontinue parts of the website or
          free tools as the studio develops. We aim to keep the website
          available but do not promise uninterrupted or error-free
          operation.
        </p>
      </LegalSection>

      <LegalSection title="Liability">
        <p>
          To the extent permitted by applicable law, the studio is not
          responsible for losses caused by reliance on incomplete
          automated audit results, interruptions outside its reasonable
          control, or misuse of the website by a visitor.
        </p>
        <p>
          Nothing in these terms excludes or limits liability where that
          exclusion or limitation is prohibited by law. Any liability
          terms for a paid project should be agreed separately and
          reviewed for the applicable jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="Changes to these terms">
        <p>
          These terms may be updated as the website, services, or legal
          requirements change. The date at the top indicates when this
          page was last updated. Any project-specific agreement continues
          to govern that project where its terms apply.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about these terms can be sent to{" "}
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