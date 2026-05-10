import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
import * as https from "https";
import * as http from "http";

function walkDir(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next") {
      files.push(...walkDir(fullPath));
    } else if (entry.isFile() && /\.(ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

async function headRequest(url: string): Promise<number> {
  return new Promise((resolve) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.request(url, { method: "HEAD" }, (res) => {
      resolve(res.statusCode ?? 0);
    });
    req.on("error", () => resolve(0));
    req.setTimeout(8000, () => {
      req.destroy();
      resolve(0);
    });
    req.end();
  });
}

function extractUnsplashUrls(content: string): string[] {
  const re =
    /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9_-]{10,}[^"'\s<>]*/g;
  return [...(content.match(re) ?? [])];
}

async function main() {
  const srcDir = join(process.cwd(), "src");
  const files = walkDir(srcDir);
  const allUrls = new Set<string>();

  for (const file of files) {
    const content = readFileSync(file, "utf8");
    for (const url of extractUnsplashUrls(content)) {
      allUrls.add(url);
    }
  }

  if (allUrls.size === 0) {
    console.log("No Unsplash URLs found.");
    process.exit(0);
  }

  console.log(`Checking ${allUrls.size} Unsplash image URLs...\n`);
  let failed = 0;

  for (const url of allUrls) {
    const status = await headRequest(url);
    const ok = status >= 200 && status < 400;
    console.log(`${ok ? "✓" : "✗"} [${status}] ${url}`);
    if (!ok) failed++;
  }

  console.log(`\n${allUrls.size - failed}/${allUrls.size} passed.`);
  if (failed > 0) {
    console.error(`\n${failed} broken image(s) found. Replace before committing.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
