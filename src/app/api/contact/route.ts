import { NextResponse } from "next/server";
import { Resend } from "resend";
import { booking, contactEmails, emailAssetsUrl, site, social } from "@/lib/site";

// Il modulo contatti manda due email: la richiesta a noi e una conferma a chi
// ha scritto. Passa da Resend, l'integrazione di posta installata su Vercel;
// la chiave e il dominio arrivano dalle variabili d'ambiente, non stanno qui.
//
// Prima di tutto questo la rotta si limitava a scrivere nel registro del
// server: il modulo diceva «inviato» e non inviava niente a nessuno.

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const settori: Record<string, string> = {
  food: "Ristorazione / food",
  sport: "Sport / fitness",
  beauty: "Beauty / wellness",
  professionista: "Professionista / PMI",
  "moda-eventi": "Moda / eventi",
  altro: "Altro",
};

function riga(etichetta: string, valore: string) {
  return `<p style="margin:0 0 10px"><strong style="color:#7d8694">${etichetta}</strong><br>${valore}</p>`;
}

// Piè di pagina della conferma: marchio e profili dell'agenzia. Serve a far
// sembrare la mail quello che è — scritta da un'azienda, non da uno script.
//
// Le immagini sono PNG e non SVG: i programmi di posta non disegnano gli SVG,
// Gmail li scarta del tutto. Larghezza e altezza sono scritte anche come
// attributi HTML oltre che nello stile, perché Outlook ignora il CSS sulle
// immagini. I file sono al doppio della misura mostrata, per gli schermi
// retina.
function pieDiPagina() {
  const profili = social
    .filter((s) => s.brand)
    .map(
      (s) => `<a href="${s.href}" style="text-decoration:none;margin-right:14px">
        <img src="${emailAssetsUrl}/email-${s.label.toLowerCase()}.png"
             width="22" height="22" alt="${s.label}"
             style="width:22px;height:22px;border:0;vertical-align:middle">
      </a>`,
    )
    .join("");

  return `
    <div style="margin-top:34px;padding-top:24px;border-top:1px solid #e6e6e3">
      <img src="${emailAssetsUrl}/email-logo.png" width="84" height="84"
           alt="${site.name}"
           style="width:84px;height:84px;border:0;display:block;margin-bottom:16px">
      <p style="margin:0 0 10px;color:#7d8694;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">
        ${contactEmails.replyFollow}
      </p>
      <p style="margin:0">${profili}</p>
    </div>`;
}

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
  // Campo trappola: invisibile a chi legge, irresistibile per i robot che
  // riempiono tutto. Se è pieno rispondiamo «ok» e buttiamo via: dire «sei uno
  // spammer» servirebbe solo a fargli cambiare tattica.
  const website = String(payload.website ?? "").trim();

  if (website) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Nome, email e messaggio sono obbligatori." },
      { status: 400 },
    );
  }
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  const chiave = process.env.RESEND_API_KEY;
  const dominio = process.env.RESEND_EMAIL_DOMAIN;
  if (!chiave || !dominio) {
    console.error("[contact] manca la configurazione della posta");
    return NextResponse.json(
      { error: `Invio non disponibile. Scrivici a ${site.email}.` },
      { status: 503 },
    );
  }

  const resend = new Resend(chiave);
  const mittente = `Dielle Communication <sito@${dominio}>`;

  try {
    // 1. La richiesta a noi. `replyTo` è l'indirizzo di chi ha scritto: si
    //    preme Rispondi e si sta già scrivendo a lui.
    const notifica = await resend.emails.send({
      from: mittente,
      to: [site.email],
      replyTo: email,
      subject: `${contactEmails.noticeSubject} — ${name}`,
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.5;color:#282f3f">
          ${riga("Nome", name)}
          ${riga("Email", `<a href="mailto:${email}">${email}</a>`)}
          ${company ? riga("Azienda o progetto", company) : ""}
          ${sector ? riga("Settore", settori[sector] ?? sector) : ""}
          ${riga("Messaggio", message.replace(/\n/g, "<br>"))}
          <p style="margin:24px 0 0;color:#7d8694;font-size:13px">
            Arrivata dal modulo contatti del sito. Rispondendo a questa email
            scrivi direttamente a ${name}.
          </p>
        </div>`,
    });
    if (notifica.error) throw new Error(notifica.error.message);

    // 2. La conferma a chi ha scritto. Se fallisce non è un dramma: la
    //    richiesta è già arrivata a noi, ed è quella che conta.
    const conferma = await resend.emails.send({
      from: mittente,
      to: [email],
      replyTo: site.email,
      subject: contactEmails.replySubject,
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;font-size:15px;line-height:1.5;color:#282f3f">
          <p style="margin:0 0 14px">${contactEmails.replyGreeting} ${name},</p>
          ${contactEmails.replyLines.map((l) => `<p style="margin:0 0 14px">${l}</p>`).join("")}
          <p style="margin:0 0 22px">
            <a href="${booking.url}" style="display:inline-block;background:#f49619;color:#282f3f;text-decoration:none;padding:11px 22px;border-radius:999px;font-weight:600">
              ${booking.label}
            </a>
          </p>
          <p style="margin:0;color:#7d8694">${contactEmails.replySignature}</p>
          ${pieDiPagina()}
        </div>`,
    });
    if (conferma.error) {
      console.error("[contact] conferma non inviata", conferma.error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] invio fallito", err);
    return NextResponse.json(
      { error: `Non siamo riusciti a inviare. Scrivici a ${site.email}.` },
      { status: 502 },
    );
  }
}
