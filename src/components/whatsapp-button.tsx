import { site } from "@/lib/site";

// Pulsante WhatsApp fisso, accanto all'interruttore del tema.
//
// Sta a sinistra dell'interruttore, sulla stessa riga: l'angolo in basso a
// destra è la posizione che tutti si aspettano per un contatto rapido, e
// affiancarli evita di spostare l'interruttore da dove è già.
//
// La pastiglia è la stessa dell'interruttore, ma il simbolo è nel verde
// ufficiale di WhatsApp (#25D366), su richiesta di Dario. È un'eccezione
// voluta alla regola dell'arancione unico accento, dello stesso tipo del
// fondo bianco sotto i loghi degli strumenti: è un marchio altrui, e i marchi
// altrui si riportano nel loro colore. Non è il verde `mint` del brand, che
// resta fuori dal sito.
export default function WhatsappButton() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    site.whatsappMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Scrivici su WhatsApp al ${site.whatsappDisplay}`}
      title={`Scrivici su WhatsApp al ${site.whatsappDisplay}`}
      // Inchiodato al tema scuro come l'interruttore: a fine pagina si trova
      // sopra il footer, che resta scuro in tutti e due i temi.
      data-theme="dark"
      className="fixed bottom-24 right-[4.75rem] z-50 flex size-11 items-center justify-center rounded-full border border-cream/15 bg-navy-deep/85 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-[#25D366]/60 md:bottom-6 md:right-[5rem]"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[1.2rem]"
        fill="#25D366"
        aria-hidden="true"
      >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.86 9.86 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.19 8.19 0 0 1-1.26-4.37c0-4.53 3.7-8.23 8.24-8.23a8.24 8.24 0 0 1 8.22 8.24c0 4.54-3.69 8.22-8.24 8.22Z" />
      </svg>
    </a>
  );
}
