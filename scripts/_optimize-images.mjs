import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const MAX_W = 2560;
const Q = 80;

const inRepo = [
  // jpg in-place recompress
  ["src/assets/blog/echelon-approach-hero.jpg", "jpg"],
  ["src/assets/blog/market-luxury-properties-austin.jpg", "jpg"],
  ["src/assets/blog/austin-infill-development.jpg", "jpg"],
  ["src/assets/blog/private-property-tour-services-austin.jpg", "jpg"],
  ["src/assets/blog-best-luxury-real-estate-agents-austin.jpg", "jpg"],
  ["src/assets/kitchen-02-before.jpg", "jpg"],
  ["src/assets/blog-best-neighborhoods-luxury-homes-austin.jpg", "jpg"],
  ["src/assets/hero-search-austin.jpg", "jpg"],
  ["src/assets/communities/hyde-park.jpg", "jpg"],
  ["src/assets/blog-what-makes-luxury-real-estate.jpg", "jpg"],
  ["src/assets/blog-austin-top-zip-code-up.jpg", "jpg"],
  ["src/assets/echelon-for-sale-sign.jpg", "jpg"],
  ["src/assets/bath-05-after.jpg", "jpg"],
  ["src/assets/blog-confidential-property-transactions.jpg", "jpg"],
  ["src/assets/office-before.jpg", "jpg"],
  ["src/assets/blog/taylor-sherwood-echelon-approach.jpg", "jpg"],
  ["src/assets/blog/selling-luxury-home-austin-strategies.jpg", "jpg"],
  ["src/assets/land-ranch-home-intro.jpg", "jpg"],
  ["src/assets/blog/austin-luxury-real-estate-advisory.jpg", "jpg"],
  ["src/assets/commercial-gillis-street.jpg", "jpg"],
  ["src/assets/blog/choosing-luxury-real-estate-brokerage-austin.jpg", "jpg"],
  ["src/assets/communities/bryker-woods.jpg", "jpg"],
  // webp in-place
  ["src/assets/investment-property-austin-condos.webp", "webp"],
  // png -> webp (rename + import updates required)
  ["src/assets/communities/rob-roy.png", "png2webp"],
  ["src/assets/communities/dripping-springs.png", "png2webp"],
  ["src/assets/blog-austin-luxury-sellers-going-quiet.png", "png2webp"],
];

const fmtBytes = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;

let totalBefore = 0, totalAfter = 0;
const renames = [];

for (const [p, mode] of inRepo) {
  try {
    const before = (await fs.stat(p)).size;
    totalBefore += before;
    const img = sharp(p, { failOn: "none" });
    const meta = await img.metadata();
    const resize = meta.width && meta.width > MAX_W ? { width: MAX_W, withoutEnlargement: true } : null;

    let outPath = p;
    let pipeline = sharp(p, { failOn: "none" });
    if (resize) pipeline = pipeline.resize(resize);

    if (mode === "jpg") {
      const buf = await pipeline.jpeg({ quality: Q, mozjpeg: true, progressive: true }).toBuffer();
      await fs.writeFile(outPath, buf);
    } else if (mode === "webp") {
      const buf = await pipeline.webp({ quality: Q, effort: 5 }).toBuffer();
      await fs.writeFile(outPath, buf);
    } else if (mode === "png2webp") {
      outPath = p.replace(/\.png$/i, ".webp");
      const buf = await pipeline.webp({ quality: Q, effort: 5 }).toBuffer();
      await fs.writeFile(outPath, buf);
      await fs.unlink(p);
      renames.push([p, outPath]);
    }
    const after = (await fs.stat(outPath)).size;
    totalAfter += after;
    console.log(`${p}  ${fmtBytes(before)} -> ${fmtBytes(after)}  (${Math.round((1 - after / before) * 100)}% smaller)  [${meta.width}x${meta.height}${resize ? ` -> ${MAX_W}w` : ""}]`);
  } catch (e) {
    console.error(`FAIL ${p}: ${e.message}`);
  }
}

console.log(`\nIN-REPO TOTAL: ${fmtBytes(totalBefore)} -> ${fmtBytes(totalAfter)}  (saved ${fmtBytes(totalBefore - totalAfter)})`);
console.log(`\nRENAMES (png -> webp): ${JSON.stringify(renames, null, 2)}`);
await fs.writeFile("/tmp/imgaudit/renames.json", JSON.stringify(renames));
