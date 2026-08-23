import Cta from "./cta";
import Stats from "./stats";
import { booking } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="top"
      // Fondo scuro con un alone radiale al centro, come il riferimento: loro
      // schiariscono verso un blu-viola, noi verso il blu del brand.
      // L'apertura occupa tutto lo schermo e passa sotto la barra, che non ha
      // fondo: nessuna linea di stacco, una superficie sola. L'imbottitura in
      // alto lascia 108px tra la barra e il titolo, la stessa aria del
      // riferimento. Su un MacBook 13" si vede per intero, fino ai pulsanti.
      className="surface-glow relative flex min-h-[calc(100svh-var(--marquee-h))] flex-col justify-start overflow-hidden pb-[4.5rem] pt-36 text-cream sm:pt-[13.875rem]"
    >
      <div className="relative shell flex flex-col items-center text-center">
        {/* Un solo colore per tutto il titolo: la sfumatura sta nel fondo,
            non nelle lettere. */}
        <h1 className="display max-w-6xl text-balance text-[clamp(2rem,5.6vw,4.5rem)] text-cream">
          Il marketing non deve essere complicato.
          <br />
          Deve portarti clienti.
        </h1>

        {/* Due frasi, due righe: la promessa sopra, la ragione sotto. Sono
            blocchi, non un <br>, così ognuna manda a capo per conto suo sugli
            schermi stretti. */}
        <p className="mt-6 max-w-3xl text-pretty text-base text-cream/65 sm:text-lg">
          <span className="block">
            Costruiamo la tua comunicazione su misura e la seguiamo di persona,
            dal primo giorno.
          </span>
          <span className="block">
            Pochi clienti, perché ognuno merita attenzione vera.
          </span>
        </p>

        <Stats className="mt-7" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* L'unico pulsante che NON va su Cal.com: dall'apertura si scende
              alla sezione della prova, dove è spiegato cosa comporta. Chi
              arriva sul sito non sa ancora cosa sta prenotando; da lì in poi
              sì, e tutti gli altri pulsanti aprono il calendario. */}
          <Cta href="#prova">{booking.label}</Cta>
          <Cta href="#metodo" variant="outline">
            Scopri il metodo
          </Cta>
        </div>
      </div>
    </section>
  );
}
