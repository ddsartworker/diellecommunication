import Cta from "./cta";
import { booking, innerCta } from "@/lib/site";

type InnerCtaProps = {
  title?: string;
  body?: string;
};

// CTA di chiusura riutilizzata dalle pagine interne (blog, case study).
export default function InnerCta({
  title = innerCta.title,
  body = innerCta.body,
}: InnerCtaProps) {
  return (
    <section className="section-y">
      <div className="shell">
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
            {/* Stesso motivo della sezione della prova: sotto i 768px il
                contenitore è `flex-col` e senza involucro il pulsante si
                stira. */}
            <div>
              <Cta href={booking.url} className="shrink-0">
                {booking.label}
              </Cta>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
