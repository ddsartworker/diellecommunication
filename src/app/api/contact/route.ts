import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const company = String(payload.company ?? "").trim();
  const sector = String(payload.sector ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nome, email e messaggio sono obbligatori." },
      { status: 400 },
    );
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  // TODO: collegare l'invio email reale (es. Brevo) e/o salvataggio su DB.
  // Per ora logghiamo la richiesta lato server così la pipeline è verificabile.
  console.log("[contact] nuova richiesta", {
    name,
    email,
    company,
    sector,
    message,
  });

  return NextResponse.json({ ok: true });
}
