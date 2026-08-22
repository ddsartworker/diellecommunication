import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InnerCta from "@/components/inner-cta";
import { method } from "@/lib/site";

export const metadata: Metadata = {
  title: "Il metodo — Lavoriamo come un sarto",
  description:
    "Niente pacchetti uguali per tutti. Il metodo sartoriale di Dielle Communication: cinque passi, seguiti di persona, per costruire una comunicazione su misura.",
};

// Per ogni step: cosa ottieni tu + quanto dura (dettaglio che non sta in homepage).
const detail: Record<string, { gain: string; time: string }> = {
  "01": { gain: "Ti senti capito, prima ancora di iniziare.", time: "1 incontro" },
  "02": { gain: "Sai dove stai andando e perché.", time: "1–2 settimane" },
  "03": { gain: "Hai strumenti coerenti e pronti all'uso.", time: "Su progetto" },
  "04": { gain: "Capisci cosa funziona, con numeri chiari.", time: "Continuo" },
  "05": { gain: "Cresci senza ripartire ogni volta da zero.", time: "Nel tempo" },
};

const compare = [
  {
    them: "Cambi referente di continuo",
    us: "Parli sempre con noi due, i fondatori",
  },
  {
    them: "Pacchetti uguali per tutti",
    us: "Una strategia cucita sulla tua realtà",
  },
  {
    them: "Tanti clienti, poca attenzione",
    us: "Pochi clienti, presenza vera",
  },
  {
    them: "Report pieni di numeri di vanità",
    us: "Solo le metriche che contano per te",
  },
];

const why = [
  {
    title: "Presenza diretta",
    body: "Chi decide è chi lavora al tuo progetto. Niente telefono senza fine, niente versioni perse tra reparti.",
  },
  {
    title: "Numero chiuso",
    body: "Accettiamo pochi clienti per volta. È l'unico modo per restare davvero presenti e curare i dettagli.",
  },
  {
    title: "Continuità",
    body: "Non spariamo una campagna e via. Restiamo, misuriamo e miglioriamo, mese dopo mese.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-12 pt-36 sm:pt-44">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title="Lavoriamo come un sarto, non come una catena."
              body="Niente pacchetti preconfezionati. Costruiamo la tua comunicazione su misura, un passo alla volta, e la seguiamo di persona dall'inizio alla fine."
            />
          </div>
        </section>

        {/* I cinque step in dettaglio */}
        <section className="py-[108px]">
          <div className="shell border-t border-cream/10">
            {method.map((step) => (
              <div
                key={step.n}
                className="grid gap-4 border-b border-cream/10 py-9 md:grid-cols-[3rem_1fr_1fr] md:gap-10"
              >
                <span className="font-mono text-sm text-saffron">{step.n}</span>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-md leading-relaxed text-cream/65">
                    {step.body}
                  </p>
                </div>
                <dl className="flex flex-col gap-4 md:items-end md:text-right">
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-saffron">
                      Cosa ottieni
                    </dt>
                    <dd className="mt-1 max-w-xs text-cream/80">
                      {detail[step.n]?.gain}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-cream/45">
                      Quanto dura
                    </dt>
                    <dd className="mt-1 text-cream/80">{detail[step.n]?.time}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Confronto onesto */}
        <section className="bg-navy-deep py-[108px]">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-[clamp(1.6rem,3.8vw,2.7rem)]">
              <span className="display text-cream">Cosa cambia</span>{" "}
              <span className="display text-cream">rispetto alle altre.</span>
            </h2>
            <div className="mt-10 overflow-hidden rounded-2xl border border-cream/10">
              <div className="grid grid-cols-2 border-b border-cream/10 font-mono text-[0.65rem] uppercase tracking-[0.14em]">
                <p className="border-r border-cream/10 p-5 text-cream/45">
                  Agenzia tradizionale
                </p>
                <p className="p-5 text-saffron">Dielle Communication</p>
              </div>
              {compare.map((row) => (
                <div
                  key={row.us}
                  className="grid grid-cols-2 border-b border-cream/10 last:border-b-0"
                >
                  <p className="border-r border-cream/10 p-5 text-cream/55">
                    {row.them}
                  </p>
                  <p className="p-5 text-cream/90">{row.us}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Perché funziona */}
        <section className="py-[108px]">
          <div className="shell">
            <SectionHead title="Perché funziona." />
            <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {why.map((point) => (
                <div key={point.title} className="border-t border-cream/15 pt-6">
                  <h3 className="text-xl font-semibold tracking-tight text-cream">
                    {point.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream/65">{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <InnerCta />
      </main>
      <SiteFooter />
    </>
  );
}
