// Central content for the Dielle Communication site.
// Boutique marketing agency — two founders, sartorial method, free-trial offer.
// Edit copy, services, method, work and contact details here.

export const site = {
  name: "Dielle Communication",
  // Kicker shown in the hero / header.
  tagline: "Boutique marketing agency · Napoli",
  // TODO: confermare l'indirizzo email ufficiale del brand.
  email: "ciao@diellecommunication.it",
  location: "Napoli · Campania · in remoto in tutta Italia",
  founders: "Dario De Sisto & Luisa Panariello",
};

// Href assoluti (con `/`) così la nav funziona anche dalle pagine interne
// (es. /blog/[slug]): porta alla home e poi scrolla alla sezione.
export const nav = [
  { label: "Metodo", href: "/#metodo" },
  { label: "Lavori", href: "/lavori" },
  { label: "Servizi", href: "/#servizi" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Blog", href: "/blog" },
  { label: "Contatti", href: "/#contatti" },
  // «Prova gratuita» non sta qui: nell'intestazione è un pulsante, non un
  // link di menu. Vedi `booking` più sotto e `site-header.tsx`.
];

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/diellecommunication/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/122214394/",
  },
  {
    label: "Dario De Sisto",
    href: "https://www.linkedin.com/in/dario-de-sisto/",
  },
];

// — Fascia di numeri sotto l'hero: trasforma la promessa in prova.
// TODO: confermare con Dario e Luisa. Sono dati già dichiarati altrove nel
// sito (bio dei fondatori, elenco clienti, posizionamento a numero chiuso):
// niente di inventato, ma vanno verificati prima di andare online.
export const stats = [
  { value: "10+", label: "anni di mestiere" },
  { value: "10", label: "brand seguiti" },
  { value: "2", label: "persone, sempre le stesse" },
  { value: "0", label: "pacchetti preconfezionati" },
];

// — The two visitor types the homepage has to speak to (Sezione Problema).
export const problems = [
  {
    tag: "«Non sono sicuro che serva»",
    body: "Pensi che il marketing sia una spesa, che i social siano tutti uguali, che le agenzie vendano solo fumo. È normale: di solito te l'hanno spiegato male.",
    points: [
      "Il marketing mi sembra inutile",
      "I social sono tutti uguali",
      "Le agenzie vendono solo fumo",
    ],
  },
  {
    tag: "«Ho già provato, ma niente»",
    body: "Hai investito, hai pagato servizi costosi, ma non vedi risultati, non capisci cosa non funziona e ti sei sentito poco seguito. Conosciamo bene questa storia.",
    points: [
      "Non ottengo risultati concreti",
      "Non capisco cosa non funziona",
      "Pago tanto e mi sento poco seguito",
    ],
  },
];

// — Sartorial method (Sezione Metodo).
export const method = [
  {
    n: "01",
    title: "Ti ascoltiamo",
    body: "Partiamo dalla tua attività, non dai nostri servizi. Capiamo chi sei, chi vuoi raggiungere e cosa ti rende diverso.",
  },
  {
    n: "02",
    title: "Costruiamo la strategia",
    body: "Decidiamo insieme dove andare e come. Niente pacchetti preconfezionati: un piano cucito sulla tua realtà.",
  },
  {
    n: "03",
    title: "Realizziamo gli strumenti",
    body: "Sito, contenuti, campagne, identità: tutto coerente, tutto al suo posto, tutto curato nel dettaglio.",
  },
  {
    n: "04",
    title: "Monitoriamo",
    body: "Guardiamo i numeri che contano davvero, non le metriche di vanità. Ti diciamo con chiarezza cosa funziona.",
  },
  {
    n: "05",
    title: "Evolviamo insieme",
    body: "La tua comunicazione cresce con la tua attività. Restiamo al tuo fianco, sempre con le stesse persone.",
  },
];

// — Founders (Sezione Chi Siamo / Studio).
// TODO: aggiungere le foto professionali in /public/team/ e impostare `photo`.
export type Founder = {
  name: string;
  role: string;
  quote: string;
  bio: string;
  initials: string;
  photo?: string;
};

