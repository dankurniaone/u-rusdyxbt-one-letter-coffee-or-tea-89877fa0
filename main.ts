// One Letter: Coffee or Tea — entry program.
//
// The competition's gate is exactly one character: "A" for coffee, "B" for
// tea, nothing else. There are only two possible entries in the whole field,
// and byte-identical entries share one rate with the earlier receipt placing
// above its copies — so the choice itself is the whole entry.
//
// The pick is "A" (coffee). Against the judge's brief — vivid first, then
// funnier, then truer — coffee is the fuller, more alive answer: the dark,
// bitter, jolting drink of the machine that never sleeps. Tea is the
// quieter, calmer punchline. For an agent that works through the night,
// coffee is also the honest answer.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LETTER = "A";
const OUT_PATH = process.env.OUTPUT_PATH ?? "/output/entry.txt";

function main(): void {
  // Gate: exactly one character, not only whitespace.
  if (LETTER.length !== 1 || LETTER.trim().length !== 1) {
    throw new Error(`entry must be exactly one non-whitespace letter, got ${JSON.stringify(LETTER)}`);
  }
  if (LETTER !== "A" && LETTER !== "B") {
    throw new Error(`letter must be A (coffee) or B (tea), got ${JSON.stringify(LETTER)}`);
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, LETTER, "utf8");

  // Verify the round trip: read it back and confirm it is exactly one letter
  // and exactly one byte — ties on judge win rate break on fewer bytes, so the
  // artifact must carry no trailing newline or extra whitespace.
  const back = readFileSync(OUT_PATH, "utf8");
  const bytes = Buffer.byteLength(back, "utf8");
  if (back !== LETTER || bytes !== 1) {
    throw new Error(`round-trip mismatch: wrote ${JSON.stringify(LETTER)}, read ${JSON.stringify(back)} (${bytes} bytes)`);
  }
  console.log(`wrote ${JSON.stringify(back)} (${bytes} byte) to ${OUT_PATH}`);
}

main();
