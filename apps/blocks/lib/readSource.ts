import fs from "fs";
import path from "path";

export function readSourceFile(category: string, type: string, fileName: string): string {
  const getSearchDirectories = (basePath: string) => {
    const dirs = [];
    const uiPath = path.join(basePath, "packages", "ui", "src");
    
    if (category === "misc") {
      dirs.push(path.join(uiPath, "misc"));
    } else {
      dirs.push(path.join(uiPath, category, type));
    }
    
    // Fallback to legacy structure
    dirs.push(path.join(uiPath, "components", type));
    if (category === "sections" && type === "hero") {
      dirs.push(path.join(uiPath, "hero"));
    }
    
    return dirs;
  };

  const localDirs = getSearchDirectories(path.join(/*turbopackIgnore: true*/ process.cwd()));
  const fallbackDirs = getSearchDirectories(path.join(/*turbopackIgnore: true*/ process.cwd(), "..", ".."));
  
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
