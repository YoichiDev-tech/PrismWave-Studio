import LegalLayout, { LegalSection } from "./LegalLayout";

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Data and privacy"
      title="Privacy Notice"
      updated="September 11, 2026"
      path="/privacy"
      description="What PrismWave Studio collects through this website, why, and the choices available to visitors."
    >
      <p>This notice explains what PrismWave Studio collects through this website, why it is collected, and the choices available to visitors.</p>

      <LegalSection title="Information you provide">
        <p>If you contact the studio, request an audit report, or book a call, we may receive your name, email address, business details, website URL, project information, audit results, and messages.</p>
      </LegalSection>

      <LegalSection title="Information collected automatically">
        <p>The site may record page views, session identifiers, referral and campaign information, device details, audit interactions, chat interactions, and conversion events. Session identifiers are used to understand a visit and are not intended to identify you by name.</p>
        <p>The audit tool fetches and analyzes the URL you submit. It does not require an account for the initial scan.</p>
      </LegalSection>

      <LegalSection title="Why we use information">
        <p>We use information to operate the website, deliver requested audit reports, respond to inquiries, schedule conversations, improve the visitor experience, understand which services are useful, prevent abuse, and manage legitimate studio operations.</p>
      </LegalSection>

      <LegalSection title="Service providers">
        <p>PrismWave may use infrastructure and service providers such as Vercel, Supabase, Resend, Calendly, and Crisp to host the site, store operational data, send email, schedule calls, and provide chat. These providers process information according to their own policies and the configuration of the relevant service.</p>
      </LegalSection>

      <LegalSection title="Retention and choices">
        <p>We retain business and inquiry information for as long as reasonably needed to respond, provide services, maintain records, and meet legal or operational obligations. You can request access, correction, or deletion of personal information by emailing <a className="text-amber underline underline-offset-4" href="mailto:yoichi_dev@proton.me">yoichi_dev@proton.me</a>.</p>
        <p>You can close the chat widget, decline optional browser permissions, and avoid submitting information. Some site functions may be unavailable without the information needed to provide them.</p>
      </LegalSection>

      <LegalSection title="Important note">
        <p>This notice is a general operational privacy notice, not legal advice. Before launch, it should be reviewed and adapted to the jurisdictions where PrismWave operates and where its visitors or clients are located.</p>
      </LegalSection>
    </LegalLayout>
  );
}