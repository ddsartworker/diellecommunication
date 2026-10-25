"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// L'immagine dell'apertura di un caso studio, quando le immagini sono più di
// una. Nato il 25 ottobre 2026 per Risveglio, dove Dario voleva le scatole e
// il logo una accanto all'altro: due lavori diversi, una slide ciascuno.
//
// **Non scorre da solo, ed è voluto.** Un carosello che cambia mentre leggi
// il riassunto accanto ti toglie l'immagine da sotto gli occhi, e chi naviga
// con un lettore di schermo si sente annunciare un cambio che non ha chiesto.
// Si cambia con le frecce, con i pallini, con le frecce della tastiera e col
// dito.
//
// Le immagini sono sovrapposte e si dissolvono l'una nell'altra: niente
// scorrimento laterale, che dentro un riquadro con gli angoli arrotondati
// mostrerebbe per un attimo il fondo vuoto.
export default function WorkGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [current, setCurrent] = useState(0);
  const startX = useRef<number | null>(null);
  const total = images.length;
  const go = (i: number) => setCurrent((i + total) % total);

  return (
    <div
      className="absolute inset-0"
      role="region"
      aria-roledescription="carosello"
      aria-label="Immagini del progetto"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(current + 1);
        if (e.key === "ArrowLeft") go(current - 1);
      }}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
        startX.current = null;
      }}
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className={`absolute inset-0 transition-opacity duration-500 ease-out ${
            i === current ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          aria-hidden={i !== current}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} di ${total}`}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 56rem"
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}

      {/* Frecce e pallini stanno su una pastiglia scura in basso: le
          immagini dei lavori possono essere chiare o scure, e così i comandi
          si leggono su tutte e due. Inchiodata al tema scuro per lo stesso
          motivo dell'interruttore del tema. */}
      <div
        data-theme="dark"
        className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-navy-ink/70 p-1 text-cream backdrop-blur"
      >
        <button
          type="button"
          onClick={() => go(current - 1)}
          aria-label="Immagine precedente"
          className="grid size-9 place-items-center rounded-full transition-colors hover:bg-cream/15"
        >
          <span aria-hidden>←</span>
        </button>
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Vai all'immagine ${i + 1}`}
            aria-current={i === current}
            className="grid size-6 place-items-center"
          >
            <span
              className={`block size-2 rounded-full transition-colors ${
                i === current ? "bg-saffron" : "bg-cream/40"
              }`}
            />
          </button>
        ))}
        <button
          type="button"
          onClick={() => go(current + 1)}
          aria-label="Immagine successiva"
          className="grid size-9 place-items-center rounded-full transition-colors hover:bg-cream/15"
        >
          <span aria-hidden>→</span>
        </button>
      </div>
    </div>
  );
}
