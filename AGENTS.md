<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Dielle Communication — sito

Sito vetrina di una boutique marketing agency di Napoli, fondata da Dario De Sisto
e Luisa Panariello. Posizionamento sartoriale: pochi clienti seguiti di persona,
strategia su misura, prova gratuita come porta d'ingresso.

Il sito parla a due tipi di visitatore: chi pensa che il marketing non serva, e chi
ci ha già provato senza risultati. Il tono è diretto e concreto, senza gergo da
agenzia e senza promesse gonfiate.

## Comandi

```bash
pnpm dev     # sviluppo su localhost:3000
pnpm build   # build di produzione (verifica anche i tipi TypeScript)
pnpm lint    # ESLint
```

## Stack

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · pnpm.
Rendering interamente statico (SSG); deploy su Vercel.
L'unica rotta dinamica è `/api/contact`, ed è corretto che lo sia.

## Regola principale: i testi stanno in `src/lib/site.ts`

Tutto il contenuto editoriale — testi, servizi, metodo, lavori, articoli del blog,
testimonianze, contatti — è centralizzato in quel file. I componenti leggono da lì.

**Non scrivere testi dentro i componenti.** Se serve una nuova frase, va aggiunta a
`site.ts` ed esposta al componente. Così il cliente può rivedere i contenuti in un
punto solo, senza toccare il codice.

## Struttura

