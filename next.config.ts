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
      // `/prova` esce dal sito il 25 agosto 2026, per decisione di Dario, e
      // rimanda **alla sezione della prova sulla home**.
      //
      // Perché è stata tolta: diceva quello che dice già quella sezione —
      // titolo e sottotitolo erano `<Trial />` ricopiato a mano, i passi
      // erano gli stessi `trial.steps`, la FAQ in fondo era il sottoinsieme
      // `trial` di `/faq` — e non era raggiungibile da nessun link: ci
      // arrivava solo chi la trovava su Google.
      //
      // **Prima puntava al calendario, ed è stato cambiato subito.** Chi
      // arriva da una ricerca non sa ancora cosa starebbe prenotando, e
      // mandarlo dritto su Cal.com è chiedergli fiducia prima di avergli
      // spiegato di cosa si tratta: è esattamente la regola per cui il
      // pulsante dell'apertura porta a `#prova` e non al calendario. Ora chi
      // cercava la prova gratuita atterra dove gliela spieghiamo, con il
      // pulsante per il calendario lì sotto.
      { source: "/prova", destination: "/#prova", permanent: true },
    ];
  },
};

export default nextConfig;
