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
- `src/app/<pagina>/page.tsx` — pagine autonome: metodo, chi-siamo, lavori, blog,
  contatti, prova, privacy, termini
- `src/app/lavori/[slug]` e `src/app/blog/[slug]` — pagine generate una per voce tramite
  `generateStaticParams`: basta aggiungere un elemento a `work` o `posts` in `site.ts`
  e la pagina nasce da sola
- `src/components/` — un componente per sezione, più tre trasversali:
  `cta.tsx` (gli inviti all'azione), `reveal.tsx` (le comparse allo scroll) e
  `stats.tsx` (la riga di numeri, che vive **dentro** l'apertura, non come
  sezione a sé)
- `public/work/`, `public/social/`, `public/tools/` — immagini dei progetti e loghi

Gli strumenti della sezione «Progettiamo con» stanno nell'array `TOOLS` dentro
`src/components/tools.tsx` (non in `site.ts`: sono loghi, non testo). L'ordine
conta — è quello con cui le tessere si aprono a ventaglio — e il numero nel
pallino arancione si conta da sé, non va aggiornato a mano. Oggi sono dieci:
Claude, Cursor, Antigravity, Visual Studio Code, Premiere, Illustrator,
Lightroom, WordPress, Shopify, Ubersuggest. In `public/tools/` restano anche
`photoshop.svg`, `figma.svg` ed `elementor.svg`, non più in elenco: basta
rimetterli nell'array per farli tornare.

## Design

I token sono definiti in `src/app/globals.css`, dentro il blocco `@theme`.

**Gabbia e ritmo verticale** (misurati su leftclick.ai a 1440px): il contenuto
sta nella classe **`.shell`** — largo 87,5% con un tetto di 1260px, quindi 90px
di margine per lato — e ogni sezione ha **108px** di imbottitura sopra e sotto.
Le sezioni non mettono imbottitura laterale: ci pensa la gabbia. Non tornare a
`max-w-7xl` con `px-6 sm:px-10`.

Palette in uso: blu `#282f3f` (token `navy`, è il fondo), arancio `#f49619`
(`saffron`, **l'unico accento**), bianco caldo `#f7f7f3` (`cream`), più due blu di
servizio — `navy-deep` `#1e2530` per i fondi bassi e `navy-ink` `#0f141b` per le
fasce che devono staccare — oggi il nastro dei clienti e il footer, che
chiudono la pagina più scuri di tutto ciò che hanno sopra. Usa sempre i token,
mai i codici colore scritti a mano.

Il verde `#4eb480` (`mint`) è ancora definito fra i token ma **non è più usato da
nessuna parte**: su richiesta di Dario è stato sostituito ovunque dall'arancione.
Non reintrodurlo senza chiederglielo.

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

Per il **testo sopra l'arancio** esiste un token a parte, `ink` (`#282f3f`),
che non segue il tema: `text-navy` a tema chiaro diventa bianco, e il bianco
sull'arancio non si legge.

Per provare i due temi senza cliccare, e per mandare un link a colpo sicuro,
l'indirizzo accetta **`?theme=light`** e **`?theme=dark`**: lo legge lo stesso
script che decide il tema all'apertura, e ha la precedenza sulla scelta
salvata.

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

**Dove porta «Richiedi la prova gratuita»**: a **Cal.com**, il servizio di
prenotazione appuntamenti (lo stesso impianto di leftclick.ai, il riferimento
indicato da Dario). L'indirizzo (oggi
`cal.com/dlcommunication/30min`) sta in un punto solo — `booking.url` in
`site.ts` — e da lì lo leggono tutti i pulsanti: sezione della prova, barra
fissa su mobile, CTA di chiusura delle pagine interne e i due pulsanti della
pagina `/prova`.

**Due eccezioni: il pulsante dell'apertura e quello dell'intestazione**, che
portano a `#prova`, cioè scendono alla sezione della prova gratuita. È voluto: chi è appena arrivato non
sa ancora cosa starebbe prenotando, e mandarlo diritto su un calendario è
chiedergli fiducia prima di avergli spiegato di cosa si tratta. Da quella
sezione in giù, invece, la spiegazione l'ha letta e ogni pulsante apre il
calendario. Non uniformarli «per coerenza»: è una scelta di Dario.

Nell'**intestazione** «Prova gratuita» non è più una voce di menu: è lo stesso
pulsante arancione dell'apertura, in versione `size="sm"`, e compare due
volte — nella barra da 1024px in su, e in fondo al pannello del menu, dove
serve a chi naviga da telefono (lì la barra non c'è). Per questo la voce è
stata tolta da `nav` in `site.ts`: se la rimetti, compare due volte.

Le distanze fra le voci della barra si stringono a `gap-5` fra 1024 e 1280px:
in quello spazio devono stare marchio, sei voci, il pulsante e il «+». Da
1280 in su tornano larghe (`xl:gap-10`, `2xl:gap-14`). Se aggiungi una voce
di menu, rifai il conto o la barra va a capo. **Non scrivere l'indirizzo a mano nei
componenti**: se cambia il tipo di evento su Cal.com si aggiorna una riga sola.
I pulsanti aprono una **scheda nuova** (scelta di Dario): se il visitatore non
porta a termine la prenotazione, il sito è ancora lì dietro. `cta.tsx`
riconosce da sé i link che iniziano per `http` e aggiunge
`target="_blank" rel="noopener noreferrer"`.

**Il footer** è ricalcato su quello di leftclick.ai: a sinistra un'etichetta
piccola, una riga che spiega cosa succede e la pillola arancione; a destra
quattro colonne di link (Servizi, Studio, Risorse, Seguici); sotto una riga di
chiusura con marchio, note legali e copyright. Tutti i contenuti stanno in
`footer` dentro `site.ts` — `site-footer.tsx` fa solo impaginazione.

La colonna «Seguici» **legge da `social`**, non ricopia i profili: erano due
elenchi identici in due punti — footer e pannello del menu — e sarebbe bastato
aggiungerne uno solo di qua per averli diversi. Un profilo nuovo in `social`
compare da solo nel footer, nel pannello e nella pagina contatti.

**Ogni voce del footer punta a una destinazione vera.** L'unica forzatura è la
colonna «Servizi»: le otto voci non hanno una pagina propria e portano tutte a
`/#servizi`. Il giorno in cui nascono le pagine dei singoli servizi, cambiano
solo gli indirizzi in `site.ts`.

**L'indirizzo email è sempre cliccabile**, ovunque compaia: apre il programma
di posta con il destinatario già scritto. Al passaggio del mouse si sottolinea
in arancione — è l'unico posto del sito in cui una sottolineatura è voluta,
perché lì serve a far capire che si può scrivere. Nelle pagine legali la mail
è dentro il testo dei paragrafi: `legal-article.tsx` la riconosce e la
trasforma in link da sé, non serve scriverlo a mano in `site.ts`.

**Inviti all'azione**: usa sempre il componente `src/components/cta.tsx`, mai un
link sottolineato. La pillola arancione piena (`primary`) è l'unica azione forte
di ogni schermata; il contorno (`outline`, pensato per i **fondi scuri**: bordo e
testo avorio) accompagna senza rubare l'occhio. La pillola piena chiude con un
pallino blu, quella a contorno con un pallino avorio; in entrambe c'è la freccia.

Peso, interlinea e spaziature dei pulsanti sono misurati su leftclick.ai:
testo di **peso 400** (mai grassetto), riga 1.3, nessuna spaziatura extra tra le
lettere, distanza testo-pallino 1em, imbottitura `0.2em 0.25em 0.2em 1em`.

Il movimento è ripreso dallo stesso riferimento:
testo e freccia sono scritti due volte dentro un contenitore che taglia il
fuori-bordo, e al passaggio del mouse la coppia scorre — il testo verso l'alto,
la freccia verso destra — in 0,3 secondi con andamento `ease`. Le misure sono
in `em`, quindi basta cambiare la dimensione del testo per riscalare tutto il
pulsante. La barra fissa su mobile (`mobile-cta`) resta una pillola larga a sé:
è un'altra affordance, non un pulsante in linea.

Per dare profondità ai fondi piatti si usano cerchi sfumati molto sfocati nei
colori del brand (`bg-saffron/10 blur-[120px]`), oggi solo in `inner-cta`.
La sezione della prova (`trial`) **non è più una scheda di vetro arancione**:
niente cornice, niente alone, è una sezione come le altre sul fondo a
gradiente.
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
testimonianze (`bg-navy-deep`) · prova (`.surface-glow`) · contatti
(`bg-navy-deep`) · footer (`bg-navy-ink`, scuro sempre). Le due pagine legali (`/privacy`
e `/termini`) stanno su `bg-navy-deep`, come la sezione dei contatti: sono
pagine di servizio, non devono brillare. La sezione delle testimonianze **non è più chiara**: era
l'unica su `bg-cream`, ora è blu in tinta unita come le altre. Se aggiungi una
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
per dieci nomi, oggi sono **35 per quattordici**. Se aggiungi o togli un cliente,
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

## Lingua

Testi del sito e commenti nel codice in italiano. Nomi di variabili, funzioni e file
in inglese.

## Contesto operativo

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

- `src/lib/site.ts` — l'appuntamento su Cal.com si chiama ancora «Meeting di
  30 minuti», il nome predefinito: chi clicca «Richiedi la prova gratuita»
  arriva su una pagina che parla d'altro. Da rinominare **su Cal.com**, non
  nel codice. Se cambia anche l'indirizzo dell'evento (`30min`), va aggiornato
  `booking.url`: Cal.com non lascia rimandi dai vecchi indirizzi.
- `src/app/privacy` e `src/app/termini` — **le due pagine legali non sono state
  riviste da un legale** e in `company` (`site.ts`) mancano partita IVA e sede
  legale: una privacy policy deve identificare per intero chi tratta i dati.
  Da completare e far controllare prima di collegare il dominio. Va anche
  verificato che la forma societaria dichiarata nel copyright — **S.r.l.** —
  sia quella reale: è una dichiarazione pubblica.
- `src/app/api/contact/route.ts` — il form contatti non invia ancora nulla, scrive
  solo nei log. Va collegato a un servizio email reale prima di andare online.
- `src/app/prova/page.tsx` — i due pulsanti hanno ancora il loro markup
  invece del componente `cta.tsx`: stesso colore, ma niente movimento e niente
  pallino con la freccia. Da uniformare.
- `src/app/zzpreview/` — pagina di lavoro interna, raggiungibile pubblicamente.
  Da rimuovere o proteggere prima di collegare il dominio.
- `src/lib/site.ts` — le tre testimonianze portano ora nome e attività di
  persone vere (Mariano Panariello, Angelo Arrichiello), ma **il testo delle
  citazioni è ancora quello editoriale** scritto per il sito. Va fatto
  confermare o riscrivere da loro prima di andare online: sono parole
  attribuite a persone reali.
- `src/lib/site.ts` — i numeri della fascia sotto l'hero (`stats`) sono ripresi da
  affermazioni già presenti nel sito, ma non sono ancora stati confermati dai
  fondatori. Da verificare prima di andare online: sono dichiarazioni pubbliche.
- `public/team/` — le foto dei fondatori sono a bassa risoluzione (Dario
  472×472, Luisa 1024×1024): il quadrato è stato ristretto a `26rem` proprio
  per questo. Quando arrivano gli originali ad alta risoluzione si
  sostituiscono i due file — stessi nomi, niente altro da toccare — e a quel
  punto si può valutare se riportare il quadrato a `32rem`.
- `eslint.config.mjs` — la cartella `.vercel/` generata dal deploy non è esclusa
  dal controllo, e da sola produce oltre duemila avvisi che rendono `pnpm lint`
  illeggibile. `src/components/logo.tsx` usa inoltre un `<a>` verso `/` invece di
  `<Link>`: è l'unico errore vero del progetto.

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
