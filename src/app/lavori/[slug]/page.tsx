import type { Metadata } from "next";
import Cta from "@/components/cta";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import Contact from "@/components/contact";
import Reveal from "@/components/reveal";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema, getWork, work } from "@/lib/site";

// Impianto ricalcato su `leftclick.ai/case-studies/<slug>`, il riferimento
// indicato da Dario, con le misure prese dal loro foglio di stile:
//
// · **apertura a due colonne** — a sinistra un pannello largo il **28,6%**
//   con il ritorno indietro in alto e la frase di riassunto in basso
//   (`justify-between`), a destra l'immagine che riempie il resto;
// · **corpo a due colonne** — a sinistra una scheda con le pillole dei
//   servizi (stessa larghezza, 28,6%), a destra nome, inquadramento e le tre
//   sezioni;
// · **le tre sezioni sono schede**, e la prima è **invertita**: sul
//   riferimento «Outcomes» ha il fondo chiaro e il testo scuro mentre le
//   altre due sono spente. È il modo per dire che i risultati contano più
//   della premessa.
//
// **L'ordine — Risultati, Il problema, Cosa abbiamo fatto — è il loro e non
// va cambiato.** Chi apre la pagina vuole sapere com'è andata, non ascoltare
// il preambolo.
const conCasoStudio = work.filter((w) => w.study);

// Il dominio senza «www.», da usare come etichetta del link al cliente.
function dominio(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function generateStaticParams() {
  return conCasoStudio.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item?.study) return {};
  return {
    alternates: { canonical: `/lavori/${slug}` },
    title: `${item.title} — caso studio`,
    description: item.study.lead,
  };
}

// Una delle tre schede. `evidenza` inverte i colori: fondo avorio e testo
// blu. Funziona in tutti e due i temi perché i due token si scambiano —
// a tema chiaro `cream` diventa blu scuro e `navy` diventa bianco, quindi la
// scheda resta invertita rispetto alla pagina invece di sparirci dentro.
function SchedaDettaglio({
  titolo,
  voci,
  testo,
  evidenza = false,
}: {
  titolo: string;
  voci?: string[];
  testo?: string;
  evidenza?: boolean;
}) {
  const fondo = evidenza
    ? "bg-cream text-navy"
    : "bg-cream/[0.06] text-cream";
  const riga = evidenza ? "border-navy/10 text-navy/70" : "border-cream/10 text-cream/55";

  return (
    <div className={`rounded-2xl p-8 sm:p-9 ${fondo}`}>
      <h2 className="text-[1.5rem] font-medium tracking-[-0.02em]">{titolo}</h2>
      {testo ? (
        <p className={`mt-3 text-[1.0625rem] leading-[1.55] ${evidenza ? "text-navy/70" : "text-cream/55"}`}>
          {testo}
        </p>
      ) : null}
      {voci ? (
        <ul className="mt-3">
          {voci.map((v) => (
            <li
              key={v}
              className={`border-b py-2.5 text-[1.0625rem] leading-[1.55] last:border-b-0 ${riga}`}
            >
              {v}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item?.study) notFound();

  const { study } = item;

  return (
    <>
      <SiteHeader />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Lavori", path: "/lavori" },
          { name: item.title, path: `/lavori/${item.slug}` },
        ])}
      />
      <main>
        <section className="surface-glow relative overflow-hidden pb-[108px] pt-36 text-cream sm:pt-44">
          <div className="shell">
            {/* Apertura a due colonne: pannello a sinistra, immagine a
                destra. Sotto i 1024px si impilano. */}
            <div className="flex flex-col gap-4 lg:h-[30rem] lg:flex-row">
              <div className="flex flex-col justify-between rounded-2xl bg-cream/[0.06] p-6 lg:w-[28.6%] lg:shrink-0">
                {/* Stesso pulsante della pillola arancione, in versione a
                    contorno e girata: pallino a sinistra e freccia
                    all'indietro. Prima era un link con un bordo e una
                    freccina di testo — stessa funzione, ma senza movimento e
                    senza pallino, quindi sembrava un altro elemento del
                    sito. Il `div` serve a non farlo stirare: il pannello è
                    una colonna flex e senza tornerebbe largo quanto lei. */}
                <div>
                  <Cta href="/lavori" variant="outline" back>
                    Torna ai lavori
                  </Cta>
                </div>
                <p className="mt-8 text-[1.1rem] leading-[1.55] text-cream/70">
                  {study.lead}
                </p>
              </div>

              <div className="relative min-h-[16rem] flex-1 overflow-hidden rounded-2xl bg-cream/[0.04] lg:min-h-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.alt ?? item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 56rem"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <span className="display text-center text-3xl text-cream/20">
                      {item.title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Corpo a due colonne: pillole a sinistra, tutto il resto a
                destra. */}
            <div className="mt-16 flex flex-col items-start gap-4 lg:mt-20 lg:flex-row">
              <div className="w-full lg:w-[28.6%] lg:shrink-0">
                <ul className="flex flex-wrap gap-3 rounded-2xl bg-cream/10 p-6">
                  {item.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full bg-cream/10 px-3.5 py-1.5 text-[0.8rem] text-cream/85"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                {/* L'etichetta è **il dominio**, non «vedi il sito»: è quello
                    che fanno gli studi presi a riferimento — Instrument
                    scrive «Visit OuraRing.com», Locomotive «ageofunion.com».
                    Dire dove si va vale più di dire che si può andare, e chi
                    naviga con un lettore di schermo sente la destinazione
                    invece di una formula buona per qualsiasi link. */}
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-2 text-[0.95rem] text-saffron underline decoration-saffron/40 decoration-1 underline-offset-4"
                  >
                    {item.hrefLabel ?? dominio(item.href)}
                    <span aria-hidden>↗</span>
                  </a>
                ) : null}
              </div>

              <div className="min-w-0 flex-1 px-0 lg:px-4">
                <h1 className="text-[clamp(1.9rem,4.4vw,3rem)]">
                  <span className="display text-cream">{item.title}</span>
                </h1>
                {study.subtitle ? (
                  <p className="mt-3 text-[1.125rem] text-cream/35">
                    {study.subtitle}
                  </p>
                ) : null}

                <div className="mt-10 flex flex-col gap-10">
                  <Reveal>
                    <SchedaDettaglio
                      titolo="Risultati"
                      voci={study.outcomes}
                      evidenza
                    />
                  </Reveal>
                  <Reveal delay={80}>
                    <SchedaDettaglio titolo="Il problema" testo={study.challenge} />
                  </Reveal>
                  <Reveal delay={140}>
                    <SchedaDettaglio
                      titolo="Cosa abbiamo fatto"
                      voci={study.solution}
                    />
                  </Reveal>
                </div>

                {/* Il secondo passaggio, in fondo. Locomotive ripete il link
                    al cliente tre volte lungo la pagina, l'ultima verso la
                    fine: chi ha appena letto cosa è stato fatto è il momento
                    in cui vuole andare a vederlo. In alto è un link
                    discreto, qui è un pulsante vero. */}
                {item.href ? (
                  <div className="mt-12 border-t border-cream/10 pt-10">
                    <p className="text-cream/60">
                      Il lavoro è online: vallo a vedere.
                    </p>
                    <div className="mt-5">
                      <Cta href={item.href} variant="outline">
                        {item.hrefLabel ?? dominio(item.href)}
                      </Cta>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
