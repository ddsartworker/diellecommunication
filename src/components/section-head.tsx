import Reveal from "./reveal";

// Intestazione di sezione, uguale per tutto il sito: niente kicker, titolo di
// un colore solo sull'asse centrale, sottotitolo a 18px sotto. Prima ogni
// sezione ripeteva questo blocco per conto suo, e bastava dimenticarne una per
// avere un impianto diverso dagli altri.
export default function SectionHead({
  title,
  body,
  tone = "dark",
  size = "md",
  as = "h2",
  className = "",
}: {
  title: string;
  // Una stringa sola, oppure più righe: ogni voce dell'array è una riga a sé
  // (serve per far staccare la frase di chiusura, come nell'apertura).
  body?: string | string[];
  tone?: "dark" | "light";
  // `xl` è l'intestazione di una pagina interna, `lg` e `md` quelle di sezione.
  size?: "md" | "lg" | "xl";
  as?: "h1" | "h2";
  className?: string;
}) {
  const Titolo = as;
  const titolo = tone === "dark" ? "text-cream" : "text-navy";
  const corpo = tone === "dark" ? "text-cream/60" : "text-navy/65";
  const scala = {
    md: "text-[clamp(1.7rem,4vw,3rem)]",
    lg: "text-[clamp(1.9rem,4.6vw,3.4rem)]",
    xl: "text-[clamp(2rem,5.6vw,4.2rem)]",
  }[size];

  return (
    <Reveal className={`text-center ${className}`}>
      <Titolo className={`mx-auto max-w-5xl text-balance ${scala}`}>
        <span className={`display ${titolo}`}>{title}</span>
      </Titolo>
      {body ? (
        <p
          className={`mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed ${corpo}`}
        >
          {(Array.isArray(body) ? body : [body]).map((riga) => (
            <span key={riga} className="block">
              {riga}
            </span>
          ))}
        </p>
      ) : null}
    </Reveal>
  );
}
