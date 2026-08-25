import Image from "next/image";
import Link from "next/link";
import type { WorkItem } from "@/lib/site";

// La scheda di un lavoro nella griglia. Misure prese da
// `leftclick.ai/case-studies`, il riferimento indicato da Dario:
// riquadro 4:3 con angoli morbidi, il nome sotto, e **una riga sola** che
// dice com'è finita.
//
// Sul riferimento quella riga è troncata a una riga con i puntini, così non
// può allungarsi. Qui sono due (`line-clamp-2`): l'italiano è più lungo
// dell'inglese e troncare una frase a metà si vede. Se una riga ne occupa
// tre, va riscritta più corta — non allargato il limite.
//
// Componente solo, usato dalla griglia di `/lavori` e dalla sezione della
// home: prima il markup era ricopiato.
export default function WorkCard({ item }: { item: WorkItem }) {
  const interno = Boolean(item.study);
  const href = interno ? `/lavori/${item.slug}` : item.href;

  const contenuto = (
    <>
      {/* Non tutti i lavori hanno una foto, e inventarne una è peggio: chi
          non ce l'ha mostra il proprio nome in grande. Tiene la griglia
          allineata e si legge. */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-cream/10 bg-cream/[0.04]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.alt ?? item.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <span className="display text-center text-2xl leading-tight text-cream/25">
              {item.title}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-1">
        <span className="text-[1.125rem] font-medium tracking-tight text-cream transition-colors group-hover:text-saffron">
          {item.title}
        </span>
        <span className="line-clamp-2 text-[0.9rem] leading-snug text-cream/45">
          {item.outcome}
        </span>
      </div>
    </>
  );

  if (!href) return <div className="flex flex-col">{contenuto}</div>;

  return interno ? (
    <Link href={href} className="group flex flex-col">
      {contenuto}
    </Link>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col"
    >
      {contenuto}
    </a>
  );
}
