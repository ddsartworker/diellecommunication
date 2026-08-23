"use client";

// Interruttore chiaro / scuro, in basso a destra come sul riferimento.
//
// Il tema vive in un attributo `data-theme` sull'elemento `html`: da lì
// scendono le due tavolozze definite in `globals.css`. La scelta si ricorda
// nel browser di chi visita; alla prima visita si segue l'impostazione del
// suo sistema operativo. Il primo tema lo mette uno script dentro
// `layout.tsx`, prima che la pagina si disegni, così non si vede il lampo del
// tema sbagliato.
//
// Il componente non tiene nessuno stato: legge e scrive l'attributo, e quale
// delle due icone si vede lo decide il CSS a partire dallo stesso attributo.
// Con lo stato in React ci sarebbe un disallineamento fra la pagina generata
// dal server (che non sa il tema) e quella che trova il browser.

export const THEME_KEY = "dielle-theme";

function Sole() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="theme-toggle__sun size-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function Luna() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="theme-toggle__moon size-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const cambia = () => {
    const radice = document.documentElement;
    const prossimo = radice.dataset.theme === "light" ? "dark" : "light";
    radice.dataset.theme = prossimo;
    try {
      window.localStorage.setItem(THEME_KEY, prossimo);
    } catch {
      // Navigazione privata o memoria negata: il tema vale per questa visita.
    }
  };

  return (
    <button
      type="button"
      onClick={cambia}
      aria-label="Cambia tema, chiaro o scuro"
      title="Cambia tema, chiaro o scuro"
      // Pastiglia scura in tutti e due i temi, come sul riferimento. Serve:
      // il pulsante è fisso in basso a destra e a fine pagina si trova sopra
      // il footer, che resta scuro — se seguisse il tema chiaro lì sparirebbe.
      data-theme="dark"
      // Sopra la barra fissa del telefono, che occupa il fondo dello schermo.
      className="fixed bottom-24 right-5 z-50 flex size-11 items-center justify-center rounded-full border border-cream/15 bg-navy-deep/85 text-cream/70 shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-cream/40 hover:text-cream md:bottom-6 md:right-6"
    >
      <Sole />
      <Luna />
    </button>
  );
}
