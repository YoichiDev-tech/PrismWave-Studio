export const LINKS = {
  audit: '/#audit-tool',
  contact: '/#contact',
  packages: '/packages',
  services: '/services',
  reviews: '/reviews',
} as const;

export const SITE = 'https://prismwave-studio.vercel.app'; // swap to prismwavestudio.com once live

export type Tier = {
  id: string;
  step: string;
  name: string;
  outcome: string;
  forWho: string;
  scope: string[];
  deliverables: string[];
  cta: { label: string; to: string };
};

export const TIERS: Tier[] = [
  {
    id: 'audit',
    step: 'Inizia da qui',
    name: 'Analisi di velocità e SEO',
    outcome: 'Scopri quali problemi stanno riducendo le visite e le richieste di contatto.',
    forWho: 'Hai già un sito e sospetti che sia datato o lento da caricare sugli smartphone.',
    scope: [
      'Core Web Vitals e velocità di caricamento',
      'Titoli, descrizioni, anteprime social e metadati strutturati',
      'Layout e leggibilità su dispositivi mobili',
      'Accessibilità e leggibilità per motori di ricerca e sistemi di IA',
    ],
    deliverables: [
      'Punteggi iniziali che puoi verificare autonomamente',
      'I 2–3 problemi principali da risolvere, spiegati chiaramente',
      'Un elenco prioritario di interventi con ambito definito',
    ],
    cta: { label: "Richiedi un'analisi gratuita", to: LINKS.audit },
  },
  {
    id: 'modernise',
    step: 'Correggi o realizza',
    name: 'Modernizzazione dell’interfaccia e applicazioni web su misura',
    outcome: 'Un sito attuale, veloce e progettato per trasformare le visite in richieste di contatto.',
    forWho: 'Il tuo sito funziona ma ha un aspetto datato, oppure hai un’idea — un negozio, un’attività, un sito di classifiche o una startup — ma non hai ancora un sito.',
    scope: [
      'Riprogettazione o sviluppo da zero',
      'Interfaccia veloce, adattiva e accessibile',
      'Struttura e testi pensati per favorire le conversioni',
      'Pacchetti con ambito e tempistiche definiti',
    ],
    deliverables: [
      'Sito pubblicato e pronto per l’utilizzo',
      'Metriche di confronto rispetto ai risultati iniziali dell’analisi',
      'Consegna completa, senza vincoli',
    ],
    cta: { label: 'Scopri i pacchetti a prezzo definito', to: LINKS.packages },
  },
  {
    id: 'systems',
    step: 'Cresci',
    name: 'Sistemi aziendali su misura',
    outcome: 'Il tuo sito smette di essere una semplice vetrina e inizia a svolgere attività utili.',
    forWho: 'Gestisci manualmente prenotazioni, pagamenti o contatti e vuoi automatizzare queste attività.',
    scope: [
      'Integrazioni con database',
      'Gestione dei pagamenti',
      'Smistamento automatico dei contatti e notifiche',
      'Sistemi di prenotazione',
    ],
    deliverables: [
      'Sistema funzionante e collegato al tuo sito',
      'Documentazione sul funzionamento',
      'Ambito e preventivo definiti per ogni progetto, dopo un confronto',
    ],
    cta: { label: 'Raccontaci la tua idea', to: LINKS.contact },
  },
];

export const OLD_SITE_SIGNS = [
  'Il sito impiega più di un paio di secondi per apparire sullo smartphone',
  'I testi sono troppo piccoli o i pulsanti difficili da toccare su smartphone',
  'Quando condividi il link su WhatsApp o sui social non appare un’immagine di anteprima',
  'Non è chiaro in pochi secondi cosa fai o come contattarti',
  'Il sito è stato realizzato prima dei tuoi servizi o della tua identità visiva attuali',
  'Google mostra i concorrenti prima di trovare la tua attività',
];
