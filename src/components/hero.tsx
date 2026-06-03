export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-5.5rem)] flex-col justify-center overflow-hidden bg-white px-4 pb-16 pt-28 sm:px-6"
    >
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

        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:mt-24">
            <a
              href="#prova"
              className="relative font-mono text-[0.72rem] uppercase tracking-[0.18em] text-navy after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-0 after:bg-navy after:opacity-0 after:transition-[width,opacity] after:duration-700 after:ease-out hover:after:w-full hover:after:opacity-100"
            >
              Richiedi la prova gratuita
            </a>
            <a
              href="#metodo"
              className="relative font-mono text-[0.72rem] uppercase tracking-[0.18em] text-navy after:absolute after:-bottom-[3px] after:left-0 after:h-px after:w-0 after:bg-navy after:opacity-0 after:transition-[width,opacity] after:duration-700 after:ease-out hover:after:w-full hover:after:opacity-100"
            >
              Scopri il metodo
            </a>
        </div>
      </div>
    </section>
  );
}
