import fs from "fs";
import path from "path";

export function readSourceFile(category: string, type: string, fileName: string): string {
  const getSearchDirectories = (basePath: string) => {
    const dirs = [];
    if (category === "hero") {
      // Heroes are structured directly under packages/ui/src/hero
      dirs.push(path.join(basePath, "packages", "ui", "src", "hero"));
      // Fallback to components/type just in case
      dirs.push(path.join(basePath, "packages", "ui", "src", "components", type));
    } else {
      dirs.push(path.join(basePath, "packages", "ui", "src", "components", type));
    }
    return dirs;
  };

  const localDirs = getSearchDirectories(process.cwd());
  const fallbackDirs = getSearchDirectories(path.join(process.cwd(), "..", ".."));
  
  const allDirs = [...localDirs, ...fallbackDirs];

  const searchFile = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        const found = searchFile(fullPath);
        if (found) return found;
      } else if (file.toLowerCase() === fileName.toLowerCase()) {
        return fullPath;
      }
    }
    return null;
  };

  let filePath: string | null = null;
  for (const dir of allDirs) {
    filePath = searchFile(dir);
    if (filePath) break;
  }

  if (!filePath) {
    throw new Error(`[readSourceFile] Could not find source file: ${fileName} for category: ${category}, type: ${type}`);
  }

  return fs.readFileSync(filePath, "utf-8");
}
