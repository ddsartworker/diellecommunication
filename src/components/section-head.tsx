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
  className = "",
}: {
  title: string;
  body?: string;
  tone?: "dark" | "light";
  size?: "md" | "lg";
  className?: string;
}) {
  const titolo = tone === "dark" ? "text-cream" : "text-navy";
  const corpo = tone === "dark" ? "text-cream/60" : "text-navy/65";
  const scala =
    size === "lg"
      ? "text-[clamp(1.9rem,4.6vw,3.4rem)]"
      : "text-[clamp(1.7rem,4vw,3rem)]";

  return (
    <Reveal className={`text-center ${className}`}>
      <h2 className={`mx-auto max-w-5xl text-balance ${scala}`}>
        <span className={`display ${titolo}`}>{title}</span>
      </h2>
      {body ? (
        <p
          className={`mx-auto mt-6 max-w-3xl text-pretty text-lg leading-relaxed ${corpo}`}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
