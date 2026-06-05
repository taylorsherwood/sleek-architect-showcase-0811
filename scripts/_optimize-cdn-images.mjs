import sharp from "sharp";
import fs from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";

const BASE = "https://www.echelonpropertygroup.com";
const MAX_W = 2560;
const Q = 80;

const pointers = [
  ["src/assets/blog/estate-home-sales-austin.jpg.asset.json", "jpg"],
  ["src/assets/exotic-wildlife-ranches-hero.jpg.asset.json", "jpg"],
  ["src/assets/exotic-zebra.jpg.asset.json", "jpg"],
  ["src/assets/investment-acreage-aerial.jpg.asset.json", "jpg"],
  ["src/assets/mixed-use.png.asset.json", "png2webp"],
  ["src/assets/legacy-family-compound.jpg.asset.json", "jpg"],
  ["src/assets/blog/exclusive-listing-access-austin.jpg.asset.json", "jpg"],
  ["src/assets/blog/ai-real-estate-search-austin.png.asset.json", "png2webp"],
  ["src/assets/hill-country-ranches-hero.jpg.asset.json", "jpg"],
  ["src/assets/market-marble-falls.jpg.asset.json", "jpg"],
  ["src/assets/live-water-ranch-aerial.jpg.asset.json", "jpg"],
  ["src/assets/data-center-site.jpg.asset.json", "jpg"],
  ["src/assets/blog/lake-austin-vs-lake-travis-waterfront.jpg.asset.json", "jpg"],
  ["src/assets/market-fredericksburg.jpg.asset.json", "jpg"],
];

const fmt = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
let totalBefore = 0, totalAfter = 0;
const renames = [];

await fs.mkdir("/tmp/cdn-imgs", { recursive: true });

for (const [pointerPath, mode] of pointers) {
  try {
    const json = JSON.parse(await fs.readFile(pointerPath, "utf8"));
    const before = json.size;
    totalBefore += before;
    const origExt = path.extname(json.original_filename).toLowerCase(); // .jpg/.png
    const dlPath = `/tmp/cdn-imgs/${json.asset_id}${origExt}`;
    execSync(`curl -sSL -o ${dlPath} "${BASE}${json.url}"`);

    let outExt = origExt;
    let outName = json.original_filename;
    let pipeline = sharp(dlPath, { failOn: "none" });
    const meta = await pipeline.metadata();
    if (meta.width && meta.width > MAX_W) pipeline = pipeline.resize({ width: MAX_W, withoutEnlargement: true });

    let buf;
    if (mode === "jpg") {
      buf = await pipeline.jpeg({ quality: Q, mozjpeg: true, progressive: true }).toBuffer();
    } else if (mode === "png2webp") {
      buf = await pipeline.webp({ quality: Q, effort: 5 }).toBuffer();
      outExt = ".webp";
      outName = json.original_filename.replace(/\.png$/i, ".webp");
    }

    const uploadPath = `/tmp/cdn-imgs/upload-${outName}`;
    await fs.writeFile(uploadPath, buf);
    const after = buf.length;
    totalAfter += after;

    // Upload via lovable-assets
    const cliOut = execSync(`lovable-assets create --file "${uploadPath}" --filename "${outName}"`, { encoding: "utf8" });
    const newPointer = JSON.parse(cliOut);

    // Write new pointer at the SAME location (might need rename if extension changed)
    let newPointerPath = pointerPath;
    if (mode === "png2webp") {
      newPointerPath = pointerPath.replace(/\.png\.asset\.json$/i, ".webp.asset.json");
      renames.push([pointerPath, newPointerPath]);
      await fs.unlink(pointerPath);
    }
    await fs.writeFile(newPointerPath, JSON.stringify(newPointer, null, 2) + "\n");

    console.log(`${pointerPath}  ${fmt(before)} -> ${fmt(after)}  (${Math.round((1 - after / before) * 100)}% smaller)`);
  } catch (e) {
    console.error(`FAIL ${pointerPath}: ${e.message}`);
  }
}

console.log(`\nCDN TOTAL: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (saved ${fmt(totalBefore - totalAfter)})`);
console.log(`\nPOINTER RENAMES: ${JSON.stringify(renames, null, 2)}`);
await fs.writeFile("/tmp/imgaudit/cdn-renames.json", JSON.stringify(renames));
