"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-xl border border-cream/15 bg-white/[0.03] px-4 py-3 text-cream placeholder:text-cream/35 outline-none transition-colors duration-300 focus:border-saffron/70";

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
      <div className="flex h-full min-h-64 flex-col items-start justify-center gap-3 rounded-2xl border border-mint/30 bg-mint/5 p-8">
        <p className="display text-4xl text-mint">Ci siamo.</p>
        <p className="text-cream/70">
          Messaggio ricevuto. Ti rispondo entro un paio di giorni lavorativi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
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

      {status === "error" && (
        <p role="alert" className="text-sm text-saffron">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-saffron px-7 py-3.5 text-sm font-semibold text-navy transition-colors duration-300 hover:bg-saffron-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Invio in corso…" : "Lascia i tuoi dati"}
      </button>
    </form>
  );
}
