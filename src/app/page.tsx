import SiteHeader from "@/components/site-header";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import Problem from "@/components/problem";
import Method from "@/components/method";
import Tools from "@/components/tools";
import Services from "@/components/services";
import Testimonials from "@/components/testimonials";
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
        <Tools />
        <Services />
        <Testimonials />
        <Trial />
        <Contact />
      </main>
      <SiteFooter />
      <MobileCta />
    </>
  );
}
