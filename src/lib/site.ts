// Central content for the Dielle Communication site.
// Boutique marketing agency — two founders, sartorial method, free-trial offer.
// Edit copy, services, method, work and contact details here.

// L'indirizzo pubblico del sito. Sta in un punto solo: da qui lo leggono i
// link canonici, la mappa del sito, il file per i motori di ricerca, le
// anteprime social e i dati strutturati.
//
// **Non è scritto a mano, e c'è un motivo.** Il dominio vero
// `dlcommunication.it` è registrato su Aruba ma non è ancora collegato:
// scrivendolo qui, mappa e canonici indicherebbero pagine che non
// rispondono — cioè peggio di non averli. Scrivendo invece l'indirizzo di
// Vercel, il giorno del passaggio bisognerebbe ricordarsi di cambiarlo.
//
// Quindi lo chiediamo a Vercel: `VERCEL_PROJECT_PRODUCTION_URL` contiene il
// dominio di produzione del progetto. Oggi è `diellecommunication.vercel.app`;
// il giorno in cui `dlcommunication.it` viene aggiunto come dominio di
// produzione **diventa quello da solo**, senza toccare una riga.
//
// `NEXT_PUBLIC_SITE_URL` resta come scavalco manuale, se un giorno servisse.
// In sviluppo, dove non c'è nessuna delle due, si usa localhost.
const dominioVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : dominioVercel
    ? `https://${dominioVercel}`
    : "http://localhost:3000";

export const site = {
  name: "Dielle Communication",
  // Kicker shown in the hero / header.
  tagline: "Boutique marketing agency · Napoli",
  // La casella operativa del brand. Sta scritta qui e basta: intestazione,
  // sezione contatti e pagina /contatti la leggono da qui.
  email: "commercialedlcommunication@gmail.com",
  location: "Napoli · Campania · da remoto in tutta Italia",
  // Numero WhatsApp. `wa.me` vuole solo cifre, prefisso internazionale
  // compreso e senza il +; `display` è come va scritto a video.
  whatsapp: "393791300096",
  whatsappDisplay: "+39 379 130 0096",
  // Messaggio già scritto nella chat: chi arriva da qui non deve inventarsi
  // l'apertura, e a voi arriva l'informazione di dove vi ha trovati.
  whatsappMessage: "Ciao! Vi scrivo dal sito di Dielle Communication.",
  // I testi del riquadro che si apre cliccando il pulsante WhatsApp.
  whatsappPanel: {
    title: "WhatsApp",
    greeting: "Salve 👋",
    question: "Come possiamo aiutarti?",
    cta: "Parla con noi",
    // Sotto il pulsante, per dire con chi si sta parlando davvero.
    note: "Rispondiamo noi due, di persona. Di solito entro un giorno lavorativo.",
  },
  founders: "Dario De Sisto & Luisa Panariello",
};

// Href assoluti (con `/`) così la nav funziona anche dalle pagine interne
// (es. /blog/[slug]): porta alla home e poi scrolla alla sezione.
// Quattro voci, non sei, e l'ordine conta. Deciso da Dario dopo la ricerca
// sui concorrenti del 24 agosto 2026: fra le agenzie di Napoli e Salerno il
// campione si spacca in due — chi vende a volume tiene ventiquattro voci di
// menu, chi vende una relazione ne tiene sei o meno. Dielle sta nel secondo
// gruppo, e il menu deve dirlo.
//
// «Servizi» prima di «Lavori» perché chi arriva vuole prima sapere cosa
// facciamo e poi vedere se lo facciamo bene. «Metodo» e «Blog» sono usciti
// dalla barra e vivono nel footer: il primo si legge dopo essersi convinti,
// il secondo serve a chi ci conosce già.
export const nav = [
  { label: "Servizi", href: "/servizi" },
  { label: "Lavori", href: "/lavori" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "Contatti", href: "/contatti" },
  // «Prova gratuita» non sta qui: nell'intestazione è un pulsante, non un
  // link di menu. Vedi `booking` più sotto e `site-header.tsx`.
];

// I profili social, in un elenco solo: li leggono il pannello del menu, la
// pagina contatti e la colonna «Seguici» del footer. Aggiungerne uno qui lo fa
// comparire in tutti e tre i posti.
// `brand` marca i due profili dell'agenzia, distinguendoli da quelli personali
// dei fondatori: la conferma via email mostra solo questi due.
type Social = { label: string; href: string; brand?: boolean };

export const social: Social[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/diellecommunication/",
    brand: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/122214394/",
    brand: true,
  },
  {
    label: "Dario su LinkedIn",
    href: "https://www.linkedin.com/in/dario-de-sisto/",
  },
  {
    label: "Luisa su LinkedIn",
    href: "https://www.linkedin.com/in/luisa-panariello-4694461b9/",
  },
];

// — Fascia di numeri sotto l'hero: trasforma la promessa in prova.
// I 18 brand non sono una stima: sono esattamente le schede di `work` e i
// nomi del nastro. Se aggiungi o togli un lavoro, questo numero va rifatto,
// o la riga smentisce la pagina /lavori che sta due schermate più sotto.
// Gli altri tre restano da confermare con Dario e Luisa: sono dati già
// dichiarati altrove nel sito (bio dei fondatori, posizionamento a numero
// chiuso), niente di inventato, ma vanno verificati prima di andare online.
export const stats = [
  { value: "10+", label: "anni di esperienza multicanale" },
  { value: "18", label: "brand seguiti" },
  { value: "2", label: "referenti fissi" },
  { value: "0", label: "pacchetti preconfezionati" },
];

