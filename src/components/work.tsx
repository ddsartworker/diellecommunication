"use client";

import { useState } from "react";
import SectionHead from "./section-head";
import Reveal from "./reveal";
import Cta from "./cta";
import WorkCard from "./work-card";
import { work, workCategories, social, type WorkCategory } from "@/lib/site";

const instagram = social.find((s) => s.label === "Instagram")?.href ?? "#";

export default function Work() {
  const [active, setActive] = useState<WorkCategory>("Tutti");

  const filtered =
    active === "Tutti" ? work : work.filter((w) => w.category === active);

  return (
    <section id="lavori" className="py-[108px]">
      <div className="shell">
        <SectionHead
          title="I lavori, spiegati semplice."
          body="Per ogni progetto trovi cos'è e a cosa è servito. Niente gergo: scegli la categoria che ti somiglia."
        />

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
                    ? "bg-saffron text-ink"
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
              <WorkCard key={item.slug} item={item} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-cream/60">
            Nessun lavoro in questa categoria, per ora.
          </p>
        )}

        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Cta href="/lavori" variant="outline">
            Vedi tutti i lavori
          </Cta>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-cream/55 transition-colors hover:text-saffron"
          >
            Seguici su Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}
