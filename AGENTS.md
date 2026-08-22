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
- `src/app/<pagina>/page.tsx` — pagine autonome: metodo, chi-siamo, lavori, blog, contatti, prova
- `src/app/lavori/[slug]` e `src/app/blog/[slug]` — pagine generate una per voce tramite
  `generateStaticParams`: basta aggiungere un elemento a `work` o `posts` in `site.ts`
  e la pagina nasce da sola
- `src/components/` — un componente per sezione, più due trasversali:
  `cta.tsx` (gli inviti all'azione) e `reveal.tsx` (le comparse allo scroll)
- `public/work/`, `public/social/`, `public/tools/` — immagini dei progetti e loghi

## Design

I token sono definiti in `src/app/globals.css`, dentro il blocco `@theme`.

Palette di marca: blu `#282f3f` (token `navy`, è il fondo), arancio `#f49619`
(`saffron`, l'accento), verde `#4eb480` (`mint`), bianco caldo `#f7f7f3` (`cream`).
Usa sempre i token, mai i codici colore scritti a mano.

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

**Inviti all'azione**: usa sempre il componente `src/components/cta.tsx`, mai un
link sottolineato. La pillola arancione piena (`primary`) è l'unica azione forte
di ogni schermata; il contorno (`outline`, pensato per i fondi chiari) accompagna
senza rubare l'occhio. Entrambe chiudono con un pallino blu e la freccia.

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
colori del brand (`bg-saffron/10 blur-[120px]`), come nell'hero e in `trial`.
Mai gradienti sul testo.

Interlinea: **1.3** sul testo (come il riferimento), **1.05** sui titoli, con
tracking -0.03em e peso 500. Sono i valori misurati sul titolo di leftclick.ai.

L'apertura è scura, con un alone radiale al centro
(`radial-gradient(80% 60% at 50% 40%, navy-2, navy-deep)`) e titolo in **un solo
colore**: la sfumatura sta nel fondo, mai nelle lettere.

**Barra e apertura sono una superficie sola.** L'intestazione non ha fondo né
bordo, e **non è fissa**: è `absolute` e scorre via con la pagina, come sul
riferimento (dove è `position: static`). L'apertura parte dal margine dello
schermo e occupa tutta l'altezza (`min-h-svh`).

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
unita `navy-2`: è il blu chiaro al centro del gradiente dell'apertura, usato
pieno perché la fascia stacchi da ciò che sta sopra e sotto. A sinistra una
scritta ferma («Dario e Luisa hanno lavorato con»), a destra i nomi che scorrono.
Misure prese dal riferimento: etichetta 9,9px maiuscola con tracking 0.1em,
nomi 15,8px di peso 500, 54px tra un nome e l'altro, giro in 25 secondi. I nomi
dei clienti in `site.ts` vanno scritti con le maiuscole giuste: il nastro non li
trasforma più in maiuscolo.

Le animazioni restano lente e discrete (comparse allo scroll, scorrimenti nei
pulsanti).

## Lingua

Testi del sito e commenti nel codice in italiano. Nomi di variabili, funzioni e file
in inglese.

## Contesto operativo

- Repository: `github.com/ddsartworker/diellecommunication`
- Dominio `dlcommunication.it` registrato su Aruba, con DNS e casella email presso
  Aruba. Il dominio non è ancora collegato: quando lo sarà, si cambiano solo i record
  del sito, **mai i nameserver**, altrimenti si spegne la posta.

## Da sistemare

- `src/app/api/contact/route.ts` — il form contatti non invia ancora nulla, scrive
  solo nei log. Va collegato a un servizio email reale prima di andare online.
- `src/app/zzpreview/` — pagina di lavoro interna, raggiungibile pubblicamente.
  Da rimuovere o proteggere prima di collegare il dominio.
- `src/lib/site.ts` — l'email di contatto punta a `diellecommunication.it`, un dominio
  che non esiste. Va corretta con la casella vera su `dlcommunication.it`.
- `src/lib/site.ts` — i numeri della fascia sotto l'hero (`stats`) sono ripresi da
  affermazioni già presenti nel sito, ma non sono ancora stati confermati dai
  fondatori. Da verificare prima di andare online: sono dichiarazioni pubbliche.
- `src/components/about.tsx` — mancano le foto di Dario e Luisa: al loro posto
  compaiono le iniziali. Le foto vanno in `public/team/` e poi valorizzato il
  campo `photo` in `founders`.
- `eslint.config.mjs` — la cartella `.vercel/` generata dal deploy non è esclusa
  dal controllo, e da sola produce oltre duemila avvisi che rendono `pnpm lint`
  illeggibile.

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
