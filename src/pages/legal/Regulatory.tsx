import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Regulatory() {
  return (
    <LegalLayout eyebrow="Trasparenza" title="Informazioni aziendali" updated="20 novembre 2026" path="/regulatory" description="Informazioni identificative e commerciali di PrismWave Studio.">
      <p>Questa pagina raccoglie le informazioni sull'operatore del sito. I campi mancanti devono essere verificati e completati prima del lancio commerciale.</p>
      <LegalSection title="Identità dell'operatore">
        <p>Nome commerciale: PrismWave Studio.</p>
        <p>Titolare / ragione sociale: <strong>[INSERIRE NOME E COGNOME O RAGIONE SOCIALE]</strong>.</p>
        <p>Sede legale o indirizzo professionale: <strong>[INSERIRE INDIRIZZO COMPLETO]</strong>.</p>
        <p>Paese di stabilimento: <strong>[CONFERMARE]</strong>.</p>
        <p>Partita IVA / codice fiscale / numero di registrazione, se applicabili: <strong>[INSERIRE DOPO VERIFICA DEL COMMERCIALISTA]</strong>.</p>
      </LegalSection>
      <LegalSection title="Attività">
        <p>Il sito presenta attività di progettazione e sviluppo di esperienze web e flussi digitali per piccole imprese. Ogni incarico è soggetto a valutazione di fattibilità e accordo scritto.</p>
      </LegalSection>
      <LegalSection title="Contatti">
        <p>Email: <a className="text-amber underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>
      <p className="mt-8 rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm text-amber-100">Questa pagina contiene segnaposto e non è pronta per la pubblicazione commerciale. Completare i dati reali e richiedere verifica professionale.</p>
    </LegalLayout>
  );
}
