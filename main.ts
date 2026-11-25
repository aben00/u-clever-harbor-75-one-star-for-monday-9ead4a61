// SPDX-License-Identifier: MIT
// One Star for Monday — make.fun entry (u-clever-harbor-75-one-star-for-monday-9ead4a61)
// Writes a single line of plain text: a one-star review of Monday,
// written as though Monday were a restaurant. At most 25 words,
// no explanation attached. Deterministic: no input, no randomness,
// no dependencies; the same bytes are written on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: one original one-star review of Monday as a restaurant.
// Waiter forgot the order, the weekend arrived cold, and the bill
// covers five more days of it — a complaint that only fits Monday.
const ENTRY =
  "One star. Monday's waiter forgot my order, served the weekend cold, and billed me for five more days of this. Never eating here again.";

// Gate (RULES.txt "## The gate" + task): /output/entry.txt must be
// UTF-8 text of 1 to 180 characters, not only white space; the task
// adds: a single line, at most 25 words, no explanation attached.
// The self-check below enforces every part of that gate before any
// byte is written, so a bad line fails loudly here instead of
// silently reaching the judge as an invalid entry.
function checkGate(text: string): void {
  if (text.length < 1 || text.length > 180) {
    throw new Error(`gate failed: entry is ${text.length} characters, must be 1-180`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("gate failed: entry must be a single line");
  }
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length > 25) {
    throw new Error(`gate failed: entry is ${words.length} words, at most 25 allowed`);
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
checkGate(ENTRY);
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