export const founders: Founder[] = [
  {
    name: "Dario De Sisto",
    role: "Web · UX/UI · Creative Director",
    quote: "Costruisco il tuo sito come fosse l'ingresso della tua attività.",
    bio: "Oltre dieci anni di esperienza tra Napoli e Londra come web designer e digital strategist. Unisco l'occhio del designer alla testa dello stratega: ogni cosa che le persone vedono deve farle entrare.",
    initials: "DD",
  },
  {
    name: "Luisa Panariello",
    role: "Marketing & Communication",
    quote: "Trasformo la tua storia in contenuti che le persone vogliono seguire.",
    bio: "Specialista in branding, contenuti e comunicazione. Mi occupo della relazione con te e dello sviluppo strategico: trovo le parole giuste e le porto alle persone giuste.",
    initials: "LP",
  },
];

export const services = [
  {
    n: "01",
    title: "Siti web",
    accent: "& design",
    body: "Siti, restyling, e-commerce. Veloci, curati e pensati per convertire: un sito che lavora per te anche quando dormi.",
    tags: ["Web design", "UX / UI", "SEO"],
  },
  {
    n: "02",
    title: "Social",
    accent: "& contenuti",
    body: "Strategia, reel, storytelling e gestione dei canali. Contenuti che fanno fermare il pollice, non solo post da pubblicare.",
    tags: ["Strategia", "Reel", "Gestione social"],
  },
  {
    n: "03",
    title: "Content",
    accent: "& email",
    body: "Blog, newsletter ed email marketing. Costruiamo fiducia nel tempo e teniamo viva la relazione con i tuoi clienti.",
    tags: ["Blog", "Newsletter", "Email"],
  },
  {
    n: "04",
    title: "Advertising",
    accent: "& performance",
    body: "Campagne Meta e Google che portano clienti, non solo clic. Il messaggio giusto, alle persone giuste, al momento giusto.",
    tags: ["Meta Ads", "Google Ads", "Performance"],
  },
  {
    n: "05",
    title: "Branding",
    accent: "& identità",
    body: "Identità visiva, posizionamento e packaging. Un brand riconoscibile e memorabile, coerente su ogni supporto.",
    tags: ["Identità", "Positioning", "Packaging"],
  },
  {
    n: "06",
    title: "Reputazione",
    accent: "& presenza",
    body: "Recensioni, presenza online e autorevolezza. Quello che le persone trovano quando ti cercano fa la differenza.",
    tags: ["Recensioni", "Presenza", "Autorevolezza"],
  },
  {
    n: "07",
    title: "Community",
    accent: "& PR",
    body: "Community management, ufficio stampa e relazioni. Una community attiva intorno a te e le porte giuste che si aprono.",
    tags: ["Community", "Ufficio stampa", "Relazioni"],
  },
  {
    n: "08",
    title: "Analytics",
    accent: "& report",
    body: "Monitoraggio KPI, report chiari e ottimizzazione continua. Numeri leggibili per capire cosa funziona davvero.",
    tags: ["KPI", "Report", "Ottimizzazione"],
  },
];

// Portfolio diviso per categoria (come da brief). Ogni progetto spiega in parole
// semplici cos'è e a cosa è servito al brand. Aggiungi qui i nuovi lavori.
export const workCategories = [
  "Tutti",
  "Food & ristorazione",
  "Moda",
  "Edutainment",
  "Eventi",
  "Aziende",
] as const;

export type WorkCategory = (typeof workCategories)[number];

export type WorkItem = {
  slug: string;
  title: string;
  category: Exclude<WorkCategory, "Tutti">;
  year: string;
  image: string;
  alt: string;
  what: string; // cos'è (card in homepage)
  result: string; // a cosa è servito al brand (card in homepage)
  // — Dettaglio case study (pagina /lavori/[slug]) —
  client: string; // chi è il cliente, in una riga
  problem: string; // la situazione di partenza
  solution: string[]; // cosa abbiamo fatto, in concreto
  outcome: string[]; // i risultati (TODO: inserire numeri reali quando disponibili)
  services: string[]; // servizi coinvolti
};

