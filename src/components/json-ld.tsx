// I dati strutturati: un blocco JSON dentro la pagina che dice a Google, in
// un linguaggio che Google capisce, **che tipo di cosa** è questa pagina.
// Senza, il motore deve dedurlo leggendo le frasi.
//
// Non è testo editoriale e non va in `site.ts`: è un formato tecnico
// (schema.org) che ricopia dati già presenti lì. Qui c'è solo la traduzione.
//
// Va bene stamparlo così, con `dangerouslySetInnerHTML`: il contenuto lo
// costruiamo noi da dati nostri, non arriva da fuori. `JSON.stringify` scappa
// già le virgolette; l'unica cosa da neutralizzare è la sequenza `</`, che
// chiuderebbe il tag in anticipo.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
