import fs from "fs";
import path from "path";
import ts from "typescript";
import { transform } from "sucrase";

export function readSourceFile(category: string, type: string, fileName: string): string {
  const filePath = getFilePath(category, type, fileName);
  return fs.readFileSync(filePath, "utf-8");
}

export function readSourceFileAsJsx(category: string, type: string, fileName: string): string {
  const filePath = getFilePath(category, type, fileName);
  let code = fs.readFileSync(filePath, "utf-8");
  
  // Only transform .ts and .tsx files
  if (!fileName.endsWith(".ts") && !fileName.endsWith(".tsx")) {
    return code;
  }

  try {
    // 1. Try Sucrase first - it's much better at preserving original whitespace/spacing
    try {
      const result = transform(code, {
        transforms: ["typescript"],
      });
      
      let transformed = result.code;
      
      // Remove Sucrase artifacts
      transformed = transformed.replace(/const _jsxFileName = .*;?\n?/g, "");
      transformed = transformed.replace(/\s+__self:\s+this/g, "");
      transformed = transformed.replace(/\s+__source:\s+\{[^}]*\}/g, "");
      
      return formatTransformedCode(transformed);
    } catch (sucraseErr) {
      // 2. Fallback to TypeScript compiler
      const result = ts.transpileModule(code, {
        compilerOptions: {
          jsx: ts.JsxEmit.Preserve,
          target: ts.ScriptTarget.ESNext,
          module: ts.ModuleKind.ESNext,
          removeComments: false,
        }
      });
      return formatTransformedCode(result.outputText);
    }
  } catch (err) {
    console.error(`[readSourceFileAsJsx] Failed to transform ${fileName}:`, err);
    return code;
  }
}

/**
 * Basic formatter to restore readability and spacing
 */
function formatTransformedCode(code: string): string {
  let formatted = code.trim();
  
  // Ensure newline after "use client"
  formatted = formatted.replace(/^"use client";\n?([^\n])/g, '"use client";\n\n$1');
  
  // Ensure spacing between imports and the rest of the code
  formatted = formatted.replace(/^(import .*;)\n+([^import\n])/gm, '$1\n\n$2');
  
  // Ensure spacing before top-level exports/declarations
  formatted = formatted.replace(/\n(export|const|function|class|var|let)/g, '\n\n$1');
  
  // Collapse multiple newlines into max 2
  formatted = formatted.replace(/\n{3,}/g, '\n\n');
  
  return formatted.trim();
}

function getFilePath(category: string, type: string, fileName: string): string {
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
  const fallbackDirs = getSearchDirectories(path.resolve(/*turbopackIgnore: true*/ process.cwd(), "../../"));
  
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

  return filePath;
}
