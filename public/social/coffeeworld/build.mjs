// Carosello "Coffee World" — case study, design system Dielle Communication.
// 1 hook + 1 cover + 5 slide lavoro su card pulita (stile ninjastickers).
// Render 1080x1350 (4:5) in PNG via Chrome headless, 2x.
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const DIR = dirname(fileURLToPath(import.meta.url));
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const MIME = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };
const img = (f) =>
  `data:${MIME[extname(f).toLowerCase()] || "image/png"};base64,${readFileSync(join(DIR, f)).toString("base64")}`;

const C = {
  navy: "#1f2b3d", saffron: "#e09445", mint: "#6fb68e",
  cream: "#f4f0e8", rule: "#ddd6c7", dim: "#6b7589",
};

function frame({ kicker, dark, body, footnav = "" }) {
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
  .dot{color:${C.saffron}}
  .mid{flex:1;display:flex;flex-direction:column;justify-content:center;min-height:0}
  .acc{color:${C.saffron}}
  .discipline{font-family:'JetBrains Mono',monospace;font-size:22px;letter-spacing:.16em;
    text-transform:uppercase;color:${dark ? "rgba(244,240,232,.7)" : "rgba(31,43,61,.7)"};margin-top:40px;line-height:1.9}
  .covernames{display:flex;flex-direction:column;align-items:flex-start;gap:6px}
  .covernames .bn{font-family:'Inter',sans-serif;font-weight:800;font-size:128px;line-height:.98;letter-spacing:-.04em}
  .tagline{font-family:'Instrument Serif',Georgia,serif;font-style:italic;font-size:46px;
    color:${C.saffron};margin-top:30px;letter-spacing:-.01em}
  .card{flex:1;min-height:0;border-radius:20px;display:flex;align-items:center;
    justify-content:center;padding:54px;box-shadow:0 34px 70px rgba(0,0,0,.12)}
  .card img{max-width:100%;max-height:100%;object-fit:contain;border-radius:6px}
  .card.tight{padding:22px}
  .card.tight img{border-radius:12px}
  .card.logo{padding:80px 64px}
  .card.logo img{width:100%;height:auto;max-height:100%;object-fit:contain;border-radius:0}
  .cap{margin-top:30px;display:flex;align-items:center;gap:20px}
  .cap .t{font-size:32px;font-weight:600;letter-spacing:-.01em}
  .rulemint{width:60px;height:3px;background:${C.mint};margin:34px 0 26px;border:0}
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

// slide con visual su card + etichetta breve
const work = (kicker, inner, label, footnav, cardClass = "", cardBg = "#eef0f2") =>
  frame({
    kicker, dark: false, footnav,
    body: `<div class="card ${cardClass}" style="background:${cardBg}">${inner}</div>
      <div class="cap"><span class="t">${label}</span></div>`,
  });

const one = (f, alt) => `<img src="${img(f)}" alt="${alt}">`;

const slides = [
  // 1 — HOOK: key visual oro (logo + tazzina + tagline)
  work("Il lavoro", one("_hero.png", "Key visual Coffee World"),
    "Brand & key visual", "SCORRI →", "tight", "#f7efe0"),
  // 2 — COVER (navy)
  frame({
    kicker: "Case Study · Caffè · Brand",
    dark: true, footnav: "→",
    body: `<div class="covernames">
        <div class="bn">Coffee</div>
        <div class="bn acc">World</div>
      </div>
      <div class="tagline">… l'evoluzione della tradizione</div>
      <hr class="rulemint">
      <div class="discipline">Logo & Identità · UI/UX<br>Packaging · Illustrazione · Web Design</div>`,
  }),
  // 3 — cialde filtro (prodotto, fronte+retro)
  work("Il lavoro", one("_cialda.png", "Cialda filtro Coffee World, fronte e retro"),
    "Cialde filtro & dettagli", "→", "", "#f3f3f5"),
  // 4 — sistema gusti & comunicazione (board scuro)
  work("Il lavoro", one("_gusti.png", "Sistema gusti e comunicazione Coffee World"),
    "Sistema gusti & comunicazione", "→", "", "#1c1712"),
  // 5 — packaging capsule & box
  work("Il lavoro", one("_box.png", "Packaging box capsule Coffee World"),
    "Packaging · capsule & box", "→", "", "#f1f1f3"),
  // 6 — bustine & formati
  work("Il lavoro", one("_bustina.png", "Bustina capsula compatibile Coffee World"),
    "Bustine & formati", "→", "", "#f3f3f5"),
  // 7 — sito responsive & e-commerce
  work("Il lavoro", one("_sito.png", "Sito responsive Coffee World"),
    "Sito responsive & e-commerce", "→", "tight", "#ffffff"),
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
