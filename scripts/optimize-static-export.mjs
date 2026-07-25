import { readdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
let removedFiles = 0;
let removedBytes = 0;

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    // These are Next's optional prefetch/RSC navigation payloads. The HTML
    // pages and their normal JS bundles remain intact. Keep public ads.txt.
    if (entry.name === "index.txt" || (entry.name.startsWith("__next.") && entry.name.endsWith(".txt"))) {
      removedBytes += (await stat(fullPath)).size;
      await rm(fullPath);
      removedFiles += 1;
    }
  }
}

await walk(outputDirectory);
console.log(`Removed ${removedFiles.toLocaleString()} optional navigation payloads (${(removedBytes / 1024 / 1024).toFixed(1)} MiB).`);
