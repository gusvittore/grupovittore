import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const standaloneRoot = path.join(repoRoot, ".next", "standalone");
const standalonePublic = path.join(standaloneRoot, "public");
const MAX_UNCOMPRESSED_HANDLER_BYTES = 50 * 1024 * 1024;

function directorySize(directory) {
  return readdirSync(directory, { withFileTypes: true }).reduce(
    (total, entry) => {
      const entryPath = path.join(directory, entry.name);
      return (
        total +
        (entry.isDirectory() ? directorySize(entryPath) : statSync(entryPath).size)
      );
    },
    0,
  );
}

test("Next config excludes public assets from server function tracing", () => {
  const config = readFileSync(path.join(repoRoot, "next.config.ts"), "utf8");

  assert.match(config, /outputFileTracingExcludes/);
  assert.match(config, /["']\.\/public\/\*\*\/\*["']/);
});

test(
  "generated Netlify server handler excludes public assets and stays below the upload budget",
  { skip: !existsSync(standaloneRoot) },
  () => {
    assert.equal(
      existsSync(standalonePublic),
      false,
      "public/** must be deployed as static assets, not copied into ___netlify-server-handler.",
    );

    const handlerBytes = directorySize(standaloneRoot);
    assert.ok(
      handlerBytes < MAX_UNCOMPRESSED_HANDLER_BYTES,
      `Standalone handler is ${(handlerBytes / 1024 / 1024).toFixed(2)} MB; expected less than 50 MB.`,
    );
  },
);
