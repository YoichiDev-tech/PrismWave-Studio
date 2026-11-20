import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Privacy() {
  return (
    <LegalLayout
      eyebrow="Dati e privacy"
      title="Informativa sulla privacy"
      updated="11 ottobre 2026"
      path="/privacy"
      description="Come PrismWave Studio raccoglie, utilizza, conserva e protegge i dati personali."
    >
      <p>
        La presente informativa descrive come PrismWave Studio tratta i dati personali quando visiti il sito, utilizzi l'analisi gratuita, richiedi un report o contatti lo studio. Deve essere letta insieme alle informazioni sui servizi e sulle tecnologie di tracciamento effettivamente attivi sul sito.
      </p>

      <LegalSection title="Chi è il titolare del trattamento">
        <p>
          PrismWave Studio è uno studio indipendente che si occupa di progettazione e sviluppo web ed è gestito dal proprio titolare. Il nome o la denominazione legale completa del titolare, l'indirizzo dell'attività, la giurisdizione di riferimento e gli eventuali dati di registrazione devono essere inseriti qui quando richiesto dalla normativa applicabile. Queste informazioni devono essere verificate e completate prima della pubblicazione definitiva.
        </p>
        <p>
          Per domande o richieste relative alla privacy, puoi contattare{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
        </p>
      </LegalSection>

      <LegalSection title="Dati che possiamo raccogliere">
        <p>
          A seconda di come utilizzi il sito, i dati trattati possono includere:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            I dati di contatto che invii, come nome, indirizzo email, nome dell'attività, indirizzo del sito web e messaggio.
          </li>
          <li>
            Le informazioni relative all'analisi, tra cui l'indirizzo del sito inviato, i punteggi generati, i risultati rilevati e le richieste di report.
          </li>
          <li>
            I dettagli del progetto, le preferenze sui servizi e le comunicazioni che scegli di inviarci.
          </li>
          <li>
            I dati relativi all'utilizzo del sito, come visualizzazioni di pagina, eventi legati alle analisi, eventi di conversione, informazioni sulla provenienza, parametri delle campagne e identificativi di sessione, quando tali strumenti sono attivi.
          </li>
          <li>
            Le informazioni tecniche che possono essere trattate dai servizi di hosting, sicurezza, posta elettronica o da strumenti di terze parti integrati, come dati sul browser e sulle richieste.
          </li>
        </ul>
        <p>
          Non inviare dati personali appartenenti a categorie particolari né informazioni relative ad altre persone, salvo che sia necessario e tu abbia il diritto di comunicarle.
        </p>
      </LegalSection>

      <LegalSection title="Finalità e basi giuridiche del trattamento">
        <p>
          Utilizziamo i dati per gestire e proteggere il sito, eseguire le analisi richieste, inviare i report, rispondere alle richieste, preparare proposte di progetto, fornire i servizi concordati, prevenire abusi e comprendere l'utilità dei nostri servizi.
        </p>
        <p>
          A seconda dell'attività, il trattamento può essere necessario per dare seguito a una tua richiesta prima della conclusione di un contratto, eseguire un contratto, adempiere a un obbligo di legge oppure perseguire un legittimo interesse, come garantire la sicurezza del sito e migliorare i servizi. Quando la normativa richiede il consenso, il trattamento si basa sul consenso e viene indicata una modalità per revocarlo.
        </p>
        <p>
          La base giuridica applicabile a ciascuna attività deve corrispondere al trattamento effettivamente svolto. Gli strumenti facoltativi di analisi, pubblicità o tracciamento non devono essere presentati come basati sul consenso se questo non viene validamente raccolto nei casi previsti.
        </p>
      </LegalSection>

      <LegalSection title="Dati inviati tramite l'analisi del sito">
        <p>
          Quando invii un indirizzo web, lo strumento lo elabora per eseguire controlli automatici e generare risultati. Se richiedi un report, l'indirizzo email e le informazioni associate alla richiesta possono essere conservati e utilizzati per inviarti il report e rispondere alla tua richiesta.
        </p>
        <p>
          Invia esclusivamente indirizzi web che sei autorizzato a comunicare. L'analisi è automatizzata e può essere incompleta o imprecisa. Non inviare password, indirizzi privati o materiale riservato.
        </p>
      </LegalSection>

      <LegalSection title="Fornitori di servizi e destinatari">
        <p>
          A seconda delle integrazioni effettivamente attive, il sito può utilizzare Vercel per l'hosting, Supabase per i servizi di database, Resend per l'invio delle email, Calendly per la gestione degli appuntamenti e Crisp per la chat. Questi fornitori possono trattare le informazioni necessarie a erogare i rispettivi servizi.
        </p>
        <p>
          L'elenco dei fornitori deve essere verificato rispetto alle integrazioni realmente attive nell'ambiente di produzione. I dati possono inoltre essere comunicati quando richiesto dalla legge o quando necessario per proteggere il sito, i suoi utenti o i nostri diritti.
        </p>
      </LegalSection>

      <LegalSection title="Cookie e tecnologie analoghe">
        <p>
          Il sito o le integrazioni di terze parti possono utilizzare cookie, archiviazione locale, archiviazione di sessione o tecnologie analoghe. I nomi, le finalità, i fornitori e la durata effettivi dipendono dalla configurazione pubblicata.
        </p>
        <p>
          Le tecnologie strettamente necessarie a fornire un servizio da te richiesto possono essere trattate diversamente dagli strumenti facoltativi di analisi, pubblicità o tracciamento tra siti. Quando la legge richiede un consenso preventivo, le tecnologie facoltative devono rimanere disattivate fino al rilascio del consenso. Devi poter rifiutare o revocare il consenso secondo quanto previsto dalla normativa.
        </p>
        <p>
          Questa sezione non sostituisce una verifica dei cookie e delle tecnologie effettivamente presenti sul sito pubblicato. Se necessario, dovranno essere aggiunti un inventario dei cookie e un meccanismo valido per raccogliere e gestire il consenso.
        </p>
      </LegalSection>

      <LegalSection title="Trasferimenti internazionali">
        <p>
          I nostri fornitori possono trattare informazioni in Paesi diversi da quello in cui risiedi o al di fuori dello Spazio economico europeo. Quando la normativa sulla protezione dei dati richiede garanzie per un trasferimento internazionale, tali garanzie devono essere adottate e le relative informazioni rese disponibili.
        </p>
        <p>
          La sede effettiva dei fornitori, le modalità di trasferimento e le garanzie adottate devono essere verificate in base ai servizi e alle configurazioni degli account utilizzati.
        </p>
      </LegalSection>

      <LegalSection title="Periodo di conservazione">
        <p>
          Conserviamo i dati personali solo per il tempo ragionevolmente necessario alle finalità per cui sono stati raccolti, tra cui rispondere alle richieste, fornire i servizi, mantenere le registrazioni aziendali obbligatorie, gestire eventuali controversie e proteggere il sito.
        </p>
        <p>
          Lo studio deve definire e applicare tempi di conservazione per report di analisi, eventi di interazione, contatti commerciali, corrispondenza email e registri tecnici. I dati devono essere cancellati o anonimizzati quando non sono più necessari, salvo obblighi di legge che ne impongano la conservazione.
        </p>
      </LegalSection>

      <LegalSection title="I tuoi diritti in materia di privacy">
        <p>
          Nei limiti previsti dalla normativa applicabile, puoi avere il diritto di chiedere l'accesso ai tuoi dati personali, la rettifica, la cancellazione, la limitazione del trattamento, la portabilità oppure opporti a determinati trattamenti. Se il trattamento si basa sul consenso, puoi revocarlo senza pregiudicare la liceità del trattamento effettuato prima della revoca.
        </p>
        <p>
          Per esercitare i tuoi diritti, scrivi a{" "}
          <a
            className="text-amber underline underline-offset-4"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>.
          Potresti inoltre avere il diritto di presentare un reclamo all'autorità di controllo competente.
        </p>
      </LegalSection>

      <LegalSection title="Sicurezza e servizi di terze parti">
        <p>
          Adottiamo misure ragionevoli per proteggere le informazioni, ma nessun sito o metodo di trasmissione può essere garantito come completamente sicuro. I servizi e i collegamenti esterni sono disciplinati dalle rispettive informative e pratiche in materia di privacy.
        </p>
      </LegalSection>

      <LegalSection title="Minori">
        <p>
          Questo sito e i relativi servizi sono destinati a persone interessate a servizi di progettazione e sviluppo web, analisi di siti o attività correlate. Lo studio non intende raccogliere consapevolmente dati personali di minori.
        </p>
      </LegalSection>

      <LegalSection title="Modifiche alla presente informativa">
        <p>
          La presente informativa può essere aggiornata in caso di modifiche ai servizi, alle modalità di trattamento dei dati o agli obblighi di legge. La data indicata in alto segnala l'ultimo aggiornamento della pagina.
        </p>
      </LegalSection>

      <LegalSection title="Contatti">
        <p>
          Per richieste e domande relative alla privacy:{" "}
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