// — The two visitor types the homepage has to speak to (Sezione Problema).
//
// `body` e `points` fanno due mestieri diversi, e questo è il punto della
// sezione. Il corpo dice **come si sente** chi legge; i punti sono **le frasi
// che dice**. Prima facevano la stessa cosa — il corpo elencava le obiezioni
// e i punti le ripetevano una per riga — e Dario se n'è accorto: chi legge
// faceva lo stesso percorso due volte. Regola per i prossimi: se un punto si
// può ricavare leggendo il corpo, non è un punto, è un'eco.
//
// **Le due schede non hanno la stessa origine, ed è bene saperlo.** I punti
// della seconda sono frasi che Dario si sente dire in prima call, raccolte
// il 25 agosto 2026. Quelli della prima no: nessuno si presenta dicendo «non
// sono sicuro che serva», sono le obiezioni che il sito attribuisce allo
// scettico — le stesse a cui risponde l'articolo «Non mi serve il marketing».
// Se un giorno Dario e Luisa ne sentono una vera, sostituisce quella scritta.
//
// Una prova già fatta e da non rifare: le frasi verosimili inventate a
// tavolino («il passaparola mi è sempre bastato») sono state tolte lo stesso
// giorno. Verosimile non basta — questa sezione funziona se chi legge
// riconosce una cosa che ha pensato davvero.
export const problems = [
  {
    tag: "«Non sono sicuro che serva»",
    // Il corpo non elenca più le tre obiezioni qui sotto: dice perché è
    // normale pensarle, che è un'altra cosa.
    body: "Nessuno te l'ha mai spiegato bene, e le poche volte che ci hanno provato ti hanno venduto un pacchetto. Intanto il marketing lo fai già ogni giorno — quando scegli come accogli chi entra — solo, lo fai per caso invece che apposta.",
    points: [
      "Il marketing mi sembra inutile",
      "I social sono tutti uguali",
      "Le agenzie vendono solo fumo",
    ],
  },
  {
    tag: "«Ho già provato, ma niente»",
    body: "Hai già speso, e da fuori sembrava tutto in ordine: i contenuti uscivano, il piano c'era. Ma in cassa non è cambiato niente, e nessuno ti ha mai spiegato perché. Questa storia la conosciamo bene.",
    // Tutte frasi di Dario, con il suo permesso di mescolarle. L'ordine è
    // voluto: il prodotto che non ci somiglia, la spesa senza ritorno con la
    // rinuncia che ne segue, l'agenzia che non capisce, la relazione che non
    // c'è. Il secondo punto ne fonde due sue («ho pagato tanto e senza
    // risultati» + «tanto vale che me lo faccia da solo»), che lui dice
    // attaccate: la seconda metà è sempre legata alla non soddisfazione, mai
    // allo scetticismo, ed è per questo che non sta nella prima scheda.
    points: [
      "Cambiamo spesso, i post statici non ci rappresentano",
      // «Ho speso» e non «ho pagato», per non aprire due punti con la stessa
      // parola: il punto sui clienti che restano senza risposta comincia con
      // «Pago», ed è lì che quella parola serve.
      "Ho speso tanto e senza risultati: tanto vale che me lo faccia da solo",
      "Ho provato tante agenzie, nessuna ci ha capiti",
      // Le ultime due salgono di gravità: prima ignorano i tuoi clienti, poi
      // ignorano te. Non sono lo stesso punto detto due volte — la prima
      // costa incassi, la seconda fa cambiare agenzia.
      "Pago, ma nessuno risponde ai clienti",
      "Non mi sento seguito",
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
// Le foto stanno in /public/team/, già ritagliate quadrate: il riquadro è un
// quadrato e `object-cover` taglierebbe da solo, ma tagliando dal centro —
// meglio decidere il taglio a monte che scoprire una testa mozzata.
export type Founder = {
  name: string;
  role: string;
  quote: string;
  bio: string;
  initials: string;
  photo?: string;
};

export const founders: Founder[] = [
  // Luisa per prima, a sinistra: è lei la CEO.
  {
    name: "Luisa Panariello",
    role: "CEO · Marketing & Communication",
    quote: "Trasformo la tua storia in contenuti che le persone vogliono seguire.",
    bio: "Specialista in branding, contenuti e comunicazione. Mi occupo della relazione con te e dello sviluppo strategico: trovo le parole giuste e le porto alle persone giuste.",
    initials: "LP",
    photo: "/team/luisa.jpg",
  },
  {
    name: "Dario De Sisto",
    role: "Creative Director",
    // Prima la citazione diceva «costruisco il tuo sito»: riduttiva, e
    // smentita dalla pagina /lavori, dove metà dei progetti sono marchi,
    // packaging, insegne e illustrazioni. L'oggetto giusto è **l'immagine**,
    // e il sito è uno dei pezzi — che è anche il motivo per cui l'elenco sta
    // nella biografia sotto e non dentro la citazione: una frase che elenca
    // non si cita.
    quote: "Costruisco la tua immagine come fosse l'ingresso della tua attività.",
    bio: "Oltre dieci anni di esperienza tra Napoli e Londra come web designer e digital strategist. Il sito, il marchio, il packaging, le insegne: progetto tutto quello che le persone vedono di te, e ogni cosa che vedono deve farle entrare.",
    initials: "DD",
    photo: "/team/dario.jpg",
  },
];

// Gli otto servizi, e **da oggi hanno tutti e otto la loro pagina**: nessuna
// voce dell'elenco resta senza destinazione. Erano quattro fino al 25 agosto
// 2026, quando Dario ha fatto notare che «alcuni servizi non portano a
// nessuna pagina» — e un elenco in cui metà delle voci sono cliccabili e
// metà no sembra un sito rotto, non una scelta.
//
// Perché conta anche fuori dal sito: una pagina che parla di una cosa sola si
// posiziona su Google, un elenco di otto voci no. Otto pagine sono otto
// ricerche diverse su cui farsi trovare in Campania.
//
// Il campo che le accende è `page`: `generateStaticParams` genera la pagina
// da sé, la mappa del sito la raccoglie da sé. Se aggiungi un servizio,
// aggiungi anche `page`, o torna il problema di partenza.
//
// `slug` ce l'hanno tutti lo stesso: serve come chiave stabile.
type ServiceDetail = {
  // Una riga sotto il titolo, in apertura di pagina.
  lead: string;
  // A chi serve. Non promesse: situazioni riconoscibili.
  forWho: string[];
  // Cosa comprende davvero il lavoro.
  included: string[];
  // Cosa NON facciamo. È la parte che i concorrenti non scrivono mai, ed è
  // quella che fa fidare chi ci ha già provato senza risultati.
  notTitle: string;
  notBody: string;
  // Per il tag <title> e la descrizione nei risultati di Google. Portano il
  // luogo: è una ricerca locale, «a Napoli» la scrivono le persone.
  metaTitle: string;
  metaDescription: string;
};

export type Service = {
  n: string;
  slug: string;
  title: string;
  accent: string;
  body: string;
  tags: string[];
  page?: ServiceDetail;
};

export const services: Service[] = [
  {
    n: "01",
    slug: "siti-web",
    title: "Siti web",
    accent: "& design",
    body: "Siti, restyling, e-commerce. Veloci, curati e pensati per convertire: un sito che lavora per te anche quando dormi.",
    tags: ["Web design", "UX / UI", "SEO"],
    page: {
      lead: "Il sito è l'anticamera di casa tua: è il primo posto dove chi ti cerca decide se fidarsi. Lo costruiamo perché quella decisione vada come deve.",
      forWho: [
        "Non hai un sito, e chi ti cerca trova solo una pagina social.",
        "Il sito ce l'hai ma è fermo a qualche anno fa, o dal telefono si legge male.",
        "Le visite arrivano e poi non succede niente: nessuna chiamata, nessun messaggio.",
      ],
      included: [
        "Struttura e testi decisi insieme, partendo da chi deve leggerli.",
        "Disegno su misura: niente temi comprati e riempiti di contenuti.",
        "Sviluppo, messa online e dominio, con il sito veloce anche da telefono.",
        "Le basi per farsi trovare su Google: titoli, descrizioni, indirizzi delle pagine.",
        "E-commerce, quando il progetto lo chiede.",
        "Ti spieghiamo come aggiornarlo da solo, se vuoi farlo tu.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non consegniamo un sito e spariamo. E non prendiamo lavori in cui il sito serve solo «perché serve avere un sito»: se non sappiamo cosa deve farti ottenere, non sappiamo come costruirlo.",
      metaTitle: "Realizzazione siti web a Napoli",
      metaDescription: "Siti, restyling ed e-commerce curati su misura, a Napoli e in tutta Italia. Struttura, testi, disegno e messa online seguiti da noi due, di persona.",
    },
  },
  {
    n: "02",
    slug: "social",
    title: "Social",
    accent: "& contenuti",
    body: "Strategia, reel, storytelling e gestione dei canali. Contenuti che fanno fermare il pollice, non solo post da pubblicare.",
    tags: ["Strategia", "Reel", "Gestione social"],
    page: {
      lead: "Pubblicare non è comunicare. Prima decidiamo cosa hai da dire e a chi, poi costruiamo i contenuti che lo dicono.",
      forWho: [
        "Pubblichi quando ti ricordi, e i risultati vanno a periodi.",
        "I contenuti li fa qualcuno che non conosce la tua attività, e si vede.",
        "Hai i follower ma non i clienti.",
      ],
      included: [
        "Una linea editoriale scritta: di cosa parliamo, con che voce, ogni quanto.",
        "Riprese e fotografie fatte da noi, sul posto.",
        "Montaggio dei reel e dei video verticali.",
        "Grafiche e caroselli coerenti con la tua identità.",
        "Pubblicazione e risposte ai messaggi, se vuoi affidarcele.",
        "Un punto ogni mese su cosa ha funzionato e cosa no.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non compriamo follower e non rincorriamo i trend che non c'entrano niente con te. Un profilo con numeri gonfiati non ha mai portato un cliente a nessuno.",
      metaTitle: "Gestione social e contenuti a Napoli",
      metaDescription: "Strategia, riprese, reel e gestione dei canali social a Napoli e in tutta Italia. Contenuti costruiti sulla tua attività, non sul trend del momento.",
    },
  },
  {
    n: "03",
    slug: "content-email",
    title: "Content",
    accent: "& email",
    body: "Blog, newsletter ed email marketing. Costruiamo fiducia nel tempo e teniamo viva la relazione con i tuoi clienti.",
    tags: ["Blog", "Newsletter", "Email"],
    page: {
      lead: "Un cliente che ti ha già scelto costa meno di uno nuovo, e si perde in silenzio. Blog, newsletter ed email servono a tenere aperta la conversazione anche quando non sta comprando.",
      forWho: [
        "Hai una lista di contatti ferma da mesi e non sai da dove ripartire.",
        "Il sito non porta visite perché nessuno cerca le parole che ci hai scritto.",
        "Vendi bene ai clienti nuovi e non sai più niente di quelli vecchi.",
      ],
      included: [
        "Piano editoriale: di cosa si parla, ogni quanto, e perché a qualcuno dovrebbe interessare.",
        "Articoli scritti per rispondere alle domande che le persone digitano davvero.",
        "Newsletter periodica: struttura, testi e immagini, pronte da inviare.",
        "Email legate a quello che il cliente fa — il primo acquisto, il carrello lasciato a metà, il rientro dopo mesi.",
        "Gestione della lista: chi riceve cosa, e chi va lasciato in pace.",
        "Lettura dei risultati: aperture, clic, e cosa cambiamo il mese dopo.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non compriamo liste di indirizzi e non mandiamo la stessa email a tutti. Scrivere a chi non ti ha mai chiesto niente è il modo più rapido per finire nello spam e restarci.",
      metaTitle: "Content marketing, blog ed email marketing a Napoli",
      metaDescription: "Blog, newsletter ed email marketing a Napoli e in tutta Italia. Contenuti scritti per farsi trovare e per tenere viva la relazione con i tuoi clienti.",
    },
  },
  {
    n: "04",
    slug: "advertising",
    title: "Advertising",
    accent: "& performance",
    body: "Campagne Meta e Google che portano clienti, non solo clic. Il messaggio giusto, alle persone giuste, al momento giusto.",
    tags: ["Meta Ads", "Google Ads", "Performance"],
    page: {
      lead: "La pubblicità online funziona quando sai cosa stai comprando. Ti diciamo dove va ogni euro e cosa è tornato indietro.",
      forWho: [
        "Hai provato a sponsorizzare da solo e non hai capito se è servito.",
        "Qualcuno ti ha gestito le campagne senza mai spiegarti i numeri.",
        "Devi farti conoscere in fretta su una zona o su un servizio preciso.",
      ],
      included: [
        "Campagne su Meta (Facebook e Instagram) e su Google.",
        "Scrittura degli annunci e realizzazione delle grafiche e dei video.",
        "La pagina di atterraggio, quando serve: mandare traffico su un sito che non converte è buttare soldi.",
        "Impostazione delle conversioni, per sapere davvero cosa arriva.",
        "Controllo e correzione mentre la campagna gira.",
        "Un report leggibile: quanto speso, quanti contatti, quanto è costato ognuno.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non promettiamo un numero di clienti prima di aver visto i tuoi dati: chi lo fa sta tirando a indovinare. E non ti mandiamo report pieni di metriche che sembrano buone e non vogliono dire niente.",
      metaTitle: "Campagne Meta e Google Ads a Napoli",
      metaDescription: "Pubblicità su Facebook, Instagram e Google gestita di persona, a Napoli e in tutta Italia. Annunci, pagine di atterraggio e report leggibili.",
    },
  },
  {
    n: "05",
    slug: "branding",
    title: "Branding",
    accent: "& identità",
    body: "Identità visiva, posizionamento e packaging. Un brand riconoscibile e memorabile, coerente su ogni supporto.",
    tags: ["Identità", "Positioning", "Packaging"],
    page: {
      lead: "Il marchio non è il logo. È quello che resta in testa alle persone quando non ci sei: costruirlo vuol dire decidere cosa vuoi che resti.",
      forWho: [
        "Stai partendo e devi darti un nome, un marchio e una voce.",
        "Sei cambiato negli anni e l'immagine è rimasta indietro.",
        "Ogni cosa che pubblichi sembra fatta da un'azienda diversa.",
      ],
      included: [
        "Posizionamento: cosa siete, per chi, e cosa vi distingue da chi vi sta accanto.",
        "Marchio e sue varianti, nei formati che servono davvero.",
        "Colori, caratteri e regole d'uso, scritte in un documento che resta a te.",
        "Applicazioni: biglietti, insegne, menu, divise, quello che serve al tuo mestiere.",
        "Packaging e etichette, dal disegno al file per la stampa.",
        "Illustrazioni originali, quando servono a distinguerti.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non ti diamo un logo e basta. Un marchio senza le regole per usarlo torna a essere disordine dopo tre mesi, e il lavoro è da rifare.",
      metaTitle: "Branding e identità visiva a Napoli",
      metaDescription: "Posizionamento, marchio, packaging e identità visiva a Napoli e in tutta Italia. Un brand coerente su ogni supporto, con le regole per usarlo.",
    },
  },
  {
    n: "06",
    slug: "reputazione",
    title: "Reputazione",
    accent: "& presenza",
    body: "Recensioni, presenza online e autorevolezza. Quello che le persone trovano quando ti cercano fa la differenza.",
    tags: ["Recensioni", "Presenza", "Autorevolezza"],
    page: {
      lead: "Prima di entrare, le persone ti cercano. Quello che trovano — la scheda su Google, le recensioni, le prime tre righe — decide se entrano davvero.",
      forWho: [
        "Su Google non compari, o compari con informazioni sbagliate.",
        "Hai poche recensioni, e le due che hai sono negative.",
        "Chi cerca il tuo nome trova prima i concorrenti.",
      ],
      included: [
        "Scheda Google dell'attività: apertura, verifica, foto, orari e categorie corrette.",
        "Un modo semplice per chiedere recensioni ai clienti, senza metterli a disagio.",
        "Risposte alle recensioni, anche a quelle brutte — soprattutto a quelle.",
        "Controllo di come compari altrove: mappe, portali di settore, social.",
        "Le informazioni allineate ovunque: stesso nome, stesso indirizzo, stesso numero.",
        "Sorveglianza nel tempo, perché una scheda si sporca da sola.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non compriamo recensioni e non ne scriviamo di finte. Si riconoscono, Google le rimuove, e quando un cliente se ne accorge il danno è peggiore del problema di partenza.",
      metaTitle: "Reputazione online e recensioni a Napoli",
      metaDescription: "Scheda Google, recensioni e presenza online per attività a Napoli e in Campania. Ti facciamo trovare con le informazioni giuste, e con le risposte giuste.",
    },
  },
  {
    n: "07",
    slug: "community-pr",
    title: "Community",
    accent: "& PR",
    body: "Community management, ufficio stampa e relazioni. Una community attiva intorno a te e le porte giuste che si aprono.",
    tags: ["Community", "Ufficio stampa", "Relazioni"],
    page: {
      lead: "Una community non è il numero di chi ti segue: è quante persone rispondono quando scrivi. E le porte, quasi sempre, le apre qualcuno che ti conosce già.",
      forWho: [
        "Pubblichi e non risponde nessuno.",
        "I messaggi dei clienti restano lì per giorni.",
        "Hai qualcosa da raccontare e non sai a chi mandarlo.",
      ],
      included: [
        "Gestione quotidiana di commenti e messaggi, con un tono che è il tuo.",
        "Regole di risposta condivise, per i casi normali e per quelli difficili.",
        "Collaborazioni con persone e attività che parlano al tuo stesso pubblico.",
        "Comunicati e cartelle stampa, scritti per essere pubblicati e non cestinati.",
        "Rapporti con testate e redazioni del territorio.",
        "Eventi: cosa si racconta prima, durante e dopo.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non compriamo follower e non paghiamo per uscire su siti che non legge nessuno. Un numero grande davanti a una sala vuota non ha mai fatto entrare un cliente.",
      metaTitle: "Community management e ufficio stampa a Napoli",
      metaDescription: "Gestione della community, relazioni e ufficio stampa a Napoli e in Campania. Persone che rispondono davvero, e le porte giuste che si aprono.",
    },
  },
  {
    n: "08",
    slug: "analytics",
    title: "Analytics",
    accent: "& report",
    body: "Monitoraggio KPI, report chiari e ottimizzazione continua. Numeri leggibili per capire cosa funziona davvero.",
    tags: ["KPI", "Report", "Ottimizzazione"],
    page: {
      lead: "I numeri servono a decidere, non a riempire un documento. Ti diciamo cosa guardiamo, perché lo guardiamo, e cosa cambiamo di conseguenza.",
      forWho: [
        "Ricevi report che non capisci e che non ti servono a niente.",
        "Non sai quale canale ti porta clienti e quale solo visite.",
        "Spendi in pubblicità e non sai cosa è tornato indietro.",
      ],
      included: [
        "Misurazione installata sul sito a norma, e dichiarata nella privacy policy.",
        "Pochi indicatori scelti sulla tua attività, non tutti quelli disponibili.",
        "Un cruscotto che si legge in un minuto.",
        "Report periodico con tre cose: cosa è successo, perché, cosa facciamo il mese prossimo.",
        "Prove a confronto, per capire quale versione funziona meglio.",
        "Revisione dei canali: dove conviene continuare e dove conviene smettere.",
      ],
      notTitle: "Cosa non facciamo",
      notBody: "Non mandiamo report di quaranta pagine per far vedere che abbiamo lavorato. Se un numero non cambia una decisione, non lo scriviamo.",
      metaTitle: "Analytics, KPI e report per il marketing a Napoli",
      metaDescription: "Misurazione, indicatori e report leggibili per attività a Napoli e in tutta Italia. Numeri che servono a decidere, non a riempire un documento.",
    },
  },
];

// Le quattro che hanno una pagina propria. La pagina `/servizi/[slug]` le
// genera da qui: non c'è un elenco di indirizzi scritto a mano da tenere
// allineato.
export const servicesWithPage = services.filter(
  (s): s is Service & { page: ServiceDetail } => Boolean(s.page),
);

// Portfolio diviso per categoria (come da brief). Ogni progetto spiega in parole
// semplici cos'è e a cosa è servito al brand. Aggiungi qui i nuovi lavori.
// Le categorie servono al filtro della sezione in home. Rifatte il 24 agosto
// 2026 sui lavori veri: prima erano generiche («Moda», «Eventi») e alcune non
// avevano nemmeno un progetto dentro.
export const workCategories = [
  "Tutti",
  "Food & ristorazione",
  "Retail & e-commerce",
  "Prodotto & educazione",
  "Tecnologia & servizi",
  "Territorio & benessere",
] as const;

export type WorkCategory = (typeof workCategories)[number];

// ————————————————————————————————————————————————————————————————
// I lavori
// ————————————————————————————————————————————————————————————————
//
// **Due livelli, ed è una scelta.** Deciso il 24 agosto 2026 dopo una ricerca
// su nove agenzie: chi vende a volume accumula pagine di progetto (Kynetic 40,
// AT ADV 20), chi vende una relazione ne mostra cinque o sei (Instrument 6,
// leftclick 5). La pagina lavori di leftclick.ai — che dalla home non è
// nemmeno collegata — è **cinque clienti con una riga a testa**, e le righe
// dicono com'è finita, non cosa hanno fatto.
//
// Livello 1: **tutti** i clienti, con `summary` — una riga sola. Aggiungere un
// cliente costa una riga, non una scheda: è per questo che prima erano fermi
// a cinque.
//
// Livello 2: **`study`**, solo dove c'è una storia da raccontare. Chi ce l'ha
// prende una pagina propria; gli altri restano nell'elenco.
// `generateStaticParams` genera le pagine solo per chi ha `study`.
//
// **Cosa è stato tolto**: «Insight #01» e «Brand system» erano schede senza
// nome del cliente («un professionista che…», «un brand moda che…») e senza un
// nome non fanno da prova a niente; «Una selezione» era la copertina del
// portfolio di Dielle, cioè l'agenzia che presentava sé stessa fra i lavori
// fatti per altri. Tolte su richiesta di Dario.
//
// **Come sono attribuiti.** Molti di questi progetti sono precedenti alla
// nascita della società (29 luglio 2025) e alcuni sono stati fatti a Londra
// dentro le aziende committenti. Per questo il sito dice ovunque «Dario e
// Luisa hanno lavorato con», non «i progetti dell'agenzia»: è la stessa
// formula del nastro dei clienti, ed è quella corretta. Non cambiarla.
export type WorkItem = {
  slug: string;
  title: string;
  category: Exclude<WorkCategory, "Tutti">;
  year: string;
  // Il sito del cliente. Usato dalla pagina del caso studio.
  href?: string;
  // Come chiamare quel link. Se manca, si usa **il dominio** — che è quello
  // che fanno gli studi presi a riferimento: Instrument scrive «Visit
  // OuraRing.com», Locomotive scrive «ageofunion.com». Dire dove si va è più
  // utile che dire «vedi il sito», e chi naviga con un lettore di schermo
  // sente la destinazione invece di una formula.
  //
  // Serve solo quando il link **non** è il sito del cliente: NinjaStickers
  // non ha un sito raggiungibile e punta al portfolio di Dario.
  hrefLabel?: string;
  // **La riga sotto il nome nella griglia.** Deve dire *com'è finita*, non
  // cosa abbiamo consegnato: è la differenza fra «Rebranding, social, email
  // marketing e ufficio stampa» — un elenco della spesa — e «Da un'immagine
  // che non raccontava la cucina a una comunicazione che va avanti tutto
  // l'anno». Sul riferimento le righe sono tutte così: «Regional PPC shop to
  // $2M/yr revenue». Corta: sulla scheda ne stanno due righe.
  outcome: string;
  services: string[];
  image?: string;
  alt?: string;
  // Livello 2 — la pagina propria. La struttura è quella di
  // `leftclick.ai/case-studies/<slug>`, indicata da Dario:
  // frase di apertura · pillole dei servizi · nome · sottotitolo ·
  // **Risultati** · Il problema · Cosa abbiamo fatto.
  //
  // **I risultati stanno prima del problema, ed è voluto.** Sul riferimento è
  // così: chi apre la pagina vuole sapere com'è andata, non ascoltare la
  // premessa. Non rimetterli in fondo «perché è più logico».
  study?: {
    // Tutta la storia in una frase: da dove si partiva, dove si è arrivati,
    // facendo cosa.
    lead: string;
    // Una riga di inquadramento: che tipo di cliente è e da quando.
    // Facoltativa: dove manca, sotto il nome non compare niente. Su
    // CoffeeWorld è stata tolta per scelta di Dario.
    subtitle?: string;
    outcomes: string[];
    challenge: string;
    solution: string[];
  };
};

export const work: WorkItem[] = [
  // **L'ordine è editoriale, deciso da Dario il 24 agosto 2026, e non è
  // alfabetico né cronologico né per categoria.** Apre la ristorazione, che
  // è il mercato su cui Dielle vuole crescere; seguono i progetti di
  // prodotto, poi quelli tecnologici, e chiudono i lavori di territorio.
  // La griglia legge questo elenco così com'è: per spostare una scheda si
  // sposta la sua voce qui, non si aggiunge un campo «posizione».

  {
    slug: "san-pietro-bistrot",
    title: "San Pietro Bistrot del Mare ristorante",
    category: "Food & ristorazione",
    year: "2022 — 2026",
    href: "https://www.sanpietrobistrot.it/",
    outcome:
      "Da 9.500 a 38.700 follower su Instagram in quattro anni, e TikTok aperto da zero e portato quasi a 5.000.",
    services: [
      "Branding",
      "Social",
      "Fotografia e video",
      "Advertising",
      "Siti web",
      "Email marketing",
      "Packaging",
      "Ufficio stampa",
    ],
    image: "/work/san-pietro-bistrot.jpg",
    alt: "Preparazione del pesce in cucina al San Pietro Bistrot del Mare",
    study: {
      lead:
        "Seguiamo il San Pietro Bistrot del Mare da quattro anni, ristorante vista mare a Torre del Greco. In questo tempo il profilo Instagram è passato da circa 9.500 a 38.700 follower, e il profilo TikTok, aperto da zero, è arrivato quasi a 5.000.",
      subtitle: "Ristorante vista mare · Torre del Greco, Napoli · seguito dal 2022",
      outcomes: [
        "38.700 follower su Instagram, partendo da circa 9.500 quattro anni fa.",
        "Un profilo TikTok aperto da zero e portato quasi a 5.000 follower.",
        "Un sito rifatto interamente da zero, non un restyling di quello precedente.",
        "Una produzione costante di post, reel e video, distribuita su tre canali.",
        "Campagne Meta gestite insieme ai contenuti, e non affidate a un fornitore diverso.",
        "Didascalie scritte per essere trovate dalle ricerche, non soltanto lette da chi già segue.",
        "Materiali e packaging sempre pronti, anche per eventi e fiere.",
      ],
      challenge:
        "Un ristorante affacciato sul mare, con una reputazione costruita in sala e una presenza online che non la rifletteva: un sito da rifare per intero, un profilo Instagram con margini inespressi, nessuna presenza su TikTok e materiali prodotti separatamente gli uni dagli altri.",
      solution: [
        "Abbiamo rifatto il sito interamente da zero.",
        "Abbiamo rivisto l'identità del locale e l'abbiamo applicata a tutti i supporti.",
        "Gestiamo le pagine Instagram, TikTok e Facebook con un'unica linea editoriale.",
        "Abbiamo aperto il profilo TikTok e ne seguiamo la crescita.",
        "Curiamo la produzione fotografica e video: post, reel e contenuti destinati alle campagne.",
        "Scriviamo le didascalie in ottica di ricerca, perché i contenuti vengano trovati e non solo scorsi.",
        "Impostiamo e seguiamo le campagne a pagamento su Meta.",
        "Curiamo l'email marketing e il blog aziendale.",
        "Progettiamo il packaging, compreso quello dedicato agli eventi.",
        "Realizziamo le produzioni fotografiche in esterna in occasione di eventi e fiere.",
        "Teniamo aggiornato il menù e curiamo i rapporti con la stampa.",
      ],
    },
  },
  {
    slug: "namare",
    title: "Namare ristorante",
    category: "Food & ristorazione",
    year: "2026",
    href: "https://namare.it/",
    // La riga porta i numeri, ed è l'unica del sito che può farlo: sono dati
    // dati da Dario, non stime. Se un giorno cambiano, si cambiano qui e
    // nella sezione «Risultati» — sono scritti in due posti perché fanno due
    // mestieri diversi: qui attirano, là dimostrano.
    outcome:
      "Quasi 2.000 follower in più su Instagram in quattro mesi, e un reel da 26.200 visualizzazioni.",
    services: [
      "Branding",
      "Social",
      "Fotografia e video",
      "Advertising",
      "Siti web",
      "Email marketing",
      "Packaging",
      "Ufficio stampa",
    ],
    image: "/work/namare.jpg",
    alt: "Il marchio Namare — Tradizione contemporanea",
    study: {
      // L'apertura racconta, non elenca: i servizi stanno già nelle pillole
      // qui accanto, ripeterli qui è dirlo due volte nella stessa schermata.
      lead:
        "Da aprile 2026 seguiamo l'intera comunicazione di Namare, ristorante di mare a Portici. In quattro mesi il profilo Instagram è arrivato a 9.486 follower, quasi duemila in più, e un reel ha superato le 26.000 visualizzazioni.",
      subtitle: "Ristorante di mare · Portici, Napoli · seguito da aprile 2026",
      outcomes: [
        "9.486 follower su Instagram, quasi 2.000 in più da quando seguiamo il profilo.",
        "Un reel a 26.200 visualizzazioni.",
        "Una produzione costante di post, reel e video, al posto di contenuti occasionali.",
        "Presenza coordinata su tre canali — Instagram, TikTok e Facebook — con un'unica linea editoriale.",
        "Campagne Meta gestite insieme ai contenuti, e non affidate a un fornitore diverso.",
        "Didascalie scritte per essere trovate dalle ricerche, non soltanto lette da chi già segue.",
        "Un sito nuovo, e materiali sempre pronti per eventi e fiere.",
      ],
      challenge:
        "Un ristorante con una proposta di livello e una comunicazione da coordinare: identità da rivedere, canali social da presidiare con continuità, un sito da rifare, campagne da impostare e materiali che fino a quel momento nascevano separati gli uni dagli altri.",
      solution: [
        "Abbiamo rivisto l'identità del locale e l'abbiamo applicata a tutti i supporti.",
        "Gestiamo le pagine Instagram, TikTok e Facebook con un'unica linea editoriale.",
        "Curiamo la produzione fotografica e video: post, reel e contenuti destinati alle campagne.",
        "Scriviamo le didascalie in ottica di ricerca, perché i contenuti vengano trovati e non solo scorsi.",
        "Impostiamo e seguiamo le campagne a pagamento su Meta.",
        "Abbiamo realizzato il nuovo sito e ne curiamo la gestione.",
        "Curiamo l'email marketing e il blog aziendale.",
        "Progettiamo il packaging, compreso quello dedicato agli eventi.",
        "Realizziamo le produzioni fotografiche in esterna in occasione di eventi e fiere.",
        "Teniamo aggiornato il menù e curiamo i rapporti con la stampa.",
      ],
    },
  },
  {
    slug: "central-padel",
    title: "Central Padel Boscoreale",
    category: "Territorio & benessere",
    year: "2024 — 2026",
    href: "https://www.centralpadel.it/",
    outcome:
      "Un circolo nato con marchio, sito e prenotazione dei campi — e la cartellonistica che è ancora oggi sui campi.",
    services: [
      "Branding",
      "Illustrazione",
      "Siti web",
      "E-commerce",
      "Fotografia",
      "Stampa",
      "Email marketing",
      "Sviluppo",
      "Manutenzione",
    ],
    image: "/work/central-padel.jpg",
    alt: "Il marchio Central Padel Boscoreale",
    study: {
      // L'app e la dashboard sono **in costruzione**, e va scritto così: un
      // lavoro in corso raccontato al passato è una promessa che il cliente
      // può smentire aprendo il sito.
      lead:
        "Central Padel è nato a Boscoreale, e c'eravamo dal primo giorno: marchio, identità, sito con la prenotazione dei campi, e tutta la cartellonistica dell'inaugurazione — che è ancora quella installata sui campi oggi. Da allora seguiamo il sito ogni giorno, gestiamo le prenotazioni delle partite e stiamo costruendo l'app che permetterà ai giocatori di registrarsi e al circolo di incassare.",
      subtitle:
        "Circolo di padel · Via Andreulli, Boscoreale (NA) · seguito dal 2024",
      outcomes: [
        "Un marchio illustrato da zero, con palette e caratteri definiti.",
        "Un sito che permette di prenotare e pagare il campo, costruito su WooCommerce.",
        "La cartellonistica dell'inaugurazione, ancora oggi installata sui campi da gioco.",
        "Flyer, biglietti da visita, fidelity card, cavalieri e banner.",
        "Un servizio fotografico dedicato: sul sito ci sono i campi veri, non immagini d'archivio.",
        "Le prenotazioni e le partite gestite da noi ogni giorno — non soltanto il sito.",
        "Un flusso di email marketing attivo verso i giocatori.",
        "Un'app con la sua dashboard, in costruzione con strumenti di intelligenza artificiale: registrazione dei giocatori da un lato, gestione degli incassi dall'altro.",
      ],
      challenge:
        "Un circolo che apriva a una data non rinviabile e non aveva niente: né identità visiva, né sito, né un modo per farsi prenotare un campo, né un solo materiale da mostrare il giorno dell'inaugurazione. E subito dopo l'apertura un problema di natura diversa: prenotazioni e pagamenti dei campi non si impostano una volta sola, si gestiscono tutti i giorni.",
      solution: [
        "Abbiamo realizzato illustrazioni e marchio, e definito palette e caratteri.",
        "Abbiamo costruito il sito su WordPress con Elementor Pro e WooCommerce, responsive su telefono e tablet, con la prenotazione dei campi.",
        "Abbiamo progettato e prodotto tutta la cartellonistica dell'inaugurazione, quella ancora installata sui campi.",
        "Abbiamo realizzato flyer, biglietti da visita, fidelity card, cavalieri e banner.",
        "Abbiamo curato il servizio fotografico e applicato gli scatti al sito.",
        "Luisa cura l'ottimizzazione dei testi per la ricerca.",
        "Gestiamo ogni giorno gli acquisti dei campi e le partite.",
        "Abbiamo costruito un flusso di email marketing verso i giocatori.",
        "Stiamo sviluppando con strumenti di intelligenza artificiale l'app e la dashboard per la registrazione dei giocatori e la gestione dei pagamenti.",
        "Presidiamo il sito ogni giorno: aggiornamenti, miglioramenti e manutenzione.",
      ],
    },
  },
  {
    slug: "tadaplay",
    title: "Tadàplay giochi educativi",
    category: "Prodotto & educazione",
    year: "2022 — 2026",
    // Punta allo shop e non alla home: è la parte del sito che mostra il
    // lavoro, perché lì ci sono i giochi che abbiamo disegnato noi.
    href: "https://tadaplay.it/acquista-i-giochi-tadaplay-shop/",
    outcome:
      "Non solo il marchio: abbiamo disegnato anche i giochi, e li abbiamo portati in vendita online, nei negozi e nelle scuole.",
    services: [
      "Illustrazione",
      "Branding",
      "Packaging",
      "Siti web",
      "E-commerce",
      "Advertising",
      "Social",
      "SEO",
      "Manutenzione",
    ],
    image: "/work/tadaplay.jpg",
    alt: "Il marchio Tadàplay",
    study: {
      lead:
        "Di Tadàplay abbiamo costruito tutto: il marchio, il sito con l'e-commerce e i giochi stessi — illustrazioni, scatole, flyer e manuali di istruzione — questi ultimi insieme a illustratori e game designer. Oggi si vendono online in Italia e all'estero, nei negozi fisici e nelle scuole, anche con la Carta del Docente. È un marchio di Love for Inclusion, la stessa società di Tadàbook: seguiamo tutti e due i progetti, e sono tuttora in corso.",
      // La società è Love for Inclusion S.r.l., verificata sul sito del
      // cliente: Tadàplay e Tadàbook sono due suoi marchi, e li seguiamo
      // tutti e due. Dirlo vale più di due schede separate — un cliente che
      // affida un secondo marchio è la prova migliore che esista.
      subtitle:
        "Giochi educativi di Love for Inclusion · Torre del Greco, Napoli · in corso",
      outcomes: [
        "Il prodotto disegnato e illustrato, non soltanto il marchio che lo veste: i giochi, insieme a illustratori e game designer.",
        "Il packaging completo di ogni singolo gioco: scatole, flyer e manuali di istruzione.",
        "Un e-commerce che vende in Italia e all'estero.",
        "L'acquisto con la Carta del Docente, reso possibile da plugin costruiti su misura con l'intelligenza artificiale: nessuna piattaforma lo gestisce da sola.",
        "Il profilo Instagram del marchio aperto da zero e curato da noi, insieme a TikTok, Facebook e al canale YouTube del progetto.",
        "Campagne su Google e su Meta gestite insieme ai contenuti.",
        "Una presenza curata alle fiere di settore — Didacta e Toys & Baby fra le altre — con stand, cartellonistica e materiali pronti a ogni edizione.",
        "Rapporti con fornitori e rivenditori seguiti direttamente da noi.",
        "Un presidio quotidiano del sito: aggiornamenti, controlli e manutenzione.",
      ],
      challenge:
        "Un progetto in cui andava disegnato tutto, dal marchio al prodotto fisico, e poi portato su tre canali di vendita che funzionano con regole diverse: l'e-commerce, i negozi e le scuole. Quello scolastico in particolare passa dalla Carta del Docente, che nessuna piattaforma di vendita online gestisce da sola.",
      solution: [
        "Abbiamo disegnato e illustrato il marchio.",
        "Abbiamo disegnato, illustrato e realizzato i giochi e il loro packaging: scatole, flyer e manuali di istruzione.",
        "Su questo abbiamo lavorato insieme a illustratori e game designer: un gioco non si progetta come una brochure, e su quel terreno serviva chi lo fa di mestiere.",
        "Abbiamo costruito il sito responsive su WordPress con Elementor Pro, e l'e-commerce per la vendita in Italia e all'estero.",
        "Abbiamo implementato e costruito con l'intelligenza artificiale i plugin che permettono l'acquisto con la Carta del Docente.",
        "Curiamo il posizionamento sui motori di ricerca e l'ottimizzazione dei testi.",
        "Produciamo video e post per Instagram, TikTok e Facebook, e i video del canale YouTube.",
        "Gestiamo le campagne a pagamento su Google e su Meta.",
        "Curiamo l'email marketing in modo continuativo.",
        "Prepariamo la partecipazione alle fiere — Didacta, Toys & Baby — dal packaging al branding dello stand, fino alla cartellonistica.",
        "Gestiamo i rapporti con i fornitori e con i rivenditori.",
        "Presidiamo il sito ogni giorno: aggiornamento dei plugin, controlli di sicurezza e prestazioni.",
      ],
    },
  },
  {
    slug: "tadabook",
    title: "Tadàbook storie digitali",
    category: "Prodotto & educazione",
    year: "2022 — 2026",
    // Punta al negozio: è la parte che mostra il lavoro, perché lì ci sono i
    // mockup dei libri illustrati da noi.
    href: "https://www.tadabook.it/negozio/",
    outcome:
      "Compri una storia sul sito e si sblocca da sola nell'app: negozio e applicazione parlano fra loro.",
    services: [
      "Siti web",
      "E-commerce",
      "Illustrazione",
      "Strategia",
      "Content",
      "SEO",
      "Email marketing",
      "Manutenzione",
    ],
    image: "/work/tadabook.jpg",
    alt: "Il marchio Tadàbook",
    study: {
      lead:
        "Tadàbook è l'app di storie digitali per bambini di Love for Inclusion, la stessa società di Tadàplay. Ne abbiamo costruito sito ed e-commerce da zero, illustrato le copertine di tutte le storie e collegato il negozio all'applicazione: chi compra una storia se la ritrova sbloccata, senza passaggi manuali.",
      subtitle:
        "Storie digitali per bambini di Love for Inclusion · Torre del Greco, Napoli · in corso",
      outcomes: [
        "Sito ed e-commerce costruiti da zero, con l'acquisto delle storie sia sul sito sia dentro l'app.",
        "Il negozio collegato all'applicazione: la storia comprata si sblocca da sola.",
        "Le copertine di tutte le storie illustrate da noi, e usate come immagine d'acquisto nel negozio.",
        "Storie disponibili anche con comunicazione aumentativa alternativa, per bambini che leggono in modi diversi.",
        "Un calendario di uscita costruito sull'analisi delle parole chiave, non su scelte casuali.",
        "Ogni storia provata nelle scuole prima del rilascio.",
        "Fiabe inedite nate dentro il progetto.",
        "Testi ottimizzati e sito presidiato ogni settimana.",
      ],
      challenge:
        "Un prodotto digitale con due anime — le storie e l'accessibilità — e nessun collegamento fra il negozio e l'applicazione: ogni acquisto richiedeva uno sblocco manuale. Mancava inoltre un criterio per decidere quale storia far uscire, e in che ordine.",
      solution: [
        "Abbiamo costruito il sito e l'e-commerce da zero.",
        "Abbiamo collegato il negozio all'app, così l'acquisto sblocca la storia in automatico.",
        "Abbiamo illustrato le copertine di tutte le storie, che fanno da immagine d'acquisto nel negozio.",
        "Abbiamo affiancato sviluppatori e illustratori sull'intero ciclo di produzione delle fiabe.",
        "Abbiamo supportato la stesura dei testi e organizzato i test nelle scuole prima di ogni rilascio.",
        "Abbiamo definito l'ordine di uscita delle fiabe partendo dall'analisi delle parole chiave.",
        "Abbiamo contribuito alla creazione di fiabe inedite.",
        "Curiamo l'email marketing.",
        "Ottimizziamo i testi per la ricerca e presidiamo il sito ogni settimana.",
      ],
    },
  },
  {
    slug: "i-testa",
    title: "I Testa parrucchieri",
    category: "Retail & e-commerce",
    year: "2023 — 2026",
    href: "https://itesta.it/",
    outcome:
      "Da nessun sito a un e-commerce che spedisce in tutta Italia e in parte d'Europa.",
    services: [
      "Siti web",
      "E-commerce",
      "Branding",
      "Packaging",
      "Advertising",
      "Social",
      "SEO",
      "Manutenzione",
    ],
    image: "/work/i-testa.jpg",
    alt: "Il marchio I Testa — Maestri d'arte",
    study: {
      lead:
        "I Testa non avevano un sito. Ne abbiamo costruito uno da zero, con l'e-commerce dei prodotti a marchio che oggi spedisce in tutta Italia e in parte d'Europa, e da allora ne curiamo ogni giorno testi, campagne, contenuti e perfino il coordinamento delle spedizioni.",
      subtitle:
        "Parrucchieri uomo e donna · Via Massimo Stanzione 35, Vomero · seguiti dal 2023",
      outcomes: [
        "Un e-commerce dove prima non c'era nemmeno un sito, oggi attivo in tutta Italia e in parte d'Europa.",
        "Un marchio applicato ai prodotti in vendita, e packaging e biglietti da visita coordinati.",
        "Campagne su Google e su Meta gestite insieme ai contenuti, non affidate a un fornitore diverso.",
        "Post e reel prodotti per Instagram e TikTok.",
        "Testi aggiornati sulle parole chiave del momento, non scritti una volta e lasciati lì.",
        "Un blog aziendale scritto dai maestri, con la loro competenza e la loro voce.",
        "Le spedizioni degli ordini coordinate: dal clic sul sito al pacco che parte.",
        "Un presidio quotidiano del sito: aggiornamenti, controlli e manutenzione.",
      ],
      // **I nomi dei clienti famosi del salone non si scrivono qui**, ed è una
      // scelta consapevole, non timidezza. Sono persone identificabili, il
      // fatto che frequentino un negozio è un dato personale loro, e non
      // hanno dato a noi nessun consenso a pubblicarlo. In più il salone
      // stesso non li pubblica sul proprio sito — verificato — quindi
      // saremmo noi, per conto di un cliente, a rendere pubblica una cosa che
      // il cliente tiene riservata. Se un giorno saranno I Testa a
      // dichiararlo pubblicamente, potremo citare loro.
      challenge:
        "Un salone affermato nel cuore del Vomero, frequentato anche da volti noti dello sport e dello spettacolo, e nessuna presenza online: niente sito, quindi nessun modo di comprare i prodotti a marchio da fuori dal negozio, e una competenza tecnica — quella dei maestri — che non usciva mai dalla poltrona.",
      solution: [
        "Abbiamo costruito il sito da zero su WordPress con Elementor Pro, e l'e-commerce con WooCommerce.",
        "Abbiamo aperto la vendita in tutta Italia e in parte d'Europa.",
        "Abbiamo disegnato il marchio da applicare ai prodotti in vendita.",
        "Abbiamo progettato il packaging: buste e biglietti da visita.",
        "Gestiamo le campagne a pagamento su Google e su Meta.",
        "Produciamo post e reel per Instagram e TikTok.",
        "Con Luisa aggiorniamo i testi in ottica di ricerca, seguendo le parole chiave del momento.",
        "Abbiamo affiancato i maestri nella redazione del blog aziendale.",
        "Abbiamo documentato con produzioni fotografiche gli eventi e il salone del Vomero.",
        "Coordiniamo le spedizioni dei prodotti acquistati sul sito.",
        "Presidiamo il sito ogni giorno: aggiornamento dei plugin, controlli di sicurezza e prestazioni.",
      ],
    },
  },
  {
    slug: "coffeeworld",
    title: "CoffeeWorld",
    category: "Retail & e-commerce",
    year: "2024 — 2026",
    href: "https://www.coffeeworld.it/",
    outcome:
      "Da sito vetrina senza catalogo a e-commerce che vende in tutta Italia e in Europa.",
    services: [
      "Branding",
      "Siti web",
      "E-commerce",
      "Packaging",
      "Cartellonistica",
      "SEO",
      "Content",
      "Manutenzione",
    ],
    image: "/work/coffeeworld.jpg",
    alt: "Il marchio CoffeeWorld — caffè e bevande in cialde e capsule",
    study: {
      lead:
        "Abbiamo costruito da zero sito ed e-commerce di CoffeeWorld e rifatto il marchio. Oggi il negozio online vende oltre la Campania — in tutta Italia e in Europa — mentre punti vendita e centri in franchising fra Campania, Puglia e Lazio hanno packaging, cartellonistica e materiali coordinati.",
      outcomes: [
        "Un e-commerce che vende oltre la Campania: in tutta Italia e in Europa.",
        "L'intera gamma finalmente consultabile online, dalle diverse qualità di caffè alle cialde.",
        "Un marchio rifatto e applicato con le stesse regole su ogni supporto.",
        "Il packaging completo: le confezioni delle diverse qualità e formati, lo scatolo delle cialde e le buste che le contengono.",
        "Materiali coordinati per i punti vendita e per i centri in franchising nelle tre regioni.",
        "Banner e template pronti per le campagne su Instagram, TikTok e Facebook, e le versioni stampate per i negozi.",
        "Testi e articoli aggiornati periodicamente sulle parole chiave del momento, non scritti una volta e lasciati lì.",
        "Un presidio quotidiano del sito: aggiornamenti, controlli e manutenzione.",
      ],
      challenge:
        "Un marchio con una rete di punti vendita e di centri in franchising in tre regioni, e online un sito vetrina di anni prima: nessun catalogo, nessuna possibilità di vendita, e materiali di negozio prodotti separatamente a ogni occasione.",
      solution: [
        "Abbiamo rifatto il marchio.",
        "Abbiamo costruito da zero il sito e l'e-commerce su WordPress con Elementor Pro, aperti alla vendita in tutta Italia e in Europa.",
        "Abbiamo progettato il packaging: le confezioni delle diverse qualità e formati di caffè, lo scatolo delle cialde e le buste interne.",
        "Abbiamo realizzato la cartellonistica stradale e i materiali per negozi e centri in franchising.",
        "Abbiamo prodotto banner e template per le campagne su Instagram, TikTok e Facebook, e le corrispondenti versioni per la stampa.",
        "Con Luisa scriviamo e riscriviamo i testi in ottica di ricerca, aggiornandoli sulle parole chiave del momento.",
        "Abbiamo aperto il blog del sito e ne curiamo gli articoli, con lo stesso criterio.",
        "Abbiamo costruito le risorse gratuite scaricabili — guida alle miscele, manuale d'uso della macchina, decalcificazione — come primo punto di contatto.",
        "Presidiamo il sito ogni giorno: aggiornamento dei plugin, controlli di sicurezza e prestazioni.",
      ],
    },
  },
  {
    slug: "taverna-e-mare",
    title: "Taverna 'e Mare ristorante",
    category: "Food & ristorazione",
    year: "2024 — 2026",
    href: "https://tavernaemare.it/",
    outcome:
      "Le targhette della menzione Michelin le abbiamo prodotte noi, insieme al packaging e ai menù del locale.",
    services: [
      "Packaging",
      "Social",
      "Fotografia e video",
      "Advertising",
      "Siti web",
      "Email marketing",
      "Ufficio stampa",
    ],
    image: "/work/taverna-e-mare.jpg",
    alt: "Il marchio Taverna 'e Mare",
    study: {
      // Collaborazione a progetto, conclusa. I tempi verbali sono al passato
      // e l'inquadramento lo dichiara in una riga — senza farne un annuncio:
      // un lavoro a progetto che finisce è la normalità, non una notizia.
      // Namare e San Pietro, che sono in corso, restano al presente.
      lead:
        "Per due anni abbiamo seguito la comunicazione della Taverna 'e Mare, ristorante di mare a Torre del Greco. Qui più che altrove il lavoro passava dalle cose che si toccano: il packaging del locale e i menù, quelli in sala e quello online. Il sito non l'abbiamo costruito noi — c'era già, e siamo subentrati nella gestione.",
      subtitle:
        "Ristorante di mare · Torre del Greco, Napoli · collaborazione a progetto, 2024 — 2026",
      outcomes: [
        "Le targhette per la menzione sulla guida Michelin, progettate e prodotte.",
        "Tutto il packaging del locale: buste per il vino e buste per l'asporto.",
        "I menù di sala realizzati, e il menù online reso aggiornabile in tempo reale senza una ristampa a ogni variazione.",
        "Una produzione costante di scatti e video dei piatti, realizzata in sede e distribuita su Instagram, TikTok e Facebook.",
        "Campagne Meta gestite insieme ai contenuti, e non affidate a un fornitore diverso.",
        "Un sito preso in carico e mantenuto aggiornato, senza rifarlo da capo.",
      ],
      challenge:
        "Una cucina riconosciuta e una comunicazione frammentata: materiali stampati commissionati di volta in volta e diversi gli uni dagli altri, un menù che a ogni variazione richiedeva una nuova stampa, produzione fotografica occasionale e un sito già esistente ma fermo, da riportare in efficienza senza ricostruirlo.",
      solution: [
        "Abbiamo progettato il packaging del locale: buste per il vino e buste per l'asporto.",
        "Abbiamo realizzato i menù di sala e gestito il menù online, reso aggiornabile in tempo reale.",
        "Abbiamo realizzato le targhette per la menzione sulla guida Michelin.",
        "Abbiamo curato la produzione fotografica e video in sede: i piatti, le storie, i post e i reel per Instagram, TikTok e Facebook.",
        "Abbiamo gestito le pagine Instagram, TikTok e Facebook con un'unica linea editoriale.",
        "Abbiamo scritto le didascalie in ottica di ricerca, perché i contenuti venissero trovati e non solo scorsi.",
        "Abbiamo impostato e seguito le campagne a pagamento su Meta.",
        "Siamo subentrati nella gestione del sito esistente, risolvendone le criticità e tenendolo aggiornato.",
        "Abbiamo curato l'email marketing e i rapporti con la stampa.",
      ],
    },
  },
  {
    slug: "ninjastickers",
    title: "NinjaStickers",
    // Non è retail: sono collezionabili digitali in blockchain.
    category: "Tecnologia & servizi",
    year: "2018 — 2020",
    // Le card sono in vendita su OpenSea: è lì che il lavoro si vede ancora
    // oggi, non su un sito dell'azienda — che non esiste più. Senza il
    // `?page=2` dell'indirizzo che aveva mandato Dario: era la seconda
    // pagina della sua navigazione, non un pezzo dell'indirizzo.
    href: "https://opensea.io/collection/ninjastickers",
    // Qui il dominio non basta: «opensea.io» non dice che quella è la
    // collezione delle card disegnate da noi.
    hrefLabel: "La collezione su OpenSea",
    outcome:
      "Marchio e card di tutti i piloti MotoGP illustrate a mano, per un progetto poi acquisito da Animoca Brands.",
    services: [
      "Illustrazione",
      "Branding",
      "UI / UX",
      "Siti web",
      "Packaging",
      "Advertising",
    ],
    image: "/work/ninjastickers.jpg",
    alt: "Le card illustrate dei piloti MotoGP realizzate per NinjaStickers",
    study: {
      // L'acquisizione è un fatto pubblico, annunciato da Animoca Brands il
      // 23 settembre 2020 — verificato sull'annuncio ufficiale, non riferito.
      // È scritto come contesto del progetto, **non** come merito: il nesso
      // fra il lavoro di illustrazione e l'acquisizione non lo può
      // dimostrare nessuno, e attribuirselo sarebbe una millanteria facile
      // da smontare.
      lead:
        "A Londra, dal 2018, abbiamo disegnato e illustrato il marchio di Cryptobilia e quello del suo prodotto NinjaStickers, e illustrato una per una le card di tutti i piloti di MotoGP, Moto2 e Moto3 per i collezionabili digitali nati dall'accordo con Dorna. Nel settembre 2020 il progetto è stato acquisito da Animoca Brands.",
      subtitle:
        "Collezionabili digitali MotoGP di Cryptobilia · Londra · 2018 — 2020",
      outcomes: [
        "Il marchio di Cryptobilia e quello di NinjaStickers, disegnati e illustrati da zero.",
        "Le card di tutti i piloti di MotoGP, Moto2 e Moto3, illustrate una per una.",
        "Un sito con interfaccia ed esperienza d'uso disegnate da noi, responsive su telefono e tablet.",
        "Packaging e materiali pubblicitari coordinati con il marchio.",
        "Nel settembre 2020 il progetto è stato acquisito da Animoca Brands.",
      ],
      challenge:
        "Una società che entrava in un mercato che non esisteva ancora — i collezionabili digitali in blockchain — e che con l'accordo con Dorna si trovava a dover rappresentare l'intero paddock: tre categorie, decine di piloti, e nessuna identità visiva da cui partire.",
      solution: [
        "Abbiamo disegnato e illustrato il marchio di Cryptobilia, la società.",
        "Abbiamo disegnato e illustrato il marchio di NinjaStickers, il prodotto.",
        "Abbiamo illustrato una per una le card di tutti i piloti di MotoGP, Moto2 e Moto3.",
        "Abbiamo realizzato il sito, disegnandone interfaccia ed esperienza d'uso, responsive su telefono e tablet.",
        "Abbiamo realizzato i materiali di packaging e di advertising.",
      ],
    },
  },
  {
    slug: "adatech",
    title: "AdaTech",
    category: "Tecnologia & servizi",
    year: "2026",
    href: "https://www.ada-tech.it/",
    outcome:
      "Marchio e sito da zero per un'azienda che vende intelligenza artificiale, costruiti con l'intelligenza artificiale.",
    services: ["Branding", "Siti web", "Sviluppo", "UI / UX"],
    image: "/work/adatech.jpg",
    alt: "Il sito AdaTech — soluzioni di intelligenza artificiale su misura",
    study: {
      // I dettagli tecnici qui sono **misurati sul sito pubblicato**, non
      // ricordati. Una prima versione diceva «Next.js 16, React 19,
      // TypeScript e Tailwind, su Vercel dietro Cloudflare»: controllando,
      // il sito servito non ha nessuna traccia di framework — fogli di
      // stile a livelli (`css/reset.css`, `variables`, `base`,
      // `components`), un `js/main.js` e classi scritte a mano — ed è
      // ospitato su Aruba. Quello stack è, parola per parola, lo stack di
      // **questo** sito: una sovrapposizione di ricordi.
      //
      // Morale, e vale per tutte le schede: i dettagli tecnici si
      // verificano prima di pubblicarli. Chi legge la pagina di un cliente
      // che vende intelligenza artificiale sa aprire gli strumenti per
      // sviluppatori.
      lead:
        "Abbiamo disegnato il marchio di AdaTech e costruito il sito da zero, interamente con l'intelligenza artificiale — un metodo di lavoro, non uno strumento in più — per un'azienda che di intelligenza artificiale vive.",
      subtitle: "Soluzioni di intelligenza artificiale su misura · 2026",
      outcomes: [
        "Un marchio nuovo: simbolo, palette e caratteri, con le regole per applicarli.",
        "Un sito statico costruito senza framework: HTML, CSS e JavaScript scritti su misura, con i fogli di stile organizzati a livelli — reset, variabili, base, componenti.",
        "Nessuna dipendenza esterna da aggiornare, e una pagina che si apre in poco più di un decimo di secondo.",
        "Un metodo di sviluppo interamente assistito dall'intelligenza artificiale, dalla scrittura del codice alla messa online.",
        "Un'azienda che vende intelligenza artificiale, presentata da un sito costruito con quella stessa tecnologia.",
      ],
      challenge:
        "Un'azienda tecnologica priva di identità visiva e di presenza online, che doveva presentarsi con uno standard all'altezza di quello che vende: chi propone soluzioni di intelligenza artificiale su misura non può permettersi un sito comprato da un catalogo.",
      solution: [
        "Abbiamo disegnato il marchio e definito palette, caratteri e regole d'uso.",
        "Abbiamo costruito il sito da zero, senza framework, con una struttura di fogli di stile a livelli riutilizzabile su altri progetti.",
        "Abbiamo impiegato l'intelligenza artificiale sull'intero ciclo di lavoro, dallo sviluppo alla messa in produzione.",
      ],
    },
  },
  {
    slug: "bandohub",
    title: "BandoHub finanza agevolata",
    category: "Tecnologia & servizi",
    year: "2026",
    href: "https://bandohub.it/",
    outcome:
      "Un servizio complesso — bandi, domande e rendicontazione — reso leggibile a un pubblico di professionisti.",
    services: [
      "Branding",
      "Siti web",
      "Sviluppo",
      "UI / UX",
      "Architettura dei contenuti",
    ],
    image: "/work/bandohub.jpg",
    alt: "Il sito BandoHub — supporto specialistico in finanza agevolata",
    study: {
      // I dettagli tecnici qui sono **verificati sul sito pubblicato**, non
      // riferiti: il foglio di stile risponde da `/_astro/…` (quindi Astro,
      // non Next.js) e le intestazioni HTTP dicono `server: cloudflare` con
      // un `cf-ray`. Sono controlli che chiunque può rifare in cinque
      // secondi: è il motivo per cui si scrivono solo dopo averli fatti.
      lead:
        "BandoHub affianca studi di commercialisti e consulenti nella finanza agevolata: individuare i bandi adatti a ciascun cliente, presentare le domande, gestire la rendicontazione. Abbiamo disegnato il marchio e costruito il sito da zero, con un compito preciso: rendere leggibile un servizio che ne mette insieme tre — una piattaforma, un metodo operativo in cinque fasi e un referente dedicato a ogni studio.",
      subtitle:
        "Finanza agevolata per studi di commercialisti e consulenti · 2026",
      outcomes: [
        "Un marchio pensato per un pubblico di professionisti: sobrio, leggibile, senza effetti.",
        "Un sito che spiega in un percorso solo un servizio articolato, senza semplificarlo: il metodo, la piattaforma, il Portfolio Manager e la rendicontazione.",
        "Le cinque fasi della pratica — analisi del portafoglio, matching, presentazione della domanda, monitoraggio, rendicontazione — rese scorrevoli come un racconto.",
        "Domande frequenti, materiali scaricabili e prenotazione della sessione informativa integrati nello stesso percorso.",
        "L'accesso all'area riservata della piattaforma collegato dal sito.",
        "Pagine statiche costruite con Astro e distribuite dietro Cloudflare: nessun tempo di attesa per chi apre il sito.",
      ],
      challenge:
        "Un servizio difficile da raccontare. Mette insieme tre cose che di solito si vendono separate — una piattaforma, un metodo operativo e una persona dedicata — e si rivolge a un pubblico, quello dei commercialisti, che valuta per competenza e diffida delle promesse. Serviva un sito che spiegasse tutto senza banalizzare, e un marchio che non somigliasse a una startup in cerca di attenzione.",
      solution: [
        "Abbiamo disegnato il marchio — simbolo, palette e caratteri — su un registro adatto a chi legge bilanci per mestiere.",
        "Abbiamo costruito l'architettura dei contenuti attorno alle quattro aree del servizio, ognuna raggiungibile dalla barra.",
        "Abbiamo impaginato il percorso in cinque fasi, dall'analisi del portafoglio fino alla rendicontazione.",
        "Abbiamo integrato nel sito le domande frequenti, i materiali scaricabili e la prenotazione della sessione informativa.",
        "Abbiamo collegato al sito l'ingresso all'area riservata della piattaforma.",
        "Abbiamo costruito il sito con Astro, che genera pagine statiche, e lo abbiamo distribuito dietro Cloudflare.",
      ],
    },
  },
  {
    slug: "voice-concierge",
    title: "Voice Concierge assistente vocale",
    category: "Tecnologia & servizi",
    year: "2020 — 2023",
    href: "https://voiceconcierge.it/",
    outcome:
      "Dal nome al logo alle interfacce: un assistente vocale per gli hotel, diventato poi anche app.",
    services: [
      "Naming",
      "Branding",
      "Illustrazione",
      "UI / UX",
      "Siti web",
      "Email marketing",
    ],
    image: "/work/voice-concierge.jpg",
    alt: "La dashboard Voice Concierge su più dispositivi",
    study: {
      lead:
        "Voice Concierge non aveva nemmeno un nome quando abbiamo cominciato. L'abbiamo ideato noi, disegnato e illustrato il marchio da zero, e poi accompagnato il prodotto fino al rilascio: la skill vocale, il sito, le interfacce della dashboard e dell'app, i materiali per le camere.",
      subtitle: "Assistente vocale e app per l'ospitalità · 2020 — 2023",
      outcomes: [
        "Il nome del prodotto, ideato da zero.",
        "Il marchio disegnato e illustrato da zero, e applicato a tutto il resto.",
        "Un prodotto disponibile in due configurazioni: assistente vocale o tablet con app dedicata, a scelta della struttura.",
        "Una dashboard che permette all'albergo di personalizzare i contenuti in autonomia.",
        "Materiali in camera che guidano l'ospite nell'interazione con un dispositivo che non aveva mai visto.",
        "Un posizionamento definito prima del rilascio, sulla base dell'analisi della domanda.",
      ],
      challenge:
        "Un prodotto tecnologico nuovo per un settore che non lo conosceva, e che partiva senza niente: nessun nome, nessuna identità, nessuna interfaccia utilizzabile dal personale di struttura, e nessun modo di spiegare all'ospite come si parla a un dispositivo mai visto prima.",
      solution: [
        "Abbiamo ideato il naming del prodotto.",
        "Abbiamo disegnato e illustrato il marchio da zero.",
        "Abbiamo condotto l'analisi delle parole chiave e delle buyer personas, e definito il posizionamento prima del rilascio.",
        "Abbiamo progettato l'esperienza della skill vocale collegata all'assistente.",
        "Abbiamo realizzato il sito e disegnato interfaccia ed esperienza d'uso della dashboard a uso delle strutture.",
        "Abbiamo disegnato l'interfaccia dell'app quando al vocale si è affiancato il tablet.",
        "Abbiamo prodotto la cartellonistica in camera e gestito test, relazione con i clienti ed email marketing.",
      ],
    },
  },
  {
    slug: "everup",
    title: "EverUp app",
    category: "Tecnologia & servizi",
    year: "2018 — 2020",
    href: "https://www.everup.com/",
    outcome:
      "Sito responsive e illustrazioni dell'interfaccia dell'app, lavorando fra Napoli e Londra.",
    services: ["Siti web", "Illustrazione", "UI / UX", "Social", "Branding", "Packaging"],
    image: "/work/everup.jpg",
    alt: "L'app EverUp su telefono, tablet e computer",
    study: {
      // Il numero di registrazione e la sede legale inglese sono dati
      // pubblici, ma non servono a chi legge: la scheda dice cosa abbiamo
      // fatto, non chi è iscritto a quale registro.
      lead:
        "Abbiamo lavorato con EverUp Ltd fra il 2018 e il 2020, in parte da remoto da Napoli e in parte nella loro sede di Londra: abbiamo realizzato il sito responsive del prodotto, illustrato una parte dell'interfaccia dell'app e preparato i materiali per il lancio sui social.",
      // Descrive **cosa è stato costruito**, non come funziona il prodotto
      // finanziario: oggi EverUp si presenta come piattaforma di cashback e
      // premi, ma nel 2018-2020 poteva essere altro, e classificare male un
      // servizio finanziario inglese è il genere di imprecisione che nota
      // proprio chi capisce.
      subtitle: "App mobile e piattaforma web · Londra · 2018 — 2020",
      outcomes: [
        "Un sito con resa uniforme su telefono, tablet e computer.",
        "Le illustrazioni che fanno parte dell'interfaccia dell'app, non solo della comunicazione.",
        "Il profilo Instagram del prodotto avviato con i materiali già pronti.",
        "Una libreria pronta all'uso: modelli, banner e icone riutilizzabili su ogni campagna successiva.",
        "Il materiale di packaging per la pubblicità.",
        "Un progetto seguito fra Napoli e Londra, in parte da remoto e in parte in sede.",
      ],
      challenge:
        "Un prodotto digitale da presentare al pubblico prima che qualcuno potesse provarlo: bisognava mostrarne il funzionamento senza poterlo far toccare. E bisognava farlo con un'azienda a due ore di volo di distanza, senza che la distanza si vedesse nel lavoro.",
      solution: [
        "Abbiamo realizzato il sito responsive del prodotto.",
        "Abbiamo illustrato gli elementi grafici che fanno parte dell'interfaccia dell'app.",
        "Abbiamo avviato il profilo Instagram del prodotto.",
        "Abbiamo prodotto modelli, banner, icone e materiale di packaging per la pubblicità.",
        "Abbiamo lavorato in parte da remoto da Napoli e in parte nella sede di Londra, secondo quello che la fase del progetto richiedeva.",
      ],
    },
  },
  {
    slug: "torre-del-greco-citta-del-corallo",
    title: "Torre del Greco Città del Corallo",
    category: "Territorio & benessere",
    year: "2021",
    href: "https://www.torredelgrecocittadelcorallo.it/",
    outcome:
      "Un portale di territorio: le aziende del corallo, l'itinerario turistico e la casa d'aste, in un posto solo.",
    services: [
      "Siti web",
      "E-commerce",
      "Architettura dei contenuti",
      "SEO",
      "Content",
    ],
    image: "/work/torre-del-greco-citta-del-corallo.jpg",
    alt: "Il portale Torre del Greco Città del Corallo",
    study: {
      lead:
        "Torre del Greco è la capitale mondiale del corallo, e non aveva un luogo online che la raccontasse tutta insieme. Abbiamo costruito da zero il portale che riunisce produttori e commercianti di corallo, cammei e gioielli, con l'itinerario dei luoghi da visitare, la sezione della casa d'aste e un blog sulla materia — predisposto fin dall'inizio per vendere online.",
      subtitle: "Portale del corallo · Torre del Greco, Napoli · 2021",
      outcomes: [
        "Un portale che raccoglie in un posto solo i produttori e i commercianti di corallo, cammei e gioielli della città.",
        "L'itinerario dei luoghi e dei siti di interesse turistico, collegato alle mappe.",
        "La sezione dedicata alla casa d'aste.",
        "Un blog sulla materia — il corallo rosso, quello bianco, quello blu — che porta al portale chi cerca informazioni e non ancora un prodotto.",
        "Spazi che le aziende del territorio possono acquistare per comparire nell'elenco.",
        "L'impianto di vendita già predisposto, per l'e-commerce e per le aste di corallo.",
        "Testi costruiti per intercettare le ricerche su corallo e cammei.",
      ],
      challenge:
        "Cinque secoli di tradizione e nessun luogo online che li tenesse insieme: le aziende del corallo stavano ognuna per sé, chi arrivava a Torre del Greco non aveva un itinerario, e chi cercava il corallo da fuori non trovava un punto d'ingresso. Serviva un portale capace di fare tre cose insieme — elencare, raccontare e vendere — senza sembrare tre siti diversi messi uno accanto all'altro.",
      solution: [
        "Abbiamo progettato e realizzato il portale da zero su WordPress con Elementor Pro.",
        "Abbiamo strutturato l'elenco delle aziende di Torre del Greco, con gli spazi che le attività possono acquistare.",
        "Abbiamo costruito l'itinerario dei luoghi e dei siti di interesse turistico, collegato alle mappe.",
        "Abbiamo predisposto la sezione della casa d'aste.",
        "Abbiamo installato WooCommerce per la vendita online e per le aste di corallo.",
        "Abbiamo aperto il blog e impostato i contenuti sulla materia.",
        "Abbiamo ottimizzato i testi per la ricerca.",
      ],
    },
  },
  {
    slug: "parsec-326",
    title: "Parsec 3.26 software house",
    category: "Tecnologia & servizi",
    year: "2023",
    href: "https://www.parsec326.it/",
    outcome:
      "Marchio nuovo e materiali istituzionali per una software house che lavora con la pubblica amministrazione.",
    services: ["Branding", "Illustrazione", "Packaging", "Stampa"],
    image: "/work/parsec-326.jpg",
    alt: "Il marchio Parsec 3.26 — la nostra passione: l'e-government",
    study: {
      lead:
        "Parsec 3.26 sviluppa software per la pubblica amministrazione: e-government, gestione documentale, cybersecurity. Abbiamo disegnato e illustrato il marchio nuovo e realizzato il materiale istituzionale che un'azienda così deve poter mettere sul tavolo — biglietti da visita per l'intero board, carta intestata, cartelline e manuali.",
      subtitle:
        "Software house per la pubblica amministrazione · Castromediano, Lecce · 2023",
      outcomes: [
        "Un marchio nuovo, disegnato e illustrato da zero.",
        "I biglietti da visita di tutti i componenti del board, coerenti fra loro.",
        "Carta intestata e cartelline: il corredo che serve quando ci si siede a un tavolo istituzionale.",
        "I manuali di istruzione e quelli di presentazione della società, impaginati con la stessa identità.",
      ],
      challenge:
        "Un'azienda che vende software a enti pubblici si presenta ancora molto su carta: gare, incontri istituzionali, documentazione. Il marchio andava rifatto, ma soprattutto andava reso applicabile a un corredo di materiali formali che devono sembrare tutti della stessa azienda — anche quando li consegnano persone diverse in stanze diverse.",
      solution: [
        "Abbiamo disegnato e illustrato il nuovo marchio.",
        "Abbiamo realizzato i biglietti da visita per tutti i componenti del board.",
        "Abbiamo progettato carta intestata e cartelline.",
        "Abbiamo impaginato i manuali di istruzione e i manuali di presentazione della società.",
      ],
    },
  },
  {
    slug: "glam-and-go-london",
    title: "Glam & Go London estetica",
    category: "Territorio & benessere",
    year: "2023",
    href: "https://www.glamgolondon.co.uk/",
    outcome:
      "Marchio, sito e prenotazione degli appuntamenti per un servizio estetico che va a domicilio.",
    services: ["Branding", "Illustrazione", "Siti web", "Fotografia", "UI / UX"],
    image: "/work/glam-and-go-london.jpg",
    alt: "Il sito Glam & Go London",
    study: {
      // Il servizio riguarda trattamenti estetici: la scheda descrive la
      // categoria e il lavoro fatto, e **non entra nel merito dei
      // trattamenti** — non è materia nostra e non è materia di un
      // portfolio.
      lead:
        "Glam & Go London è un servizio di trattamenti estetici a domicilio: è la professionista a raggiungere il cliente a casa. Abbiamo disegnato e illustrato il marchio da zero, realizzato il sito con le fotografie di uno shooting fatto sul posto e integrato il gestionale che porta gli appuntamenti dal sito direttamente in agenda.",
      subtitle: "Trattamenti estetici a domicilio · Londra · 2023",
      outcomes: [
        "Un marchio disegnato e illustrato da zero.",
        "Un sito organizzato attorno a quello che serve a un servizio su appuntamento: trattamenti, prezzi, contatti e blog.",
        "Le fotografie di uno shooting realizzato sul posto, al posto di immagini d'archivio.",
        "Un gestionale degli appuntamenti integrato: le richieste arrivano dal sito, senza passare per una telefonata.",
        "Resa uniforme su telefono e tablet — che è da lì che si prenota, quasi sempre.",
      ],
      challenge:
        "Un servizio che si muove: non c'è una vetrina, non c'è un indirizzo a cui presentarsi, e tutto il primo contatto passa da internet. Serviva un sito che facesse da negozio e da segreteria insieme, consultabile e utilizzabile dal telefono, e che desse fiducia a chi sta per far entrare in casa una professionista che non ha ancora incontrato.",
      solution: [
        "Abbiamo disegnato e illustrato il marchio da zero.",
        "Abbiamo realizzato il sito su WordPress con Elementor Pro, responsive su telefono e tablet.",
        "Abbiamo curato lo shooting fotografico sul posto e applicato gli scatti al sito in ogni formato.",
        "Abbiamo strutturato le sezioni dei trattamenti, dei prezzi e del blog.",
        "Abbiamo integrato il gestionale degli appuntamenti, così le prenotazioni arrivano direttamente dal sito.",
      ],
    },
  },

  {
    slug: "gate42",
    title: "Gate42 software house",
    category: "Tecnologia & servizi",
    year: "2023",
    href: "https://gate42.it/",
    outcome:
      "Marchio e sito per una software house che sviluppa per altri — e forma chi svilupperà.",
    services: ["Branding", "Illustrazione", "Siti web", "UI / UX"],
    image: "/work/gate42.jpg",
    alt: "Il sito Gate42 — «Software that you need, no less no more»",
    study: {
      lead:
        "Gate42 sviluppa software su commessa e forma sviluppatori con una propria academy. Abbiamo disegnato e illustrato il marchio da zero e costruito il sito responsive che tiene insieme le due anime: quella che vende progetti e quella che insegna.",
      subtitle: "Software house e academy · 2023",
      outcomes: [
        "Un marchio disegnato e illustrato da zero.",
        "Un sito che presenta le quattro aree del servizio — strategia, sviluppo, interfacce e assistenza — senza farne un elenco.",
        "L'academy per sviluppatori raccontata dentro lo stesso sito, invece che su un dominio a parte.",
        "Resa uniforme su telefono e tablet.",
      ],
      challenge:
        "Una società che fa due mestieri vicini ma non uguali: sviluppa software per i clienti e forma sviluppatori. Raccontarli sullo stesso sito senza che uno oscuri l'altro — e senza costruire due siti che poi vanno mantenuti tutti e due — era il problema vero.",
      solution: [
        "Abbiamo disegnato e illustrato il marchio.",
        "Abbiamo costruito il sito su WordPress con Elementor Pro e i moduli necessari, responsive su telefono e tablet.",
        "Abbiamo strutturato i contenuti attorno alle quattro aree del servizio e all'academy.",
      ],
    },
  },
  {
    slug: "voice-office",
    title: "Voice Office",
    category: "Tecnologia & servizi",
    year: "2026",
    href: "https://voiceoffice.it/",
    outcome:
      "Un prodotto senza precedenti reso comprensibile in una pagina sola, disegnato e costruito interamente con l'intelligenza artificiale.",
    services: ["Branding", "Illustrazione", "Siti web", "Sviluppo", "UI / UX"],
    image: "/work/voice-office.jpg",
    alt: "Il sito Voice Office — la rivoluzione vocale al servizio della tua azienda",
    study: {
      // I dettagli tecnici sono **misurati sul sito pubblicato**, non
      // riferiti: un solo documento HTML da 65 KB con 33 KB di fogli di
      // stile scritti dentro la pagina, nessuna libreria, un unico
      // riferimento esterno (il carattere Aventa), e le intestazioni HTTP
      // che rispondono `server: GitHub.com`. Vedi la nota su AdaTech per il
      // motivo per cui questi controlli si fanno prima e non dopo.
      lead:
        "Voice Office è una piattaforma di gestione del lavoro guidata dalla voce: si parla, un agente di intelligenza artificiale esegue, e task, calendario e report restano allineati. Abbiamo disegnato e illustrato il marchio da zero e costruito il sito interamente con l'intelligenza artificiale — dalla struttura al codice.",
      subtitle: "Piattaforma di gestione del lavoro a comando vocale · 2026",
      outcomes: [
        "Un marchio disegnato e illustrato da zero.",
        "Un sito che spiega un prodotto senza precedenti in tre passaggi — parla, l'agente agisce, tutto si sincronizza — prima ancora di elencare le funzioni.",
        "Un solo documento HTML, con i fogli di stile scritti dentro la pagina: nessuna libreria da caricare, nessuna dipendenza da aggiornare, nessuna compilazione.",
        "Un unico riferimento esterno in tutto il sito: il carattere tipografico.",
        // «Due decimi di secondo» era un numero misurato una volta sola, e
        // dipende dalla rete di chi guarda: dice qualcosa a un tecnico e
        // niente a un imprenditore. Al suo posto il motivo per cui il sito è
        // veloce, che invece resta vero sempre.
        "Distribuito come pagina statica: nessun server ricostruisce la pagina a ogni visita, quindi si apre appena la si chiede.",
        "Costruito interamente con l'intelligenza artificiale, dalla struttura dei contenuti alla scrittura del codice.",
      ],
      challenge:
        "Un prodotto che nessuno ha mai usato prima: si comanda parlando, e chi arriva sul sito non ha un termine di paragone in testa. Prima di elencare cosa fa, bisognava far capire **come si usa** — e farlo in una pagina sola, perché un prodotto che promette semplicità non può presentarsi con un sito complicato.",
      solution: [
        "Abbiamo disegnato e illustrato il marchio da zero.",
        "Abbiamo costruito il racconto in tre passaggi — si parla, l'agente agisce, tutto resta sincronizzato — mettendolo prima dell'elenco delle funzioni.",
        "Abbiamo scritto l'intero sito come un unico documento autosufficiente: struttura, stili e comportamenti nello stesso file.",
        "Abbiamo tenuto le dipendenze esterne a una sola, il carattere tipografico: meno cose da caricare, meno cose che si possono rompere.",
        "Abbiamo usato l'intelligenza artificiale su tutto il ciclo — architettura dei contenuti, scrittura del codice, messa online — trattandola come un metodo di lavoro e non come uno strumento in più.",
      ],
    },
  },
];

// — Testimonianze. **Oggi non compaiono da nessuna parte nel sito**: Dario ha
// chiesto di toglierle il 25 agosto 2026 e `<Testimonials />` è uscita dalla
// home. Dati e componente restano qui, pronti, perché il giorno in cui
// arrivano recensioni vere basta rimettere la sezione in `page.tsx`.
//
// Il motivo per cui era giusto toglierle: le firme sono di persone vere
// (Mariano Panariello, Angelo Arrichiello) ma **il testo delle citazioni no**,
// è quello editoriale scritto per il sito. Erano parole messe in bocca a
// persone identificabili, e nessuno le aveva confermate.
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
// Il pulsante «Richiedi consulenza gratuita» porta qui, come fa leftclick.ai:
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
// L'indirizzo della chat WhatsApp, costruito una volta sola: lo usano il
// pulsante fisso e l'elenco della pagina contatti. `wa.me` vuole solo cifre.
export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  site.whatsappMessage,
)}`;

export const booking = {
  url: "https://cal.com/dlcommunication/30min?source=website",
  label: "Richiedi consulenza gratuita",
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
  // «Nessuna carta richiesta» è uscita il 25 agosto 2026, su richiesta di
  // Dario. Era una rassicurazione presa dal software: qui non si paga niente
  // in nessun momento della prova, quindi nominare la carta di credito
  // suggeriva un pagamento che non esiste.
  reassurance: ["Nessun impegno", "Pochi clienti per volta"],
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

// — Le due email che partono quando qualcuno compila il modulo contatti.
// Il testo della conferma automatica è a tutti gli effetti una comunicazione
// del brand: sta qui come tutto il resto, non dentro il codice.
// — Pagina /contatti. L'impianto è ripreso da leftclick.ai/contact, il
// riferimento indicato da Dario: apertura corta, poi un elenco asciutto dei
// modi per raggiungerci. Sotto ci va la sezione del modulo che sta in home
// (`contact.tsx`), quindi qui NON si ripetono email, luogo e social: sarebbero
// scritti due volte nella stessa schermata.
type ContactDetail = { label: string; value: string; href?: string };

export const contactPage: {
  title: string;
  body: string[];
  details: ContactDetail[];
} = {
  title: "Scrivici.",
  body: [
    "Prenota mezz'ora gratuita, oppure raggiungici direttamente:",
    "a risponderti siamo noi due, non un centralino.",
  ],
  details: [
    {
      label: "Prenota una call",
      value: "Mezz'ora, gratuita e senza impegno",
      href: booking.url,
    },
    { label: "WhatsApp", value: site.whatsappDisplay, href: whatsappUrl },
    { label: "Tempi di risposta", value: "Entro un giorno lavorativo" },
  ],
};

// — Pagina /dl-communication, «Cos'è Dielle Communication». Ricalcata su
// leftclick.ai/what-is-leftclick: definizione in una riga, chi siamo, cosa NON
// siamo, cosa costruiamo. Anche qui sotto ci va il modulo della home.
//
// `featured` non ripete i testi dei servizi: sono i titoli di `services`, e la
// pagina pesca da lì. Se cambi la descrizione di un servizio cambia anche qui.
// «Chi siamo». Nasce dalla fusione di due pagine che raccontavano la stessa
// cosa — `/chi-siamo` e `/dl-communication` — decisa da Dario il 24 agosto
// 2026 dopo la ricerca sui concorrenti. Niente è andato perso: i capoversi
// qui sotto tengono dentro tutti e due i testi. `/dl-communication` non
// esiste più e rimanda qui (vedi `next.config.ts`).
export const aboutPage = {
  title: "Cos'è Dielle Communication?",
  // Sottotitolo dell'apertura: due righe corte, e volutamente diverse dal
  // `lead` qui sotto. L'apertura dice il posizionamento in due parole, la
  // sezione sotto lo spiega — se ripetessero le stesse frasi si leggerebbe
  // due volte la stessa cosa nella stessa schermata.
  subtitle: [
    "Due persone, pochi clienti, una strategia costruita su misura.",
    "Nessun pacchetto preconfezionato, nessun intermediario.",
  ],
  lead: "Dielle Communication è la boutique marketing agency di Napoli fondata da Luisa Panariello e Dario De Sisto: due persone che seguono pochi clienti, di persona, dal primo giorno all'ultimo.",
  intro: [
    "Luisa è la CEO e si occupa di branding, contenuti e della relazione con te. Dario è il creative director: oltre dieci anni fra Napoli e Londra come web designer e digital strategist. Non c'è un terzo livello — chi ti risponde è chi fa il lavoro.",
    "L'agenzia nasce dall'unione professionale di due persone che facevano già questo mestiere da più di dieci anni ciascuna, e da un'idea semplice: offrire un'alternativa alle agenzie strutturate, dove il cliente cambia referente di continuo e riceve pacchetti uguali per tutti.",
    "Lavoriamo a numero chiuso, da Napoli, in Campania e da remoto in tutta Italia. Si comincia sempre allo stesso modo: una prova gratuita, per guardare come ti trovano oggi e dirti con sincerità se possiamo esserti utili.",
  ],
  notTitle: "Da non confondere con",
  notBody: "Un'agenzia a pacchetti. Non vendiamo listini uguali per tutti, non lavoriamo a volume e non mettiamo un account fra te e chi esegue. Se cerchi qualcuno che pubblichi tre post a settimana senza chiederti dove vuoi arrivare, non siamo noi.",
  // Stavano scritti dentro `chi-siamo/page.tsx`, contro la regola: i testi
  // stanno qui.
  valuesTitle: "Come stiamo al mondo",
  // Sono **tre** e devono restare tre: la griglia è `sm:grid-cols-3`, una
  // quarta voce resterebbe da sola su una riga sua.
  //
  // «Su misura» è uscita il 25 agosto 2026, su segnalazione di Dario: diceva
  // «niente pacchetti uguali per tutti», che il sottotitolo dell'apertura
  // («una strategia costruita su misura», «nessun pacchetto preconfezionato»)
  // e `notBody` dicevano già, nella stessa pagina. Al suo posto «Non solo
  // social», che è l'unica delle tre a dire qualcosa che il resto della
  // pagina non dice.
  //
  // Anche «Di persona» era un'eco — «lavori sempre con noi due» sta già nel
  // `lead` e in `intro[0]` — ed è stata tenuta ma riempita: ora al posto del
  // principio ci sono i due impegni concreti che Dario ha dettato, un
  // appuntamento al mese e un aggiornamento al giorno.
  values: [
    {
      title: "Non solo social",
      body: "I social sono la punta dell'iceberg: dietro ci sono siti, marchi e packaging. La competenza viene da anni di lavoro, non da un corso di tre mesi.",
    },
    {
      title: "Di persona",
      body: "Un appuntamento fisso ogni mese con te, e un aggiornamento dedicato ogni giorno. Non devi rincorrere nessuno per sapere a che punto siamo.",
    },
    {
      title: "A numero chiuso",
      body: "Accettiamo pochi clienti per volta. È così che restiamo presenti e curiamo davvero ogni dettaglio.",
    },
  ],
  buildTitle: "Cosa costruiamo",
  buildBody: "Quattro delle cose che facciamo più spesso, ognuna con la sua pagina. L'elenco completo sta nella pagina dei servizi.",
  featured: ["Siti web", "Social", "Advertising", "Branding"],
};

// — Domande frequenti. Stavano dentro `prova/page.tsx`, quindi esistevano in
// un punto solo e non erano riusabili. Ora vivono qui e le leggono in due:
// la pagina `/faq`, che le mostra tutte, e la sezione in fondo a `/prova`,
// che mostra **solo quelle con `trial`** — lì si parla della prova gratuita,
// e le domande sull'agenzia sarebbero fuori tema.
//
// Sui prezzi non c'è una cifra: non ne esiste una vera da scrivere, e
// inventarla su un sito è una dichiarazione pubblica sbagliata.
type FaqItem = { q: string; a: string; trial?: boolean };

export const faq: FaqItem[] = [
  {
    q: "Cos'è Dielle Communication?",
    a: "Una boutique marketing agency di Napoli fondata da Luisa Panariello e Dario De Sisto. Seguiamo pochi clienti per volta, di persona, dal primo giorno all'ultimo.",
  },
  {
    q: "Chi ci lavora?",
    a: "Noi due, e basta. Luisa è la CEO e si occupa di branding, contenuti e della relazione con te; Dario è il creative director, oltre dieci anni fra Napoli e Londra fra web design e strategia. Non c'è un account fra te e chi esegue.",
  },
  {
    q: "Quanto costa?",
    a: "Non abbiamo un listino, perché non vendiamo pacchetti uguali per tutti: quello che serve a un ristorante non è quello che serve a uno studio professionale. Il preventivo arriva dopo la prima call, quando sappiamo di cosa stiamo parlando — e prima di quel momento non ti chiediamo niente.",
  },
  {
    q: "Come si comincia?",
    a: "Con una prova gratuita. Mezz'ora in cui ci racconti la tua attività e noi ti diciamo con sincerità se e come possiamo esserti utili.",
  },
  {
    q: "Quanto costa la prova?",
    a: "Niente. Il periodo di prova è gratuito: serve a farti capire come lavoriamo, senza rischi per te.",
    trial: true,
  },
  {
    q: "Devo lasciare i dati della carta?",
    a: "No. Nessuna carta, nessun rinnovo automatico, nessuna sorpresa.",
    trial: true,
  },
  {
    q: "E se poi non voglio continuare?",
    a: "Nessun problema. Se non ti convince, ci salutiamo: ci sei costati solo qualche giorno di lavoro.",
    trial: true,
  },
  {
    q: "Perché lo fate?",
    a: "Perché accettiamo pochi clienti e vogliamo lavorare bene con chi è davvero in linea con noi. La prova serve a capirlo, da entrambe le parti.",
    trial: true,
  },
  {
    q: "Dove lavorate?",
    a: "Da Napoli. Seguiamo di persona la Campania e lavoriamo da remoto in tutta Italia.",
  },
];

export const faqPage = {
  title: "Domande frequenti.",
  body: [
    "Tutto quello che di solito ci chiedono prima di cominciare:",
    "cosa facciamo, come lavoriamo e da dove si parte.",
  ],
  // Le domande sono divise in due gruppi, e il criterio è già nei dati: chi
  // ha `trial` parla della prova gratuita, gli altri dell'agenzia. Due
  // sezioni invece di un elenco unico da nove voci, così i fondi si
  // alternano come nel resto del sito e chi cerca solo la prova la trova.
  generalTitle: "Sull'agenzia",
  trialTitle: "Sulla prova gratuita",
};

// — Pagina /processo, ricalcata su leftclick.ai/process.
//
// Non è un doppione di `/metodo`, e la differenza va tenuta: `method` racconta
// **come lavoriamo** (l'approccio sartoriale, cinque passi); qui si racconta
// **cosa succede a te**, dal primo contatto alla partenza. Uno è la filosofia,
// l'altro è la procedura. Se le due pagine cominciano a dire la stessa cosa,
// va tolta una delle due, non pareggiate.
//
// Sui prezzi non c'è una cifra, come nella FAQ: non ne esiste una vera.
// I quattro passaggi «cosa succede quando ci contatti». Non hanno più una
// pagina propria: `/processo` è stata fusa dentro `/metodo` il 24 agosto
// 2026, per decisione di Dario. Le due pagine si sfioravano da sempre — una
// raccontava la filosofia, l'altra la procedura — e AGENTS.md avvertiva che
// prima o poi sarebbero diventate la stessa cosa. `/processo` rimanda a
// `/metodo` (vedi `next.config.ts`).
// Il dettaglio dei cinque passi, il confronto e il «perché funziona».
// Stavano scritti dentro `metodo/page.tsx`, contro la regola dei testi in un
// punto solo.
export const methodPage = {
  title: "Lavoriamo come un sarto, non come una catena.",
  body: "Niente pacchetti preconfezionati. Costruiamo la tua comunicazione su misura, un passo alla volta, e la seguiamo di persona dall'inizio alla fine.",
  stepsTitle: "I cinque passi",
  // Per ogni passo: cosa ottieni tu e quanto dura. Le chiavi sono le stesse
  // `n` di `method`.
  detail: {
    "01": { gain: "Ti senti capito, prima ancora di iniziare.", time: "1 incontro" },
    "02": { gain: "Sai dove stai andando e perché.", time: "1–2 settimane" },
    "03": { gain: "Hai strumenti coerenti e pronti all'uso.", time: "Su progetto" },
    "04": { gain: "Capisci cosa funziona, con numeri chiari.", time: "Continuo" },
    "05": { gain: "Cresci senza ripartire ogni volta da zero.", time: "Nel tempo" },
  } as Record<string, { gain: string; time: string }>,
  compareTitle: "Cosa cambia rispetto alle altre.",
  compareThem: "Agenzia tradizionale",
  compareUs: "Dielle Communication",
  compare: [
    { them: "Cambi referente di continuo", us: "Parli sempre con noi due, i fondatori" },
    { them: "Pacchetti uguali per tutti", us: "Una strategia cucita sulla tua realtà" },
    { them: "Tanti clienti, poca attenzione", us: "Pochi clienti, presenza vera" },
    { them: "Report pieni di numeri di vanità", us: "Solo le metriche che contano per te" },
  ],
  whyTitle: "Perché funziona.",
  why: [
    {
      title: "Presenza diretta",
      body: "Chi decide è chi lavora al tuo progetto. Niente telefono senza fine, niente versioni perse tra reparti.",
    },
    {
      title: "Numero chiuso",
      body: "Accettiamo pochi clienti per volta. È l'unico modo per restare davvero presenti e curare i dettagli.",
    },
    {
      title: "Continuità",
      body: "Non spariamo una campagna e via. Restiamo, misuriamo e miglioriamo, mese dopo mese.",
    },
  ],
};

export const processPage = {
  title: "Dalla prima call alla partenza.",
  body: [
    "Quattro passaggi, nessuna sorpresa in mezzo:",
    "sai sempre a che punto siamo e cosa succede dopo.",
  ],
  steps: [
    {
      n: "01",
      title: "Prova gratuita",
      body: "Mezz'ora insieme, gratuita e senza impegno. Ci racconti la tua attività, noi guardiamo come ti trovano oggi e dove si perdono i clienti. Alla fine ti diciamo con sincerità se possiamo esserti utili — anche quando la risposta è no.",
    },
    {
      n: "02",
      title: "Proposta",
      body: "Ti scriviamo cosa faremmo, in che ordine e con quali tempi, con un prezzo concordato prima di cominciare. Niente listini uguali per tutti e niente conteggio a ore: sai cosa ricevi e quanto costa.",
    },
    {
      n: "03",
      title: "Lavoro",
      body: "Costruiamo. Tu vedi le cose mentre nascono, non a fine progetto, e chi ti risponde è chi le sta facendo: siamo noi due, non c'è un account in mezzo.",
    },
    {
      n: "04",
      title: "Restiamo",
      body: "Finita la prima parte non spariamo. La tua comunicazione cresce con la tua attività, e a seguirla restano le stesse due persone che l'hanno costruita.",
    },
  ],
  expectTitle: "Cosa ti aspetta",
  expect: [
    "Parli sempre con chi esegue, mai con un intermediario.",
    "Vedi il lavoro mentre procede, non solo alla consegna.",
    // Qui c'era «il prezzo si concorda prima, non a lavoro finito». Tolta il
    // 25 agosto 2026: Dario preferisce dichiarare la flessibilità. L'impegno
    // sul prezzo non è sparito dal sito — resta nel passo «Proposta» di
    // `processPage`, dov'è al suo posto, cioè accanto al preventivo.
    "Sperimentiamo insieme e aggiustiamo nel tempo, non a piano fisso.",
    "Se non ti convince la prova, ci salutiamo senza costi.",
  ],
};

export const contactEmails = {
  // Chi scrive riceve subito una conferma: senza, resta nel vuoto e nel
  // dubbio di aver sbagliato qualcosa.
  replySubject: "Abbiamo ricevuto il tuo messaggio",
  replyGreeting: "Ciao",
  replyLines: [
    "Grazie per averci scritto: il tuo messaggio è arrivato a Dario e Luisa.",
    "Ti rispondiamo di persona entro un giorno lavorativo. Se nel frattempo preferisci parlarne a voce, puoi prenotare direttamente mezz'ora con noi.",
  ],
  replySignature: "Dario e Luisa — Dielle Communication",
  // Piè di pagina della conferma: marchio e profili social. Le icone leggono
  // da `social` (le voci con `brand`), quindi un profilo nuovo dell'agenzia
  // compare da sé anche qui, senza toccare la rotta.
  replyFollow: "Seguici",
  // Oggetto della notifica che arriva a noi.
  noticeSubject: "Nuova richiesta dal sito",
};

// Le immagini di un'email non viaggiano dentro il messaggio: il programma di
// posta le scarica, quindi servono indirizzi assoluti e raggiungibili da
// fuori. Oggi si punta al deploy su Vercel perché `dlcommunication.it` non è
// ancora collegato: il giorno in cui lo sarà, si cambia questa riga sola.
export const emailAssetsUrl = "https://diellecommunication.vercel.app";

// — Footer. Ripreso da leftclick.ai, il riferimento indicato da Dario: a
// sinistra l'invito con il pulsante, a destra le colonne di link, sotto una
// riga con marchio, note legali e copyright.
//
// La colonna «Servizi» punta tutta alla sezione dei servizi in home: le otto
// voci non hanno (ancora) una pagina propria. Il giorno in cui l'avranno,
// cambiano solo gli indirizzi qui sotto.
// Il footer, rifatto il 24 agosto 2026 dopo la ricerca sui concorrenti.
// Era 25 link su quattro colonne, oggi sono 12 in tutto.
//
// Cosa è uscito e perché:
// · le sei voci di «Servizi» puntavano tutte a `/#servizi` — sei etichette
//   diverse e una destinazione sola: per chi legge è una promessa non
//   mantenuta, per Google sei link che valgono zero. Ne resta una, e ora
//   porta a una pagina vera;
// · i tre articoli del blog: ci si arriva da «Blog», che è lì sopra;
// · «Contatti» compariva due volte, in due colonne diverse.
//
// I recapiti non sono più un link: stanno **nel blocco a sinistra**, sotto
// l'invito, scritti per esteso — email, WhatsApp e il luogo. Il footer è il
// posto dove la gente va apposta a cercarli, e per un'attività locale
// averli su ogni pagina conta anche per farsi trovare su Google.
// Li legge `site-footer.tsx` da `site`, non sono ricopiati qui.
export const footer = {
  kicker: "Lavoriamo insieme",
  lead: "Comincia con una consulenza gratuita: vediamo come ti trovano su Google e cosa serve per farti scegliere.",
  columns: [
    {
      title: "Agenzia",
      links: [
        { label: "Chi siamo", href: "/chi-siamo" },
        { label: "Il metodo", href: "/metodo" },
        { label: "Domande frequenti", href: "/faq" },
      ],
    },
    {
      title: "Lavoro",
      links: [
        { label: "Servizi", href: "/servizi" },
        { label: "Lavori", href: "/lavori" },
        { label: "Blog", href: "/blog" },
      ],
    },
    // Legge da `social` invece di ricopiare i profili: erano due elenchi
    // uguali in due punti, e sarebbe bastato aggiungerne uno solo di qua per
    // averli diversi.
    {
      title: "Seguici",
      links: social,
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Termini di servizio", href: "/termini" },
  ],
};

// — Pagine legali. Stessa forma degli articoli del blog: titolo, apertura e
// sezioni. Sono documenti che qualcuno leggerà davvero solo se scritti in
// italiano e non in legalese, quindi restano nel tono del resto del sito.
//
// ATTENZIONE: sono redatte con cura ma non sono state riviste da un legale, e
// mancano partita IVA e sede legale (vedi `company`). Prima di collegare il
// dominio vanno completate e fatte controllare.
export type LegalPage = {
  slug: string;
  title: string;
  updated: string;
  intro: string;
  body: { heading: string; paragraphs: string[] }[];
};

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "agosto 2026",
    intro:
      "Questa pagina spiega quali dati raccogliamo quando visiti il sito o ci scrivi, perché li raccogliamo e cosa puoi chiederci di farne. È scritta per essere letta, non per essere subita.",
    body: [
      {
        heading: "Chi tratta i tuoi dati",
        paragraphs: [
          "Il titolare del trattamento è DL Communication Società a Responsabilità Limitata Semplificata, con sede legale in Via Alcide De Gasperi 52, 80059 Torre del Greco (NA), partita IVA e codice fiscale 10867811217, iscritta al Registro Imprese di Napoli al numero REA NA - 1137783. È la società di Dario De Sisto e Luisa Panariello.",
          "Per qualsiasi domanda su questa pagina o sui tuoi dati puoi scriverci a commercialedlcommunication@gmail.com, oppure via posta certificata a dl-communication@pec.it: risponde una persona, non un modulo.",
        ],
      },
      {
        heading: "Quali dati raccogliamo",
        paragraphs: [
          "Quelli che ci dai tu. Se compili il modulo dei contatti raccogliamo nome, email, messaggio e, se li inserisci, nome dell'attività e settore. Se prenoti una call raccogliamo nome, email e l'orario che hai scelto.",
          "Quelli tecnici. Come ogni sito, il nostro fornitore di hosting registra dati di connessione — indirizzo IP, tipo di browser, pagine viste, data e ora. Servono a far funzionare il sito e a difenderlo da abusi, non a profilarti.",
          "Non raccogliamo altro. Non compriamo liste di contatti, non ti chiediamo dati che non ci servono e non ti iscriviamo a nulla senza che tu lo chieda.",
        ],
      },
      {
        heading: "Perché li trattiamo",
        paragraphs: [
          "Per risponderti e, se decidiamo di lavorare insieme, per prepararti una proposta: la base giuridica è l'esecuzione di misure precontrattuali richieste da te (art. 6.1.b del GDPR).",
          "Per tenere in piedi il sito e la sua sicurezza: qui la base è il nostro legittimo interesse a che il sito funzioni e non venga usato per fare danni (art. 6.1.f).",
          "Per rispettare obblighi di legge, quando ce ne sono — per esempio quelli fiscali, se diventi cliente (art. 6.1.c).",
        ],
      },
      {
        heading: "A chi finiscono",
        paragraphs: [
          "A nessuno che non ci serva per lavorare. I tuoi dati passano dai fornitori che usiamo per far girare il sito e la posta: Vercel Inc. per l'hosting, Cal.com Inc. per le prenotazioni, Google LLC per la casella email. Ognuno di loro tratta i dati per nostro conto e con le garanzie previste per i trasferimenti fuori dall'Unione Europea.",
          "Non vendiamo i tuoi dati e non li cediamo a terzi per scopi pubblicitari. Mai.",
        ],
      },
      {
        heading: "Per quanto tempo li teniamo",
        paragraphs: [
          "Le richieste che non diventano un progetto le conserviamo per due anni, poi le cancelliamo: ci servono a ricordarci di chi ci ha scritto e cosa ci siamo detti. I dati dei clienti li teniamo per il tempo del rapporto e per i dieci anni che la legge impone alle scritture contabili. I registri tecnici del sito durano pochi mesi.",
        ],
      },
      {
        heading: "Cookie",
        paragraphs: [
          "Questo sito non usa cookie di profilazione, non ha strumenti di analisi del traffico e non ti segue da un sito all'altro. Non c'è nessuna finestra da accettare perché non c'è nulla da accettare. Se un domani aggiungeremo strumenti di misurazione, questa pagina lo dirà prima.",
        ],
      },
      {
        heading: "Cosa puoi chiederci",
        paragraphs: [
          "Puoi chiederci di vedere i dati che abbiamo su di te, di correggerli, di cancellarli, di limitarne l'uso, di riceverli in un formato leggibile da un altro servizio, e puoi opporti al trattamento. Basta una mail a commercialedlcommunication@gmail.com: ti rispondiamo entro un mese, di solito molto prima.",
          "Se pensi che stiamo sbagliando puoi rivolgerti al Garante per la protezione dei dati personali (garanteprivacy.it). Ma prima scrivici: quasi sempre si risolve parlando.",
        ],
      },
      {
        heading: "Se questa pagina cambia",
        paragraphs: [
          "La aggiorneremo quando cambia qualcosa di sostanziale in come trattiamo i dati, e in cima troverai sempre la data dell'ultima revisione.",
        ],
      },
    ],
  },
  {
    slug: "termini",
    title: "Termini di servizio",
    updated: "agosto 2026",
    intro:
      "Le regole d'uso di questo sito, in poche righe e senza legalese. Riguardano la consultazione del sito, non i contratti di lavoro con i clienti: quelli si firmano a parte.",
    body: [
      {
        heading: "Cos'è questo sito",
        paragraphs: [
          "È il sito vetrina di DL Communication S.r.l.s., con sede legale in Via Alcide De Gasperi 52, 80059 Torre del Greco (NA), partita IVA 10867811217. Racconta chi siamo, come lavoriamo e cosa abbiamo fatto per i nostri clienti. Consultarlo è libero e gratuito.",
        ],
      },
      {
        heading: "Quello che leggi non è un contratto",
        paragraphs: [
          "Le descrizioni dei servizi, i casi studio e il periodo di prova gratuito sono informazioni, non un'offerta vincolante ai sensi dell'art. 1336 del codice civile. Ogni collaborazione nasce da una proposta scritta e concordata caso per caso: è il senso stesso di lavorare su misura.",
          "Il periodo di prova gratuito è quello che dice di essere: un tempo concordato insieme in cui lavoriamo su qualcosa di concreto, senza vincoli e senza carta di credito. Durata e contenuto si stabiliscono nella prima call.",
        ],
      },
      {
        heading: "Di chi sono i contenuti",
        paragraphs: [
          "Testi, immagini, grafiche e codice di questo sito sono nostri o li usiamo con il permesso di chi li ha fatti. Puoi citarli indicando la fonte; non puoi riprodurli per scopi commerciali senza chiedercelo prima.",
          "I marchi dei clienti e degli strumenti che vedi nominati appartengono ai rispettivi titolari, e compaiono qui solo per raccontare con chi e con cosa lavoriamo.",
        ],
      },
      {
        heading: "I link verso altri siti",
        paragraphs: [
          "Il sito rimanda ai siti dei nostri clienti e ai servizi che usiamo. Su quei siti non abbiamo controllo: quello che contengono e come trattano i tuoi dati è responsabilità loro.",
        ],
      },
      {
        heading: "Fin dove rispondiamo",
        paragraphs: [
          "Curiamo il sito con attenzione, ma non possiamo garantire che sia sempre raggiungibile né che ogni informazione resti aggiornata al minuto. Non rispondiamo dei danni derivanti dall'uso del sito, salvo i casi di dolo o colpa grave, che la legge non permette di escludere.",
        ],
      },
      {
        heading: "Quale legge vale",
        paragraphs: [
          "Si applica la legge italiana. Per ogni controversia è competente il foro di Napoli, salvo che tu sia un consumatore: in quel caso vale il foro del tuo luogo di residenza o domicilio, come prevede il Codice del consumo.",
        ],
      },
      {
        heading: "Come contattarci",
        paragraphs: [
          "Per qualsiasi cosa riguardi questa pagina scrivi a commercialedlcommunication@gmail.com.",
        ],
      },
    ],
  },
];

export function getLegalPage(slug: string): LegalPage | undefined {
  return legalPages.find((p) => p.slug === slug);
}

// — Ragione sociale, per le note legali e il copyright.
// TODO: aggiungere partita IVA e sede legale — una privacy policy deve
// identificare per intero chi tratta i dati, e oggi ci sono solo nome e mail.
// I dati societari, presi dalla visura camerale della Camera di Commercio di
// Napoli (estratta il 22 settembre 2025). Non sono dati riservati: la visura
// è pubblica e questi dati per legge devono comparire sul sito.
//
// **Due correzioni rispetto a quello che il sito diceva prima**, e sono
// dichiarazioni pubbliche, quindi contano:
//
// 1. la forma societaria è **S.r.l.s.** — società a responsabilità limitata
//    *semplificata* — non S.r.l. Nel footer c'era «S.r.l.», che è una società
//    diversa. Scritto in fondo a ogni pagina del sito;
// 2. la sede legale è a **Torre del Greco**, non a Napoli. «Napoli» resta
//    giusto come racconto — Torre del Greco è in provincia di Napoli e il
//    lavoro si fa lì intorno — ma l'indirizzo postale è quello vero, ed è
//    quello che va nei dati strutturati e nella scheda Google. Dichiarare
//    Napoli come indirizzo sarebbe falso e farebbe sospendere la scheda.
export const company = {
  legalName: "DL Communication S.r.l.s.",
  // Per esteso come sta in visura: serve nelle pagine legali, dove
  // l'abbreviazione non basta a identificare la società.
  legalNameFull:
    "DL Communication Società a Responsabilità Limitata Semplificata",
  vatId: "10867811217",
  // Per le S.r.l.s. codice fiscale e partita IVA coincidono.
  taxId: "10867811217",
  rea: "NA - 1137783",
  pec: "dl-communication@pec.it",
  address: {
    street: "Via Alcide De Gasperi 52",
    postalCode: "80059",
    city: "Torre del Greco",
    province: "NA",
    region: "Campania",
    country: "IT",
  },
  rights: "Tutti i diritti riservati.",
};

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
  { name: "AdaTech", href: "https://www.ada-tech.it/" },
  { name: "BandoHub", href: "https://bandohub.it/" },
  { name: "Voice Concierge", href: "https://voiceconcierge.it/" },
  { name: "Parsec 3.26", href: "https://www.parsec326.it/" },
  { name: "CoffeeWorld", href: "https://www.coffeeworld.it/" },
  { name: "EverUp", href: "https://everup.co.uk/" },
  { name: "I Testa", href: "https://itesta.it/" },
  // NinjaStickers non ha più un sito d'azienda: le card sono in vendita su
  // OpenSea, ed è lì che il lavoro si vede ancora.
  { name: "NinjaStickers", href: "https://opensea.io/collection/ninjastickers" },
  { name: "Central Padel", href: "https://www.centralpadel.it/" },
  { name: "Glam & Go London", href: "https://www.glamgolondon.co.uk/" },
  {
    name: "Torre del Greco Città del Corallo",
    href: "https://www.torredelgrecocittadelcorallo.it/",
  },
  { name: "Gate42", href: "https://gate42.it/" },
  { name: "Voice Office", href: "https://voiceoffice.it/" },
];

// ————————————————————————————————————————————————————————————————
// Dati strutturati (schema.org)
// ————————————————————————————————————————————————————————————————
//
// Descrivono l'agenzia a Google in modo che non debba dedurla dalle frasi.
// Per una ricerca locale — «agenzia marketing Napoli» — è il segnale che
// pesa di più fra quelli che stanno dentro il sito.
//
// **L'indirizzo è quello vero della visura: Torre del Greco, non Napoli.**
// Google confronta quello che si dichiara qui con la scheda Google
// dell'attività e con quello che trova altrove in rete: se i dati non
// combaciano il segnale si indebolisce invece di rafforzarsi, e una scheda
// con un indirizzo che non corrisponde può essere sospesa. «Napoli» resta
// nella zona servita e nel racconto del sito, dove è vero; nell'indirizzo
// no.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organizzazione`,
    name: site.name,
    legalName: company.legalName,
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    image: `${siteUrl}/opengraph-image.png`,
    email: site.email,
    telephone: `+${site.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressRegion: company.address.province,
      addressCountry: company.address.country,
    },
    vatID: `IT${company.vatId}`,
    taxID: company.taxId,
    description:
      "Boutique marketing agency di Napoli: siti web, social, advertising e branding, seguiti di persona dai fondatori.",
    slogan: site.tagline,
    areaServed: [
      { "@type": "City", name: "Napoli" },
      { "@type": "AdministrativeArea", name: "Campania" },
      { "@type": "Country", name: "Italia" },
    ],
    founder: [
      { "@type": "Person", name: "Luisa Panariello", jobTitle: "CEO" },
      { "@type": "Person", name: "Dario De Sisto", jobTitle: "Creative director" },
    ],
    // I profili ufficiali: servono a Google per collegare il sito alle
    // pagine social e capire che parlano della stessa azienda.
    sameAs: social.filter((s) => s.brand).map((s) => s.href),
    knowsLanguage: ["it"],
  };
}

// Il percorso Home › Servizi › Siti web che compare sotto il titolo nei
// risultati di ricerca. `voci` è una lista di {name, path} dal generale al
// particolare, home esclusa: la mette questa funzione.
export function breadcrumbSchema(voci: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...voci].map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: v.name,
      item: `${siteUrl}${v.path === "/" ? "" : v.path}`,
    })),
  };
}
