import { promises as fs } from "node:fs";
import path from "node:path";

const OLD_DOMAIN = "https://greenhaha.oss-cn-beijing.aliyuncs.com";
const NEW_DOMAIN = "https://oss.kigermap.com";

const ROOT_DIR = path.resolve(process.cwd(), "src");
const ALLOWED_EXTS = new Set([
  ".vue",
  ".ts",
  ".js",
  ".css",
  ".scss",
  ".less",
  ".json",
  ".md"
]);

const shouldProcess = (filePath) => ALLOWED_EXTS.has(path.extname(filePath));

const replaceInFile = async (filePath) => {
  const content = await fs.readFile(filePath, "utf8");
  if (!content.includes(OLD_DOMAIN)) return false;
  const updated = content.split(OLD_DOMAIN).join(NEW_DOMAIN);
  if (updated === content) return false;
  await fs.writeFile(filePath, updated, "utf8");
  return true;
};

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }
    if (!shouldProcess(fullPath)) continue;
    const changed = await replaceInFile(fullPath);
    if (changed) {
      console.log(`Updated: ${fullPath}`);
    }
  }
};

try {
  await walk(ROOT_DIR);
  console.log("Done.");
} catch (err) {
  console.error("Replace failed:", err);
  process.exit(1);
}
