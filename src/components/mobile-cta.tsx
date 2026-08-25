"use client";

import { useEffect, useRef, useState } from "react";
import Cta from "./cta";
import { booking } from "@/lib/site";

// CTA fissa in fondo, solo su mobile. Compare dopo l'hero e si nasconde dove
// non serve: nella sezione contatti (lì la CTA c'è già) **e nel footer**.
//
// Il footer è stato aggiunto il 25 agosto 2026, ed era un difetto vero: la
// barra osservava solo `#contatti`, quindi scorrendo oltre — dentro il
// footer — quella sezione smetteva di essere in vista e la barra tornava
// fuori, **coprendo l'ultima riga**. Misurato su un telefono da 390px: la
// barra partiva a 771px e la riga del copyright con le note legali finiva a
// 804px, cioè trentatré pixel sotto. Privacy e termini erano irraggiungibili.
export default function MobileCta() {
  const [show, setShow] = useState(false);
  // Quante delle zone «silenziose» sono in vista. Un contatore e non un
  // booleano: contatti e footer sono attaccati, e uscendo dall'uno mentre si
  // entra nell'altro un booleano solo farebbe lampeggiare la barra.
  const quiete = useRef(0);

  useEffect(() => {
    const update = () => setShow(window.scrollY > 700 && quiete.current === 0);

    update();
    window.addEventListener("scroll", update, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          quiete.current += entry.isIntersecting ? 1 : -1;
        }
        if (quiete.current < 0) quiete.current = 0;
        update();
      },
      { threshold: 0.12 },
    );
    for (const zona of [document.getElementById("contatti"), document.querySelector("footer")]) {
      if (zona) observer.observe(zona);
    }

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // I due comandi in basso a destra (WhatsApp e tema) stanno **a filo del
  // fondo** quando questa barra non c'è, e salgono sopra di lei quando
  // compare. Prima erano fissi a 96px da sotto per non finirle addosso:
  // risultato, sulla prima schermata e nel footer — dove la barra non c'è —
  // restavano sospesi a mezz'aria. Segnalato da Dario.
  //
  // L'attributo va su <html> ed è lo stesso impianto del tema e del menu: un
  // attributo, e il CSS che ne discende. Vedi `--dock-b` in `globals.css`.
  useEffect(() => {
    document.documentElement.dataset.cta = show ? "on" : "";
    return () => {
      document.documentElement.dataset.cta = "";
    };
  }, [show]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      {/* Dentro la barra c'è **lo stesso `<Cta>` di tutte le altre sezioni**,
          non una pillola disegnata a parte. Prima era markup suo: stesso
          arancione, ma testo in grassetto (il componente lo vuole di peso
          400), una freccia scritta al posto del pallino, e nessuno dei
          movimenti che hanno gli altri pulsanti — il testo che scorre in su e
          la freccia che esce a destra. Su uno schermo stretto questo è
          l'ultimo pulsante che si incontra, e si vedeva che era un altro
          oggetto. Richiesta di Dario del 25 agosto 2026.

          Il `<div>` che lo avvolge lo tiene alla sua larghezza naturale e
          centrato: un `<Cta>` figlio diretto di un contenitore in colonna si
          stira e perde le proporzioni. */}
      <div className="flex justify-center border-t border-cream/15 bg-navy-deep/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <div>
          <Cta href={booking.url} tabIndex={show ? 0 : -1}>
            {booking.label}
          </Cta>
        </div>
      </div>
    </div>
  );
}
