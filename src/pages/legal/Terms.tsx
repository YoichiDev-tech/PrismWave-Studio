import LegalLayout, { LegalSection } from "./LegalLayout";

const CONTACT_EMAIL = "yoichi_dev@proton.me";

export default function Terms() {
  return (
    <LegalLayout
      eyebrow="Termini dello studio"
      title="Termini di utilizzo"
      updated="11 ottobre 2026"
      path="/terms"
      description="Terms for using the PrismWave Studio website, free audit tools, and web design and development services."
    >
      <p>
        Le presenti condizioni disciplinano l'accesso al sito PrismWave Studio e ai relativi strumenti. Utilizzando il sito, accetti di rispettare queste condizioni e la normativa applicabile. I diritti inderogabili riconosciuti dalla normativa a tutela dei consumatori o da altre disposizioni di legge non sono esclusi né limitati.
      </p>

      <LegalSection title="I servizi">
        <p>
          PrismWave Studio offre servizi di strategia, progettazione e sviluppo di siti web, analisi automatizzate e servizi digitali correlati. I servizi effettivamente disponibili possono variare nel tempo.
        </p>
        <p>
          Le descrizioni del sito, i lavori dimostrativi, i prezzi di partenza, le stime e le tempistiche hanno carattere informativo, salvo conferma esplicita in un accordo di progetto scritto.
        </p>
      </LegalSection>

      <LegalSection title="Progetti a pagamento e pagamenti">
        <p>
          Prima dell'avvio di un progetto a pagamento, lo studio e il cliente concordano per iscritto l'ambito del lavoro, i risultati da consegnare, il prezzo, le tempistiche, il piano dei pagamenti, le modalità di revisione, le rispettive responsabilità e gli eventuali costi di terze parti.
        </p>
        <p>
          Il lavoro inizia secondo quanto stabilito nell'accordo. Le modifiche all'ambito concordato possono comportare una revisione del prezzo o delle tempistiche. Eventuali cancellazioni, rimborsi, garanzie o rimedi sono disciplinati dall'accordo di progetto e dalla normativa applicabile.
        </p>
        <p>
          Nessuna disposizione delle presenti condizioni elimina diritti o rimedi inderogabili riconosciuti al cliente dalla legge applicabile alla transazione.
        </p>
      </LegalSection>

      <LegalSection title="Analisi gratuita del sito">
        <p>
          L'analisi gratuita esegue controlli automatici e indicativi sulla base dell'indirizzo inviato e dei contenuti o segnali accessibili allo strumento. I risultati possono essere incompleti, non aggiornati o imprecisi e devono essere verificati da una persona qualificata prima di prendere decisioni importanti.
        </p>
        <p>
          L'analisi non costituisce un test di penetrazione informatica, un parere legale, una certificazione di accessibilità, una garanzia SEO né una promessa di traffico, ricavi, posizionamento o risultati commerciali.
        </p>
        <p>
          L'analisi è gratuita, salvo diverso accordo scritto. Qualsiasi attività facoltativa a pagamento deve essere concordata separatamente prima dell'inizio.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilità nell'utilizzo dell'analisi">
        <p>
          Devi essere autorizzato a inviare l'indirizzo web e non puoi utilizzare l'analisi per interferire con altri servizi, aggirare controlli di accesso, inviare contenuti dannosi o svolgere attività illecite o abusive.
        </p>
        <p>
          Non inviare password, collegamenti ad accesso riservato, informazioni confidenziali o dati personali che non sei autorizzato a condividere. L'analisi potrebbe non funzionare con tutti i siti o tutte le configurazioni.
        </p>
      </LegalSection>

      <LegalSection title="Proprietà intellettuale e materiali consegnati">
        <p>
          Il sito, il marchio, i contenuti originali e gli strumenti dello studio appartengono allo studio o ai rispettivi titolari dei diritti, salvo diversa licenza o disposizione sulla proprietà. Non puoi copiare o ridistribuire materiale protetto, tranne nei casi consentiti dalla legge o da una licenza applicabile.
        </p>
        <p>
          La proprietà e i diritti di utilizzo dei materiali consegnati al cliente sono disciplinati dal relativo accordo scritto. Salvo diversa indicazione nell'accordo, software, caratteri tipografici, risorse di archivio, hosting, domini e materiali concessi in licenza da terze parti restano soggetti alle rispettive condizioni.
        </p>
        <p>
          Lo studio può mostrare nel proprio portfolio i lavori completati per i clienti solo quando l'accordo di progetto lo consente o il cliente ha autorizzato separatamente tale utilizzo.
        </p>
      </LegalSection>

      <LegalSection title="Servizi di terze parti">
        <p>
          Il sito può contenere collegamenti o integrazioni con servizi gestiti da terze parti. Tali servizi sono soggetti alle proprie condizioni, informative privacy, disponibilità e misure di sicurezza. Lo studio non controlla i servizi di terzi e non è responsabile del loro funzionamento autonomo.
        </p>
      </LegalSection>

      <LegalSection title="Disponibilità e modifiche">
        <p>
          Con l'evoluzione dello studio, possiamo aggiornare, sospendere o interrompere parti del sito o degli strumenti gratuiti. Ci impegniamo a mantenere il sito disponibile, ma non garantiamo un funzionamento continuo o privo di errori.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilità">
        <p>
          Nei limiti consentiti dalla legge applicabile, lo studio non è responsabile delle perdite derivanti dall'affidamento su risultati incompleti di analisi automatizzate, da interruzioni al di fuori del proprio ragionevole controllo o dall'uso improprio del sito da parte di un visitatore.
        </p>
        <p>
          Nessuna disposizione delle presenti condizioni esclude o limita responsabilità quando tale esclusione o limitazione è vietata dalla legge. Le condizioni di responsabilità relative a un progetto a pagamento devono essere concordate separatamente e verificate rispetto alla giurisdizione applicabile.
        </p>
      </LegalSection>

      <LegalSection title="Modifiche ai presenti termini">
        <p>
          Le presenti condizioni possono essere aggiornate in caso di modifiche al sito, ai servizi o agli obblighi normativi. La data indicata in alto segnala l'ultimo aggiornamento della pagina. Gli accordi specifici continuano a disciplinare i rispettivi progetti nei limiti in cui le loro disposizioni sono applicabili.
        </p>
      </LegalSection>

      <LegalSection title="Contatti">
        <p>
          Per domande sulle presenti condizioni, puoi scrivere a{" "}
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