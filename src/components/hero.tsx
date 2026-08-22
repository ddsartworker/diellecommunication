import Cta from "./cta";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-white px-4 pb-16 pt-28 sm:px-6"
    >
      {/* Aloni sfumati nei colori del brand: danno profondità al fondo bianco,
          che altrimenti resta piatto sotto un titolo così grande. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-saffron/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-[8%] size-[28rem] rounded-full bg-mint/10 blur-[130px]"
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <h1 className="max-w-4xl text-[clamp(1.5rem,5vw,3.5rem)]">
          <span className="display block text-navy">
            Il marketing non deve essere complicato.
          </span>
          <span className="display mt-3 block text-saffron">
            Deve portarti clienti.
          </span>
        </h1>

        <p
          className="display mt-10 max-w-5xl text-sm text-navy/70 sm:text-base"
          style={{ lineHeight: 2.2 }}
        >
          <span className="block sm:whitespace-nowrap">
            Costruiamo la tua comunicazione su misura e la seguiamo di persona,
            dal primo giorno.
          </span>
          <span className="block">
            Pochi clienti, perché ognuno merita attenzione vera.
          </span>
        </p>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:mt-20 sm:gap-4">
          <Cta href="#prova">Richiedi la prova gratuita</Cta>
          <Cta href="#metodo" variant="outline">
            Scopri il metodo
          </Cta>
        </div>
      </div>
    </section>
  );
}
