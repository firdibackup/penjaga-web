import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "C:/Users/jayac/Documents/penjaga-web/.shots";
mkdirSync(OUT, { recursive: true });
const sel = process.argv[2] || "#tentang";
const name = process.argv[3] || "section";

const browser = await chromium.launch();
for (const dev of [
  { tag: "d", viewport: { width: 1440, height: 900 } },
  { tag: "m", viewport: { width: 390, height: 844 } },
]) {
  const ctx = await browser.newContext({ viewport: dev.viewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "load", timeout: 45000 });
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 110));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });
  const el = page.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  await el.screenshot({ path: `${OUT}/${dev.tag}-${name}.png` });
  await ctx.close();
}
await browser.close();
console.log("captured", name);