export const work: WorkItem[] = [
  {
    slug: "namare",
    title: "Namare",
    category: "Food & ristorazione",
    year: "2025",
    image: "/work/namare.jpg",
    alt: "Scatto fotografico di prodotto realizzato per Namare",
    what: "Servizio fotografico e gestione dei contenuti social.",
    result:
      "Un'immagine del menù riconoscibile e desiderabile, con più salvataggi e prenotazioni dai social.",
    client: "Realtà della ristorazione che voleva farsi notare online.",
    problem:
      "Foto del menù scattate col telefono, poco appetitose, e una presenza social discontinua che non rispecchiava la qualità del locale.",
    solution: [
      "Servizio fotografico di prodotto con luce e stile coerenti col locale.",
      "Linea editoriale per i social, con un ritmo di pubblicazione sostenibile.",
      "Contenuti pensati per essere salvati e condivisi, non solo visti.",
    ],
    outcome: [
      "Un'identità visiva del menù riconoscibile a colpo d'occhio.",
      "Più salvataggi e condivisioni sui post di prodotto.",
      "Prenotazioni che arrivano direttamente dai canali social.",
    ],
    services: ["Fotografia", "Social Media", "Content"],
  },
  {
    slug: "ninjastickers",
    title: "Ninjastickers",
    category: "Aziende",
    year: "2025",
    image: "/social/ninjastickers/slide-1.png",
    alt: "Slide di un carosello social realizzato per Ninjastickers",
    what: "Linea di caroselli e contenuti social per un e-commerce di sticker.",
    result:
      "Un feed riconoscibile a colpo d'occhio, che ha trasformato i follower in clienti.",
    client: "E-commerce di sticker con un pubblico giovane e creativo.",
    problem:
      "Tanti prodotti, ma un feed disordinato: ogni post sembrava di un brand diverso e i follower non diventavano clienti.",
    solution: [
      "Format di caroselli riconoscibili, con regole chiare di colore e testo.",
      "Tono di voce coerente, diretto e in linea col pubblico.",
      "Contenuti che guidano dal post al prodotto, senza forzature.",
    ],
    outcome: [
      "Un feed coerente, riconoscibile già dalla miniatura.",
      "Più interazione e salvataggi sui caroselli.",
      "Un percorso chiaro dal social all'acquisto.",
    ],
    services: ["Social Media", "Content", "Branding"],
  },
  {
    slug: "insight-01",
    title: "Insight #01",
    category: "Edutainment",
    year: "2025",
    image: "/work/insight-content.png",
    alt: "Slide di un carosello editoriale per LinkedIn",
    what: "Carosello editoriale per LinkedIn che spiega un concetto di marketing.",
    result:
      "Contatti più qualificati, raggiunti spiegando le cose in modo semplice.",
    client: "Professionista che voleva costruire autorevolezza su LinkedIn.",
    problem:
      "Competenza alta, ma comunicata con paroloni: i post non arrivavano alle persone giuste e non generavano conversazioni.",
    solution: [
      "Una linea di caroselli che spiega un concetto alla volta, semplice.",
      "Struttura ricorrente: problema, esempio, cosa fare.",
      "Grafica sobria che mette il contenuto al centro.",
    ],
    outcome: [
      "Post leggibili anche da chi non è del settore.",
      "Più commenti e conversazioni reali.",
      "Contatti in arrivo più qualificati.",
    ],
    services: ["Content", "Social Media", "Branding"],
  },
  {
    slug: "brand-system",
    title: "Brand system",
    category: "Moda",
    year: "2025",
    image: "/work/insight-mint.png",
    alt: "Studio di palette e font per un sistema visivo",
    what: "Studio di palette, font e regole visive per un'identità coordinata.",
    result:
      "Una grammatica visiva coerente su ogni supporto, online e offline.",
    client: "Brand moda che cresceva senza una identità visiva definita.",
    problem:
      "Loghi, colori e font diversi a ogni occasione: il marchio non era riconoscibile e ogni materiale partiva da zero.",
    solution: [
      "Definizione di palette, tipografia e regole d'uso.",
      "Un piccolo sistema visivo riutilizzabile, semplice da seguire.",
      "Template per i materiali ricorrenti, online e stampa.",
    ],
    outcome: [
      "Un marchio riconoscibile su ogni supporto.",
      "Meno tempo perso a reinventare la grafica ogni volta.",
      "Una base solida su cui far crescere il brand.",
    ],
    services: ["Branding", "Siti web", "Content"],
  },
  {
    slug: "una-selezione",
    title: "Una selezione",
    category: "Aziende",
    year: "2025 — 2026",
    image: "/work/selezione.png",
    alt: "Cover del portfolio di Dielle Communication",
    what: "La cover del nostro portfolio: una selezione dei progetti recenti.",
    result:
      "Racconta in un colpo d'occhio il nostro modo di lavorare ai nuovi clienti.",
    client: "Dielle Communication — il nostro stesso portfolio.",
    problem:
      "Volevamo mostrare il nostro modo di lavorare senza un elenco freddo di servizi.",
    solution: [
      "Una selezione ragionata dei progetti più rappresentativi.",
      "Per ognuno: il problema di partenza e cosa è cambiato.",
      "Un racconto onesto, senza gonfiare i risultati.",
    ],
    outcome: [
      "Una presentazione che parla la lingua del cliente.",
      "Conversazioni che partono già dal progetto giusto.",
    ],
    services: ["Branding", "Content", "Siti web"],
  },
];

