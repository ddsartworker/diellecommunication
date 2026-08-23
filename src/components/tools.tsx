"use client";

import { useEffect, useRef } from "react";
import Reveal from "./reveal";

/*
  Strumenti che padroneggiamo — i loghi partono impilati e si aprono a ventaglio
  (sinistra -> destra) man mano che la sezione entra nello scroll, come su
  plain.com ma in chiave positiva. Lo stage vive su una riga propria, centrato:
  niente contesa di larghezza col testo, niente overflow su mobile. Posizione di
  ogni card e larghezza dello stage sono guidate via transform/ref in un rAF,
  senza re-render di React a ogni frame.
*/
// L'ordine è quello deciso da Dario, e conta: è quello con cui le tessere si
// aprono a ventaglio, da sinistra a destra. Prima gli strumenti con cui si
// costruisce, poi quelli con cui si disegna, poi quelli su cui si pubblica.
const TOOLS = [
  { name: "Claude", file: "/tools/claude.svg" },
  { name: "Cursor", file: "/tools/cursor.svg" },
  { name: "Antigravity", file: "/tools/antigravity.png" },
  { name: "Visual Studio Code", file: "/tools/vscode.svg" },
  { name: "Adobe Premiere Pro", file: "/tools/premiere.svg" },
  { name: "Adobe Illustrator", file: "/tools/illustrator.svg" },
  { name: "Adobe Lightroom", file: "/tools/lightroom.svg" },
  { name: "WordPress", file: "/tools/wordpress.svg" },
  { name: "Shopify", file: "/tools/shopify.svg" },
  { name: "Ubersuggest", file: "/tools/ubersuggest.svg" },
];

const COLLAPSED_PEEK = 4; // px visibili di ogni card quando lo stack è chiuso

export default function Tools() {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLSpanElement[]>([]);
  const badgeRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const sentinel = sentinelRef.current;
    if (!stage || !sentinel) return;

    const n = TOOLS.length;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let cardW = 0;
    let step = 0;

    const measure = () => {
      cardW = cardsRef.current[0]?.offsetWidth ?? 52;
      // budget = larghezza utile dello stage (mai oltre il contenitore/viewport)
      const host = stage.parentElement?.clientWidth ?? cardW;
      const budget =
        Math.min(host, document.documentElement.clientWidth) * 0.94;
      const preferred = cardW * 1.12;
      const maxStep = (budget - cardW) / (n - 1);
      step = Math.max(Math.min(preferred, maxStep), cardW * 0.4);
    };

    const apply = (p: number) => {
      stage.style.width = `${cardW + (n - 1) * step * p}px`;
      const cards = cardsRef.current;
      for (let i = 0; i < cards.length; i++) {
        const x = i * (COLLAPSED_PEEK * (1 - p) + step * p);
        cards[i].style.transform = `translateX(${x}px)`;
        cards[i].style.zIndex = String(i);
      }
      if (badgeRef.current) {
        badgeRef.current.style.opacity = String(Math.max(0, 1 - p * 1.8));
      }
    };

    if (reduce) {
      measure();
      apply(1);
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = sentinel.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const start = vh * 0.82;
      const span = vh * 0.45;
      const p = Math.min(1, Math.max(0, (start - rect.top) / span));
      apply(p);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    // Tinta unita `navy-deep`, la stessa del metodo: le sezioni si alternano
    // una in tinta unita e una a gradiente (`surface-glow`).
    <section
      id="strumenti"
      className="overflow-x-clip bg-navy-deep py-[108px]"
    >
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="text-[clamp(1.45rem,4.6vw,3rem)] leading-[1.12]">
              <span className="display block text-cream">Progettiamo con</span>

              <span
                ref={sentinelRef}
                className="my-4 flex justify-center sm:my-6"
                aria-hidden="false"
              >
                <span ref={stageRef} className="tools-stage">
                  {TOOLS.map((tool, i) => (
                    <span
                      key={tool.name}
                      ref={(el) => {
                        if (el) cardsRef.current[i] = el;
                      }}
                      className="tool-card"
                      title={tool.name}
                    >
                      <span className="tool-card__face">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={tool.file}
                          alt={tool.name}
                          width={40}
                          height={40}
                          loading="lazy"
                        />
                      </span>
                      {i === TOOLS.length - 1 && (
                        <span
                          ref={badgeRef}
                          className="tools-badge"
                          aria-hidden="true"
                        >
                          {TOOLS.length}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              </span>

              <span className="display block text-cream">
                senza intermediari.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-cream/60">
              Grafica, foto, siti, sviluppo e AI: ogni strumento del progetto lo
              usiamo noi. Nessuna catena di fornitori, nessun lavoro girato a
              terzi. Quello che vedi nasce qui, dentro Dielle Communication.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
