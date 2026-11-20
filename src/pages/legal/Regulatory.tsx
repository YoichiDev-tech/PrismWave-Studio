import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Regulatory() {
  return (
    <LegalLayout
      eyebrow="Trasparenza"
      title="Informazioni sull'attività"
      updated="11 ottobre 2026"
      path="/regulatory"
      description="Informazioni di contatto, ambito dei servizi e trasparenza per PrismWave Studio."
    >
      <p>
        Questa pagina contiene informazioni sull'attività e sui servizi di PrismWave Studio. Deve essere letta insieme all'Informativa sulla privacy e ai Termini di utilizzo.
      </p>

      <LegalSection title="Identità e contatti dell'attività">
        <p>
          Nome commerciale: PrismWave Studio.
        </p>
        <p>
          Attività: strategia, progettazione e sviluppo di siti web, analisi automatizzate e servizi digitali correlati.
        </p>
        <p>
          Contatti email:{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
        </p>
        <p>
          Il nome o la denominazione legale completa del titolare, l'indirizzo dell'attività, la giurisdizione di riferimento, il numero di registrazione e i dati fiscali o IVA devono essere inseriti quando richiesto dalla normativa applicabile. Il titolare deve verificare e completare queste informazioni prima che la pagina possa considerarsi definitiva.
        </p>
      </LegalSection>

      <LegalSection title="Servizi e accordi commerciali">
        <p>
          PrismWave Studio offre servizi digitali. L'ambito preciso, il prezzo, le tempistiche di consegna, le condizioni di pagamento, le revisioni e le responsabilità relative ai lavori a pagamento vengono confermati in un accordo di progetto scritto.
        </p>
        <p>
          I testi del sito, gli esempi, le stime e i prezzi di partenza non costituiscono un'offerta vincolante, salvo indicazione esplicita per iscritto.
        </p>
      </LegalSection>

      <LegalSection title="Limiti dell'analisi automatizzata">
        <p>
          L'analisi gratuita del sito utilizza controlli automatizzati e, quando disponibili, informazioni accessibili pubblicamente. I risultati possono essere incompleti e non costituiscono una garanzia di sicurezza, conformità in materia di accessibilità, prestazioni sui motori di ricerca, conformità legale o risultati commerciali.
        </p>
        <p>
          L'analisi non sostituisce una valutazione professionale quando questa è necessaria.
        </p>
      </LegalSection>

      <LegalSection title="Accessibilità e standard tecnici">
        <p>
          Nella realizzazione dei progetti, lo studio si impegna a considerare layout adattivi, struttura semantica, usabilità da tastiera e prestazioni. Nessuno specifico standard legale o tecnico è certificato, salvo che la relativa verifica e il relativo ambito siano espressamente concordati per iscritto.
        </p>
      </LegalSection>

      <LegalSection title="Servizi di terze parti">
        <p>
          Il sito può utilizzare fornitori di hosting, database, posta elettronica, gestione appuntamenti, analisi o chat. Ogni fornitore opera secondo le proprie condizioni e pratiche in materia di privacy. L'Informativa sulla privacy dello studio deve identificare i fornitori effettivamente attivi nell'ambiente di produzione.
        </p>
      </LegalSection>

      <LegalSection title="Normativa applicabile e diritti inderogabili">
        <p>
          La legge applicabile e le informazioni eventualmente richieste in materia di tutela dei consumatori, fiscalità, registrazione dell'attività, servizi online o risoluzione delle controversie dipendono dalla sede effettiva del titolare, dai servizi offerti e dai clienti serviti. Non viene indicato alcun Paese come giurisdizione applicabile finché tale informazione non sarà verificata.
        </p>
        <p>
          Nessuna informazione contenuta in questa pagina elimina i diritti inderogabili riconosciuti dalla normativa applicabile.
        </p>
      </LegalSection>

      <LegalSection title="Contatti">
        <p>
          Per domande sull'attività o sui servizi, contatta{" "}
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