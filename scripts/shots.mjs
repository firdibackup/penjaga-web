import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/jayac/Documents/penjaga-web/.shots";
mkdirSync(OUT, { recursive: true });

const device = process.argv[2] === "mobile"
  ? { tag: "m", viewport: { width: 390, height: 844 } }
  : { tag: "d", viewport: { width: 1440, height: 900 } };

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: device.viewport,
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 45000 });

// scroll through the whole page to trigger every once:true reveal, then rest
await page.evaluate(async () => {
  const step = window.innerHeight * 0.8;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});

const sections = page.locator("main > section, footer");
const n = await sections.count();
const map = [];
for (let i = 0; i < n; i++) {
  const el = sections.nth(i);
  const id = (await el.getAttribute("id")) || "";
  const heading = ((await el.locator("h1,h2,h3").first().textContent().catch(() => "")) || "")
    .trim()
    .slice(0, 40);
  const name = `${device.tag}-${String(i).padStart(2, "0")}${id ? "-" + id : ""}`;
  // skip the 300vh hero re-capture on desktop pass 0 (verified already)
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await page.waitForTimeout(250);
  await el.screenshot({ path: `${OUT}/${name}.png` }).catch(async (e) => {
    console.log(`  skip ${name}: ${e.message.slice(0, 60)}`);
  });
  map.push(`${name}  [${id || "—"}]  ${heading}`);
}
console.log(map.join("\n"));

await browser.close();
