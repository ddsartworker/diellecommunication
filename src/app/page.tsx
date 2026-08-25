import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Problem from "@/components/problem";
import Method from "@/components/method";
import About from "@/components/about";
import Tools from "@/components/tools";
import Services from "@/components/services";
import Trial from "@/components/trial";
import Contact from "@/components/contact";
import SiteFooter from "@/components/site-footer";
import MobileCta from "@/components/mobile-cta";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Marquee />
        <Problem />
        <Method />
        {/* Dopo il metodo arrivano le facce: «chi mi ascolta?» è la domanda
            successiva, e per una boutique agency le persone sono l'argomento. */}
        <About />
        <Tools />
        <Services />
        {/* Qui stava <Testimonials />. Tolta il 25 agosto 2026 su richiesta di
            Dario: le citazioni non erano mai state confermate dalle persone a
            cui erano attribuite. Componente e dati restano al loro posto.

            Togliendola, servizi e prova sarebbero diventate due sezioni a
            gradiente attaccate: per questo la prova è passata in tinta unita e
            i contatti hanno preso il gradiente con `glow`. L'alternanza è
            salva, e a tema chiaro — dove lo stacco si vede davvero — le tre
            fasce restano distinte. */}
        <Trial />
        <Contact glow />
      </main>
      <SiteFooter />
      <MobileCta />
    </>
  );
}
