import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { work } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lavori — Casi reali, spiegati semplice",
  description:
    "I progetti di Dielle Communication: per ognuno il problema di partenza, cosa abbiamo fatto e cosa è cambiato.",
};

export default function LavoriIndex() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-12 pt-36 sm:pt-44">
          <div className="shell">
            <p className="kicker text-saffron">Portfolio</p>
            <h1 className="mt-4 text-[clamp(2rem,6vw,4.5rem)]">
              <span className="display text-cream">I lavori,</span>{" "}
              <span className="display text-cream">spiegati semplice.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70">
              Per ogni progetto: il problema di partenza, cosa abbiamo fatto e
              cosa è cambiato. Senza gergo.
            </p>
          </div>
        </section>

        <section className="pb-24 sm:pb-32">
          <div className="shell grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {work.map((item) => (
              <Link
                key={item.slug}
                href={`/lavori/${item.slug}`}
                className="group flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-2">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-navy-deep/80 px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-cream/80 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h2 className="text-xl font-semibold tracking-tight text-cream transition-colors group-hover:text-saffron">
                    {item.title}
                  </h2>
                  <span className="shrink-0 font-mono text-[0.65rem] text-saffron">
                    {item.year}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">
                  {item.what}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <InnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
