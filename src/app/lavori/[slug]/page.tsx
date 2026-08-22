import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { work, getWork } from "@/lib/site";

export function generateStaticParams() {
  return work.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) return {};
  return { title: `${item.title} — Caso studio`, description: item.what };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getWork(slug);
  if (!item) notFound();

  const others = work.filter((w) => w.slug !== item.slug).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="pb-16 pt-36 sm:pt-44">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/lavori"
              className="kicker inline-flex items-center gap-2 text-cream/55 transition-colors hover:text-saffron"
            >
              <span aria-hidden>←</span> Lavori
            </Link>

            <div className="mt-8 flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
              <span className="text-saffron">{item.category}</span>
              <span className="text-cream/40">{item.year}</span>
            </div>

            <h1 className="mt-5 text-[clamp(2.2rem,6vw,4.5rem)]">
              <span className="display text-cream">{item.title}</span>
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-cream/75">
              {item.client}
            </p>

            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-navy-2">
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="object-cover"
                priority
              />
            </div>

            {/* Problema → Soluzione → Risultato */}
            <div className="mt-16 grid gap-12 md:grid-cols-[14rem_1fr] md:gap-16">
              <div className="md:contents">
                <h2 className="kicker text-saffron">Il problema</h2>
                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-cream/75 md:mt-0">
                  {item.problem}
                </p>
              </div>

              <div className="md:contents">
                <h2 className="kicker text-saffron">La soluzione</h2>
                <ul className="mt-3 max-w-2xl space-y-3 md:mt-0">
                  {item.solution.map((step) => (
                    <li key={step} className="flex items-start gap-3 text-lg leading-relaxed text-cream/75">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-saffron" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:contents">
                <h2 className="kicker text-saffron">Il risultato</h2>
                <ul className="mt-3 max-w-2xl space-y-3 md:mt-0">
                  {item.outcome.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-lg leading-relaxed text-cream/75">
                      <span className="mt-1 shrink-0 text-saffron">✓</span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:contents">
                <h2 className="kicker text-cream/55">Servizi</h2>
                <ul className="mt-3 flex flex-wrap gap-2 md:mt-0">
                  {item.services.map((service) => (
                    <li
                      key={service}
                      className="rounded-full border border-cream/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-cream/60"
                    >
                      {service}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="py-[108px]">
            <div className="mx-auto max-w-5xl">
              <p className="kicker text-cream/55">Altri lavori</p>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                {others.map((w) => (
                  <Link key={w.slug} href={`/lavori/${w.slug}`} className="group flex flex-col">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-navy-2">
                      <Image
                        src={w.image}
                        alt={w.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 20rem"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                      />
                    </div>
                    <h3 className="mt-3 font-semibold tracking-tight text-cream transition-colors group-hover:text-saffron">
                      {w.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <InnerCta
          title="Vuoi risultati simili?"
          body="Raccontaci la tua attività. Partiamo dal tuo problema, non da un pacchetto preconfezionato."
        />
      </main>
      <SiteFooter />
    </>
  );
}
