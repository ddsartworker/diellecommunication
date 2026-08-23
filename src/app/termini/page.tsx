import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectionHead from "@/components/section-head";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getLegalPage } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termini di servizio",
  description:
    "Le regole d'uso del sito di DL Communication: contenuti, proprietà intellettuale, periodo di prova gratuito, responsabilità e foro competente.",
};

export default function TerminiPage() {
  const page = getLegalPage("termini");
  if (!page) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pb-24 pt-36 sm:pb-32 sm:pt-44">
          <div className="shell">
            <SectionHead as="h1" size="xl" title={page.title} body={page.intro} />

            <p className="mt-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream/45">
              Ultimo aggiornamento: {page.updated}
            </p>

            {/* Il testo torna a filo sinistro e su una colonna stretta: un
                documento lungo centrato non si legge. */}
            <div className="mx-auto mt-16 max-w-3xl space-y-12">
              {page.body.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-semibold tracking-tight text-cream">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="leading-relaxed text-cream/70">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
