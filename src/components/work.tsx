import SectionHead from "./section-head";
import Reveal from "./reveal";
import Cta from "./cta";
import WorkCard from "./work-card";
import { work } from "@/lib/site";

// Tre lavori in vetrina sulla home. La sezione era stata tolta quando la
// pagina `/lavori` è diventata una griglia sola, ed è rimasta per giorni
// codice morto: il risultato era una home che nominava diciotto clienti nel
// nastro e poi non ne mostrava nemmeno uno. Dario l'ha notato, e ha ragione —
// chi non ha mai sentito parlare di Dielle arrivava in fondo senza aver visto
// una sola prova.
//
// **Perché proprio questi tre.** Non sono i più belli: sono tre mestieri
// diversi — ristorazione, sport, vendita — così chi arriva ha buone
// probabilità di riconoscersi in uno. Se cambi la selezione, guarda `sectors`
// in `site.ts` prima di scegliere: è l'elenco dei settori che il modulo dei
// contatti propone, e la vetrina dovrebbe somigliargli.
//
// **I Testa era il terzo e ne è uscito il 25 agosto 2026**, non per il lavoro
// ma perché il suo sito è in rifacimento: la scheda porta alla pagina interna,
// che a sua volta porta al sito del cliente, e mandare la home su un cantiere
// non conviene a nessuno dei due. Quando il sito nuovo è online si può
// rimettere — e la vetrina tornerebbe a coprire anche il beauty.
//
// La vetrina è **corta apposta**: la home deve far venire voglia di aprire
// `/lavori`, non sostituirla. Tre entrano in una riga sola sul desktop.
const VETRINA = ["san-pietro-bistrot", "central-padel", "coffeeworld"];

const selezione = VETRINA.map((slug) => {
  const item = work.find((w) => w.slug === slug);
  if (!item) throw new Error(`Lavoro in vetrina inesistente: ${slug}`);
  return item;
});

export default function Work() {
  return (
    // Tinta unita: sopra c'è la sezione dei servizi, che il gradiente ce l'ha
    // già. È lo stesso posto in cui stavano le testimonianze, quindi con
    // questa sezione l'alternanza torna quella di prima — la prova torna a
    // gradiente e i contatti in tinta unita.
    <section id="lavori" className="bg-navy-deep section-y">
      <div className="shell">
        <SectionHead
          title="Cosa è cambiato, in concreto."
          body={[
            "Diciotto attività seguite da vicino, ognuna con la sua storia.",
            "Qui tre, per farti un'idea.",
          ]}
        />

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {selezione.map((item, i) => (
            <Reveal key={item.slug} delay={i * 90}>
              <WorkCard item={item} />
            </Reveal>
          ))}
        </div>

        {/* `<Cta>` dentro una colonna flex va avvolto in un div, o si stira
            per tutta la larghezza del contenitore. */}
        <Reveal delay={280} className="mt-14 flex justify-center">
          <div>
            <Cta href="/lavori" variant="outline">
              Vedi tutti i lavori
            </Cta>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
