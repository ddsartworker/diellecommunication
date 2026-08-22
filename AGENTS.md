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
- `src/components/` — un componente per sezione
- `public/work/`, `public/social/`, `public/tools/` — immagini dei progetti e loghi

## Design

I token sono definiti in `src/app/globals.css`, dentro il blocco `@theme`.

Palette di marca: blu `#282f3f` (token `navy`, è il fondo), arancio `#f49619`
(`saffron`, l'accento), verde `#4eb480` (`mint`), bianco caldo `#f7f7f3` (`cream`).
Usa sempre i token, mai i codici colore scritti a mano.

Caratteri: **Michroma** per i titoli (classe `display`), **Inter** per il testo,
**JetBrains Mono** per le micro-etichette in maiuscolo con lettere spaziate.

L'estetica è tipografica e sobria: fondo scuro, molto spazio bianco, animazioni
lente e discrete (sottolineature che crescono al passaggio del mouse, comparse allo
scroll). Michroma è un carattere molto largo: attenzione ai titoli lunghi su mobile.

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
