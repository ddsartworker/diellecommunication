import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalArticle from "@/components/legal-article";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getLegalPage } from "@/lib/site";

export const metadata: Metadata = {
  // Indirizzo ufficiale della pagina. Relativo: `metadataBase` in
  // `layout.tsx` ci mette davanti il dominio giusto.
  alternates: { canonical: "/privacy" },
  title: "Privacy Policy",
  description:
    "Quali dati raccogliamo, perché, per quanto tempo e cosa puoi chiederci di farne. Nessun cookie di profilazione, nessuno strumento di analisi.",
};

export default function PrivacyPage() {
  const page = getLegalPage("privacy");
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
