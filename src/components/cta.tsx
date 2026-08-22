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

const base =
  "group inline-flex select-none items-center gap-[1em] rounded-[2em] py-[0.2em] pl-[1em] pr-[0.25em] font-semibold transition-colors duration-300";

// 0.9rem = la stessa dimensione del riferimento, da cui discende un pulsante
// alto 38px. La versione piccola serve alle barre di navigazione.
const sizes: Record<Size, string> = {
  md: "text-[0.9rem]",
  sm: "text-[0.78rem]",
};

const variants: Record<Variant, string> = {
  primary: "bg-saffron text-navy hover:bg-saffron-2 hover:text-cream",
  outline: "border border-navy/25 text-navy hover:border-navy/60 hover:bg-navy/5",
};

// Il pallino resta scuro in entrambe le varianti: è l'ancora visiva del
// pulsante, e sull'arancione fa da contrappunto.
const iconBox =
  "relative flex size-[2.25em] shrink-0 items-center justify-center overflow-hidden rounded-full bg-navy text-cream";

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
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  // Gli indirizzi interni passano dal router di Next; le ancore della stessa
  // pagina e i link esterni restano ancore normali.
  const Wrapper = href.startsWith("/") ? Link : "a";

  return (
    <Wrapper href={href} className={classes}>
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

      <span className={iconBox}>
        <Arrow className="transition-transform duration-300 ease-[ease] group-hover:translate-x-[200%]" />
        <Arrow className="absolute -translate-x-[200%] transition-transform duration-300 ease-[ease] group-hover:translate-x-0" />
      </span>
    </Wrapper>
  );
}
