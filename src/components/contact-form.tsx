"use client";

import { useState } from "react";

import { site } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.04] px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition-colors duration-300 focus:border-saffron/70";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Invio non riuscito.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Qualcosa è andato storto.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-64 flex-col items-start justify-center gap-3 rounded-2xl border border-saffron/30 bg-saffron/5 p-8">
        <p className="display text-4xl text-saffron">Ci siamo.</p>
        <p className="text-cream/70">
          Messaggio ricevuto: te ne abbiamo mandato conferma per email. Ti
          rispondiamo di persona entro un giorno lavorativo.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Nome e cognome"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="La tua email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="sr-only">
            Azienda
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Azienda o progetto"
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="sector" className="sr-only">
            Settore
          </label>
          <select
            id="sector"
            name="sector"
            defaultValue=""
            className={`${fieldClass} appearance-none`}
          >
            <option value="" disabled className="bg-navy-deep text-cream/60">
              Il tuo settore
            </option>
            <option value="food" className="bg-navy-deep">Ristorazione / food</option>
            <option value="sport" className="bg-navy-deep">Sport / fitness</option>
            <option value="beauty" className="bg-navy-deep">Beauty / wellness</option>
            <option value="professionista" className="bg-navy-deep">Professionista / PMI</option>
            <option value="moda-eventi" className="bg-navy-deep">Moda / eventi</option>
            <option value="altro" className="bg-navy-deep">Altro</option>
          </select>
        </div>
      </div>

      {/* Campo trappola: invisibile a chi legge, irresistibile per i robot che
          riempiono ogni campo. Se arriva pieno, la richiesta viene buttata.
          `aria-hidden` e `tabIndex={-1}` lo tengono fuori anche dai lettori di
          schermo e dalla tabulazione: nessuno lo incontra per sbaglio. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Non compilare questo campo</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="message" className="sr-only">
          Messaggio
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Raccontami cosa hai in mente."
          className={`${fieldClass} resize-none`}
        />
      </div>

      {/* Se l'invio fallisce non lasciamo un errore muto: l'indirizzo è lì,
          cliccabile. Chi voleva scrivere ha comunque una strada. */}
      {status === "error" && (
        <p role="alert" className="text-sm text-saffron">
          {error}{" "}
          <a
            href={`mailto:${site.email}`}
            className="underline decoration-saffron/50 decoration-1 underline-offset-4"
          >
            {site.email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-saffron-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Invio in corso…" : "Lascia i tuoi dati"}
      </button>
    </form>
  );
}
