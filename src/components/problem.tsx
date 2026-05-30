import Reveal from "./reveal";
import { problems } from "@/lib/site";

export default function Problem() {
  return (
    <section id="problema" className="px-6 py-24 sm:px-10 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="kicker text-mint">Partiamo da te</p>
          <h2 className="mt-4 max-w-4xl text-[clamp(1.6rem,3.6vw,2.7rem)]">
            <span className="display text-cream">Probabilmente ti riconosci</span>{" "}
            <span className="display text-saffron">in una di queste due situazioni.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {problems.map((group, i) => (
            <Reveal
              key={group.tag}
              delay={i * 100}
              className="flex flex-col gap-6 rounded-2xl border border-cream/10 bg-white/[0.02] p-8 sm:p-10"
            >
              <p className="display text-xl text-cream sm:text-2xl">
                {group.tag}
              </p>
              <p className="text-cream/65 leading-relaxed">{group.body}</p>
              <ul className="mt-auto space-y-3 border-t border-cream/10 pt-6">
                {group.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-cream/75"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mx-auto mt-12 max-w-3xl text-[clamp(1.25rem,2.6vw,1.9rem)] leading-snug">
            <span className="display text-cream">
              In entrambi i casi il problema non sei tu.
            </span>{" "}
            <span className="display text-mint">
              È il modo in cui hai comunicato fino a oggi.
            </span>
          </p>
          <p className="mt-6 max-w-2xl text-cream/60 leading-relaxed">
            Il marketing serve a una cosa sola: far incontrare la tua offerta con
            le persone giuste. Non per fare pubblicità, ma per comunicare meglio.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
