import type { Metadata } from "next";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";
import { site, social } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti — Parliamo del tuo progetto",
  description:
    "Scrivici per una chiacchierata gratuita e senza impegno. Dielle Communication: Napoli, Campania e in remoto in tutta Italia.",
};

export default function ContattiPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
          <div className="shell">
            <SectionHead
              as="h1"
              size="xl"
              title="Parliamo del tuo progetto."
              body={[
                "Una chiacchierata gratuita, senza impegno. Ci racconti la tua attività,",
                "noi ti diciamo con sincerità se e come possiamo aiutarti.",
              ]}
            />
          </div>

          <div className="shell mt-16 grid gap-14 md:grid-cols-2 md:gap-20">
            <div>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/45">
                    Scrivici
                  </p>
                  <a
                    href={`mailto:${site.email}`}
                    className="mt-1 block text-xl font-semibold tracking-tight text-cream underline-offset-[6px] transition-colors duration-300 hover:text-saffron hover:underline hover:decoration-saffron sm:text-2xl"
                  >
                    {site.email}
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/45">
                    Dove operiamo
                  </p>
                  <p className="mt-1 text-cream/80">{site.location}</p>
                </div>

                <div>
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-cream/45">
                    Tempi di risposta
                  </p>
                  <p className="mt-1 text-cream/80">
                    Rispondiamo entro 24 ore lavorative.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  {social.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-cream/60 transition-colors hover:text-cream"
                    >
                      {s.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
