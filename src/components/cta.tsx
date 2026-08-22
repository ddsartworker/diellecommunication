import type { ReactNode } from "react";

// Invito all'azione condiviso. Prima gli inviti principali erano link
// sottolineati: eleganti ma quasi invisibili, soprattutto su mobile.
// La pillola arancione è l'unica azione "piena" della pagina; il contorno
// accompagna senza rubare l'occhio.
type Variant = "primary" | "outline";
type Size = "md" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-300";

const sizes: Record<Size, string> = {
  md: "px-7 py-3.5 text-sm",
  sm: "px-5 py-2.5 text-[0.8rem]",
};

// `outline` vive sul fondo chiaro dell'hero: i toni scuri servono al contrasto.
const variants: Record<Variant, string> = {
  primary: "bg-saffron text-navy hover:bg-saffron-2 hover:text-cream",
  outline: "border border-navy/25 text-navy hover:border-navy hover:bg-navy hover:text-cream",
};

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
  return (
    <a href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-3.5 transition-transform duration-500 ease-out-expo group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
      </svg>
    </a>
  );
}
