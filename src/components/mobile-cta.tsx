"use client";

import { useEffect, useRef, useState } from "react";
import { booking } from "@/lib/site";

// CTA fissa in fondo, solo su mobile. Compare dopo l'hero e si nasconde
// quando la sezione contatti è in vista (lì la CTA c'è già).
export default function MobileCta() {
  const [show, setShow] = useState(false);
  const inContact = useRef(false);

  useEffect(() => {
    const update = () => setShow(window.scrollY > 700 && !inContact.current);

    update();
    window.addEventListener("scroll", update, { passive: true });

    const contact = document.getElementById("contatti");
    const observer = new IntersectionObserver(
      ([entry]) => {
        inContact.current = entry.isIntersecting;
        update();
      },
      { threshold: 0.12 },
    );
    if (contact) observer.observe(contact);

    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
    >
      <div className="border-t border-cream/15 bg-navy-deep/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md">
        <a
          href={booking.url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="flex items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3.5 text-sm font-semibold text-ink"
        >
          {booking.label}
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
