import LegalLayout, { LegalSection } from "./LegalLayout";

export default function Terms() {
  return (
    <LegalLayout eyebrow="Studio terms" title="Terms of Use" updated="September 11, 2026">
      <p>These Terms of Use govern access to the PrismWave Studio website, tools, and services. By using this site, you agree to use it lawfully and respectfully.</p>

      <LegalSection title="Services and project agreements">
        <p>PrismWave Studio provides website strategy, design, development, audits, and related digital services. A project starts only after both parties agree to a written scope, price, timeline, deliverables, revision process, and payment terms.</p>
        <p>Information shown on this website, including starting prices and estimated timelines, is directional until confirmed in a project agreement.</p>
      </LegalSection>

      <LegalSection title="Audit tool">
        <p>The free audit provides automated, directional checks based on the publicly reachable version of a submitted URL. It is not a security assessment, accessibility certification, legal review, SEO guarantee, or promise of business performance.</p>
        <p>You confirm that you have permission to submit a URL for analysis and will not use the tool to interfere with, probe, or abuse a third-party service.</p>
      </LegalSection>

      <LegalSection title="Ownership and portfolio use">
        <p>Unless a written agreement says otherwise, the client receives the agreed final deliverables after the applicable invoices are paid. Third-party software, fonts, hosting, domains, and licensed assets remain subject to their own terms.</p>
        <p>PrismWave may display completed work as portfolio material only where the project agreement permits it or the client has approved that use.</p>
      </LegalSection>

      <LegalSection title="Acceptable use and availability">
        <p>Do not attempt to disrupt the site, bypass access controls, submit malicious content, impersonate another person, or use the site for unlawful activity. The site and free tools are provided on an availability basis and may change as the studio develops.</p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>Questions about these terms can be sent to <a className="text-amber underline underline-offset-4" href="mailto:yoichi_dev@proton.me">yoichi_dev@proton.me</a>.</p>
      </LegalSection>
    </LegalLayout>
  );
}
