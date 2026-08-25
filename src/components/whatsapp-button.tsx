"use client";

import { useEffect, useRef, useState } from "react";
import { site, whatsappUrl } from "@/lib/site";

// Pulsante WhatsApp fisso, accanto all'interruttore del tema.
//
// Sta a sinistra dell'interruttore, sulla stessa riga: l'angolo in basso a
// destra è la posizione che tutti si aspettano per un contatto rapido, e
// affiancarli evita di spostare l'interruttore da dove è già.
//
// **Non apre più WhatsApp al primo clic: apre un riquadro.** Richiesta di
// Dario, ed è anche la cosa giusta. Un pulsante che porta fuori dal sito
// senza avvisare è un salto nel buio: chi lo tocca da telefono si ritrova in
// un'altra applicazione senza aver capito con chi sta per parlare. Il
// riquadro fa da anticamera — dice chi risponde e cosa succede — e solo il
// secondo clic apre la chat.
//
// I colori sono quelli ufficiali di WhatsApp (#25D366 e il suo verde scuro),
// su richiesta di Dario. È un'eccezione voluta alla regola dell'arancione
// unico accento, dello stesso tipo del fondo bianco sotto i loghi degli
// strumenti: è un marchio altrui, e i marchi altrui si riportano nel loro
// colore. Non è il verde `mint` del brand, che resta fuori dal sito.
function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 8.22 8.24c0 4.54-3.69 8.22-8.24 8.22Z" />
    </svg>
  );
}

export default function WhatsappButton() {
  const [open, setOpen] = useState(false);
  const pannello = useRef<HTMLDivElement>(null);

  // Si chiude con Esc e cliccando fuori: un riquadro fisso che resta aperto
  // mentre si scorre la pagina è un ostacolo, non un aiuto.
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const fuori = (e: MouseEvent) => {
      if (!pannello.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", esc);
    document.addEventListener("mousedown", fuori);
    return () => {
      document.removeEventListener("keydown", esc);
      document.removeEventListener("mousedown", fuori);
    };
  }, [open]);

  const p = site.whatsappPanel;

  return (
    // Inchiodato al tema scuro come l'interruttore: a fine pagina si trova
    // sopra il footer, che resta scuro in tutti e due i temi.
    <div ref={pannello} data-theme="dark">
      {/* Il riquadro. Cresce dall'angolo in basso a destra, cioè da dove sta
          il pulsante che l'ha aperto: è la direzione che spiega da sola da
          dove è arrivato. */}
      <div
        className={`fixed bottom-[9.5rem] right-4 z-50 w-[19rem] origin-bottom-right overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:right-6 md:bottom-[4.5rem] ${
          open
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-90 opacity-0"
        }`}
        role="dialog"
        aria-label="Scrivici su WhatsApp"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between bg-[#25D366] px-4 py-3">
          <span className="flex items-center gap-2 font-semibold text-white">
            <Logo className="size-5" />
            {p.title}
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Chiudi"
            className="flex size-7 items-center justify-center rounded-full bg-black/15 text-white transition-colors hover:bg-black/30"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="bg-[#f5f3ee] p-4">
          {/* La nuvoletta, con la codina a sinistra come in una chat vera. */}
          <div className="relative max-w-[15rem] rounded-2xl rounded-tl-sm bg-white px-4 py-3 text-[0.95rem] leading-snug text-[#111b21] shadow-sm">
            <p>{p.greeting}</p>
            <p>{p.question}</p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-5 flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-5 py-3 font-medium text-white transition-colors duration-300 hover:bg-[#1da851]"
          >
            {p.cta}
            <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
              <path d="M3.4 20.4 21.85 12.5c.86-.37.86-1.6 0-1.97L3.4 2.63c-.7-.3-1.47.22-1.4.98l.6 5.5c.05.42.36.76.78.83l9.3 1.56-9.3 1.56c-.42.07-.73.41-.78.83l-.6 5.5c-.07.76.7 1.28 1.4.98Z" />
            </svg>
          </a>

          <p className="mt-3 text-center text-[0.72rem] leading-snug text-[#54656f]">
            {p.note}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={
          open ? "Chiudi il riquadro WhatsApp" : `Scrivici su WhatsApp al ${site.whatsappDisplay}`
        }
        title={`Scrivici su WhatsApp al ${site.whatsappDisplay}`}
        className="fixed bottom-24 right-[4.75rem] z-50 flex size-11 items-center justify-center rounded-full border border-cream/15 bg-navy-deep/85 text-[#25D366] shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-[#25D366]/60 md:bottom-6 md:right-[5rem]"
      >
        <Logo className="size-[1.2rem]" />
      </button>
    </div>
  );
}
