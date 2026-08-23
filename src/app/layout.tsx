import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";

// Nessun font da scaricare: il sito usa il carattere di sistema del
// dispositivo di chi guarda (vedi il blocco @theme in globals.css).
// Tre famiglie da Google Fonts in meno significano anche una pagina che
// compare prima, senza il salto di carattere durante il caricamento.

// Il dominio vero del brand, quello registrato su Aruba. Non è ancora
// collegato: finché il sito vive su Vercel questo indirizzo serve solo a
// costruire i link canonici e le anteprime social, e sarà giusto dal giorno
// in cui il dominio punta qui. `diellecommunication.it`, che stava scritto
// prima, non esiste e non è mai esistito.
const siteUrl = "https://dlcommunication.it";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dielle Communication — Boutique marketing agency a Napoli",
    template: "%s · Dielle Communication",
  },
  description:
    "Boutique marketing agency a Napoli: comunicazione su misura seguita di persona da Dario De Sisto e Luisa Panariello. Siti web, social, advertising e branding per ristoranti, attività e PMI in Campania. Inizia con un periodo di prova gratuito.",
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
          minuscolo e bloccante apposta: legge la scelta salvata, e se non c'è
          segue l'impostazione del sistema operativo di chi visita.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("dielle-theme");if(!t){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-navy font-sans text-cream antialiased">
        {children}
        <ThemeToggle />
      </body>
    </html>
  );
}
