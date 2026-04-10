import fs from "fs/promises";
import path from "path";

export type ContentItem = 
  | { type: "text"; content: string }
  | { type: "code"; code: string; language: string; label: string }
  | { type: "callout"; content: string; className?: string };

export interface StepData {
  title: string;
  items: ContentItem[];
}

export interface InstallationData {
  title: string;
  description: string;
  steps: StepData[];
}

export async function getInstallationData(slug: string): Promise<InstallationData | null> {
  try {
    const filePath = path.join(process.cwd(), "lib/Installation", `${slug}.md`);
    const content = await fs.readFile(filePath, "utf-8");

    const titleMatch = content.match(/^# (.*)/m);
    const title = titleMatch ? titleMatch[1] : slug.charAt(0).toUpperCase() + slug.slice(1);

    const lines = content.split("\n");
    let description = `Install and configure T7blocks for ${title}.`;
    const descIdx = lines.findIndex(l => l.startsWith("description: "));
    if (descIdx !== -1) {
      description = lines[descIdx].replace("description: ", "").trim();
    } else {
      const firstPara = lines.find(l => l.trim().length > 20 && !l.startsWith("#") && !l.startsWith("URL:") && !l.startsWith("import") && !l.startsWith("title:"));
      if (firstPara) description = firstPara.trim();
    }

    // Extract steps
    const sections = content.split(/### /).slice(1);
    const steps: StepData[] = sections.map((section) => {
      const sLines = section.split("\n");
      const stepTitle = sLines[0].trim();
      const stepContent = sLines.slice(1).join("\n").trim();

      const items: ContentItem[] = [];
      
      // Regex to find all special blocks (Code, Callout) or text in between
      // We'll use a more manual approach to preserve order
      let remainingContent = stepContent;
      
      while (remainingContent.trim().length > 0) {
        const codeMatch = remainingContent.match(/```(\w+)(?:.*title="([^"]+)")?[\s\S]*?\n([\s\S]*?)```/);
        const calloutMatch = remainingContent.match(/<Callout(?: className="([^"]+)")?>([\s\S]*?)<\/Callout>/);
        
        const codeIdx = codeMatch ? remainingContent.indexOf(codeMatch[0]) : Infinity;
        const calloutIdx = calloutMatch ? remainingContent.indexOf(calloutMatch[0]) : Infinity;

        if (codeIdx === Infinity && calloutIdx === Infinity) {
          // No more special blocks, just text
          items.push({ type: "text", content: cleanText(remainingContent) });
          break;
        }

        if (codeIdx < calloutIdx) {
          // Process text before code
          const textBefore = remainingContent.substring(0, codeIdx);
          if (textBefore.trim()) items.push({ type: "text", content: cleanText(textBefore) });
          
          items.push({ 
            type: "code", 
            code: codeMatch![3].trim(), 
            language: codeMatch![1], 
            label: codeMatch![2] || "Terminal" 
          });
          remainingContent = remainingContent.substring(codeIdx + codeMatch![0].length);
        } else {
          // Process text before callout
          const textBefore = remainingContent.substring(0, calloutIdx);
          if (textBefore.trim()) items.push({ type: "text", content: cleanText(textBefore) });
          
          items.push({ 
            type: "callout", 
            content: cleanText(calloutMatch![2]), 
            className: calloutMatch![1] 
          });
          remainingContent = remainingContent.substring(calloutIdx + calloutMatch![0].length);
        }
      }

      return { title: stepTitle, items };
    });

    return { title, description, steps };
  } catch (error) {
    console.error(`Error loading installation data for ${slug}:`, error);
    return null;
  }
}

function cleanText(text: string): string {
  return text
    .replace(/<Steps>|<\/Steps>|<Step>|<\/Step>/g, "")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .trim();
}
