import LegalLayout, { LegalSection } from "./LegalLayout";

export default function Regulatory() {
  return (
    <LegalLayout eyebrow="Transparency" title="Regulatory Information" updated="September 11, 2026">
      <p>This page provides operational transparency about PrismWave Studio and the limits of the tools offered on this website.</p>

      <LegalSection title="Business identity">
        <p>PrismWave Studio is an independent online web design and development studio operated by Yoichi. Primary contact: <a className="text-amber underline underline-offset-4" href="mailto:yoichi_dev@proton.me">yoichi_dev@proton.me</a>.</p>
        <p>Before publishing a legal or tax registration number, registered address, or jurisdiction-specific disclosures, those details must be supplied and verified by the studio owner.</p>
      </LegalSection>

      <LegalSection title="No professional certification claim">
        <p>PrismWave provides digital strategy, design, development, and directional website audits. PrismWave does not present the audit as a regulated financial, legal, medical, cybersecurity, accessibility, or search-engine certification service.</p>
      </LegalSection>

      <LegalSection title="Accessibility and responsible technology">
        <p>Projects are developed with responsive layouts, semantic structure, keyboard-aware interactions, and performance in mind. These practices do not constitute a guarantee of compliance with a specific accessibility regulation or technical standard unless that requirement is expressly included in a written project scope.</p>
        <p>Automated audit outputs can be incomplete. Important decisions should be reviewed by a qualified person with access to the full product, content, codebase, and applicable requirements.</p>
      </LegalSection>

      <LegalSection title="Third-party services and links">
        <p>Links and integrations may lead to third-party services with their own terms, privacy notices, security practices, and regulatory responsibilities. PrismWave does not control those services.</p>
      </LegalSection>

      <LegalSection title="Jurisdiction-specific disclosures">
        <p>The final version of this page should be updated with the studio's legal entity, business registration details, operating jurisdiction, VAT or sales-tax position where applicable, and any required consumer or digital-services disclosures before paid traffic or broader commercial launch.</p>
      </LegalSection>
    </LegalLayout>
  );
}
