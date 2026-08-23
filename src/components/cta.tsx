import Link from "next/link";
import type { ReactNode } from "react";

// Invito all'azione condiviso. Prima gli inviti principali erano link
// sottolineati: eleganti ma quasi invisibili, soprattutto su mobile.
//
// Il movimento riprende quello di leftclick.ai, che Dario ha indicato come
// riferimento: testo e freccia sono scritti due volte dentro un contenitore
// che taglia il fuori-bordo, e al passaggio del mouse la coppia scorre — il
// testo verso l'alto, la freccia verso destra — in 0,3 secondi.
//
// Tutte le misure sono in `em`, così cambiando la sola dimensione del testo
// il pulsante si ridimensiona per intero mantenendo le proporzioni.
type Variant = "primary" | "outline";
type Size = "md" | "sm";

// Peso, interlinea e spaziature sono quelli misurati sul riferimento:
// testo di peso 400 (non grassetto), riga 1.3, nessuna spaziatura extra tra le
// lettere, distanza testo-pallino 1em, imbottitura 0.2em/0.25em/0.2em/1em.
const base =
  "group inline-flex select-none items-center gap-[1em] rounded-[2em] py-[0.2em] pl-[1em] pr-[0.25em] font-normal leading-[1.3] tracking-normal transition-colors duration-300";

// 0.9rem = la stessa dimensione del riferimento, da cui discende un pulsante
// alto 38px. La versione piccola serve alle barre di navigazione.
const sizes: Record<Size, string> = {
  md: "text-[0.9rem]",
  sm: "text-[0.78rem]",
};

const variants: Record<Variant, string> = {
  primary: "bg-saffron text-navy hover:bg-saffron-2 hover:text-cream",
  outline: "border border-cream/25 text-cream hover:border-cream/60 hover:bg-cream/10",
};

// Il pallino resta scuro in entrambe le varianti: è l'ancora visiva del
// pulsante, e sull'arancione fa da contrappunto.
const iconBox: Record<Variant, string> = {
  primary:
    "relative flex size-[2.25em] shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-cream",
  outline:
    "relative flex size-[2.25em] shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream text-navy",
};

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className={`size-[1em] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export default function Cta({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  // Gli indirizzi interni passano dal router di Next; le ancore della stessa
  // pagina e i link esterni restano ancore normali.
  const Wrapper = href.startsWith("/") ? Link : "a";
  // I link fuori dal sito (oggi la prenotazione su Cal.com) aprono una scheda
  // nuova: se il visitatore non porta a termine la prenotazione, il sito è
  // ancora lì dietro.
  const esterno = /^https?:/.test(href);
  const attributiEsterni = esterno
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      href={href}
      // La pillola piena non cambia col tema: arancione, testo blu, pallino
      // blu. È il marchio in azione, non una superficie.
      data-theme={variant === "primary" ? "dark" : undefined}
      className={classes}
      onClick={onClick}
      {...attributiEsterni}
    >
      <span className="relative flex flex-col items-center justify-center overflow-hidden">
        <span className="transition-transform duration-300 ease-[ease] group-hover:-translate-y-full">
          {children}
        </span>
        {/* La copia in attesa sotto il bordo: entra mentre la prima esce. */}
        <span
          aria-hidden="true"
          className="absolute translate-y-full transition-transform duration-300 ease-[ease] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>

      <span className={iconBox[variant]}>
        <Arrow className="transition-transform duration-300 ease-[ease] group-hover:translate-x-[200%]" />
        <Arrow className="absolute -translate-x-[200%] transition-transform duration-300 ease-[ease] group-hover:translate-x-0" />
      </span>
    </Wrapper>
  );
}
