import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Privacy() {
  return (
    <LegalLayout eyebrow="Informativa" title="Informativa sulla privacy" updated="20 novembre 2026" path="/privacy" description="Informazioni sul trattamento dei dati personali inviati tramite il sito PrismWave Studio.">
      <p>Questa pagina è una bozza informativa da completare e verificare con un professionista qualificato prima di raccogliere dati in produzione. I dati identificativi del titolare e i tempi di conservazione devono essere confermati prima del lancio.</p>
      <LegalSection title="Titolare del trattamento">
        <p>Il servizio è presentato con il nome commerciale PrismWave Studio. Titolare del trattamento: <strong>[INSERIRE NOME E COGNOME O RAGIONE SOCIALE]</strong>.</p>
        <p>Sede e recapito del titolare: <strong>[INSERIRE INDIRIZZO COMPLETO E GIURISDIZIONE]</strong>.</p>
        <p>Per richieste relative alla privacy: <a className="text-amber underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>
      <LegalSection title="Dati trattati">
        <p>Quando invii una richiesta tramite il modulo, il sistema tratta nome, impresa, indirizzo email, eventuale telefono, comune, sito web e contenuto del messaggio. Il server registra inoltre un identificativo IP trasformato tramite hash e una porzione dell'user-agent per finalità di sicurezza e prevenzione degli abusi.</p>
        <p>Non inserire password, dati particolari o informazioni riservate nel modulo.</p>
      </LegalSection>
      <LegalSection title="Finalità e base giuridica">
        <p>I dati del modulo sono utilizzati per ricevere e gestire la richiesta, rispondere e svolgere le attività precontrattuali richieste dall'interessato. I dati tecnici sono utilizzati per proteggere il servizio e prevenire invii abusivi. La base giuridica applicabile deve essere verificata rispetto al caso concreto dal titolare e dal consulente privacy.</p>
        <p>Il modulo non iscrive l'utente a newsletter o comunicazioni promozionali. Eventuali comunicazioni marketing richiedono un processo separato e una base giuridica valida.</p>
      </LegalSection>
      <LegalSection title="Destinatari e fornitori">
        <p>I dati possono essere trattati dal fornitore di hosting dell'API, dal fornitore del database PostgreSQL e dal servizio email utilizzato per notificare internamente la ricezione della richiesta, se configurato. Prima del lancio devono essere inseriti i nomi effettivi dei fornitori, i relativi ruoli, i luoghi di trattamento e gli eventuali trasferimenti extra SEE.</p>
      </LegalSection>
      <LegalSection title="Conservazione">
        <p><strong>[DA DEFINIRE PRIMA DEL LANCIO]</strong> Il titolare deve stabilire e pubblicare tempi di conservazione distinti per richieste non convertite, rapporti contrattuali e log tecnici, quindi predisporre cancellazione o anonimizzazione coerente.</p>
      </LegalSection>
      <LegalSection title="Diritti dell'interessato">
        <p>Nei limiti e alle condizioni previste dalla normativa applicabile, puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione e, quando applicabile, portabilità dei dati. Puoi inoltre proporre reclamo all'autorità di controllo competente.</p>
        <p>Per esercitare i diritti, scrivi a <a className="text-amber underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
      </LegalSection>
      <LegalSection title="Aggiornamenti e verifica">
        <p>Questa informativa deve essere aggiornata dopo la verifica della configurazione effettiva, dei fornitori, dei tempi di conservazione, della sede del titolare e delle basi giuridiche. Non considerare questa bozza una certificazione di conformità.</p>
      </LegalSection>
    </LegalLayout>
  );
}
