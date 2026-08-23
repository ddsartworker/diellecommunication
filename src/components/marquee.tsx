import Link from "next/link";
import { clients } from "@/lib/site";

// Nastro dei clienti, ricalcato sul riferimento: a sinistra una scritta ferma,
// a destra i nomi che scorrono. Misure prese dal loro nastro — etichetta 9,9px
// maiuscola con tracking 0.1em, nomi 15,8px di peso 500, 54px tra un nome e
// l'altro.
//
// Il fondo è `navy-ink`, un blu più profondo di tutti quelli del gradiente:
// serve proprio a far staccare la fascia sia dall'apertura sopra sia dalle
// sezioni sotto, invece di confondersi con l'una o con le altre.
//
// I nomi sono cliccabili e portano al sito del cliente. Perché siano davvero
// cliccabili il nastro **si ferma al passaggio del mouse** (regola in
// `globals.css`): inseguire un bersaglio in movimento non è un'interazione.
export default function Marquee() {
  // La riga è scritta due volte: la seconda copia serve solo a far tornare il
  // nastro al punto di partenza senza stacchi, quindi è nascosta ai lettori
  // di schermo e sfilata dal percorso di tabulazione.
  const giri = [
    { items: clients, copia: false },
    { items: clients, copia: true },
  ];

  return (
    <section aria-label="Alcuni dei nostri clienti" className="bg-navy-ink py-[27px]">
      <div className="shell flex items-center">
        <p className="hidden shrink-0 pr-5 text-[0.62rem] font-medium uppercase tracking-[0.1em] text-cream/55 sm:block">
          Dario e Luisa hanno lavorato con
        </p>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_92%,transparent)]">
          <div className="marquee-track">
            {giri.map((giro, g) =>
              giro.items.map((client) => {
                const nome = (
                  <span className="px-[27px] text-[0.99rem] font-medium tracking-[-0.01em]">
                    {client.name}
                  </span>
                );

                if (!client.href) {
                  return (
                    <span
                      key={`${g}-${client.name}`}
                      aria-hidden={giro.copia || undefined}
                      className="text-cream/50"
                    >
                      {nome}
                    </span>
                  );
                }

                // Sottolineatura e nome pieno al passaggio del mouse: è il
                // segnale che si può cliccare.
                const stile =
                  "text-cream/50 underline-offset-[6px] transition-colors duration-300 hover:text-cream hover:underline hover:decoration-saffron";
                const interno = client.href.startsWith("/");

                return interno ? (
                  <Link
                    key={`${g}-${client.name}`}
                    href={client.href}
                    aria-hidden={giro.copia || undefined}
                    tabIndex={giro.copia ? -1 : undefined}
                    className={stile}
                  >
                    {nome}
                  </Link>
                ) : (
                  <a
                    key={`${g}-${client.name}`}
                    href={client.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-hidden={giro.copia || undefined}
                    tabIndex={giro.copia ? -1 : undefined}
                    className={stile}
                  >
                    {nome}
                  </a>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
