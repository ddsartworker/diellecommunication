import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalArticle from "@/components/legal-article";
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
        {/* Stesso fondo in tinta unita della sezione «Parliamo del tuo
            progetto»: `navy-deep`, non il blu di pagina. */}
        <section className="bg-navy-deep pb-24 pt-36 sm:pb-32 sm:pt-44">
          <div className="shell">
            <LegalArticle page={page} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
