import Image from "next/image";
import Link from "next/link";

import { site } from "@/lib/site";

// L'emblema tondo del marchio: cerchio blu, anello verde, «d l» arancione.
// Il file è `public/logo.svg`, lo stesso disegno che fa da favicon
// (`src/app/icon.svg`): un disegno solo, così non possono divergere.
//
// L'emblema si porta dietro il proprio fondo, quindi non cambia col tema: va
// bene sia sul blu sia sul bianco, e non servono due versioni.
//
// Al passaggio del mouse **non succede niente**: niente ingrandimento, niente
// transizione. È una richiesta esplicita di Dario — il marchio sta fermo, in
// intestazione come nel footer. Non rimettere `group-hover:scale-*`.
//
// `size` è in pixel e non una classe Tailwind: le classi con valore fra
// parentesi costruite a pezzi (`size-[${n}px]`) non vengono viste da chi
// legge il codice per generare il foglio di stile, e non uscirebbe niente.
export default function Logo({
  className = "",
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`inline-flex items-center ${className}`}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={size}
        height={size}
        priority
        style={{ width: size, height: size }}
      />
    </Link>
  );
}