// — Testimonianze.
// TODO: le firme sono di persone vere, il testo delle citazioni no: è ancora
// quello editoriale scritto per il sito. Farlo confermare (o riscrivere) da
// Mariano Panariello e Angelo Arrichiello prima di andare online.
export type Testimonial = {
  // Una stringa sola, oppure più righe: sul desktop ogni voce va a capo per
  // conto suo, sugli schermi stretti il testo torna a scorrere di seguito.
  quote: string | string[];
  author: string;
  detail: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: [
      "Per la prima volta ho capito davvero cosa stavamo facendo e perché. Niente paroloni: risultati che vedo nel locale,",
      "ogni settimana.",
    ],
    author: "Mariano Panariello, proprietario",
    detail: "Ristorante San Pietro Bistrot del Mare · Torre del Greco (Napoli)",
  },
  {
    quote:
      "Parlo sempre con loro due, non con un call center diverso ogni volta. Si sente che il progetto è seguito da chi lo ha pensato.",
    author: "Chef Angelo Arrichiello, proprietario",
    detail: "Ristorante NAMARE · Portici (Napoli)",
  },
  {
    quote:
      "Avevo già speso senza vedere nulla. Qui prima mi hanno fatto provare, poi ho deciso. Oggi le prenotazioni arrivano dal sito.",
    author: "Mariano Panariello, proprietario",
    detail: "Ristorante San Pietro Bistrot del Mare · Torre del Greco (Napoli)",
  },
];

// — Prenotazione appuntamenti (Cal.com).
// Il pulsante «Richiedi la prova gratuita» porta qui, come fa leftclick.ai:
// il visitatore sceglie giorno e ora e prenota da solo, senza scrivere una
// mail e senza aspettare risposta.
//
// Il formato è https://cal.com/<nome-utente>/<tipo-di-evento>.
// `?source=website` serve solo a sapere, dentro Cal.com, che la prenotazione
// è arrivata dal sito e non da un link mandato a mano.
//
// ATTENZIONE: se su Cal.com cambia il nome utente o l'indirizzo dell'evento,
// **non resta un rimando** dal vecchio indirizzo. Questa riga va aggiornata
// nello stesso momento, o tutti e sei i pulsanti puntano nel vuoto. È già
// successo una volta: alla nascita l'account aveva un suffisso casuale.
export const booking = {
  url: "https://cal.com/dlcommunication/30min?source=website",
  label: "Richiedi la prova gratuita",
};

