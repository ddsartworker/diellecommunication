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
        {/* Il carattere di sistema è molto più stretto di Michroma: senza
            alzare la scala il titolo risulterebbe smilzo. 5.6vw arriva a 72px
            sul desktop, la stessa misura del riferimento. */}
        <h1 className="max-w-5xl text-[clamp(2rem,5.6vw,4.5rem)]">
          <span className="display block text-navy">
            Il marketing non deve essere complicato.
          </span>
          <span className="display mt-3 block text-saffron">
            Deve portarti clienti.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-base leading-relaxed text-navy/65 sm:text-lg">
          Costruiamo la tua comunicazione su misura e la seguiamo di persona,
          dal primo giorno. Pochi clienti, perché ognuno merita attenzione vera.
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
