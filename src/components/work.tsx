"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./reveal";
import { work, workCategories, social, type WorkCategory } from "@/lib/site";

const instagram = social.find((s) => s.label === "Instagram")?.href ?? "#";

export default function Work() {
  const [active, setActive] = useState<WorkCategory>("Tutti");

  const filtered =
    active === "Tutti" ? work : work.filter((w) => w.category === active);

  return (
    <section id="lavori" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-saffron">Portfolio</p>
            <h2 className="mt-4 text-[clamp(1.7rem,4vw,3rem)]">
              <span className="display text-cream">I lavori,</span>{" "}
              <span className="display text-cream">spiegati semplice.</span>
            </h2>
          </div>
          <p className="max-w-xs text-cream/60">
            Per ogni progetto trovi cos&apos;è e a cosa è servito. Niente gergo:
            scegli la categoria che ti somiglia.
          </p>
        </Reveal>

        {/* Filtri per categoria */}
        <Reveal delay={60} className="mt-10 flex flex-wrap gap-2.5">
          {workCategories.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                aria-pressed={isActive}
                className={`rounded-full px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                  isActive
                    ? "bg-saffron text-navy"
                    : "border border-cream/15 text-cream/65 hover:border-cream/40 hover:text-cream"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </Reveal>

        {filtered.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <Link
                key={item.title}
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
                  <h3 className="text-xl font-semibold tracking-tight text-cream">
                    {item.title}
                  </h3>
                  <span className="shrink-0 font-mono text-[0.65rem] text-saffron">
                    {item.year}
                  </span>
                </div>

                <dl className="mt-3 space-y-2.5 text-sm leading-relaxed">
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-saffron">
                      Cos&apos;è
                    </dt>
                    <dd className="mt-1 text-cream/75">{item.what}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-saffron">
                      A cosa è servito
                    </dt>
                    <dd className="mt-1 text-cream/75">{item.result}</dd>
                  </div>
                </dl>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-cream/55 transition-colors group-hover:text-saffron">
                  Vedi il caso
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex min-h-48 flex-col items-start justify-center rounded-2xl border border-dashed border-cream/15 p-10">
            <p className="display text-2xl text-cream">In arrivo.</p>
            <p className="mt-2 max-w-sm text-cream/60">
              Stiamo selezionando i progetti di questa categoria. Nel frattempo,
              scrivici: ci piace partire da una pagina bianca.
            </p>
          </div>
        )}

        {/* CTA Instagram */}
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 flex items-center justify-between gap-6 rounded-2xl border border-cream/15 p-6 transition-colors duration-500 hover:border-saffron/60 hover:bg-white/[0.02] sm:p-8"
        >
          <div>
            <span className="kicker text-cream/55">@diellecommunication</span>
            <p className="display mt-3 text-2xl text-cream transition-colors duration-300 group-hover:text-saffron sm:text-3xl">
              Tutti gli altri lavori su Instagram
            </p>
          </div>
          <span className="shrink-0 text-2xl text-saffron transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
