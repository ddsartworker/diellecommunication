import type { Metadata } from "next";
import Tools from "@/components/tools";

// Pagina di lavoro interna: serve a guardare la sezione degli strumenti da
// sola, senza scorrere tutta la home. Non è per i visitatori.
//
// `noindex` le impedisce di finire nei risultati di ricerca, e `nofollow`
// dice ai motori di non seguirne i link. Il blocco c'è anche in
// `robots.ts`, ma i due servono a cose diverse: quello dice «non leggerla»,
// questo dice «non metterla nei risultati». Un indirizzo già noto altrove
// può comparire nei risultati anche senza essere stato letto, quindi da solo
// il file non basta.
export const metadata: Metadata = {
  title: "Anteprima interna",
  robots: { index: false, follow: false },
};

export default function Preview() {
  return (
    <main>
      <Tools />
    </main>
  );
}
