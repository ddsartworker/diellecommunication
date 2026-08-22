import Cta from "./cta";
import Stats from "./stats";

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
      className="surface-glow relative flex min-h-svh flex-col justify-start overflow-hidden px-4 pb-[4.5rem] pt-36 text-cream sm:px-6 sm:pt-[13.875rem]"
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Un solo colore per tutto il titolo: la sfumatura sta nel fondo,
            non nelle lettere. */}
        <h1 className="display max-w-6xl text-balance text-[clamp(2rem,5.6vw,4.5rem)] text-cream">
          Il marketing non deve essere complicato.
          <br />
          Deve portarti clienti.
        </h1>

        <p className="mt-6 max-w-3xl text-pretty text-base text-cream/65 sm:text-lg">
          Costruiamo la tua comunicazione su misura e la seguiamo di persona,
          dal primo giorno. Pochi clienti, perché ognuno merita attenzione vera.
        </p>

        <Stats className="mt-7" />

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Cta href="#prova">Richiedi la prova gratuita</Cta>
          <Cta href="#metodo" variant="outline">
            Scopri il metodo
          </Cta>
        </div>
      </div>
    </section>
  );
}
