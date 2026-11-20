import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Terms() {
  return (
    <LegalLayout eyebrow="Condizioni" title="Termini di utilizzo" updated="20 novembre 2026" path="/terms" description="Condizioni generali di utilizzo del sito PrismWave Studio.">
      <p>Questi termini riguardano l'utilizzo del sito PrismWave Studio e del modulo di contatto. Le condizioni di ogni servizio professionale saranno definite in un accordo scritto separato.</p>
      <LegalSection title="Informazioni sullo studio">
        <p>PrismWave Studio presenta servizi di progettazione e sviluppo di soluzioni digitali per piccole imprese. L'identità legale dell'operatore, la sede e gli eventuali dati di registrazione devono essere completati nella pagina Informazioni aziendali prima dell'utilizzo commerciale del sito.</p>
      </LegalSection>
      <LegalSection title="Anteprime e dimostrazioni">
        <p>Le schermate dimostrative presenti sul sito possono contenere dati fittizi e rappresentano un possibile flusso di lavoro. Non costituiscono un software già attivo, una promessa di funzionalità disponibili o una prova di un progetto realizzato per un cliente.</p>
      </LegalSection>
      <LegalSection title="Richieste e preventivi">
        <p>L'invio del modulo non costituisce un ordine né comporta l'avvio automatico di un progetto. Prima di iniziare qualsiasi attività a pagamento, le parti devono concordare per iscritto perimetro, risultati attesi, esclusioni, prezzo, tempi, pagamenti, revisioni, responsabilità e assistenza.</p>
      </LegalSection>
      <LegalSection title="Limitazioni delle informazioni">
        <p>Le informazioni sul sito hanno finalità descrittive. Tempi, costi e fattibilità dipendono dai requisiti effettivi e saranno confermati solo dopo una valutazione. Non vengono garantiti risultati commerciali, posizionamento sui motori di ricerca o incrementi di fatturato.</p>
      </LegalSection>
      <LegalSection title="Proprietà intellettuale">
        <p>Marchi, testi, grafica, codice e materiali del sito appartengono ai rispettivi titolari. Diritti e licenze sui deliverable commissionati saranno definiti nel contratto di progetto, tenendo conto delle licenze di terze parti.</p>
      </LegalSection>
      <LegalSection title="Contatti">
        <p>Per domande sui presenti termini: <a className="text-amber underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>
      <p className="mt-8 rounded-xl border border-amber/30 bg-amber/5 p-4 text-sm text-amber-100">Bozza da sottoporre a revisione legale prima del lancio commerciale. Non sostituisce un contratto con il cliente.</p>
    </LegalLayout>
  );
}
