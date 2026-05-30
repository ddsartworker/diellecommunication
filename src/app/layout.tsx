import type { Metadata } from "next";
import { Inter, Michroma, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Michroma — font del brand per titoli e display. Disponibile solo in regular.
const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

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
    <html
      lang="it"
      className={`${inter.variable} ${michroma.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-navy font-sans text-cream antialiased">
        {children}
      </body>
    </html>
  );
}
