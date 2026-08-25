import type { Metadata } from "next";
import "./globals.css";
import { organizationSchema, siteUrl } from "@/lib/site";
import JsonLd from "@/components/json-ld";
import ThemeToggle from "@/components/theme-toggle";
import WhatsappButton from "@/components/whatsapp-button";

// Nessun font da scaricare: il sito usa il carattere di sistema del
// dispositivo di chi guarda (vedi il blocco @theme in globals.css).
// Tre famiglie da Google Fonts in meno significano anche una pagina che
// compare prima, senza il salto di carattere durante il caricamento.

// L'indirizzo del sito arriva da `site.ts`, dove si ricava da solo dal
// dominio di produzione configurato su Vercel. Prima era scritto a mano come
// `https://dlcommunication.it`, che è il dominio vero ma **non ancora
// collegato**: le anteprime social puntavano a un indirizzo che non
// risponde, e chi condivideva il link vedeva un riquadro vuoto.

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  // Indirizzo ufficiale della home. Le altre pagine dichiarano il proprio in
  // `alternates.canonical`, relativo a questo.
  alternates: { canonical: "/" },
  title: {
    default: "Dielle Communication — Boutique marketing agency a Napoli",
    template: "%s · Dielle Communication",
  },
  // 158 caratteri. Google ne mostra circa 155 e taglia il resto a metà
  // frase: la precedente ne aveva 242 e finiva troncata.
  description:
    "Boutique marketing agency a Napoli: siti web, social, advertising e branding su misura, seguiti di persona da Dario e Luisa. Si comincia con una prova gratuita.",
  keywords: [
    "marketing",
    "comunicazione",
    "agenzia marketing Napoli",
    "social media",
    "advertising",
    "branding",
    "siti web",
    "Campania",
    "Dielle Communication",
  ],
  authors: [{ name: "Dario De Sisto" }, { name: "Luisa Panariello" }],
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: siteUrl,
    siteName: "Dielle Communication",
    title: "Dielle Communication — Boutique marketing agency a Napoli",
    description:
      "Comunicazione su misura, seguita di persona. Pochi clienti, risultati che si vedono. Inizia con un periodo di prova gratuito.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dielle Communication",
    description:
      "Boutique marketing agency a Napoli. Comunicazione su misura, seguita di persona dai fondatori.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // `suppressHydrationWarning`: lo script qui sotto scrive `data-theme` su
    // <html> prima che React arrivi, quindi il segno trovato dal browser non
    // coincide con quello generato dal server. È voluto.
    <html lang="it" suppressHydrationWarning>
      <head>
        {/*
          Il tema va deciso PRIMA che la pagina si disegni, altrimenti si vede
          un lampo del tema sbagliato a ogni caricamento. Questo script è
          minuscolo e bloccante apposta.

          L'ordine di precedenza è: `?theme=` nell'indirizzo, poi la scelta
          salvata da chi visita, **poi lo scuro**.

          Alla prima visita si apre **sempre scuro**, anche a chi ha il
          sistema operativo in chiaro. Richiesta di Dario del 25 agosto 2026,
          ed è la scelta giusta: il sito è disegnato scuro — l'apertura è un
          alone su fondo blu, il nastro dei clienti e il footer sono ancora
          più profondi, e tre fasce restano scure anche a tema chiaro. Il
          chiaro esiste per chi lo preferisce, non è il modo in cui il sito va
          visto la prima volta.

          Chi ha già scelto continua a trovare la sua scelta: si guarda
          `localStorage` prima del predefinito, quindi questa modifica non
          scavalca nessuno.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var q=new URLSearchParams(location.search).get("theme");var t=q==="light"||q==="dark"?q:localStorage.getItem("dielle-theme");if(t!=="light"&&t!=="dark"){t="dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-navy font-sans text-cream antialiased">
        {children}
        {/* Chi siamo, per Google. Sta nel layout perché vale per tutte le
            pagine: è la carta d'identità dell'azienda, non di una pagina. */}
        <JsonLd data={organizationSchema()} />
        <WhatsappButton />
        <ThemeToggle />
      </body>
    </html>
  );
}
