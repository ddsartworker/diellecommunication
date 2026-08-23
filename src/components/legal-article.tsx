import { site, type LegalPage } from "@/lib/site";
import SectionHead from "./section-head";

// Corpo delle pagine legali (privacy, termini). Prima era ricopiato in tutte e
// due, e bastava correggerne una per averle diverse.
//
// I paragrafi arrivano da `site.ts` come stringhe: dove compare l'indirizzo
// email lo trasformiamo in un link `mailto:` sottolineato. In un documento
// lungo la mail è l'unica cosa su cui si può agire — deve sembrare cliccabile,
// non essere un pezzo di testo come gli altri.
function Paragrafo({ testo }: { testo: string }) {
  const pezzi = testo.split(site.email);

  return (
    <p className="leading-relaxed text-cream/70">
      {pezzi.map((pezzo, i) => (
        <span key={i}>
          {pezzo}
          {i < pezzi.length - 1 && (
            <a
              href={`mailto:${site.email}`}
              className="text-cream underline decoration-saffron underline-offset-4 transition-colors duration-300 hover:text-saffron"
            >
              {site.email}
            </a>
          )}
        </span>
      ))}
    </p>
  );
}

export default function LegalArticle({ page }: { page: LegalPage }) {
  return (
    <>
      <SectionHead as="h1" size="xl" title={page.title} body={page.intro} />

      <p className="mt-6 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-cream/45">
        Ultimo aggiornamento: {page.updated}
      </p>

      {/* Il testo torna a filo sinistro e su una colonna stretta: un documento
          lungo centrato non si legge. */}
      <div className="mx-auto mt-16 max-w-3xl space-y-12">
        {page.body.map((section) => (
          <section key={section.heading}>
            <h2 className="text-2xl font-semibold tracking-tight text-cream">
              {section.heading}
            </h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <Paragrafo key={paragraph} testo={paragraph} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
