import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 accetta di default una sola qualità, 75, e ogni altro valore
    // viene riportato a quella. I ritratti dei fondatori chiedono 90: sono
    // foto di partenza piccole, e la compressione a 75 sopra un'immagine già
    // ingrandita si vede. Vedi `quality` in about.tsx e chi-siamo/page.tsx.
    qualities: [75, 90],
  },

  // Le pagine tolte il 24 agosto 2026 fondendole in altre. Erano pubblicate
  // e Google le aveva già viste: senza rimando avrebbero risposto «pagina non
  // trovata» a chi ci arriva da una ricerca o da un link salvato.
  // `permanent: true` scrive un 308, che dice a Google di spostare il
  // posizionamento sulla pagina nuova invece di ricominciare da zero.
  async redirects() {
    return [
      // Diceva le stesse cose di «Chi siamo».
      { source: "/dl-communication", destination: "/chi-siamo", permanent: true },
      // Fusa dentro «Il metodo», che ora racconta come lavoriamo *e* cosa
      // succede a chi ci contatta.
      { source: "/processo", destination: "/metodo", permanent: true },
    ];
  },
};

export default nextConfig;
