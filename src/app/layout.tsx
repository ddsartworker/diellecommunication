import type { Metadata } from "next";
import "./globals.css";

// Nessun font da scaricare: il sito usa il carattere di sistema del
// dispositivo di chi guarda (vedi il blocco @theme in globals.css).
// Tre famiglie da Google Fonts in meno significano anche una pagina che
// compare prima, senza il salto di carattere durante il caricamento.

const siteUrl = "https://diellecommunication.it";

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
    <html lang="it">
      <body className="min-h-screen bg-navy font-sans text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
