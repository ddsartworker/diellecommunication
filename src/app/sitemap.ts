import type { MetadataRoute } from "next";
import { posts, servicesWithPage, siteUrl, work } from "@/lib/site";

// **Solo i lavori che hanno un caso studio hanno una pagina.** Gli altri
// vivono nell'elenco di `/lavori` e non hanno un indirizzo proprio: metterli
// qui vorrebbe dire consegnare a Google sedici indirizzi di cui tredici
// rispondono «pagina non trovata». Il filtro è lo stesso che usa
// `generateStaticParams`.
const lavoriConPagina = work.filter((w) => w.study);

// La mappa del sito, generata dai dati invece che scritta a mano: aggiungi un
// lavoro, un articolo o il campo `page` a un servizio, e l'indirizzo compare
// qui da solo. Una mappa scritta a mano si dimentica di aggiornarla, e una
// mappa incompleta è peggio di nessuna mappa.
//
// `/zzpreview` non c'è ed è voluto: è una pagina di lavoro interna.

// Quanto spesso cambia una pagina e quanto conta rispetto alle altre. Sono
// indicazioni, non ordini: Google le legge e poi decide da sé.
const statiche: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/servizi", priority: 0.9, changeFrequency: "monthly" },
  { path: "/lavori", priority: 0.8, changeFrequency: "monthly" },
  { path: "/chi-siamo", priority: 0.8, changeFrequency: "yearly" },
  { path: "/contatti", priority: 0.8, changeFrequency: "yearly" },
  { path: "/prova", priority: 0.8, changeFrequency: "yearly" },
  { path: "/metodo", priority: 0.7, changeFrequency: "yearly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/termini", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const aggiornato = new Date();

  return [
    ...statiche.map((p) => ({
      url: `${siteUrl}${p.path}`,
      lastModified: aggiornato,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    // Le quattro pagine di servizio contano quasi quanto l'elenco: sono
    // quelle che devono farsi trovare su «siti web Napoli» e simili.
    ...servicesWithPage.map((s) => ({
      url: `${siteUrl}/servizi/${s.slug}`,
      lastModified: aggiornato,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...lavoriConPagina.map((w) => ({
      url: `${siteUrl}/lavori/${w.slug}`,
      lastModified: aggiornato,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${siteUrl}/blog/${p.slug}`,
      lastModified: aggiornato,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