- `src/app/page.tsx` — la home, composta accostando i componenti di sezione in ordine
- `src/app/<pagina>/page.tsx` — pagine autonome: **servizi, lavori, chi-siamo,
  contatti** (le quattro della barra), più **metodo, faq, blog, privacy,
  termini** (`prova` non c'è più: rimanda alla sezione della prova sulla home)
- `src/app/lavori/[slug]`, `src/app/blog/[slug]` e `src/app/servizi/[slug]` —
  pagine generate una per voce tramite `generateStaticParams`: basta
  aggiungere un elemento a `work`, a `posts` o il campo `page` a un servizio
  in `site.ts` e la pagina nasce da sola
- `src/components/` — un componente per sezione, più tre trasversali:
  `cta.tsx` (gli inviti all'azione), `reveal.tsx` (le comparse allo scroll) e
  `stats.tsx` (la riga di numeri, che vive **dentro** l'apertura, non come
  sezione a sé)
- `public/work/`, `public/social/`, `public/tools/` — immagini dei progetti e loghi
- `public/logo.svg` — il marchio, usato da intestazione e footer
- `public/email-logo.png`, `public/email-instagram.png`, `public/email-linkedin.png`
  — le immagini della firma in fondo alla mail di conferma (vedi «Posta»)
- `src/app/icon.svg`, `src/app/favicon.ico`, `src/app/apple-icon.png`,
  `src/app/opengraph-image.png` — icone e anteprima social. Sono **convenzioni
  di file di Next**: basta che il file si chiami così e stia in `src/app/`,
  i tag `<link>` e `<meta>` li scrive Next da sé. Non aggiungerli a mano in
  `layout.tsx`.

Gli strumenti della sezione «Progettiamo con» stanno nell'array `TOOLS` dentro
`src/components/tools.tsx` (non in `site.ts`: sono loghi, non testo). L'ordine
conta — è quello con cui le tessere si aprono a ventaglio — e il numero nel
pallino arancione si conta da sé, non va aggiornato a mano. Oggi sono dieci:
Claude, Cursor, Antigravity, Visual Studio Code, Premiere, Illustrator,
Lightroom, WordPress, Shopify, Ubersuggest. In `public/tools/` restano anche
`photoshop.svg`, `figma.svg` ed `elementor.svg`, non più in elenco: basta
rimetterli nell'array per farli tornare.

## Le pagine interne: impianto a fasce alternate

Vale per **`/servizi`, `/servizi/<slug>`, `/chi-siamo`, `/metodo`, `/faq` e
`/contatti`**. È una richiesta esplicita di Dario, nata guardando leftclick.ai
(`what-is-leftclick`, `process`, `faq`, `contact`), il riferimento che ha
indicato. Dall'alto:

1. **apertura a gradiente** — la classe `.surface-glow`, la stessa
   dell'apertura della home, con `min-h-[58svh]` e il contenuto centrato:
   solo titolo e sottotitolo, corti. Non è alta quanto lo schermo come la
   home — chi arriva qui ha già cliccato, non va convinto a scorrere;
2. **una sezione in tinta unita `bg-navy-deep`** — il contenuto della pagina;
3. **una seconda sezione di nuovo a gradiente** (`.surface-glow`), e così via
   alternando;
4. **`<Contact />`**, il modulo della home — il componente, non una copia.

`/contatti` ha due fasce invece di tre: sopra il modulo non c'è altro da dire,
e inventare una sezione per pareggiare il conto vorrebbe dire scrivere testo
che non serve a nessuno.

Ne segue una regola pratica: **nella parte alta non ripetere email, luogo e
social**, perché sono già nella sezione sotto e finirebbero due volte nella
stessa schermata. Per questo l'elenco di `/contatti` porta solo le tre cose
che il modulo non dice — prenotazione, WhatsApp e tempi di risposta.

**Il blu della fascia in tinta unita è `navy-deep` (`#1e2530`), ed è una
scelta di Dario presa indicando una sezione della home** — «Progettiamo con».
C'era stato un passaggio per `#282f3f`, per far vedere meglio lo stacco fra
l'apertura e la fascia; Dario l'ha guardato e l'ha scartato: «è un blu che non
esiste nella home page». Vale la regola generale, e vale più della
demarcazione: **niente colori nuovi, solo quelli che il sito già usa.**

Ne segue una conseguenza da conoscere, non da correggere: **a tema scuro lo
stacco fra apertura e fascia è quasi invisibile**, perché `--p-glow` finisce
esattamente in `navy-deep` ai bordi — stesso identico pixel, misurato. È la
stessa cosa che succede sulla home fra una sezione e l'altra. A tema chiaro
invece lo stacco si vede, perché lì il gradiente è bianco pieno e la fascia è
`#f0f0f2`. Se un giorno lo stacco dovesse servire anche sullo scuro, la strada
non è un blu nuovo: è una riga sottile o un cambio di ritmo verticale.

**Su `/chi-siamo` i capoversi della descrizione hanno tutti la stessa
formattazione** — stessa misura, stesso colore, stessa interlinea — e sono
generati da un unico blocco (`[lead, ...intro]`). Prima il primo era più
grande e più acceso degli altri due: a tema chiaro la differenza saltava
all'occhio e Dario ha chiesto di pareggiarli. Se aggiungi un capoverso non
dargli una classe sua.

Su `/faq` le domande sono divise in due gruppi, e il criterio è già nei dati:
chi ha `trial` sta in «Sulla prova gratuita», gli altri in «Sull'agenzia».
Nessun elenco scritto a mano da tenere allineato. Le legge anche la sezione in
fondo a `/prova`, che filtra **solo quelle con `trial`** — lì si parla della
prova gratuita, e le domande sull'agenzia sarebbero fuori tema.

**Sui prezzi non c'è nessuna cifra**, né nella FAQ né sulle pagine dei
servizi. Il riferimento le scrive («from $5K»), noi no: un listino vero non
esiste, e inventarne uno su un sito è una dichiarazione pubblica sbagliata. La
risposta è che il preventivo arriva dopo la prima call.

## Le due fusioni del 24 agosto 2026, e perché non vanno disfatte

Quel giorno una ricerca sui concorrenti (quindici siti, conteggio dei link
sull'HTML pubblicato) ha portato Dario a prendere cinque decisioni. Due
riguardano le pagine, e sono fusioni:

- **`/dl-communication` → `/chi-siamo`.** Raccontavano la stessa cosa in due
  posti. I due testi sono stati fusi in `aboutPage`: niente è andato perso.
- **`/processo` → `/metodo`.** Si sfioravano da sempre — una la filosofia,
  l'altra la procedura — e questo file avvertiva già che sarebbero diventate
  la stessa pagina. Ora la differenza è dichiarata dalla struttura: prima i
  cinque passi di **come lavoriamo**, poi i quattro passaggi di **cosa
  succede a chi ci contatta** (che erano `/processo`, e vivono ancora in
  `processPage`).

**I due indirizzi vecchi non sono spariti: rimandano** (`redirects` in
`next.config.ts`, 308 permanente). Erano pubblicati e Google li aveva già
visti; senza rimando risponderebbero «pagina non trovata» a chi ci arriva da
una ricerca o da un link salvato. Non toglierli.

## La pagina dei lavori

**Ricalcata su `leftclick.ai/case-studies`**, il riferimento indicato da
Dario. Prima era divisa in due sezioni — «tre storie per esteso» e «e poi
tutti gli altri» — e Dario ha chiesto di toglierle: **una griglia sola con
tutti i lavori disposti.** Non rimetterle.

**Su `/lavori` il modulo dei contatti sta sul gradiente**, non sulla tinta
unita: `<Contact glow />`. Serve perché la griglia qui sopra è già
`bg-navy-deep`, e due fasce uguali attaccate si fondono in una sola — il
modulo sembrerebbe la coda della griglia invece di una sezione a sé. È la
stessa regola dell'alternanza che vale in tutto il sito, non un'eccezione.
Richiesta di Dario. **Vale anche su `/metodo`**, da quando è uscita la
sezione «Perché funziona» e sopra il modulo è rimasta la tabella di confronto,
che è in tinta unita. Sulle altre pagine `<Contact />` resta in tinta unita,
perché lì sopra ha una sezione a gradiente. La regola non è «quale pagina»: è
**guarda la sezione sopra e prendi l'altro fondo**.

**Si chiama «Lavori», non «Portfolio».** Valutato e scartato da Dario il 24
agosto 2026. «Portfolio» è gergo da agenzia, e il tono di voce del sito dice
esplicitamente di non usarne; il cliente che deve chiamare dice «fammi vedere
i lavori». È anche la parola che usano i concorrenti col megamenu — AT ADV,
e26, Kynetic — cioè quelli da cui Dielle si sta distinguendo, mentre il
riferimento scrive «Our work». Vale per l'etichetta e per l'indirizzo
`/lavori`.

**La scheda** (`src/components/work-card.tsx`, usata dalla griglia e dalla
sezione della home) ha le misure del riferimento: riquadro **4:3**, il nome
sotto, e **una riga sola** che dice *com'è finita*.

**Quella riga è `outcome`, e non è un elenco di consegne.** È la differenza
fra «Rebranding, social, email marketing e ufficio stampa» — un elenco della
spesa, che Dario ha giustamente bocciato — e «Da un'immagine che non
raccontava la cucina a una comunicazione che va avanti tutto l'anno». Sul
riferimento sono tutte così: «Regional PPC shop to $2M/yr revenue». Se una
riga elenca cosa avete fatto invece di dire cosa è cambiato, è sbagliata.

Sul riferimento la riga è troncata a **una** riga con i puntini. Qui sono due
(`line-clamp-2`) perché l'italiano è più lungo e troncare a metà frase si
vede: se una riga ne occupa tre, **riscrivila più corta**, non allargare il
limite.

**La pagina del singolo lavoro** (`/lavori/<slug>`) è ricalcata su
`leftclick.ai/case-studies/<slug>`, con le misure prese dal loro foglio di
stile — non a occhio:

- **apertura a due colonne.** A sinistra un pannello largo il **28,6%**
  (`bg-cream/[0.06]`, angoli `rounded-2xl`) con il ritorno indietro in alto e
  la frase di riassunto in basso, tenuti ai due estremi da
  `justify-between`; a destra l'immagine che riempie il resto. Sotto i
  1024px si impilano.
- **corpo a due colonne.** A sinistra una scheda con le pillole dei servizi,
  **stessa larghezza del 28,6%** — è quell'allineamento a tenere insieme le
  due fasce; a destra il nome, la riga di inquadramento e le tre sezioni.
- **le tre sezioni sono schede**, e **la prima è invertita**: sul riferimento
  «Outcomes» ha fondo chiaro e testo scuro mentre le altre due sono spente.
  Qui è `bg-cream text-navy`, e funziona in tutti e due i temi perché i due
  token si scambiano — a tema chiaro `cream` diventa blu scuro e `navy`
  diventa bianco, quindi la scheda **resta invertita** rispetto alla pagina
  invece di sparirci dentro. Non sostituirla con un colore fisso.
- le voci degli elenchi sono separate da **filetti**, non da pallini.

**Il link al sito del cliente compare due volte, e l'etichetta è il
dominio.** In alto un link discreto sotto le pillole, in fondo — dopo «Cosa
abbiamo fatto» — un pulsante vero: chi ha appena letto cosa è stato fatto è
nel momento in cui vuole andare a vederlo. Il doppio passaggio è quello di
Locomotive, che ripete il link tre volte lungo la pagina.

**L'etichetta è `nomedominio.it`, non «vedi il sito del cliente»**: Instrument
scrive «Visit OuraRing.com», Locomotive «ageofunion.com». Dire *dove* si va
vale più di dire che si può andare, e chi naviga con un lettore di schermo
sente la destinazione invece di una formula buona per qualsiasi link. Il
dominio si ricava da `href`; `hrefLabel` serve solo quando il link **non** è
il sito del cliente — oggi solo NinjaStickers, che non ha un sito
raggiungibile e punta al portfolio di Dario.

**L'ordine è Risultati · Il problema · Cosa abbiamo fatto, e non va
cambiato.** Sul riferimento è così: chi apre la pagina vuole sapere com'è
andata, non ascoltare la premessa. Se ti sembra illogico, è perché lo è — e
funziona lo stesso.

**Tutti e sedici i lavori hanno la loro pagina**, e questo è un requisito di
Dario: nessuna scheda della griglia deve portare direttamente fuori dal sito.

**I testi sono stati scritti uno per uno con Dario**, il 24 agosto 2026, sulle
sue note vocali. Tre regole emerse strada facendo, che valgono per i prossimi:

- **i dettagli verificabili si verificano prima di scriverli.** Indirizzi presi
  dai siti dei clienti, anni confermati da Dario, l'acquisizione di
  NinjaStickers letta sull'annuncio di Animoca Brands (23 settembre 2020), lo
  stack di BandoHub controllato sulle intestazioni HTTP. Su AdaTech il
  controllo ha smentito la memoria — vedi il commento nella sua scheda — e la
  riga tecnica è stata tolta invece che riscritta meglio;
- **i tempi verbali dicono se il rapporto è vivo.** Presente per i clienti in
  corso («Gestiamo», «Curiamo»), passato per i progetti chiusi. Taverna 'e
  Mare è al passato con «collaborazione a progetto» nell'inquadramento, e
  **senza nessuna frase che annunci la fine**: un lavoro a progetto che
  finisce è la normalità, non una notizia;
- **niente gergo, nemmeno tecnico.** «Mockup» è diventato «copertine»,
  «template» è diventato «modelli». E niente numeri inventati: dove i dati
  non ci sono, i risultati dicono *cosa il cliente adesso ha* — che è vero e
  verificabile;
- **e niente numeri misurati una volta sola.** La scheda Voice Office diceva
  «risponde in due decimi di secondo», ripetuto anche nella riga `outcome`.
  Tolto il 25 agosto 2026 su richiesta di Dario: era un numero preso una volta
  che dipende dalla rete di chi guarda, dice qualcosa a un tecnico e niente a
  un imprenditore. Al suo posto **il motivo** per cui il sito è veloce —
  «nessun server ricostruisce la pagina a ogni visita, quindi si apre appena la
  si chiede» — che resta vero sempre. La regola generale: se un dettaglio
  tecnico non regge la domanda «e allora?», si sostituisce con il meccanismo,
  non si cancella e basta.
Il link al sito del cliente c'è, ma **dentro** la pagina del caso studio, non
al posto suo. Se aggiungi un lavoro, aggiungi anche `study`: senza, la scheda
diventa un link esterno e il requisito salta.

Il filtro `work.filter(w => w.study)` resta in `generateStaticParams` e in
`sitemap.ts`: **se lo cambi in uno, cambialo nell'altro**, o la mappa consegna
a Google indirizzi che rispondono «pagina non trovata» — è già successo.

**Le pillole dicono cosa è stato fatto lì, non la categoria del servizio.**
Riscritte tutte e diciotto il 25 agosto 2026, ed è la correzione più utile
fatta al portfolio.

Com'era: San Pietro, Namare e Taverna 'e Mare avevano **la stessa identica
lista di otto voci** — la prima scritta bene, le altre due ereditate — e le
restanti quindici erano fatte di categorie generiche: «Branding · Siti web ·
Advertising · Social · SEO». Dario se n'è accorto guardando due schede
affiancate.

**Riordinarle non è bastato**, ed è la parte da ricordare: le stesse otto
parole in ordine diverso si leggono ancora uguali. Il problema non era la
sequenza, era che *«Social · Siti web · Advertising»* è una scritta che sta
bene su qualunque scheda di qualunque agenzia — quindi non dice niente di
nessuna.

Ora ogni etichetta è presa dal «Cosa abbiamo fatto» di quella pagina, una per
una: «Software per il menù», «Card dei piloti MotoGP», «Carta del Docente»,
«Cartellonistica stradale», «Casa d'aste», «Sito in un file solo». Novanta
etichette diverse su diciotto schede, e **nessuna coppia di schede con la
stessa lista**. Le poche che si ripetono sono quelle che si ripetono davvero
nel lavoro — «Marchio illustrato» su cinque schede, «Presidio quotidiano» su
tre.

**Regola per le prossime**: apri il «Cosa abbiamo fatto», prendi da lì, e
tieni ogni voce in due o tre parole. Non copiare dalla scheda accanto: è più
veloce, ed è esattamente il modo in cui diciotto lavori diventano diciotto
volte lo stesso elenco.

**E quando una voce sembra di troppo si chiede, non si toglie.** «Ufficio
stampa» era uscito da Namare perché non compariva nelle note vocali; Dario ha
confermato che va lasciato. Una pillola in meno è un lavoro che non risulta
fatto.

**Prima di scrivere le pillole di una scheda nuova, leggi il suo «Cosa abbiamo
fatto» e prendi da lì.** Una lista copiata è più veloce da scrivere ed è
esattamente il motivo per cui il portfolio smette di dimostrare qualcosa.

**Il registro dei testi è corporate**, su richiesta di Dario dopo una prima
stesura troppo colloquiale. Vuol dire: lessico professionale e preciso, niente
modi di dire, il problema descritto in terza persona e il lavoro in prima
plurale («Abbiamo progettato…»). **Non vuol dire gergo**: la regola del tono di
voce — niente paroloni da agenzia — resta valida. E non vuol dire elenchi: la
riga `outcome` deve continuare a dire cosa è cambiato.

**Le immagini: mai ingrandire.** Le prime le avevo scelte da solo con una
regola meccanica (la più vicina al 4:3 sopra gli 800px) e due sono state
portate da 849px a 1200, cioè **stirate del 41%**: Dario le ha viste sgranate
e aveva ragione. Regola: **originale ad almeno 1600px di lato lungo, scelto
dal cliente**, altrimenti niente immagine — la tessera col nome in grande è
meglio di una foto stirata. Attenzione anche al taglio: gran parte di questi
lavori sono mockup e schermate, e il 4:3 li decapita.

**Come sono attribuiti, e non è un dettaglio.** Molti progetti sono precedenti
alla nascita della società (29 luglio 2025) e alcuni sono stati fatti a Londra
dentro le aziende committenti. Il nastro dice **«Dario e Luisa hanno lavorato
con»**, ed è la formula corretta. Non trasformarla in «i progetti
dell'agenzia».

**Il nastro e la pagina non dicono la stessa cosa.** Il nastro dice *con chi*,
la pagina dice *cosa è cambiato*. E c'è una ragione tecnica per tenerli
separati: il nastro è testo dentro un'animazione, Google non lo legge come
portfolio.

## Le pagine dei servizi

`/servizi` è l'elenco completo, e **ogni voce ha la sua pagina**: Siti web,
Social, Content & email, Advertising, Branding, Reputazione, Community & PR,
Analytics e **Intelligenza artificiale**. Il campo che le accende è `page` in
`services` (`site.ts`); `generateStaticParams` genera la pagina da sé e la
mappa del sito la raccoglie da sé.

**La nona, «Intelligenza artificiale & automazioni», è nata il 25 agosto 2026
già con la sua pagina**, ed è la prova che la regola funziona: il giorno prima
il problema era proprio un servizio senza destinazione. Risponde parola per
parola a un'obiezione della home — «pago tanti servizi come menù e portali di
prenotazione, e non so se mi servono davvero» — arrivata lo stesso pomeriggio.
**Se riscrivi una delle due, guarda anche l'altra**: è l'unico punto del sito
dove un dubbio e la sua risposta sono stati scritti insieme.

**Erano quattro fino al 25 agosto 2026**, e la scelta di fermarsi a quattro
era motivata — meglio poche pagine con testi veri che otto riempite di
parole. È caduta quando Dario ha guardato l'elenco e ha detto che «alcuni
servizi non portano a nessuna pagina»: **un elenco in cui metà delle voci
sono cliccabili e metà no non si legge come una scelta, si legge come un sito
rotto.** Ha ragione, ed è anche il motivo per cui non conviene aggiungere una
nona voce senza scriverne la pagina.

C'è un vantaggio in più, fuori dal sito: una pagina che parla di una cosa
sola si posiziona su Google, un elenco di otto voci no. Otto pagine sono otto
ricerche diverse su cui farsi trovare in Campania.

**Il controllo `s.page ? ... : ...` resta**, e non è ridondante ora che tutti
ce l'hanno: un servizio aggiunto in fretta senza testi deve restare testo,
invece di mandare qualcuno su una pagina vuota.

**Nei testi non si contano.** Home, apertura di `/servizi` e descrizione per
Google dicevano tutte e tre «otto» — «Otto fronti», «Otto cose» — e Dario le
ha fatte togliere il 25 agosto 2026: un numero piccolo fa sembrare l'offerta
un catalogo corto, e non è nemmeno vero, perché la stessa voce copre lavori
molto diversi fra loro. Ora si dice **«tante possibilità»**. Il conteggio
resta dov'è utile: nei commenti del codice e in questo file.

`metaTitle` e `metaDescription` di ogni servizio portano **il luogo**
(«a Napoli»): è una ricerca locale, e quelle parole le scrivono le persone.

Le schede della home e quelle di «Cosa costruiamo» in `/chi-siamo` diventano
un link **solo** per i servizi che hanno `page`. Il controllo è
`s.page ? ... : ...`, non un elenco di indirizzi scritto a mano.

«Cosa costruiamo» su `/chi-siamo` continua a mostrarne **quattro** (`featured`
in `aboutPage`): è una vetrina delle più richieste, non l'elenco completo, e
chi vuole tutto va su `/servizi`.


## Le due schede del problema

Nella home, la sezione «Probabilmente ti riconosci in una di queste due
situazioni» (`problems` in `site.ts`, `problem.tsx`) ha due schede con una
didascalia e un elenco di frasi. **I due pezzi fanno mestieri diversi, e il 25
agosto 2026 non lo facevano**: la didascalia elencava le obiezioni e i punti
sotto le ripetevano una per riga. Dario se n'è accorto — chi legge faceva lo
stesso percorso due volte.

Come stanno ora: **la didascalia dice come si sente chi legge, i punti sono le
frasi che dice.** Ne segue la regola pratica: **se un punto si può ricavare
leggendo la didascalia, non è un punto, è un'eco** — si riscrive la
didascalia, non si accorciano i punti.

**Tutti e otto i punti, in tutte e due le schede, sono frasi vere** — cose
che Dario si sente dire in prima call, raccolte il 25 agosto 2026. Non è stato
così dall'inizio: la prima scheda («Non sono sicuro che serva») ne aveva tre
scritte a tavolino, ed è stata svuotata una riga per volta nell'arco dello
stesso pomeriggio, man mano che Dario ne mandava di vere.

**Quando ne arriva una, prende il posto della più debole, non si aggiunge.**
È la regola che ha portato qui: «pago tanti servizi come menù e portali di
prenotazione» ha sostituito «il marketing mi sembra inutile», «avrei tanto da
dire, ma nessuno me lo chiede mai» ha sostituito «i social sono tutti uguali»,
e «su Google non esco» ha sostituito «le agenzie vendono solo fumo».

**Guarda cosa si è guadagnato ogni volta.** Le tre scritte a tavolino
dicevano tutte la stessa cosa — *il marketing non serve* — cioè il titolo
della scheda ripetuto tre volte. Le tre vere dicono tre cose diverse e
verificabili: *sto già pagando strumenti che non so se mi servono*, *ho una
storia e nessuno me l'ha mai chiesta*, *non mi trovano*. E ognuna ha una
risposta altrove nel sito: il servizio di intelligenza artificiale, il primo
passo del metodo («Ti ascoltiamo»), la pagina Reputazione.

**«Tanto vale che me lo faccia da solo» sta nella seconda scheda, non nella
prima.** Sembra la frase dello scettico e non lo è: Dario ha precisato che la
sente **sempre legata alla non soddisfazione**, mai al dubbio di partenza, e
attaccata a «ho pagato tanto e senza risultati». Per questo le due metà stanno
su una riga sola: spezzate perdono il nesso fra la spesa senza ritorno e la
rinuncia che ne segue.

**Prova già fatta, da non rifare: verosimile non basta.** Le frasi inventate a
tavolino per riempire la prima scheda («il passaparola mi è sempre bastato»,
«chi entra qui non arriva da Instagram») erano credibili e sono state tolte lo
stesso giorno. La sezione funziona se chi legge riconosce una cosa che ha
pensato davvero: due punti veri valgono più di tre di cui uno è scritto a
tavolino, e le due schede restano alte uguali comunque — la griglia le pareggia
e `mt-auto` tiene gli elenchi appoggiati in basso.

**L'ordine dei cinque punti non è casuale**, e le ultime due righe salgono di
gravità: prima «Pago, ma nessuno risponde ai clienti», poi «Non mi sento
seguito». Non sono la stessa cosa detta due volte — la prima costa incassi al
cliente, la seconda gli fa cambiare agenzia. Chiudere sulla seconda lascia in
mano l'obiezione a cui il sito risponde meglio.

**Dettaglio di scrittura da non annullare**: il punto sulla spesa dice «**Ho
speso** tanto e senza risultati», non «ho pagato», perché il punto sui clienti
comincia con «**Pago**» — e due righe su cinque che attaccano con la stessa
parola si leggono come una svista. Se riscrivi una delle due, ricontrolla
l'altra.

**Oltre i cinque punti non si va.** A quel punto smette di essere un elenco di
frasi e diventa un muro di testo: se ne arriva una nuova più forte, si toglie
la più debole invece di allungare.

## La fascia dei numeri sotto l'apertura

Sono i quattro dati di `stats` in `site.ts`, e li disegna `stats.tsx` dentro
l'apertura, non come sezione a sé. Oggi: **10+ anni di esperienza multicanale ·
18 brand seguiti · 2 referenti fissi · 0 pacchetti preconfezionati.**

Tre delle quattro etichette sono state riscritte il 25 agosto 2026, e ognuna
per un motivo diverso:

- **«anni di mestiere» → «anni di esperienza multicanale».** Richiesta di
  Dario. Aveva proposto anche «esperienza nel marketing a 360 gradi»: scartata,
  perché «360 gradi» è la formula da agenzia per eccellenza e il tono di voce
  del sito dice di non usarne — oltre a essere ciò che dicono le agenzie a
  volume, cioè quelle da cui Dielle si distingue. Anche «in diversi ambiti» è
  caduto: è quello che *multicanale* già dice.
- **«10 brand seguiti» → «18».** Non era un arrotondamento, era un errore: la
  pagina `/lavori`, due schermate più sotto, ne mostra diciotto. La riga
  smentiva il sito. **Se aggiungi o togli un lavoro, rifai questo numero.**
- **«persone, sempre le stesse» → «referenti fissi».** Dario voleva che si
  capisse *hai un punto di riferimento*, non *sono sempre le stesse facce*. La
  parola è scelta apposta: `aboutPage` dice che nelle agenzie strutturate «il
  cliente cambia referente di continuo», e ora le due frasi si rispondono.

**Le etichette vanno tenute corte.** Le quattro voci stanno su una riga sola
larga `max-w-3xl`: oggi sommano ~82 caratteri, che è già al limite. Una
etichetta lunga (era stata valutata «brand seguiti, da zero o in corsa») manda
la riga a capo e spinge i pulsanti dell'apertura sotto la piega su un 13".

## Chi siamo: i valori e le schede dei fondatori

**I valori sono tre e devono restare tre**: la griglia di `chi-siamo/page.tsx`
è `sm:grid-cols-3`, una quarta voce resterebbe da sola su una riga sua. Oggi:
**Non solo social · Di persona · A numero chiuso.**

Rifatti il 25 agosto 2026, perché Dario ha notato che due dei tre ripetevano
cose già scritte nella stessa pagina:

- **«Su misura» è uscita.** Diceva «niente pacchetti uguali per tutti», che il
  sottotitolo dell'apertura («una strategia costruita su misura», «nessun
  pacchetto preconfezionato») e `notBody` («non vendiamo listini uguali per
  tutti») dicevano già. Tre volte in una schermata e mezza.
- **al suo posto «Non solo social»**, dettata da Dario: i social sono la punta
  dell'iceberg, la competenza viene da anni di lavoro e non da un corso di tre
  mesi. È l'unica delle tre a dire qualcosa che il resto della pagina non dice,
  ed è anche vera guardando `/lavori` — dentro «Siti web» ci sono un
  e-commerce WooCommerce e un sito costruito con l'IA, dentro «Branding» il
  packaging di un vino e l'illustrazione di una scatola di giochi.
- **«A numero chiuso» dichiara l'esclusiva di zona**, aggiunta il 25 agosto
  2026 su richiesta di Dario: *se sei aperto al pubblico, non seguiamo un tuo
  concorrente nello stesso territorio*, e *le persone vengono prima dei
  numeri*. **È una promessa contrattuale, non un modo di dire**, e compare in
  tre punti che devono restare d'accordo: qui, nella pastiglia sotto la
  sezione della prova (`trial.reassurance`, quindi anche sulla home) e nella
  domanda «Lavorate anche con i miei concorrenti?» della FAQ — che finisce
  pure nei dati strutturati. Se cambia la promessa, cambiano tutti e tre.

  **La condizione «se sei aperto al pubblico» è scritta e non sottintesa**, ed
  è voluta: un e-commerce o un prodotto digitale non hanno una zona da
  difendere, e promettere l'esclusiva anche a loro sarebbe una promessa vuota.

- **«Di persona» è stata tenuta ma riempita.** Era un principio già detto nel
  `lead` e in `intro[0]`; ora porta i due impegni concreti dettati da Dario —
  **un appuntamento fisso al mese, un aggiornamento dedicato ogni giorno** — e
  chiude su «non devi rincorrere nessuno per sapere a che punto siamo», che
  risponde parola per parola all'obiezione «Non mi sento seguito» della home.

  Da sapere: quella non è un valore, è una **promessa di servizio**, e un
  cliente può chiederne conto. È stata scritta sapendolo.

**La scheda di Dario non parla più solo di siti.** La citazione diceva
«Costruisco il tuo **sito** come fosse l'ingresso della tua attività», ed era
smentita da `/lavori`, dove metà dei progetti sono marchi, packaging, insegne e
illustrazioni. Ora dice **«Costruisco la tua immagine»**, e l'elenco — sito,
marchio, packaging, insegne — sta nella biografia sotto, non dentro la
citazione: **una frase che elenca non si cita.** Il dato è uno solo
(`founders` in `site.ts`) e lo leggono sia la home sia `/chi-siamo`.

**Su `/metodo` l'impegno sul prezzo sta in un punto solo: il passo
«Proposta» di `processPage`**, cioè accanto al preventivo, che è il momento in
cui uno se lo chiede. Non rimetterlo anche in fondo.

C'era stato in un elenco intitolato «Cosa ti aspetta» — «il prezzo si concorda
prima, non a lavoro finito» — sostituito il 25 agosto 2026 da «sperimentiamo
insieme e aggiustiamo nel tempo, non a piano fisso», scelta di Dario. **Quella
frase esiste ancora, l'elenco no**: è entrata nel passo «Restiamo», dove la
promessa vale davvero. Vedi la sezione sulle ripetizioni qui sotto.

## Il blog, per ora spento

**«Blog» è nel footer, scritto, ma non si clicca.** Richiesta di Dario del 25
agosto 2026: «il blog poi lo faremo più in là». Il campo che lo spegne è
`disabled: true` sulla voce in `footer.columns`; `site-footer.tsx` la disegna
come testo al 30% invece che come link.

Il motivo: tre articoli fermi accanto a diciotto casi studio non dicono
«scriviamo», dicono «abbiamo smesso». Un blog fermo è l'unica parte di un sito
che invecchia da sola, e finché non riparte è meglio non mandarci nessuno.

**Prima era stato tolto del tutto, ed era la lettura sbagliata della stessa
richiesta.** Togliere la voce faceva sparire anche l'informazione che un blog
esiste, e lasciava la colonna «Lavoro» con due voci su tre. Spegnerla dice
tutte e due le cose: c'è, e non è ancora il momento.

**Una voce spenta è un `<span>`, non un `<a>` reso inerte.** Un link con
`pointer-events: none` resta annunciato come link da un lettore di schermo e
resta raggiungibile col tabulatore: promette qualcosa che non succede.
`aria-disabled` lo dice a chi ascolta, il colore a chi guarda.

**Niente è stato cancellato.** Gli articoli restano in `posts`, le rotte
`/blog` e `/blog/[slug]` esistono e si costruiscono, `inner-cta.tsx` continua
a chiuderle. Togliere `disabled` riaccende tutto.

**Le pagine restano nella mappa del sito, ed è voluto.** Chi le trova su
Google trova contenuto vero: toglierle butterebbe via un posizionamento già
guadagnato per una decisione dichiaratamente temporanea. Nella mappa è stato
però corretto `changeFrequency`, che prometteva un aggiornamento settimanale
inesistente: adesso è `"yearly"`. **Se il blog riparte, si tolgono `disabled`
e si rimette `"weekly"`**: sono le due righe che si accendono insieme.

**`src/components/blog.tsx` resta codice morto**: non lo importa nessuno, e
ricopia titolo e sottotitolo di `/blog`.

## Le ripetizioni, e la regola per riconoscerle

Il 25 agosto 2026 Dario ha chiesto un controllo su dove il sito si ripete.
Il posizionamento — pochi clienti, niente pacchetti, nessun account in mezzo,
si comincia con una call gratuita — è giusto che torni su pagine diverse: è
quello che il sito vende. **Il problema nasce quando due formulazioni della
stessa promessa cadono nella stessa schermata**, perché lì chi legge fa due
volte lo stesso percorso e la seconda volta smette di crederci.

È la regola che era già scritta per le due schede del problema — *se un punto
si ricava leggendo il testo accanto, non è un punto, è un'eco* — applicata al
resto del sito. Cosa è uscito:

**`/metodo` diceva le stesse quattro cose tre volte.** La pagina aveva sei
sezioni: apertura, i cinque passi, i quattro passaggi + un elenco «Cosa ti
aspetta», la tabella di confronto, «Perché funziona», il modulo. Le tre di
mezzo giravano tutte intorno allo stesso quartetto — parli con chi esegue,
pochi clienti, niente pacchetti, metriche vere:

| il concetto | passi | confronto | «Perché funziona» |
|---|---|---|---|
| parli con chi esegue | `steps[2]` | `compare[0]` | «Presenza diretta» |
| pochi clienti | — | `compare[2]` | «Numero chiuso» |
| niente pacchetti | `steps[1]` | `compare[1]` | (già nell'apertura) |
| metriche vere | `method[04]` | `compare[3]` | — |

Sono usciti **`processPage.expect`** e **`methodPage.why`**, e con loro
`expectTitle`, che non era nemmeno mai stato stampato — l'elenco compariva
senza intestazione. **La tabella è rimasta perché è l'unica delle tre a dire
qualcosa che le altre non dicono: il confronto con l'alternativa.** Restano
quattro sezioni, e il modulo è passato a `<Contact glow />` per l'alternanza.

**La sezione del modulo non rivende più la call.** `contact.tsx` diceva «una
chiacchierata gratuita, senza impegno: ti diciamo con sincerità se e come
possiamo aiutarti», e sulla home arriva **due sezioni dopo** quella della
prova, che la stessa promessa l'ha già fatta per esteso. La stessa frase
tornava sei volte in tutto il sito (`trial.steps[0]`, `inner-cta.tsx`,
`aboutPage.intro[2]`, la FAQ «Come si comincia?», `processPage.steps[0]`).
Ora dice **cosa succede dopo che scrivi**: «Raccontaci in due righe cosa ti
serve e a che punto sei. Leggiamo noi due e ti rispondiamo entro un giorno
lavorativo.»

Quel «entro un giorno lavorativo» è **un impegno di servizio, non una frase**,
e sta in tre punti che devono restare d'accordo: qui, in `contactPage.details`
di `/contatti` e nella mail di conferma (`contactEmails`). Se cambia, cambiano
tutti e tre — stessa meccanica dell'esclusiva di zona.

**I testi dei due moduli sono passati in `site.ts`**, in `contactSection` e
`innerCta`. Erano scritti dentro `contact.tsx` e `inner-cta.tsx`, contro la
regola dei testi in un punto solo, ed erano **la stessa frase in due file**:
titolo identico, corpo diverso di due parole. `innerCta` ha tenuto il taglio
vecchio ed è giusto così — sta in fondo a un articolo o a un caso studio, dove
la call non l'ha ancora proposta nessuno, e porta al calendario invece che a
un modulo. **Le due sezioni non compaiono mai nella stessa pagina**: se un
giorno succedesse, il titolo uguale si vedrebbe.

**Quello che non è stato toccato, e perché.** L'esclusiva di zona nei tre
punti dichiarati resta com'è: è una promessa contrattuale, e ripeterla è il
punto. La FAQ che ricalca `/chi-siamo` resta: è una pagina di risposte, deve
reggersi da sola. E «il marketing non si subisce, si fa insieme» resta in due
posti (home e apertura di `/metodo`), com'era già dichiarato.

## La pagina della prova, e perché non c'è più

`/prova` è uscita dal sito il 25 agosto 2026, per decisione di Dario.
L'indirizzo **rimanda alla sezione della prova sulla home** (`/#prova`, 308
permanente in `next.config.ts`).

Aveva due problemi insieme. **Nessun link ci portava**: non stava nella barra,
non stava nel footer, non la nominava nessuna pagina — c'era solo nella mappa
del sito, quindi la trovava Google e non i visitatori. E **quello che diceva
era già sulla home**: titolo e sottotitolo erano la sezione `<Trial />`
ricopiata a mano, i passi erano gli stessi `trial.steps`, la FAQ in fondo era
il sottoinsieme `trial` di `/faq`.

**Prima il rimando puntava al calendario, ed è stato cambiato subito.** Vale
la pena sapere perché, perché è la stessa regola che governa i pulsanti:
chi arriva da una ricerca non sa ancora cosa starebbe prenotando, e mandarlo
dritto su Cal.com è chiedergli fiducia prima di avergli spiegato di cosa si
tratta. È il motivo per cui il pulsante dell'apertura porta a `#prova` e non
al calendario. Ora chi cercava la prova gratuita atterra dove gliela
spieghiamo, con il pulsante per il calendario lì sotto.

**Due cose da non dimenticare quando si toglie una pagina**, ed è successo
qui:

- **l'indirizzo va tolto anche da `sitemap.ts`.** Una mappa che consegna a
  Google un indirizzo che rimanda altrove è un segnale sprecato — stessa
  regola già scritta per i lavori senza caso studio;
- **l'ancora deve esistere.** `/#prova` funziona perché la sezione `<Trial />`
  sulla home ha `id="prova"`. Se un giorno quella sezione cambia id o esce
  dalla home, questo rimando porta in cima alla pagina e nessuno se ne
  accorge.

**Quello che c'era di unico è stato salvato**, non buttato: le due liste
«È per te se…» e «Non è per te se…» sono passate in `trial` dentro `site.ts`.
Non sono in pagina oggi — stanno lì come i dati delle testimonianze. Dicono a
chi la prova serve e a chi no, e non stanno scritte da nessun'altra parte del
sito; «Non è per te se…» in particolare fa lo stesso mestiere del «Cosa non
facciamo» delle pagine dei servizi, che è la parte che fa fidare chi ci ha già
provato senza risultati. Il resto della pagina è andato via senza perdite,
perché era già altrove.

Con lei sono usciti anche i due difetti che ci erano stati trovati il giorno
prima — la descrizione per Google che diceva ancora «nessuna carta richiesta»,
e la colonna «Cosa non ti chiediamo» che stampava `trial.reassurance` con una
✕, cioè dichiarava di **non** offrire l'esclusiva di zona. Restano scritti qui
perché sono due modi tipici di rompersi: **un testo per Google che nessuno
rilegge**, e **un elenco condiviso che cambia significato quando cambiano i
dati che legge**.

## La vetrina dei lavori sulla home

`work.tsx` mostra **tre** lavori fra i servizi e la prova gratuita, più un
pulsante verso `/lavori`. Rimessa in piedi il 25 agosto 2026, dopo che Dario
ha chiesto se mancasse qualcosa alla home: mancava questo. Il nastro nominava
diciotto clienti e poi la pagina non ne mostrava **nemmeno uno** — chi non
conosceva Dielle arrivava in fondo senza aver visto una prova, e il componente
era rimasto lì come codice morto da quando `/lavori` è diventata una griglia
sola.

**I tre in vetrina sono San Pietro, Central Padel e CoffeeWorld**, e non sono
i più belli: sono **tre mestieri diversi** — ristorazione, sport, vendita —
così chi arriva ha buone probabilità di riconoscersi in uno. Se cambi la
selezione, guarda `sectors` prima di scegliere: è l'elenco dei settori che il
modulo dei contatti propone, e la vetrina dovrebbe somigliargli.

**I Testa era il terzo ed è uscito lo stesso giorno, non per il lavoro ma
perché il suo sito è in rifacimento.** La scheda porta alla pagina interna, che
porta al sito del cliente: mandare la home su un cantiere non conviene né a
Dielle né a lui. Quando il sito nuovo è online si può rimettere, e la vetrina
tornerebbe a coprire anche il beauty. **Vale come regola**: la vetrina è la
parte del sito che manda traffico fuori più in fretta, quindi prima di
metterci un lavoro si guarda com'è messo il sito del cliente oggi.

**Tre e non di più.** La home deve far venire voglia di aprire `/lavori`, non
sostituirla; e tre entrano in una riga sola sul desktop. La selezione è un
elenco di slug in cima al componente, e se uno non esiste il build si ferma
invece di mostrare una griglia con un buco.

La scheda è la stessa di `/lavori` (`work-card.tsx`): un componente solo, come
deve essere.

## Le testimonianze: fuori dal sito, non cancellate

**Dal 25 agosto 2026 le recensioni dei clienti non compaiono da nessuna
parte**: `<Testimonials />` è uscita dalla home su richiesta di Dario. Il
componente `testimonials.tsx` e l'array `testimonials` in `site.ts` restano
dove sono, e non sono da cancellare: il giorno in cui arrivano recensioni vere
basta rimettere una riga in `page.tsx` (e riportare la prova a
`.surface-glow` e i contatti a `<Contact />`, vedi l'alternanza dei fondi).

**Perché era giusto toglierle.** Le firme erano di persone vere — Mariano
Panariello, Angelo Arrichiello — ma **il testo delle citazioni no**: era
quello editoriale scritto per il sito, e nessuno lo aveva mai confermato.
Parole messe in bocca a persone identificabili. È lo stesso principio per cui
le frasi inventate sono uscite dalle schede del problema: verosimile non
basta.

**Le misure delle firme restano descritte più sotto** (`text-[0.62rem]`,
`tracking-[0.01em]`, la firma principale a `text-[0.8rem]`): non sono
istruzioni morte, servono il giorno in cui la sezione torna. Se torna con
citazioni più lunghe, il conto dei caratteri va rifatto.

## Design

I token sono definiti in `src/app/globals.css`, dentro il blocco `@theme`.

**Gabbia e ritmo verticale** (misurati su leftclick.ai a 1440px): il contenuto
sta nella classe **`.shell`** — largo 87,5% con un tetto di 1260px, quindi 90px
di margine per lato — e ogni sezione ha **108px** di imbottitura sopra e sotto,
messi dalla classe **`.section-y`**. Le sezioni non mettono imbottitura
laterale: ci pensa la gabbia. Non tornare a `max-w-7xl` con `px-6 sm:px-10`.

**`py-[108px]` non si scrive più a mano**: la misura sta in `.section-y` dentro
`globals.css`, ed è fissa a 108px solo da circa 1360px in su. Sotto si stringe
con `clamp` — 64px sul telefono, ~78 sul tablet verticale, ~91 a 1024. Il
desktop è identico a prima; il perché della scala sta in «Mobile e tablet» più
sotto.

Palette in uso: blu `#282f3f` (token `navy`, è il fondo), arancio `#f49619`
(`saffron`, **l'unico accento**), bianco caldo `#f7f7f3` (`cream`), più due blu di
servizio — `navy-deep` `#1e2530` per i fondi bassi e `navy-ink` `#0f141b` per le
fasce che devono staccare — oggi il nastro dei clienti e il footer, che
chiudono la pagina più scuri di tutto ciò che hanno sopra. Usa sempre i token,
mai i codici colore scritti a mano.

Il verde `#4eb480` (`mint`) **non va usato per nessuna superficie del sito**: su
richiesta di Dario è stato sostituito ovunque dall'arancione. Non reintrodurlo
senza chiederglielo.

Unica eccezione, e non è una deroga: **l'anello del marchio è verde**, ed è
quel verde lì. Il logo è un file del cliente, non una scelta di stile del
sito — vale la stessa regola dei loghi altrui (il verde di WhatsApp, i colori
degli strumenti). Che il verde ricompaia a schermo attraverso il logo non
autorizza a rimetterlo altrove.

## Il marchio

Il logo è un **emblema tondo**: disco blu `#282f3f`, anello verde `#4eb480`,
la «d» e la «l» in arancione `#f49619` e la parola «communication» in
verticale fra le due lettere. Non è un lockup orizzontale e **non contiene il
nome scritto per esteso**.

Un disegno solo serve tre posti, così non possono divergere:

| dove | file | misura |
|---|---|---|
| intestazione | `public/logo.svg` | mostrato a **64px** |
| footer | `public/logo.svg` | mostrato a **56px** |
| linguetta del browser | `src/app/icon.svg` (+ `favicon.ico`) | tavola 512×512 |
| schermata Home iPhone | `src/app/apple-icon.png` | 180×180 |

**Le misure sono due, e la differenza è voluta.** Un marchio tondo si legge
più piccolo di quanto misura — a parità di altezza un cerchio porta meno
inchiostro di una scritta — e su richiesta di Dario è stato ingrandito
rispetto ai 32px di partenza.

Nel footer sta a **56px**, nella barra a **64px**. Che nella barra sia più
grande che nel footer è voluto: è il primo posto in cui si guarda, e Dario ha
chiesto due volte di ingrandirlo, accettando esplicitamente che la barra ne
risenta.

Fino a 33px il marchio non pesa nulla, perché la riga è già alta così per via
della pillola «Richiedi consulenza gratuita»; da lì in su è il logo a dettare l'altezza e la
barra cresce con lui — a 64px la riga misura 61px, e l'intestazione tutta 136px
(36 di imbottitura + 64 + 36). Se lo alzi ancora, controlla a occhio che
l'apertura resti intera su un portatile da 13": è quella la misura che si
consuma, non un numero astratto.

La misura si passa con la prop **`size`** (in pixel), non con una classe:
`size-[${n}px]` costruita a pezzi non verrebbe generata da Tailwind.

**Il marchio non si muove al passaggio del mouse**, né in intestazione né nel
footer: niente ingrandimento, niente transizione. È una richiesta esplicita di
Dario. `logo.tsx` non ha più né `group` né `group-hover:scale-105`: se li
rimetti, il movimento torna in tutti e due i posti, perché il componente è uno
solo.

**Non serve una versione chiara e una scura**: l'emblema si porta dietro il
proprio fondo, quindi regge sia sul blu sia sul bianco. È anche il motivo per
cui funziona come favicon senza ritocchi: su una linguetta scura non sparisce.

**Gli SVG di Illustrator vanno ripuliti prima di entrare in `public/`.**
Quelli consegnati pesavano **773 KB l'uno**: dentro c'era un blocco
`<metadata>` con il file Illustrator incorporato (`i:aipgf`, zstd/base64), che
serve solo a riaprire il vettore coi livelli e al browser non serve a niente.
Tolto quello si scende a **7,5 KB** con gli stessi 17 tracciati. Se arriva un
logo nuovo, controlla il peso: sopra i 50 KB c'è quasi sicuramente quel
blocco.

**L'anteprima social** (`src/app/opengraph-image.png`, 1200×630) è oggi il
marchio su fondo bianco. Funziona, ma è spoglia: quando ci sarà tempo, meglio
un fondo blu con una riga di claim.

## Due temi: scuro e chiaro

Il sito ha un **interruttore chiaro / scuro** in basso a destra
(`theme-toggle.tsx`). Il tema è un attributo `data-theme` sull'elemento `html`;
da lì scendono le due tavolozze definite in cima a `globals.css`.

A **tema chiaro** i due blu che si alternano diventano due chiari, con lo stesso
ritmo: **bianco puro `#ffffff`** dove c'era il gradiente, **`#f0f0f2`** dove
c'era la tinta unita. Il testo diventa `#282f3f`, cioè il blu del marchio: a
tema scuro fa da fondo, a tema chiaro fa da inchiostro. L'arancione non cambia
mai: è il marchio, non una superficie.

**La gerarchia del testo, e perché la base chiara non è il blu del marchio.**
Tutto il sito costruisce la gerarchia con le trasparenze: titolo pieno,
sottotitolo al 65%, micro-etichette al 45%. Ma una stessa percentuale su fondo
chiaro sbiadisce molto più che su fondo scuro — il 55% rende 4,9:1 di contrasto
sul blu e appena 3,3:1 sul bianco. Tenendo `#282f3f` come base, a tema chiaro i
livelli bassi si sarebbero persi.

Per questo la base del tema chiaro è un blu più profondo (`#141a26`), che
riporta ogni livello vicino al contrasto che ha nel tema scuro, e il **testo
pieno** viene riportato a mano al blu del marchio con `--p-title` (due righe in
fondo a `globals.css`). I titoli sono quindi esattamente `#282f3f` come chiesto
da Dario, e sotto la scala resta leggibile invece di svanire. Se cambi
`--p-cream` del tema chiaro, rifai il conto dei contrasti: è quello che tiene
insieme la gerarchia, non un colore scelto a occhio.

**Trappola già caduta una volta.** `@theme` dichiara i nomi `--color-*` **solo
su `:root`**, e una variabile che contiene `var()` viene risolta sull'elemento
dove è dichiarata, non dove viene usata: scende ai figli già risolta. Quindi
ridefinire le `--p-*` su una sezione non bastava — `--color-navy-ink` era stata
risolta in cima e arrivava al footer col valore del tema di pagina. Il footer
inchiodato al tema scuro restava chiaro, e il markup sembrava giusto.

Per questo **ogni blocco di tema ridichiara anche i nomi `--color-*`**, non
solo le `--p-*`: così ogni elemento che porta `data-theme` le risolve per conto
suo. Se aggiungi un token nuovo, aggiungilo in tutti e tre i posti — le due
tavolozze e `@theme` — o l'inchiodatura non funzionerà per quel colore. E
verificalo **guardando il colore a schermo**, non l'attributo nel markup: è
esattamente così che l'errore era passato.

**Come funziona, e perché è fatto così.** I token dentro `@theme` non
contengono un colore: puntano a variabili `--p-*` ridefinite per tema. Sembra
un giro inutile, non lo è. Se contenessero il colore, Tailwind lo
risolverebbe in fase di compilazione e tutte le trasparenze — `text-cream/65`,
`border-cream/10`, quelle che tengono in piedi il sito — resterebbero
inchiodate al tema scuro anche a tema chiaro attivo. Passando dalla variabile,
Tailwind emette `color-mix(var(--color-cream) 65%, transparent)` e la
trasparenza segue il tema. **Non rimettere i colori diretti in `@theme`.**

Ne segue la regola pratica: **usa sempre i token, mai `white/10` o un colore
scritto a mano.** `border-white/10` non cambia col tema e a tema chiaro
sparisce; `border-cream/15` funziona in tutti e due.

**Tre fasce restano scure anche a tema chiaro, per scelta di Dario: gli
strumenti («Progettiamo con…»), i contatti («Parliamo del tuo progetto») e il
footer.** Sono inchiodati con `data-theme="dark"` sulla sezione: lo stesso
attributo che sta su `html` si può mettere su qualunque elemento e vale per il
suo sottoalbero. Lo usano anche il pannello del menu (bianco con testo blu in
tutti e due i temi), la pillola arancione piena, che non deve cambiare mai, e
l'interruttore stesso: è fisso in basso a destra e a fine pagina si trova
sopra il footer, quindi se seguisse il tema chiaro lì sparirebbe.

**Il testo evidenziato** (`::selection`, in fondo a `globals.css`) è
**`#5d7aa3` con testo avorio**, uguale nei due temi. Era l'arancione del
marchio: Dario l'ha trovato troppo forte e ha indicato quello di leftclick.ai.

Il seguito serve a non rifare il giro: **leftclick.ai non ha nessuna regola
`::selection`** — scaricato il loro foglio di stile, zero occorrenze. Quel blu
non è una loro scelta, è il colore predefinito del browser, che cambia col
sistema operativo di chi guarda e con la tinta d'accento che ha impostato.
Togliere la regola non avrebbe copiato leftclick: avrebbe consegnato il colore
al computer del visitatore. Per questo il valore è scritto a mano, misurato
sul pixel dello screenshot. Sfondo e testo sono tutti e due fissi perché a
tema chiaro `cream` diventa blu scuro e non avrebbe contrasto su
quell'azzurro; così com'è rende 4,1:1.

Per il **testo sopra l'arancio** esiste un token a parte, `ink` (`#282f3f`),
che non segue il tema: `text-navy` a tema chiaro diventa bianco, e il bianco
sull'arancio non si legge.

Per provare i due temi senza cliccare, e per mandare un link a colpo sicuro,
l'indirizzo accetta **`?theme=light`** e **`?theme=dark`**: lo legge lo stesso
script che decide il tema all'apertura, e ha la precedenza sulla scelta
salvata.

**Il pulsante WhatsApp non apre WhatsApp: apre un riquadro.** Richiesta di
Dario del 24 agosto 2026, ed è anche la scelta giusta — un pulsante che porta
fuori dal sito senza avvisare è un salto nel buio: chi lo tocca da telefono si
ritrova in un'altra applicazione senza aver capito con chi sta per parlare. Il
riquadro fa da anticamera (dice chi risponde e in quanto tempo) e solo il
secondo clic apre la chat. Si chiude con Esc, con la «×» e cliccando fuori.
I testi stanno in `site.whatsappPanel`, non nel componente. I verdi sono
quelli ufficiali di WhatsApp — `#25D366` e `#1da851` al passaggio del mouse —
per la stessa ragione per cui il simbolo lo era già.

Accanto all'interruttore, alla sua sinistra e sulla stessa riga, c'è il
**pulsante WhatsApp** (`whatsapp-button.tsx`): apre una chat col numero del
brand e un messaggio già scritto, così a Dario e Luisa arriva anche
l'informazione che il contatto viene dal sito. Numero e messaggio stanno in
`site.ts`, non nel componente. La pastiglia è la stessa dell'interruttore, ma
il simbolo è nel **verde ufficiale di WhatsApp** (`#25D366`), su richiesta di
Dario: è un'eccezione voluta alla regola dell'arancione unico accento, dello
stesso tipo del fondo bianco sotto i loghi degli strumenti — è un marchio
altrui, e i marchi altrui si riportano nel loro colore. **Non è il verde
`mint` del brand**, che resta fuori dal sito: non prendere questo come
permesso di rimetterlo. Anche questo pulsante è inchiodato al tema scuro, per
lo stesso motivo dell'interruttore.

L'interruttore **non tiene stato in React**: legge e scrive l'attributo, e
quale icona mostrare lo decide il CSS a partire dallo stesso attributo. Con lo
stato ci sarebbe un disallineamento fra la pagina generata dal server, che il
tema non lo sa, e quella che trova il browser. Il primo tema lo mette uno
script dentro `layout.tsx` **prima** che la pagina si disegni: senza, a ogni
caricamento si vedrebbe un lampo del tema sbagliato. Alla prima visita si
segue l'impostazione del sistema operativo di chi guarda.

Carattere: **uno solo per tutto il sito**, la pila di sistema
(`ui-sans-serif, system-ui, …`), cioè il font dell'interfaccia del dispositivo di
chi guarda: San Francisco su Mac e iPhone, Segoe UI su Windows, Roboto su
Android. Nessun font viene scaricato: `layout.tsx` non carica più Michroma,
Inter e JetBrains Mono.

I tre token `--font-sans`, `--font-serif` e `--font-mono` puntano tutti alla
stessa pila, quindi la gerarchia si costruisce con dimensione e peso, non
cambiando famiglia. La classe `display` resta il gancio per i titoli
(interlinea stretta, tracking -0.025em) e `kicker` per le micro-etichette
maiuscole spaziate.

**Dove porta «Richiedi consulenza gratuita»**: a **Cal.com**, il servizio di
prenotazione appuntamenti (lo stesso impianto di leftclick.ai, il riferimento
indicato da Dario). L'indirizzo (oggi
`cal.com/dlcommunication/30min`) sta in un punto solo — `booking.url` in
`site.ts` — e da lì lo leggono tutti i pulsanti: sezione della prova, barra
fissa su mobile, CTA di chiusura delle pagine interne e i due pulsanti della
pagina `/prova`.

**L'etichetta sta anch'essa in un punto solo: `booking.label`.** Il 25 agosto
2026 è passata da «Richiedi la prova gratuita» a **«Richiedi consulenza
gratuita»**, su richiesta di Dario, e la riga sola ha cambiato tutti e dieci i
posti in cui compare — intestazione, apertura, sezione della prova, footer,
barra fissa su mobile, CTA interne, i due pulsanti di `/prova` e il pulsante
dentro la mail di conferma. Non scriverla a mano da nessuna parte.

**Ne resta un disallineamento dichiarato, non una svista**: il pulsante dice
«consulenza», mentre la sezione a cui porta, la pagina `/prova`, l'ancora
`#prova` e il gruppo di domande «Sulla prova gratuita» dicono ancora
«prova gratuita». Dario ha chiesto di cambiare **il pulsante**, non il nome
dell'offerta. Rinominare anche l'offerta è un intervento più grosso — tocca
una rotta pubblicata, e quindi vuole un rimando 308 come quelli di
`/dl-communication` e `/processo` — e va fatto solo se lo chiede lui.

**Due eccezioni: il pulsante dell'apertura e quello dell'intestazione**, che
portano a `#prova`, cioè scendono alla sezione della prova gratuita. È voluto: chi è appena arrivato non
sa ancora cosa starebbe prenotando, e mandarlo diritto su un calendario è
chiedergli fiducia prima di avergli spiegato di cosa si tratta. Da quella
sezione in giù, invece, la spiegazione l'ha letta e ogni pulsante apre il
calendario. Non uniformarli «per coerenza»: è una scelta di Dario.

Nell'**intestazione** «Richiedi consulenza gratuita» non è più una voce di menu: è lo stesso
pulsante arancione dell'apertura, in versione `size="sm"`, e compare due
volte — nella barra da 1024px in su, e in fondo al pannello del menu, dove
serve a chi naviga da telefono (lì la barra non c'è). Per questo la voce è
stata tolta da `nav` in `site.ts`: se la rimetti, compare due volte.

**Il «+» compare solo sotto i 1024px** (`lg:hidden`, su pulsante **e**
pannello). Da computer è stato tolto per decisione di Dario del 24 agosto
2026, dopo l'inventario di cosa conteneva il pannello: **nove elementi, e
tutti e nove già visibili nella stessa pagina** — le quattro voci nella barra,
email, luogo e social nel footer, e il pulsante arancione che compariva due
volte a pochi centimetri di distanza. Zero informazioni che si trovassero solo
lì.

Sotto i 1024px invece **è l'unica navigazione che esiste**, perché lì le voci
della barra sono nascoste: non toglierlo, e non «uniformare» i due casi.

Due dettagli che sembrano ridondanti e non lo sono:

- `lg:hidden` sta anche **sul pannello**, non solo sul pulsante. Senza, chi
  apre il menu su una finestra stretta e poi la allarga si ritrova il pannello
  aperto e nessun «+» per chiuderlo.
- qui `lg:hidden` batte le classi di base `flex` e `grid`, ed è verificato sul
  foglio generato: `.flex` sta a byte 11139, `.grid` a 11158,
  `.lg\:hidden{display:none}` a 49606 dentro `@media (min-width:64rem)`. È
  **l'opposto** della trappola di `<Cta>`, dove a contendersi il `display`
  erano due classi di base e vinceva l'ultima del foglio.

**La barra ha quattro voci, e sono queste: Servizi · Lavori · Chi siamo ·
Contatti.** Decise da Dario il 24 agosto 2026 dopo una ricerca sui
concorrenti — quindici siti, link contati sull'HTML pubblicato. Il campione si
spacca in due senza quasi niente in mezzo: chi vende **a volume** tiene fra le
venti e le ventisei voci di menu (Kynetic 26, e26 24, Cool Agency 24,
AT&ACME 23, Hubstrat 22, Superside, Eleken), perché ogni voce è una pagina che
deve posizionarsi su una ricerca diversa; chi vende **una relazione** ne tiene
sei o meno (AT ADV 6, Allcool 6, Emmemedia 6, Instrument 6, leftclick 3).

Dielle sta nel secondo gruppo — «pochi clienti, seguiti di persona» è la prima
cosa che si legge nell'apertura — e il menu deve dirlo. C'è anche un vantaggio
di posizionamento: su nove agenzie del territorio cinque hanno il megamenu,
quindi essere sobri qui **è già un segnale**, prima ancora che si legga un
testo.

Due cose da non disfare:

- **«Servizi» sta prima di «Lavori».** Chi arriva vuole prima sapere cosa
  facciamo e poi vedere se lo facciamo bene. Prima trovava le prove prima
  della promessa.
- **«Metodo» non sta nella barra**, sta nel footer: si legge dopo essersi
  convinti, non prima, e nella barra occuperebbe il posto di qualcosa che
  converte. Lo stesso valeva per «Blog», che dal 25 agosto 2026 non è più
  cliccabile nemmeno nel footer — vedi «Il blog, per ora spento» più sotto.

**Il menu sta al centro della barra, e la barra è una griglia a tre colonne**
(`grid-cols-[1fr_auto_1fr]`), non un `flex justify-between`. Con
`justify-between` le tre parti si spartiscono lo spazio che avanza, e siccome
il marchio e il gruppo di destra hanno larghezze diverse il menu finiva
spostato a sinistra — Dario se n'è accorto a occhio. Le due colonne `1fr` ai
lati sono uguali per definizione, quindi la colonna `auto` in mezzo cade
esattamente a metà: misurato, il menu è centrato a 718px su una barra larga
1440. Non tornare a `justify-between`.

**Le tre colonne vanno dichiarate a mano** (`col-start-1`, `col-start-2`,
`col-start-3`), e non è ridondanza. Sotto i 1024px il menu è `hidden`, quindi
per la griglia **non esiste come elemento** e non occupa nessuna colonna:
senza la colonna dichiarata, il gruppo di destra veniva collocato da solo
nella seconda e **il «+» finiva in mezzo alla barra** invece che a destra, da
telefono. Dichiarandole tutte e tre, ognuno sta al suo posto che il menu ci
sia o no.

Le distanze fra le voci della barra si stringono a `gap-5` fra 1024 e 1280px.
Da 1280 in su tornano larghe (`xl:gap-10`, `2xl:gap-14`). Con quattro voci
c'è aria da vendere; se un giorno ne aggiungi, rifai il conto o la barra va a
capo. **Non scrivere l'indirizzo a mano nei
componenti**: se cambia il tipo di evento su Cal.com si aggiorna una riga sola.
I pulsanti aprono una **scheda nuova** (scelta di Dario): se il visitatore non
porta a termine la prenotazione, il sito è ancora lì dietro. `cta.tsx`
riconosce da sé i link che iniziano per `http` e aggiunge
`target="_blank" rel="noopener noreferrer"`.

**Il footer**: a sinistra un'etichetta piccola, una riga che spiega cosa
succede, la pillola arancione e **i recapiti**; a destra **tre** colonne di
link (Agenzia, Lavoro, Seguici); sotto una riga di chiusura con marchio, note
legali e copyright. Tutti i contenuti stanno in `footer` dentro `site.ts` —
`site-footer.tsx` fa solo impaginazione.

**Era di 25 link su quattro colonne, oggi sono 12 in tutto**, di cui uno —
«Blog» — scritto ma spento. Rifatto il 24 agosto 2026 insieme alla barra.
Cosa è uscito, e perché non va rimesso:

- le **sei voci di «Servizi»** puntavano tutte a `/#servizi`: sei etichette
  diverse e una destinazione sola. Per chi legge è una promessa non mantenuta
  sei volte (clicchi «Branding & identità» e trovi un elenco generico), per
  Google sono sei link senza destinazione propria, quindi valgono zero. Ne
  resta una, e ora porta a `/servizi`, che è una pagina vera;
- i **tre articoli del blog**: ci si arrivava da «Blog», che stava lì sopra —
  e «Blog» oggi è lì ma non si clicca (vedi «Il blog, per ora spento»);
- **«Contatti» compariva due volte**, in due colonne diverse.

**I recapiti non sono più un link.** Stanno nel blocco a sinistra, sotto
l'invito, scritti per esteso: email cliccabile, WhatsApp e il luogo
(`site.location`). Due ragioni: il footer è dove la gente scende apposta a
cercarli — lo ha misurato il Nielsen Norman Group — e per un'attività locale
avere nome, contatto e luogo su **ogni** pagina conta anche per farsi trovare
su Google. Li legge `site-footer.tsx` da `site`, non sono ricopiati in
`footer`.

La colonna «Seguici» **legge da `social`**, non ricopia i profili: erano due
elenchi identici in due punti — footer e pannello del menu — e sarebbe bastato
aggiungerne uno solo di qua per averli diversi. Un profilo nuovo in `social`
compare da solo nel footer, nel pannello e nella pagina contatti.

**Ogni voce del footer punta a una destinazione vera**, senza più eccezioni:
la forzatura della colonna «Servizi» è stata tolta insieme alla colonna.

**L'indirizzo email è sempre cliccabile**, ovunque compaia: apre il programma
di posta con il destinatario già scritto. Porta una **sottolineatura sottile e
sempre visibile** (`decoration-1`, cioè un pixel, al 40% del colore del testo),
non una che compare al passaggio del mouse: la riga c'è per dire che si può
scrivere, e se si vede solo passandoci sopra non lo dice a nessuno. **Non
cambia nulla al passaggio del mouse**, né il testo né la riga: per scelta di
Dario resta ferma. È l'unico posto del sito in cui una sottolineatura è
voluta. Nelle pagine legali la mail
è dentro il testo dei paragrafi: `legal-article.tsx` la riconosce e la
trasforma in link da sé, non serve scriverlo a mano in `site.ts`.

**Trappola: non passare `hidden` a `<Cta>`.** `cta.tsx` si porta dentro
`inline-flex`, e nel foglio generato da Tailwind `.inline-flex` viene **dopo**
`.hidden`: a parità di specificità vince l'ultima, quindi `className="hidden
lg:inline-flex"` **non nasconde niente**. È già costato caro una volta — il
pulsante della barra restava visibile sul telefono, usciva dallo schermo e
spingeva fuori il «+» del menu. La forma giusta è **`max-lg:hidden`**: le
varianti con media query sono emesse più in fondo al foglio e vincono. Vale
per qualunque classe di `display` passata dall'esterno a un componente che ne
ha già una.

**Inviti all'azione**: usa sempre il componente `src/components/cta.tsx`, mai un
link sottolineato. La pillola arancione piena (`primary`) è l'unica azione forte
di ogni schermata; il contorno (`outline`, pensato per i **fondi scuri**: bordo e
testo avorio) accompagna senza rubare l'occhio. La pillola piena chiude con un
pallino blu, quella a contorno con un pallino avorio; in entrambe c'è la freccia.

**La prop `back` gira il pulsante**: pallino a sinistra, freccia verso
sinistra, e il movimento che al passaggio del mouse scorre dall'altra parte —
imbottitura specchiata compresa. Serve ai ritorni («Torna ai lavori» sulle
pagine dei casi studio), che sono la stessa affordance nel verso opposto: un
pulsante che dice «indietro» con una freccia che punta a destra è un piccolo
inganno. È lo stesso impianto del riferimento, dove sulla pagina del caso
studio il «Go Back» ha il pallino prima del testo.

Quando `<Cta>` sta dentro una colonna flex va avvolto in un `<div>`, o si
stira per tutta la larghezza del contenitore. **Vale anche quando la colonna
esiste solo sotto una certa soglia**: `trial.tsx` e `inner-cta.tsx` sono
`flex-col` sul telefono e `flex-row` da 640/768px in su, e senza involucro il
pulsante si stirava **solo lì** — la pillola perdeva le proporzioni e il
pallino con la freccia finiva a mezzo schermo dal testo. Corretto il 25 agosto
2026: se aggiungi un `<Cta>` dentro un contenitore che cambia direzione,
guardalo alla larghezza in cui è in colonna.

Peso, interlinea e spaziature dei pulsanti sono misurati su leftclick.ai:
testo di **peso 400** (mai grassetto), riga 1.3, nessuna spaziatura extra tra le
lettere, distanza testo-pallino 1em, imbottitura `0.2em 0.25em 0.2em 1em`.

Il movimento è ripreso dallo stesso riferimento:
testo e freccia sono scritti due volte dentro un contenitore che taglia il
fuori-bordo, e al passaggio del mouse la coppia scorre — il testo verso l'alto,
la freccia verso destra — in 0,3 secondi con andamento `ease`. Le misure sono
in `em`, quindi basta cambiare la dimensione del testo per riscalare tutto il
pulsante. **La barra fissa su mobile (`mobile-cta`) usa lo stesso `<Cta>`**,
dal 25 agosto 2026 e su richiesta di Dario: prima era markup suo — stesso
arancione, ma testo in grassetto, una freccia scritta al posto del pallino e
nessuno dei movimenti degli altri pulsanti. Su uno schermo stretto è l'ultimo
pulsante che si incontra, e si vedeva che era un altro oggetto. Resta una
barra (fondo, filetto e area sicura in basso), ma quello che ci sta dentro è
la pillola di sempre, centrata dentro un `<div>` per non stirarsi.

Per dare profondità ai fondi piatti si usano cerchi sfumati molto sfocati nei
colori del brand (`bg-saffron/10 blur-[120px]`), oggi solo in `inner-cta`.
La sezione della prova (`trial`) **non è più una scheda di vetro arancione**:
niente cornice, niente alone, è una sezione come le altre sul fondo a
gradiente — perché sopra di lei c'è la vetrina dei lavori, che è in tinta
unita.
Nell'hero quel ruolo lo svolge `.surface-glow`, non gli aloni.
Mai gradienti sul testo.

Interlinea: **1.3** sul testo (come il riferimento), **1.05** sui titoli, con
tracking -0.03em e peso 500. Sono i valori misurati sul titolo di leftclick.ai.

L'apertura è scura, con un alone radiale al centro e titolo in **un solo
colore**: la sfumatura sta nel fondo, mai nelle lettere. Quella superficie è la
classe **`.surface-glow`** in `globals.css`, condivisa da hero, «Partiamo da
te», «Chi siamo», «Tutto ciò che serve per farti scegliere» e la sezione della
prova: non ricopiare il gradiente a mano, usa la classe.

**I fondi si alternano: uno a gradiente, uno in tinta unita.** Scendendo lungo
la home l'ordine è hero (`.surface-glow`) · nastro clienti (`navy-ink`) ·
problema (`.surface-glow`) · metodo (`bg-navy-deep`) · chi siamo
(`.surface-glow`) · strumenti (`bg-navy-deep`) · servizi (`.surface-glow`) ·
**vetrina dei lavori** (`bg-navy-deep`) · prova (`.surface-glow`) · contatti
(`bg-navy-deep`) · footer (`bg-navy-ink`, scuro sempre).

**Quel posto fra servizi e prova ha cambiato inquilino due volte il 25 agosto
2026**, e la lezione è che l'alternanza non si aggiusta a occhio: uscite le
testimonianze, servizi e prova sarebbero rimaste due sezioni a gradiente
attaccate, quindi la prova era passata in tinta unita e i contatti avevano
preso il gradiente; arrivata la vetrina dei lavori nello stesso posto, tutto è
tornato com'era. Sul tema scuro non si sarebbe visto nulla; **a tema chiaro
sì**, ed è lì che queste correzioni servono. Le due pagine legali (`/privacy`
e `/termini`) stanno su `bg-navy-deep`, come la sezione dei contatti: sono
pagine di servizio, non devono brillare. La sezione delle testimonianze **non è più in pagina**: vedi
qui sotto. Se aggiungi una
sezione, guarda quella sopra e prendi l'altro fondo. A tema chiaro l'ordine è
lo stesso, con `#ffffff` al posto del gradiente e `#f0f0f2` al posto della
tinta unita — tranne strumenti e contatti, che restano scuri.

Impianto ricorrente delle sezioni: **niente kicker**, titolo e sottotitolo
centrati e di **un colore solo** (avorio sul fondo scuro, blu su quello chiaro),
sottotitolo a 18px. I contenuti a elenco o in colonna restano allineati a
sinistra, dove si leggono.

Quell'intestazione è il componente **`src/components/section-head.tsx`**, usato
da tutta la home e da tutte le pagine interne: passa `title`, il `body`
opzionale, `tone="light"` sui fondi chiari, `size` (`md` di sezione, `lg`, `xl`
per l'intestazione di una pagina) e `as="h1"` quando è il titolo della pagina.
Non riscrivere il blocco a mano — prima era ripetuto in cinque sezioni e bastava
dimenticarne una per avere un impianto diverso.

Il `body` accetta anche **un array di righe**: ogni voce diventa una riga a sé
(`<span className="block">`). Serve a far staccare la frase di chiusura, come
nei servizi («…solo ciò che ti serve:» a capo «la strategia resta cucita su
misura.»). Stesso trucco, scritto a mano, nell'apertura, nel problema e in «Chi
siamo». Attenzione a cosa metti **fuori** dai blocchi: le virgolette delle
testimonianze stavano attorno alle righe e sul desktop finivano ognuna su una
riga tutta sua, sopra e sotto la citazione. Tutto ciò che deve stare in linea
col testo va dentro la prima o l'ultima riga.

Nei **testi** non usare `<br />`: con i blocchi ogni riga manda a capo
per conto suo sugli schermi stretti, mentre un `<br />` resta lì anche quando
non ci sta. Nei **titoli** il `<br />` va bene (lo usa il titolo
dell'apertura): lì la riga è corta e la spezzatura è voluta.

Le **firme delle testimonianze** (nome, ruolo, locale, città) sfiorano i 100
caratteri: con la spaziatura da micro-etichetta (`tracking-[0.16em]`) volevano
~860px e andavano a capo dentro una colonna larga ~600px. Stanno su una riga
sola a `text-[0.62rem]` con `tracking-[0.01em]`: sono ~565px, il massimo che
entra in quella colonna a finestra piena su un 13". **La firma della citazione
principale fa eccezione**: sta in un contenitore da 896px invece che in mezza
colonna, quindi regge `text-[0.8rem]` con `tracking-[0.06em]` (~790px) e si
riprende un po' di spaziatura da micro-etichetta. Non è una svista che le tre
firme non siano identiche: è la citazione a cui si vuole dare peso. A questo corpo la
leggibilità la fa il **contrasto** più della dimensione, per questo le firme
stanno a `text-cream/70` e non a `/50` come le altre micro-etichette. Sotto i
~1200px la colonna si stringe e tornano su due righe: è voluto, l'alternativa
sarebbe un corpo illeggibile. Se allunghi una firma, rifai il conto.

Nelle **tre colonne della prova gratuita** ogni punto ha `pl-7` *e* `pr-7`:
la linea verticale che li divide deve avere la stessa aria da tutte e due le
parti, altrimenti il testo di un punto finisce appiccicato alla linea del
successivo. Il primo punto resta a filo sinistro (`first:pl-0`), l'ultimo a
filo destro (`last:pr-0`), come la gabbia.

Nell'elenco dei servizi le colonne hanno **misure fisse**
(`lg:grid-cols-[2.5rem_minmax(0,15rem)_minmax(0,28rem)_1fr]`): ogni riga è una
griglia a sé, e finché l'ultima colonna era `auto` le etichette di larghezza
diversa spostavano l'inizio della descrizione riga per riga. Non tornare alle
colonne in `fr` con una colonna `auto` in fondo.

**I link ai social nella sezione contatti stanno a `text-[0.62rem]` con
`tracking-[0.12em]`**, non alla misura delle altre micro-etichette. Sono
quattro voci su una riga sola e due sono lunghe («Dario su LinkedIn», «Luisa
su LinkedIn»): alla misura piena la riga arrivava a ~566px e sconfinava verso
il modulo alla sua destra. Ridotta così sta in ~485px. Il blocco è **ricopiato
in due file** — `src/components/contact.tsx` (home) e
`src/app/contatti/page.tsx` — quindi se cambi una misura cambiala in tutti e
due, o le due pagine divergono.

La classe `kicker` sopravvive solo come **micro-etichetta dentro i contenuti**
(«Il problema», «La soluzione», «Scritto da» nelle pagine di caso studio e negli
articoli, la maniglia Instagram nel portfolio). Non usarla più come occhiello
sopra il titolo di una sezione.

**Barra e apertura sono una superficie sola.** L'intestazione non ha fondo né
bordo, e **non è fissa**: è `absolute` e scorre via con la pagina, come sul
riferimento (dove è `position: static`). L'apertura parte dal margine dello
schermo.

L'apertura **non è alta quanto lo schermo, ma quanto lo schermo meno il nastro
dei clienti** (`min-h-[calc(100svh-var(--marquee-h))]`). Serve a far entrare il
nastro nella prima schermata, senza doverlo cercare scorrendo: appena si apre
il sito si vede già con chi hanno lavorato Dario e Luisa. L'altezza del nastro
sta in `--marquee-h` dentro `globals.css`, in un punto solo: se cambi
l'imbottitura o il corpo dei nomi in `marquee.tsx`, cambia anche quella.

Non reintrodurre né un fondo né un bordo in cima, e non rimetterla fissa: sono
esattamente le cose che il cliente ha chiesto di togliere. Attenzione anche al
pannello del menu: da chiuso deve avere fondo trasparente e nessun bordo,
altrimenti il suo bianco si intravede come una riga di 1px sotto la barra.

Distanze verticali dell'apertura, misurate sul riferimento: **108px** tra barra
e titolo, **23px** titolo→sottotitolo, **28px** sottotitolo→numeri, **40px**
numeri→pulsanti.

L'ordine dell'apertura è titolo → sottotitolo → fascia dei numeri → pulsanti, e
finisce lì: su un MacBook 13" si vede per intero, con i pulsanti sulla piega.

Subito sotto, il **nastro dei clienti** (`marquee.tsx`) è una fascia in tinta
unita `navy-ink` (`#0f141b`), un blu più profondo di tutti quelli del gradiente:
non è preso dall'apertura, esiste apposta per far staccare la fascia sia da ciò
che sta sopra (`#1e2530`) sia dalle sezioni sotto (`#282f3f`). A sinistra una
scritta ferma («Dario e Luisa hanno lavorato con»), a destra i nomi che scorrono.
Misure prese dal riferimento: etichetta 9,9px maiuscola con tracking 0.1em,
nomi 15,8px di peso 500, 54px tra un nome e l'altro. La durata del giro tiene
la stessa **velocità** del riferimento, non la stessa durata: erano 25 secondi
per dieci nomi, oggi sono **40 per sedici**. Se aggiungi o togli un cliente,
ricalcola — circa 2,5 secondi a nome — altrimenti il nastro corre o striscia.
I nomi dei clienti in `site.ts` vanno scritti con le maiuscole giuste (AdaTech,
BandoHub, CoffeeWorld, Tadàbook…): il nastro non li trasforma più in maiuscolo,
e le grafie sono state prese dai siti dei clienti stessi, non a orecchio.

**I nomi sono cliccabili** e portano al sito del cliente, in una scheda nuova.
Ogni voce di `clients` è `{ name, href }`; `href` può mancare, e allora il nome
resta testo semplice, senza mano e senza sottolineatura. NinjaStickers non ha
un sito raggiungibile, quindi punta al suo caso studio interno
(`/lavori/ninjastickers`): il nastro riconosce da sé gli indirizzi che
cominciano per `/` e li fa passare dal router invece che da un link esterno.

Al passaggio del mouse il nome si accende e prende una sottolineatura arancione,
e **il nastro si ferma** (`.marquee-track:hover` in `globals.css`). Non è un
vezzo: senza la pausa cliccare un nome sarebbe un tiro al bersaglio in
movimento. La seconda copia della riga — quella che serve solo a chiudere il
giro senza stacchi — è `aria-hidden` e fuori dalla tabulazione, altrimenti chi
naviga da tastiera o con un lettore di schermo troverebbe ogni cliente due
volte.

I ritratti chiedono `quality={90}` invece del 75 di default: sono immagini di
partenza piccole, e la compressione forte sopra una foto già ingrandita si
vede. In Next 16 non basta la prop — l'unica qualità ammessa è 75, e ogni altro
valore viene riportato a quella: le qualità vanno dichiarate in
`images.qualities` dentro `next.config.ts`.

Le **foto dei fondatori** stanno in `public/team/`, già ritagliate quadrate e
convertite in JPEG: il riquadro è un quadrato e `object-cover` taglierebbe da
solo, ma dal centro — meglio decidere il taglio a monte che accorgersi di una
testa mozzata a sito pubblicato. Il campo che le accende è `photo` in
`founders` (`site.ts`); senza, compaiono le iniziali. Gli originali lasciati
nella cartella del progetto non finiscono in `git`: li esclude `.gitignore`.

Nella sezione **«Chi siamo»** (`about.tsx`) foto e testi di ciascun fondatore
stanno in un unico blocco largo **`26rem`** (416px), centrato nella colonna e
allineato a sinistra: nome, ruolo, citazione e biografia cominciano e finiscono
esattamente sui bordi del quadrato. Era `32rem`, ristretto perché a quella
misura le foto — che partono da poco più di 400px — risultavano ingrandite e
sgranate. Restringendo il blocco intero, e non la sola foto, l'allineamento fra
quadrato e testo resta intatto: è quello il punto della sezione.

Se cambi la misura del quadrato, cambia anche `sizes` sull'`Image` **in tutti e
due i file** (`about.tsx` e `chi-siamo/page.tsx`), altrimenti il browser scarica
una foto della misura sbagliata.

Le animazioni restano lente e discrete (comparse allo scroll, scorrimenti nei
pulsanti).

## Mobile e tablet

Passata fatta il 25 agosto 2026, su richiesta di Dario. Il sito era già in
gran parte adattivo — le griglie si impilavano, il menu diventava «+» sotto i
1024px, non c'era **nessuno sbordamento orizzontale** a nessuna larghezza — e
quello che mancava non era la struttura: erano le soglie e i dettagli del
dito. Tutti i numeri qui sotto sono misurati con un browser vero a viewport
vero, non stimati.

### Il ritmo verticale non è più fisso

`py-[108px]` uguale a ogni larghezza faceva una home alta **14.819px sul
telefono, cioè 16,5 schermate**, contro le 10,3 del desktop: il posto dove si
legge di meno chiedeva di scorrere il 60% in più. Undici sezioni per 216px di
sola imbottitura sono 2.376px di vuoto su uno schermo largo 390.

Ora c'è **`.section-y`** (`padding-block: clamp(4rem, 2.5rem + 5vw, 6.75rem)`):
64px sul telefono, 78 sul tablet verticale, 91 a 1024, **108 da ~1360 in su**,
cioè la misura di riferimento dov'era stata presa. `.section-y-b` fa la stessa
cosa solo sotto, per le aperture delle pagine interne.

### Le soglie: quando una griglia si apre

Il criterio non è «quale breakpoint suona bene», è **quanta larghezza serve al
contenuto**. Tre griglie si aprivano troppo presto e sono state spostate:

| cosa | prima | adesso | perché |
|---|---|---|---|
| schede dei fondatori | `sm` (640) in `about.tsx`, `md` (768) in `chi-siamo` | `lg` (1024) in tutti e due | il blocco vuole 26rem (416px): a 640 ne prendeva **256**, a 768 **312** |
| i tre passi della prova | `sm` | `lg` | a 640 restavano **158px di testo utile** per colonna |
| i cinque passi del metodo | `md` | `lg` | a 768 la descrizione stava in **218px** |
| modulo dei contatti | `md` | `lg` | a 768 il modulo si stringeva a ~296px e i campi affiancati al suo interno finivano a 140px |
| i tre valori di `/chi-siamo` | `sm` | `md` | a 640 erano colonne da 186px |

**Le due schede dei fondatori avevano soglie diverse nei due file**, ed era la
prova che la regola «se cambi una, cambia l'altra» non era stata seguita. Ora
sono `lg` tutte e due, e il blocco misura 416px a qualunque larghezza sopra i
475px.

### La tabella del confronto su `/metodo`

Era `grid-cols-2` a qualunque larghezza: su un telefono da 320px ogni cella
restava **139px larga e 123px alta**, cioè due colonne di testo spezzato
appaiate. Da 640px in su è la tabella di sempre; sotto, ogni confronto diventa
un blocco con le due voci una sopra l'altra e l'etichetta della colonna sopra
ciascuna.

**Le etichette si ripetono su ogni blocco, ed è voluto**: impilando le celle
si perde l'intestazione, e senza richiamo non si capisce più quale delle due
frasi è la nostra. Sono le stesse stringhe di `site.ts`, non testo nuovo. Il
filetto fra un confronto e il successivo è più marcato di quello interno alla
coppia, o si leggono otto righe scollegate invece di quattro confronti.

### I bersagli del dito

Le linee guida di accessibilità (WCAG 2.5.8) chiedono **24×24px**, le linee
guida di Apple e Google ne consigliano 44. Sul telefono c'erano link alti
**12, 13, 15, 17, 20 e 21 pixel**. Corretti tutti:

- link del footer (tre colonne e note legali) → 33px, con `py-2 -my-2`
  dentro `FooterLink`: **il margine negativo restituisce lo spazio che il
  padding prende**, quindi l'area cresce e a schermo non si muove niente;
- email e WhatsApp nei recapiti del footer → 32px;
- i quattro social nella sezione contatti → 37px, e **il corpo torna
  leggibile sotto i 1024px**: `text-[0.62rem]` esiste per un vincolo da
  desktop (le quattro voci in una riga sola accanto al modulo) che sotto quella
  soglia non c'è;
- la riga «Vedi anche» delle pagine di servizio → nove link a 9,9px in una
  riga di testo: sul telefono il corpo sale e l'interlinea si allarga, così le
  aree toccabili di righe vicine non si sovrappongono;
- il link al sito del cliente sui casi studio → 36px;
- «Scopri il metodo in dettaglio» → 35px;
- i social nel pannello del menu → 33px.

**Sui nomi del nastro il problema era diverso**, e vale la pena capirlo:
`.marquee-track:hover` ferma il nastro col mouse, ma **`:hover` non esiste sul
touch**, quindi da telefono erano bersagli che scorrevano via mentre li
premevi — e sbagliare mira non voleva dire non aprire niente, voleva dire
**aprire il sito del cliente sbagliato**. Ora il nastro si ferma anche su
`:active`, cioè appena appoggi il dito, e il dito lascia la presa su un nome
fermo. Il bersaglio è passato da 21px a 45 con un `py-3`: su un elemento **in
linea** il padding verticale non alza la riga, quindi il nastro resta alto
uguale e `--marquee-h` non va toccata.

### Il pannello del menu non scorreva

Il difetto più grosso trovato nella passata, segnalato da Dario: **su un
iPhone SE si vedevano solo «Servizi» e «Lavori»**, e le altre due voci più il
pulsante restavano sotto il bordo dello schermo, irraggiungibili.

Tre cose insieme: il pannello si apriva alla sua altezza naturale (**788px**,
su uno schermo da 667), il body era bloccato con `overflow: hidden`, e il
pannello stesso è `overflow-hidden` per via dell'animazione su
`grid-template-rows`. Nessuna delle tre è sbagliata da sola; insieme facevano
un menu senza uscita.

Cosa è cambiato:

- **il contenuto scorre per conto suo.** Tetto a
  `calc(100svh - var(--header-h))`, con `overflow-y-auto` e
  `overscroll-contain` — quest'ultimo perché arrivati in fondo lo scorrimento
  non deve passare alla pagina sotto. `svh` e non `vh`: su iOS la barra del
  browser si ritrae e `vh` mentirebbe di una sessantina di pixel;
- **`--header-h`** è un token nuovo in `globals.css` (7,5rem, 8,5 da 640px in
  su): 28px di imbottitura sopra, 28 sotto e il marchio da 64. Se cambi `size`
  del logo o l'imbottitura della barra, cambia anche lui;
- **la navigazione è passata in cima.** Prima sopra c'erano email, luogo e
  social, che spingevano le voci sotto la piega: in un menu da telefono i link
  sono il motivo per cui lo si è aperto, i recapiti sono un di più e stanno
  anche nel footer. Adesso tutte e quattro le voci **e** il pulsante arancione
  si vedono senza scorrere su ogni telefono provato;
- **i recapiti sono compattati**: i quattro social erano quattro righe, ora
  sono una riga che va a capo da sola;
- **Esc chiude il pannello.** Un menu a tutto schermo che si chiude solo
  tornando a premere il «+» è una trappola per chi naviga da tastiera.

**I due comandi fissi in basso a destra stanno a filo del fondo.** Erano
inchiodati a 96px da sotto per fare posto alla barra fissa della consulenza —
ma quella barra c'è solo da 700px di scorrimento in giù e sparisce nel footer,
quindi sulla prima schermata e in fondo alla pagina i due pulsanti restavano
**sospesi a mezz'aria**, a un terzo di schermo dal bordo. Segnalato da Dario.

Ora la misura è la variabile **`--dock-b`** in `globals.css`: 1rem quando la
barra non c'è, 4,75rem quando c'è, sempre 1,5rem da 768px in su (lì la barra
non esiste). Chi la commuta è `mobile-cta.tsx`, che scrive `data-cta` su
`<html>` — stesso impianto del tema e del menu: un attributo, e il CSS che ne
discende. Il riquadro di WhatsApp si appoggia sopra i pulsanti con
`calc(var(--dock-b) + 3.5rem)`, così sale e scende con loro invece di
staccarsi.

**Non rimettere `bottom-*` di Tailwind su questi tre elementi**: la posizione
la governa la classe (`.floating-dock`, `.floating-panel`), o le due misure
tornano a divergere.

**I due comandi si ritirano mentre il menu è aperto.**
WhatsApp e interruttore del tema sono `fixed` con `z-50`, cioè allo stesso
piano dell'intestazione: restavano appoggiati sopra il pannello e sui telefoni
piccoli coprivano i profili social — «Dario su LinkedIn» era tagliato a metà.
L'attributo `data-menu="open"` va su `<html>` (stesso impianto del tema: un
attributo e il CSS che ne discende) e la regola sta in `globals.css`, agganciata
alla classe `.floating-control`. Mentre il menu è aperto quei due non servono:
il menu ha già i suoi contatti.

### La barra fissa copriva il footer

`mobile-cta.tsx` osservava solo `#contatti` e spariva lì. Scorrendo oltre, nel
footer, quella sezione usciva di vista e **la barra tornava fuori sopra
l'ultima riga**: misurato su un telefono da 390px, la barra partiva a 771px e
la riga con copyright e note legali finiva a 804 — Privacy e Termini erano
irraggiungibili. Ora l'osservatore guarda **contatti e footer**, e conta le
zone in vista invece di tenere un booleano: le due sono attaccate, e uscendo
dall'una mentre si entra nell'altra un booleano solo faceva lampeggiare la
barra.

### Dettagli minori, ma reali

- il riquadro di WhatsApp era `w-[19rem]` con `right-4`: 304+16 = **320px
  esatti**, cioè incollato al bordo sui telefoni piccoli. Ora è
  `w-[min(19rem,calc(100vw-2rem))]`;
- `sizes` delle foto dei fondatori aggiornato alla soglia vera (475px, cioè
  dove il blocco smette di crescere), in **tutti e due i file**.

### Cosa è stato verificato, e come

Sei larghezze (320, 390, 430, 768, 834, 1024), undici pagine, tutti e due i
temi, e le due orientazioni. Controllati per ogni combinazione: sbordamento
orizzontale, elementi che escono dalla gabbia, bersagli sotto i 24px e testo
sotto gli 11,5px. **Nessuno sbordamento orizzontale da nessuna parte**, e
l'unico bersaglio piccolo rimasto è il campo trappola anti-spam, che deve
restare invisibile.

Una nota di metodo: AGENTS.md avvertiva di non fidarsi di `--window-size` di
Chrome sotto i ~450px. Con Playwright il problema non c'è, perché il viewport
si imposta davvero invece di ritagliare la finestra: **è lo strumento giusto
per misurare da telefono**, e l'avvertimento resta valido solo per Chrome
lanciato a mano.

### Una conseguenza da conoscere

Portando le schede dei fondatori a 416px anche sul tablet, **la foto di Dario
è più ingrandita di prima su quegli schermi**: il file è 472px, prima a 768px
riempiva un riquadro da 312 e adesso ne riempie uno da 416. È il compromesso
giusto — la biografia era su righe da trenta caratteri — e si chiude da sé il
giorno in cui arrivano gli originali ad alta risoluzione (vedi «Da
sistemare»). La foto di Luisa è 1024px e non ha il problema.

## Farsi trovare: mappa, canonici e dati strutturati

Tutto costruito il 24 agosto 2026, dopo una diagnosi che aveva trovato questi
quattro pezzi **completamente assenti**.

**L'indirizzo del sito sta in un punto solo: `siteUrl` in `site.ts`, e non è
scritto a mano.** Lo chiede a Vercel (`VERCEL_PROJECT_PRODUCTION_URL`), che
contiene il dominio di produzione del progetto. Oggi vale
`diellecommunication.vercel.app`; **il giorno in cui `dlcommunication.it`
viene aggiunto come dominio di produzione su Vercel, diventa quello da solo** —
mappa, canonici, `robots.txt`, anteprime social e dati strutturati si
aggiornano tutti insieme senza toccare una riga. `NEXT_PUBLIC_SITE_URL` resta
come scavalco manuale.

Prima era scritto a mano come `https://dlcommunication.it`, che è il dominio
vero ma **non ancora collegato**: le anteprime social puntavano a un indirizzo
che non risponde, e chi condivideva il link vedeva un riquadro vuoto. Non
tornare a scriverlo a mano: si romperebbe di nuovo, e in silenzio.

- **`src/app/sitemap.ts`** — la mappa si genera **dai dati**: aggiungi un
  lavoro, un articolo o il campo `page` a un servizio e l'indirizzo compare da
  solo. Una mappa scritta a mano ci si dimentica di aggiornarla, e una mappa
  incompleta è peggio di nessuna mappa. `/zzpreview` non c'è, ed è voluto.
- **`src/app/robots.ts`** — permette tutto tranne `/zzpreview` e `/api/`, e
  dichiara dov'è la mappa.
- **I canonici** stanno in `alternates.canonical` di ogni pagina, **relativi**
  (`"/servizi"`): ci pensa `metadataBase` a metterci davanti il dominio. Le tre
  rotte generate lo costruiscono dentro `generateMetadata`. Se aggiungi una
  pagina, aggiungi anche il canonico e la voce nella mappa.
- **`/zzpreview` porta `robots: { index: false, follow: false }`** oltre al
  blocco in `robots.txt`. Servono tutti e due e non è ridondanza: il file dice
  «non leggerla», il tag dice «non metterla nei risultati», e un indirizzo già
  noto altrove può comparire nei risultati anche senza essere stato letto.

**I dati strutturati** stanno in `organizationSchema()` e `breadcrumbSchema()`
in fondo a `site.ts`, e li stampa `src/components/json-ld.tsx`. Non sono testo
editoriale: sono un formato tecnico (schema.org) che ricopia dati già presenti
in `site`, `social` e `company`. Chi c'è dove:

| dove | cosa dichiara |
|---|---|
| `layout.tsx` (tutte le pagine) | `ProfessionalService` — l'azienda |
| `/faq` | `FAQPage` con le dieci domande |
| `/servizi/<slug>` | `Service` + briciole di pane |
| le altre pagine interne | briciole di pane |

**L'indirizzo postale c'è, ed è quello vero.** `PostalAddress` dichiara Via
Alcide De Gasperi 52, 80059 Torre del Greco (NA), insieme a `vatID` e
`taxID`: arrivano da `company`, presi dalla visura. Questo paragrafo per un
po' ha continuato a dire che mancava — era rimasto indietro rispetto al
codice, ed è corretto dal 25 agosto 2026.

**Perché deve restare quello vero, e non «Napoli».** Google confronta questi
dati con la scheda Google dell'attività e con quello che trova altrove: se non
combaciano il segnale si indebolisce invece di rafforzarsi, e una scheda con
un indirizzo che non corrisponde viene sospesa. Non «semplificarlo» a Napoli
per coerenza col racconto del sito.

**Il 25 agosto 2026 Dario ha confermato che in Via De Gasperi 52 un cliente
può presentarsi.** Serviva a decidere come aprire la scheda Google, e la
risposta cambia la configurazione: la scheda va aperta **con l'indirizzo
visibile**, non come attività che opera solo su un'area. Il sito e la scheda
diranno lo stesso indirizzo, che è la condizione che evita la sospensione.

**Le risposte della FAQ nei dati strutturati vengono dallo stesso `faq` che
si legge in pagina.** Se un giorno divergessero sarebbe un motivo di
penalizzazione: non ricopiarle.

**Sui prezzi non c'è nessun `offers` e nessuna cifra**, per la stessa ragione
per cui non ce ne sono nei testi: un listino vero non esiste.

Fuori dal sito, e più importante di tutto questo messo insieme: **la scheda
Google dell'attività** e **le recensioni**. Non sono codice, ma sono quello
che sposta una ricerca locale. Anche la scheda vuole l'indirizzo verificabile.

## Lingua

Testi del sito e commenti nel codice in italiano. Nomi di variabili, funzioni e file
in inglese.

## Posta: come parte il modulo contatti

Il modulo passa da **Resend**, installato come integrazione nativa di Vercel
(`vercel integration add resend/resend-email`). Chiave e dominio arrivano dalle
variabili d'ambiente `RESEND_API_KEY` e `RESEND_EMAIL_DOMAIN`: non stanno nel
codice e non vanno scritte a mano. Regione **`eu-west-1`, Irlanda**, scelta
apposta invece della predefinita americana — la privacy policy dichiara cosa
esce dall'Unione Europea, e la posta che resta dentro è una complicazione in
meno.

Partono **due email** per ogni richiesta (`src/app/api/contact/route.ts`):

1. la richiesta a `site.email`, con **`replyTo` sull'indirizzo di chi ha
   scritto**: si preme Rispondi e si sta già scrivendo a lui;
2. una **conferma automatica a chi ha compilato**, col pulsante per prenotare
   la call. Se questa seconda fallisce non è grave e non blocca nulla: la
   richiesta è già arrivata. I testi stanno in `contactEmails` in `site.ts`.

**In fondo alla conferma c'è una firma**: il marchio e le due icone social
dell'agenzia. Tre cose da sapere prima di toccarla.

*Le immagini sono PNG, mai SVG.* I programmi di posta non disegnano gli SVG e
Gmail li scarta. I file stanno al doppio della misura mostrata (logo 240px
mostrato a 84, icone 48px mostrate a 22) per gli schermi retina, e portano
`width`/`height` anche come attributi HTML oltre che nello stile, perché
Outlook ignora il CSS sulle immagini.

*Gli indirizzi devono essere assoluti.* Le immagini non viaggiano dentro il
messaggio: il programma di posta le scarica. La base è **`emailAssetsUrl`** in
`site.ts`, oggi il deploy su Vercel perché `dlcommunication.it` non è ancora
collegato. Quando il dominio sarà attivo si cambia quella riga sola. Se resta
puntata a un indirizzo irraggiungibile, chi riceve vede tre riquadri vuoti.

*Le icone leggono da `social`.* Compaiono le voci con **`brand: true`** —
oggi Instagram e LinkedIn dell'agenzia — non i profili personali di Dario e
Luisa. Un profilo nuovo dell'agenzia compare da sé, ma il file
`public/email-<etichetta minuscola>.png` va aggiunto a mano: il nome del file
si ricava dall'etichetta.

Contro lo spam c'è un **campo trappola** invisibile (`website`) invece di un
captcha: i captcha fanno abbandonare il modulo, e a questi volumi non servono.
Se arriva pieno, la richiesta viene scartata rispondendo «ok» — dire «sei un
robot» servirebbe solo a fargli cambiare tattica.

Se l'invio fallisce il modulo **non lascia un errore muto**: mostra
l'indirizzo email cliccabile, così chi voleva scrivere ha comunque una strada.

### Verifica del dominio su Aruba — fatta, e le trappole per rifarla

**Il dominio è verificato e il modulo spedisce davvero.** Provato il 24 agosto
2026 dal sito in produzione: le due email — la richiesta e la conferma
automatica — risultano `delivered` nel registro di Resend. Quanto segue serve
se un giorno si ricomincia da capo, o se qualcosa smette di funzionare.

Resend rifiuta di spedire finché il dominio non è **verificato per intero**:
non basta che uno dei record sia a posto. Finché ne mancava uno la risposta era
`403 — the domain is not verified`.

Servono tre record nei DNS di `dlcommunication.it`, e oggi ci sono tutti e tre:

| record | dove | stato |
|---|---|---|
| TXT `resend._domainkey` (DKIM) | scheda «Record» | ✅ verificato |
| TXT `send` (SPF) | scheda «Record» | ✅ verificato |
| MX `send` prio 10 (SPF) | scheda «Record MX» | ✅ verificato |

**La trappola grossa: il record MX.** Nella scheda «Record MX» di Aruba il
pulsante blu **«SOSTITUISCI RECORD» cancella tutti i record MX esistenti**,
compreso `@ → mx.dlcommunication.it`, che è il server che riceve la posta del
dominio. Premerlo significa spegnere la casella. Il pulsante giusto è
**«AGGIUNGI SU SOTTODOMINIO»**, dentro «Gestione avanzata»: aggiunge un MX su
un nome specifico senza toccare gli altri. Nome host `send`, valore
`feedback-smtp.eu-west-1.amazonses.com`, priorità 10.

Vale in generale: su Aruba si toccano **solo i record, mai i nameserver**.

Aruba non applica i cambiamenti DNS all'istante, li mette in coda. Per
controllare senza aspettare la cache dei resolver pubblici, interroga i suoi
nameserver diretti:

```bash
dig +short MX send.dlcommunication.it @dns.technorail.com
dig +short MX dlcommunication.it @dns.technorail.com   # deve restare!
```

Poi si rilancia la verifica e si legge lo stato record per record dall'API di
Resend (`POST /domains/<id>/verify`, poi `GET /domains/<id>`). Non fidarsi del
markup o della configurazione: guardare lo stato che risponde il servizio.

Nota: l'installazione dell'integrazione ha portato in `.claude/skills/` anche
le guide di Resend, con il loro `skills-lock.json`. Sono file del progetto, non
codice del sito.

## Contesto operativo

**Dati societari, dalla visura della Camera di Commercio di Napoli
(22 settembre 2025).** Stanno in `company` dentro `site.ts` e da lì li leggono
il footer, le due pagine legali e i dati strutturati. Non sono riservati: la
visura è pubblica e per legge questi dati devono comparire sul sito.

| | |
|---|---|
| denominazione | DL Communication S.r.l.s. |
| forma | società a responsabilità limitata **semplificata** |
| sede legale | Via Alcide De Gasperi 52, 80059 **Torre del Greco** (NA) |
| P. IVA e C.F. | 10867811217 |
| REA | NA - 1137783 |
| PEC | dl-communication@pec.it |
| amministratrice unica | Luisa Panariello |

**Due cose che il sito diceva sbagliate, e sono dichiarazioni pubbliche:**

1. il footer scriveva **«S.r.l.»**. È una **S.r.l.s.**, che è un'altra forma
   societaria. Corretto;
2. la sede legale è a **Torre del Greco**, non a Napoli. «Napoli» resta giusto
   nel racconto — Torre del Greco è in provincia di Napoli, e il lavoro si fa
   lì intorno — ma **l'indirizzo postale nei dati strutturati e nella scheda
   Google deve essere quello vero.** Dichiarare Napoli come indirizzo sarebbe
   falso, e una scheda Google con un indirizzo che non corrisponde viene
   sospesa. Non «semplificarlo» a Napoli per coerenza col resto del sito.

La visura sta nella cartella del progetto come PDF. **Non finisce in git**:
`.gitignore` esclude `/*.pdf`. Contiene dati personali dei soci che non
c'entrano niente col sito — dal documento sono stati presi solo i campi qui
sopra.


- Repository: `github.com/ddsartworker/diellecommunication`
- Email del brand: **`commercialedlcommunication@gmail.com`**. Sta scritta in
  un punto solo (`site.email` in `site.ts`) e da lì la leggono l'intestazione,
  la sezione contatti e la pagina `/contatti`. È una casella Gmail, non ancora
  quella sul dominio: quando la casella Aruba sarà operativa, si cambia quella
  riga e cambia ovunque.
- I link canonici e le anteprime social partono da `siteUrl` in
  `src/app/layout.tsx`, oggi `https://dlcommunication.it`: il dominio vero,
  anche se non ancora collegato. Prima puntavano a `diellecommunication.it`,
  che non esiste.
- Dominio `dlcommunication.it` registrato su Aruba, con DNS e casella email presso
  Aruba. Il dominio non è ancora collegato: quando lo sarà, si cambiano solo i record
  del sito, **mai i nameserver**, altrimenti si spegne la posta.

## Da sistemare

- `src/lib/site.ts` — **i testi delle otto pagine di servizio sono una prima
  stesura**: quattro scritte il 24 agosto 2026 (Siti web, Social,
  Advertising, Branding) e quattro il 25 (Content & email, Reputazione,
  Community & PR, Analytics). Partono da quello che il sito già diceva (`body`
  e `tags` di ogni servizio), dal posizionamento e da quello che i casi studio
  dimostrano. Non contengono numeri, prezzi né promesse inventate, ma sono
  parole che finiscono su un sito pubblico a nome di Dario e Luisa: **vanno
  lette e corrette da loro** prima di considerarle definitive. Stanno in `page`
  dentro `services`.

  Le quattro nuove dichiarano anche **cosa non facciamo**, come le altre, e lì
  ci sono quattro impegni che vale la pena rileggere ad alta voce: non
  compriamo liste di indirizzi, non promettiamo di far sparire una recensione
  negativa, non compriamo follower, non mandiamo report di quaranta pagine.
  Sono le righe che fanno fidare chi ci ha già provato senza risultati — ed è
  anche il motivo per cui vanno confermate prima di andare online.

  Su **Reputazione** la prima stesura diceva «non compriamo recensioni e non
  ne scriviamo di finte». Tolta lo stesso giorno, su richiesta di Dario:
  **su una pagina che vende reputazione, nominare le recensioni finte fa
  venire in mente proprio la cosa che si vuole escludere** — e comunque
  nessuno lo chiede. Al suo posto un impegno che le persone chiedono davvero,
  e a cui la risposta è no: far sparire una recensione negativa.
- ~~l'appuntamento su Cal.com si chiama «Meeting di 30 minuti»~~ —
  **risolto il 25 agosto 2026**: Dario l'ha rinominato **«Consulenza
  Gratuita»** e gli ha dato una descrizione. Chi clicca «Richiedi consulenza
  gratuita» adesso arriva su una pagina che dice la stessa cosa, e che spiega
  cosa succede nella mezz'ora.

  Due cose da ricordare per il futuro. **L'indirizzo dell'evento resta
  `30min`** e non va cambiato senza aggiornare `booking.url` nello stesso
  giro: Cal.com non lascia rimandi dai vecchi indirizzi, quindi i dieci
  pulsanti del sito punterebbero nel vuoto. E **il testo dell'evento vive su
  Cal.com, non in `site.ts`**: è l'unico pezzo di copy del sito che non sta
  nel repository, quindi se cambia il tono di voce va cambiato anche là a
  mano.
- `src/app/privacy` e `src/app/termini` — **le due pagine legali non sono
  ancora state riviste da un legale.** I dati societari però ci sono tutti,
  presi dalla visura camerale del 22 settembre 2025: denominazione, sede,
  partita IVA e REA sono in `company` e compaiono nel testo. Restava da
  verificare la forma societaria dichiarata nel copyright, ed **era
  sbagliata**: c'era «S.r.l.», la visura dice **S.r.l.s.** — semplificata, che
  è una società diversa. Corretto.
- ~~`src/app/prova/page.tsx` — pagina orfana, e i due pulsanti senza
  `cta.tsx`~~ — **risolto togliendo la pagina** il 25 agosto 2026. Vedi
  «La pagina della prova, e perché non c'è più» qui sopra.
- `src/components/blog.tsx` — **codice morto: non lo importa nessuno.** La
  home non ha più la sezione blog, e il componente è rimasto lì ricopiando
  verbatim titolo e sottotitolo di `/blog` (`blog.tsx:14-15` = `blog/page.tsx`).
  Diverso da `testimonials.tsx`, che è morto per scelta dichiarata e va tenuto:
  questo è solo rimasto indietro. Da togliere, o da rimettere in pagina se la
  sezione serve.
- `src/app/zzpreview/` — pagina di lavoro interna, ancora raggiungibile da
  chiunque ne conosca l'indirizzo. **Non finisce più nei risultati di
  ricerca** (`noindex` più il blocco in `robots.txt`), quindi non è più
  urgente, ma resta pubblica: se un giorno contiene qualcosa che non deve
  vedersi, va tolta o messa dietro una password.
- ~~`src/lib/site.ts` — il testo delle testimonianze è editoriale, non
  confermato dalle persone a cui è attribuito~~ — **risolto togliendo la
  sezione dal sito** il 25 agosto 2026, non riscrivendola. Dati e componente
  restano pronti: vedi «Le testimonianze: fuori dal sito, non cancellate».
  Resta da fare la cosa vera, cioè **chiedere una recensione ai clienti** —
  che è lavoro di Dario e Luisa, non di chi tocca il codice.
- `src/lib/site.ts` — i numeri della fascia sotto l'hero (`stats`) sono ripresi da
  affermazioni già presenti nel sito, ma non sono ancora stati confermati dai
  fondatori. Da verificare prima di andare online: sono dichiarazioni pubbliche.
  **Uno però ora è verificabile**: i «18 brand seguiti» sono esattamente le
  schede di `work` e i nomi del nastro — erano 10, e la riga smentiva la
  pagina `/lavori` che sta due schermate più sotto. Se aggiungi o togli un
  lavoro, rifai il numero.
- `public/team/` — le foto dei fondatori sono a bassa risoluzione (Dario
  472×472, Luisa 1024×1024): il quadrato è stato ristretto a `26rem` proprio
  per questo. **Dal 25 agosto 2026 il riquadro è 416px anche su tablet** (le
  schede si affiancano solo da 1024px), quindi la foto di Dario è più
  ingrandita di prima su quegli schermi: 472px dentro un riquadro da 416
  invece che da 312. Quando arrivano gli originali ad alta risoluzione si
  sostituiscono i due file — stessi nomi, niente altro da toccare — e a quel
  punto si può valutare se riportare il quadrato a `32rem`.
- `eslint.config.mjs` — la cartella `.vercel/` generata dal deploy non è esclusa
  dal controllo, e da sola produce oltre duemila avvisi che rendono `pnpm lint`
  illeggibile. Dentro `src/` non resta **nessun errore**: l'`<a>` di
  `logo.tsx`, che era l'unico vero, è sparito riscrivendo il componente con
  `<Link>`.
- ~~`src/components/site-header.tsx` — sotto i ~430px il «+» non compare~~ —
  **risolto, e non era un difetto del sito.** Il 24 agosto 2026 è stato
  verificato caricando il sito dentro un `<iframe>` largo 320, 390 e 430px: il
  «+» c'è, sta al suo posto e il contenuto non sborda. L'osservazione di
  partenza veniva dagli screenshot di Chrome senza interfaccia, che **non
  scende sotto una larghezza minima di finestra**: chiedendogli 390px
  disegnava la pagina a ~500 e ritagliava l'immagine a 390, tagliando via il
  bordo destro insieme al «+».

  Se devi misurare il sito su misure da telefono, **non fidarti di
  `--window-size` sotto i ~450px**: mettilo in un `<iframe>` della larghezza
  giusta dentro una finestra larga, che è l'unico modo per avere una gabbia
  davvero stretta.

Il corpo delle pagine legali sta in **`src/components/legal-article.tsx`**,
usato sia da `/privacy` sia da `/termini`: prima era ricopiato in tutte e due,
e bastava correggerne una per averle diverse.

- `src/app/chi-siamo/page.tsx` — le schede dei fondatori sono ora identiche a
  quelle di `about.tsx`, ma il markup è ancora ricopiato: se ne cambi una,
  ricordati dell'altra. Prima o poi vanno estratte in un componente solo.

## Insidia nota: le classi nuove e il server di sviluppo

Quando aggiungi in `globals.css` **un token o una classe che prima non
esisteva** (un colore, `.shell`, `.surface-glow`), il server di sviluppo
continua a servire il foglio di stile vecchio: a video l'elemento risulta senza
fondo, senza larghezza, senza effetto, mentre `pnpm build` è corretto. Non è un
errore nel codice. Riavvia `pnpm dev` (`rm -rf .next/dev` e rilancia) e torna
tutto. È già successo tre volte: prima di cercare il bug altrove, riavvia.

## Manutenzione di questo file

**Questo documento va aggiornato insieme al codice, non dopo.**

Ogni volta che una modifica cambia una di queste cose, correggi subito la sezione
corrispondente qui sopra, nello stesso intervento — non in un secondo momento:

- colori, token, caratteri, spaziature o qualsiasi scelta di stile
- la struttura delle pagine o dei componenti
- il modo in cui i contenuti sono organizzati in `src/lib/site.ts`
- dominio, hosting, servizi esterni collegati
- una voce risolta (o nuova) nella sezione «Da sistemare»

Poi dillo esplicitamente all'utente: «ho aggiornato anche AGENTS.md», così sa che
il documento e il sito sono allineati.

Se un intervento è grosso e il file resta indietro su più punti, fermati e riallinealo
prima di proseguire.
