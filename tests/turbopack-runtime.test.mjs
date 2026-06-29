import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);
const eslintConfig = await readFile(
  new URL("../eslint.config.mjs", import.meta.url),
  "utf8",
);

test("Tailwind excludes temporary Edge profiles from Turbopack scanning", () => {
  assert.match(css, /@source not "\.\.\/\.\.\/\.edge-\*\/\*\*\/\*";/);
});

test("ESLint excludes temporary Edge profiles from project linting", () => {
  assert.match(eslintConfig, /"\.edge-\*\/\*\*"/);
});
