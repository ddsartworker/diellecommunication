import Cta from "./cta";

export default function Hero() {
  return (
    <section
      id="top"
      // Fondo scuro con un alone radiale al centro, come il riferimento: loro
      // schiariscono verso un blu-viola, noi verso il blu del brand.
      // L'altezza è quella dello schermo meno la barra, con le stesse
      // imbottiture del riferimento (108px sopra, 72px sotto): su un MacBook
      // 13" l'apertura si vede tutta, dal titolo fino ai pulsanti.
      className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden px-4 pb-[4.5rem] pt-[6.75rem] text-cream sm:px-6"
      style={{
        backgroundImage:
          "radial-gradient(80% 60% at 50% 40%, var(--color-navy-2) 0%, var(--color-navy-deep) 70%)",
      }}
    >
      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        {/* Un solo colore per tutto il titolo: la sfumatura sta nel fondo,
            non nelle lettere. */}
        <h1 className="display max-w-5xl text-[clamp(2rem,5.6vw,4.5rem)] text-cream">
          Il marketing non deve essere complicato.
          <br />
          Deve portarti clienti.
        </h1>

        <p className="mt-8 max-w-2xl text-base text-cream/65 sm:text-lg">
          Costruiamo la tua comunicazione su misura e la seguiamo di persona,
          dal primo giorno. Pochi clienti, perché ognuno merita attenzione vera.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Cta href="#prova">Richiedi la prova gratuita</Cta>
          <Cta href="#metodo" variant="outline">
            Scopri il metodo
          </Cta>
        </div>
      </div>
    </section>
  );
}
