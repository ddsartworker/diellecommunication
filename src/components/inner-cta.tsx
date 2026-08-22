import Cta from "./cta";

type InnerCtaProps = {
  title?: string;
  body?: string;
};

// CTA di chiusura riutilizzata dalle pagine interne (blog, case study).
export default function InnerCta({
  title = "Parliamo del tuo progetto.",
  body = "Una chiacchierata gratuita, senza impegno. Ti diciamo con sincerità se e come possiamo aiutarti.",
}: InnerCtaProps) {
  return (
    <section className="px-6 py-20 sm:px-10 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-saffron/25 bg-gradient-to-br from-saffron/15 via-navy-2/40 to-saffron/10 p-8 sm:p-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 size-[28rem] rounded-full bg-saffron/15 blur-[110px]"
          />
          <div className="relative flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-[clamp(1.6rem,3.8vw,2.7rem)]">
                <span className="display text-cream">{title}</span>
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-cream/75">{body}</p>
            </div>
            <Cta href="/#prova" className="shrink-0">
              Richiedi la prova gratuita
            </Cta>
          </div>
        </div>
      </div>
    </section>
  );
}
