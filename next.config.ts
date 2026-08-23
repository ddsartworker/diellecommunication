import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 accetta di default una sola qualità, 75, e ogni altro valore
    // viene riportato a quella. I ritratti dei fondatori chiedono 90: sono
    // foto di partenza piccole, e la compressione a 75 sopra un'immagine già
    // ingrandita si vede. Vedi `quality` in about.tsx e chi-siamo/page.tsx.
    qualities: [75, 90],
  },
};

export default nextConfig;
