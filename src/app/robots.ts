import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Il primo file che ogni motore di ricerca cerca. Dice due cose: cosa non
// guardare, e dov'è la mappa del sito.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // `/zzpreview` è la pagina di lavoro interna e `/api` è la rotta del
      // modulo contatti: né l'una né l'altra hanno senso nei risultati.
      // Il blocco qui non basta da solo — un indirizzo già noto può finire
      // nei risultati anche se non viene letto — quindi `/zzpreview` porta
      // anche `robots: { index: false }` nella propria pagina.
      disallow: ["/zzpreview", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
