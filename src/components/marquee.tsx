import { clients } from "@/lib/site";

// Nastro dei clienti, ricalcato sul riferimento: a sinistra una scritta ferma,
// a destra i nomi che scorrono. Misure prese dal loro nastro — etichetta 9,9px
// maiuscola con tracking 0.1em, nomi 15,8px di peso 500, 54px tra un nome e
// l'altro, giro completo in 25 secondi.
//
// Il fondo è il blu scuro del gradiente dell'apertura (`navy-deep`, quello dei
// bordi, non quello chiaro al centro), steso in tinta unita: la fascia stacca
// dal blu più chiaro delle sezioni che vengono sotto.
export default function Marquee() {
  const row = [...clients, ...clients];

  return (
    <section aria-label="Alcuni dei nostri clienti" className="bg-navy-deep py-[27px]">
      <div className="mx-auto flex max-w-7xl items-center px-6 sm:px-10">
        <p className="hidden shrink-0 pr-5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-cream/55 sm:block">
          Dario e Luisa hanno lavorato con
        </p>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_92%,transparent)]">
          <div className="marquee-track">
            {row.map((name, i) => (
              <span
                key={i}
                className="px-[27px] text-[0.99rem] font-medium tracking-[-0.01em] text-cream/50"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