// — Periodo di prova gratuito (elemento distintivo).
export const trial = {
  steps: [
    {
      n: "01",
      title: "Ci conosciamo",
      body: "Una call senza impegno: ci racconti la tua attività, noi ti diciamo con sincerità se possiamo aiutarti.",
    },
    {
      n: "02",
      title: "Mettiamo le mani in pasta",
      body: "Per un periodo concordato lavoriamo davvero su qualcosa di concreto, così vedi come ci muoviamo.",
    },
    {
      n: "03",
      title: "Decidi tu",
      body: "Se ti convince, continuiamo insieme. Se no, ci sei costati solo qualche giorno. Nessun vincolo.",
    },
  ],
  reassurance: ["Nessun impegno", "Nessuna carta richiesta", "Pochi clienti per volta"],
};

// — Blog: articoli educativi.
// Ogni articolo ha un corpo strutturato in sezioni (titolo + paragrafi).
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  tag: string;
  date: string;
  read: string; // minuti di lettura
  href: string; // computed: /blog/[slug]
  intro: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "non-mi-serve-il-marketing",
    title: "«Non mi serve il marketing»: il più grande equivoco",
    excerpt:
      "Ne fai già, ogni volta che apri, rispondi a un cliente o impiatti un piatto. La domanda vera è soltanto se lo fai bene.",
    tag: "Strategia",
    date: "2026",
    read: "3 min",
    intro:
      "È la frase che sentiamo più spesso. E quasi sempre nasconde un equivoco: il marketing non è la pubblicità, è il modo in cui comunichi chi sei.",
    body: [
      {
        heading: "Lo fai già, anche se non lo chiami così",
        paragraphs: [
          "Quando scegli come si chiama il tuo locale, come rispondi al telefono, come impiatti un piatto o come accogli un cliente, stai comunicando. Stai facendo marketing. La domanda non è se farlo, ma se lo stai facendo con intenzione o per caso.",
          "Il problema di chi dice «non mi serve» di solito non è il marketing: è una brutta esperienza con chi gliel'ha venduto male, promettendo numeri e portando fumo.",
        ],
      },
      {
        heading: "Comunicare meglio, non gridare più forte",
        paragraphs: [
          "Il marketing serve a una cosa sola: far incontrare la tua offerta con le persone giuste. Non significa urlare di più o spendere in pubblicità a caso. Significa essere chiari su cosa fai, per chi, e perché dovrebbero scegliere te.",
          "Spesso basta sistemare le basi: un sito che si capisce, foto che fanno venire voglia, una presenza ordinata. Il resto viene dopo, e solo se serve.",
        ],
      },
      {
        heading: "Da dove partire",
        paragraphs: [
          "Parti da una domanda semplice: se una persona ti incontra oggi per la prima volta, capisce in pochi secondi cosa fai e perché ti conviene sceglierti? Se la risposta è no, è lì che c'è lavoro da fare.",
          "Non serve un piano enorme. Serve un primo passo fatto bene.",
        ],
      },
    ],
    href: "/blog/non-mi-serve-il-marketing",
  },
  {
    slug: "il-sito-e-l-anticamera-di-casa-tua",
    title: "Il sito è l'anticamera di casa tua",
    excerpt:
      "Come trasformare la prima interfaccia tra le persone e il tuo brand in un posto in cui hanno voglia di restare.",
    tag: "Web & UX",
    date: "2026",
    read: "4 min",
    intro:
      "Prima ancora di entrare nel tuo locale o di chiamarti, le persone passano dal tuo sito. È l'ingresso della tua attività: vale la pena curarlo come tale.",
    body: [
      {
        heading: "I primi secondi decidono tutto",
        paragraphs: [
          "Chi arriva sul tuo sito si fa un'idea di te in pochissimo tempo. Se è lento, confuso o anonimo, quell'idea parte male, e raramente si recupera.",
          "Un buon sito non deve essere pieno di effetti. Deve essere chiaro: chi sei, cosa offri, cosa fare adesso.",
        ],
      },
      {
        heading: "Tre cose che contano davvero",
        paragraphs: [
          "Velocità: ogni secondo di attesa è qualcuno che se ne va. Chiarezza: una persona deve capire al volo dove cliccare. Fiducia: foto vere, recensioni, contatti facili da trovare.",
          "Tutto il resto è secondario. Meglio poche cose fatte bene che tante mezze fatte.",
        ],
      },
      {
        heading: "Un posto in cui restare",
        paragraphs: [
          "Il sito non è una brochure da mettere online e dimenticare. È uno spazio vivo, che cresce con la tua attività. Lo costruiamo così: parte essenziale, poi evolve insieme a te.",
        ],
      },
    ],
    href: "/blog/il-sito-e-l-anticamera-di-casa-tua",
  },
  {
    slug: "contenuti-fedeli-al-brand-non-al-trend",
    title: "Contenuti fedeli al brand, non al trend",
    excerpt:
      "Rincorrere ogni trend stanca il pubblico e snatura il marchio. Come scegliere solo ciò che ha senso per te.",
    tag: "Contenuti",
    date: "2026",
    read: "3 min",
    intro:
      "Ogni settimana c'è un trend nuovo da cavalcare. Inseguirli tutti è il modo più veloce per stancare le persone e far sparire la tua voce.",
    body: [
      {
        heading: "Il trend passa, il brand resta",
        paragraphs: [
          "Un audio virale o un format del momento possono darti un picco di visualizzazioni. Ma se non c'entrano niente con te, il giorno dopo nessuno ricorda chi eri.",
          "La coerenza vale più della rincorsa. Le persone seguono chi riconoscono, non chi cambia faccia ogni settimana.",
        ],
      },
      {
        heading: "Come scegliere cosa fare",
        paragraphs: [
          "Prima di buttarti su un trend, fatti una domanda: questo parla di me, dei miei clienti, di quello che so fare? Se la risposta è sì, adattalo alla tua voce. Se è no, lascialo passare.",
          "Meglio pochi contenuti che ti somigliano, che tanti che potrebbero essere di chiunque.",
        ],
      },
      {
        heading: "La voce prima di tutto",
        paragraphs: [
          "Costruire una voce richiede tempo, ma è l'unica cosa che i competitor non possono copiarti. I trend sono di tutti; il tuo modo di raccontarti è solo tuo.",
        ],
      },
    ],
    href: "/blog/contenuti-fedeli-al-brand-non-al-trend",
  },
];

