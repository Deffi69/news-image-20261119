// Today's World News — Thursday 19 November 2026.
//
// This entry sums up a full day of world news in a single picture, drawn
// like a children's picture book: bright sky-blue page, rainbow bubble
// letters, one big star story and seven story cards, each with its own
// hand-drawn picture, plus a strip of five tiny peeks at the bottom and a
// little kid guide waving hello. The page itself was drawn and finished
// while the entry was being developed, and the resulting picture travels
// inside this repository as entry.png, right next to this file.
//
// Because the artwork is already final, this program has one small job: put
// that picture where the runner expects to find it. It reads the destination
// folder from the MAKEFUN_OUTPUT_DIR environment variable (falling back to
// /output when the variable is absent), creates the folder when it does not
// exist yet, and copies entry.png into it under the same name. Nothing is
// fetched, generated or altered along the way, so every run delivers exactly
// the same bytes. After copying, it reads both files back and refuses to
// finish unless the copy is byte-for-byte identical to the original, so a
// truncated or interrupted write can never pass as a finished entry.
//
// Run it locally like this:
//   MAKEFUN_OUTPUT_DIR=./out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here: string = dirname(fileURLToPath(import.meta.url));
const source: string = join(here, "entry.png");

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const target: string = join(outDir, "entry.png");
copyFileSync(source, target);

// Verify the copy: the runner must receive exactly the finished picture.
const original: Buffer = readFileSync(source);
const placed: Buffer = readFileSync(target);
if (!original.equals(placed)) {
  throw new Error(`entry.png copy mismatch: ${target} differs from ${source}`);
}

console.log(`entry.png placed at ${target}`);
