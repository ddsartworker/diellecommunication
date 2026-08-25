import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Problem from "@/components/problem";
import Method from "@/components/method";
import About from "@/components/about";
import Tools from "@/components/tools";
import Services from "@/components/services";
import Work from "@/components/work";
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
        {/* La prova prima della richiesta di fiducia: qui sopra c'è cosa
            facciamo, qui sotto si chiede di provarci. In mezzo, cosa è venuto
            fuori per qualcun altro. È lo stesso posto in cui stavano le
            testimonianze, quindi l'alternanza dei fondi torna quella di
            sempre. */}
        <Work />
        <Trial />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCta />
    </>
  );
}