// — Lookup helper per le pagine dinamiche.
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getWork(slug: string): WorkItem | undefined {
  return work.find((w) => w.slug === slug);
}

// Clienti reali. Il nastro è cliccabile: ogni nome porta al sito del cliente.
// Le grafie sono prese dai siti stessi (logo o titolo), non a orecchio: il
// nastro non le mette più in maiuscolo, quindi le maiuscole interne contano.
//
// `href` può mancare: in quel caso il nome resta testo, senza mano e senza
// sottolineatura. NinjaStickers non ha un sito raggiungibile, quindi punta al
// suo caso studio qui dentro.
export type Client = { name: string; href?: string };

export const clients: Client[] = [
  { name: "Namare", href: "https://namare.it/" },
  { name: "San Pietro Bistrot del Mare", href: "https://www.sanpietrobistrot.it/" },
  { name: "Taverna 'e Mare", href: "https://tavernaemare.it/" },
  { name: "Tadàbook", href: "https://www.tadabook.it/" },
  { name: "Tadàplay", href: "https://tadaplay.it/" },
  { name: "Le Stelle", href: "https://lestellesrl.it/" },
  { name: "AdaTech", href: "https://www.ada-tech.it/" },
  { name: "BandoHub", href: "https://bandohub.it/" },
  { name: "Voice Concierge", href: "https://voiceconcierge.it/" },
  { name: "Parsec 3.26", href: "https://www.parsec326.it/" },
  { name: "CoffeeWorld", href: "https://www.coffeeworld.it/" },
  { name: "EverUp", href: "https://everup.co.uk/" },
  { name: "I Testa", href: "https://itesta.it/" },
  { name: "NinjaStickers", href: "/lavori/ninjastickers" },
];
