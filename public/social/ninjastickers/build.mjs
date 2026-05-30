// Carosello "NinjaStickers" — visual-first, design system Dielle Communication.
// 1 cover + 6 slide che mostrano il lavoro su card pulita (stile slide-4).
// Render 1080x1350 (4:5) in PNG via Chrome headless.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const img = (f) =>
  `data:image/png;base64,${readFileSync(join(DIR, f)).toString("base64")}`;

const C = {
  navy: "#1f2b3d", saffron: "#e09445", mint: "#6fb68e",
  cream: "#f4f0e8", rule: "#ddd6c7", dim: "#6b7589",
};
const TOTAL = 7;

function frame({ kicker, page, dark, body, footnav = "" }) {
  const bg = dark ? C.navy : C.cream;
  const fg = dark ? C.cream : C.navy;
  const ruleC = dark ? "rgba(244,240,232,.16)" : C.rule;
  const dim = dark ? C.dim : "#9a917f";
  return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
  html,body{width:1080px;height:1350px}
  body{background:${bg};color:${fg};font-family:'Inter',system-ui,sans-serif;
    padding:72px;display:flex;flex-direction:column;overflow:hidden}
  .kicker{font-family:'JetBrains Mono',monospace;font-weight:500;font-size:21px;
    letter-spacing:.22em;text-transform:uppercase}
  .top{display:flex;justify-content:space-between;align-items:center}
  .top .pg{color:${dim};font-family:'JetBrains Mono',monospace;letter-spacing:.18em;font-size:21px}
  .dot{color:${C.saffron}}
  .mid{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
  .display{font-family:'Instrument Serif',Georgia,serif;font-style:italic;
    font-weight:400;line-height:.9;letter-spacing:-.01em}
  .acc{color:${C.saffron}}
  .discipline{font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;
    text-transform:uppercase;color:${dark?"rgba(244,240,232,.7)":"rgba(31,43,61,.7)"};margin-top:40px;line-height:1.9}
  .covernames{display:flex;flex-direction:column;align-items:flex-start;gap:12px}
  .covernames .bn{font-family:'Inter',sans-serif;font-weight:800;font-size:104px;line-height:1.0;letter-spacing:-.035em}
  .card{flex:1;min-height:0;border-radius:20px;display:flex;align-items:center;
    justify-content:center;padding:54px;box-shadow:0 34px 70px rgba(0,0,0,.12)}
  .card img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px}
  .card.sito{padding:16px}
  .card.sito img{border-radius:12px}
  .card.logos{flex-direction:column;gap:64px;padding:56px}
  .card.logos img{width:90%;max-height:38%}
  .card.logos .sep{width:120px;height:2px;background:${C.rule}}
  .cap{margin-top:30px;display:flex;align-items:center;gap:20px}
  .cap .n{font-family:'JetBrains Mono',monospace;font-size:20px;color:${C.saffron};letter-spacing:.1em}
  .cap .t{font-size:30px;font-weight:600;letter-spacing:-.01em}
  .rulemint{width:60px;height:3px;background:${C.mint};margin:32px 0 26px;border:0}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;
    border-top:1px solid ${ruleC};padding-top:24px;margin-top:34px}
  .sig{font-weight:700;font-size:23px}
  .sig small{display:block;font-family:'JetBrains Mono',monospace;font-weight:500;
    font-size:14px;letter-spacing:.18em;color:${dim};margin-top:6px;text-transform:uppercase;line-height:1.7}
  .foot .nav{font-family:'JetBrains Mono',monospace;letter-spacing:.18em;font-size:20px;color:${dim}}
</style></head><body>
  <div class="top"><div class="kicker"><span class="dot">●</span>&nbsp; ${kicker}</div></div>
  <div class="mid">${body}</div>
  <div class="foot"><div class="sig">Dielle Communication<small>Web Design · Branding<br>Packaging · Social · Marketing Strategy</small></div>
    <div class="nav">${footnav}</div></div>
</body></html>`;
}

// slide con visual su card + etichetta breve numerata
const work = (kicker, page, inner, n, label, footnav, cardClass = "", cardBg = "#eef0f2") =>
  frame({
    kicker, page, dark: false, footnav,
    body: `<div class="card ${cardClass}" style="background:${cardBg}">${inner}</div>
      <div class="cap"><span class="t">${label}</span></div>`,
  });

const one = (f, alt) => `<img src="${img(f)}" alt="${alt}">`;

const slides = [
  // 1 — trading card piloti (apertura / hook)
  work("Il lavoro", 1, one("_card.png", "Trading card Valentino Rossi"),
    "01", "Trading card dei piloti", "SCORRI →"),
  // 2 — cover (era la 1): nomi dei loghi in grassetto, non corsivo
  frame({
    kicker: "Case Study · MotoGP · 2018",
    page: 2, dark: true, footnav: "→",
    body: `<div class="covernames">
        <div class="bn">NinjaStickers</div>
        <div class="bn acc">Cryptobilia</div>
      </div>
      <hr class="rulemint">
      <div class="discipline">Logo & Identità · Illustrazione<br>Packaging · Web Design</div>`,
  }),
  // 3 — loghi
  work("Il lavoro", 3,
    `${one("_logo-ninja.png", "Logo NinjaStickers")}<div class="sep"></div>${one("_logo-crypto.png", "Logo Cryptobilia")}`,
    "02", "Logo design & identità", "→", "logos", "#ffffff"),
  // 4 — card circuiti
  work("Il lavoro", 4, one("_circuit.png", "Card del circuito di Silverstone"),
    "03", "Card dei circuiti", "→"),
  // 5 — bustine / packaging
  work("Il lavoro", 5, one("_bustina.png", "Bustina sticker MotoGP 2018"),
    "04", "Packaging & bustine collezione", "→"),
  // 6 — il sito
  work("Il lavoro", 6, one("_sito.png", "Sito responsive NinjaStickers"),
    "05", "Sito responsive & marketplace", "→", "sito", "#eaebef"),
  // 7 — album & illustrazioni
  work("Il lavoro", 7, one("_album.png", "Album ufficiale MotoGP 2019 illustrato"),
    "06", "Illustrazioni & album ufficiale", "→"),
];

slides.forEach((html, i) => {
  const n = i + 1;
  const htmlPath = join(DIR, `slide-${n}.html`);
  const outPath = join(DIR, `slide-${n}.png`);
  writeFileSync(htmlPath, html);
  execSync(
    `"${CHROME}" --headless=new --disable-gpu --hide-scrollbars ` +
      `--force-device-scale-factor=2 --window-size=1080,1350 ` +
      `--virtual-time-budget=6000 --default-background-color=00000000 ` +
      `--screenshot="${outPath}" "file://${htmlPath}"`,
    { stdio: "ignore" }
  );
  console.log("✓ slide", n);
});
console.log("done");
