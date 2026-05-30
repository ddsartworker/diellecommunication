import Reveal from "./reveal";
import { method } from "@/lib/site";

export default function Method() {
  return (
    <section
      id="metodo"
      className="border-y border-white/5 bg-navy-deep px-6 py-24 sm:px-10 sm:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-mint">Come lavoriamo</p>
            <h2 className="mt-4 text-[clamp(1.7rem,4vw,3rem)]">
              <span className="display text-cream">Un metodo</span>{" "}
              <span className="display text-saffron">sartoriale.</span>
            </h2>
          </div>
          <p className="max-w-xs text-cream/60">
            Niente pacchetti uguali per tutti. Cuciamo la tua comunicazione su
            misura, passo dopo passo.
          </p>
        </Reveal>

        {/* The thread that stitches the steps together */}
        <ol className="relative mt-16 space-y-px before:absolute before:left-[1.15rem] before:top-3 before:bottom-3 before:w-px before:bg-cream/15">
          {method.map((step, i) => (
            <Reveal
              as="li"
              key={step.n}
              delay={i * 70}
              className="relative grid grid-cols-[2.4rem_1fr] gap-x-5 gap-y-3 py-7 md:grid-cols-[2.4rem_14rem_1fr] md:items-baseline md:gap-x-10 md:gap-y-0"
            >
              <span className="relative z-10 row-span-2 flex size-[2.4rem] items-center justify-center rounded-full border border-cream/15 bg-navy-deep font-mono text-xs text-saffron md:row-span-1">
                {step.n}
              </span>
              <h3 className="self-center font-sans text-2xl font-semibold tracking-tight text-cream sm:text-3xl md:self-auto">
                {step.title}
              </h3>
              <p className="col-start-2 max-w-md text-cream/65 leading-relaxed md:col-start-3 md:row-start-1">
                {step.body}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
