export function highlightCode(code: string, language: string): string {
  if (!code) return "";

  // Escape HTML characters
  let highlighted = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Basic highlighting rules based on language
  const lang = language.toLowerCase();

  if (lang === "javascript" || lang === "typescript" || lang === "tsx" || lang === "json" || lang === "ts") {
    highlighted = highlighted
      // Keywords
      .replace(/\b(import|export|from|const|let|var|function|return|if|else|for|while|await|async|type|interface|class|default|new|try|catch|export|default|string|number|boolean|any|unknown|void|null|undefined|true|false)\b/g, '<span style="color: #c678dd">$1</span>')
      // Strings
      .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span style="color: #98c379">$&</span>')
      // Comments
      .replace(/\/\/.*/g, '<span style="color: #5c6370">$&</span>')
      .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #5c6370">$&</span>')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span style="color: #d19a66">$1</span>')
      // Function names (simple approach)
      .replace(/\b([a-z_][a-z0-9_]*)(?=\s*\()/gi, '<span style="color: #61afef">$1</span>');
  } else if (lang === "css") {
    highlighted = highlighted
      .replace(/(@[\w-]+)/g, '<span style="color: #c678dd">$1</span>')
      .replace(/(--[\w-]+)/g, '<span style="color: #e06c75">$1</span>')
      .replace(/(oklch|rgb|rgba|hsl|hsla)(?=\()/g, '<span style="color: #56b6c2">$1</span>')
      .replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, '<span style="color: #98c379">$&</span>');
  } else if (lang === "bash" || lang === "sh" || lang === "terminal") {
    highlighted = highlighted
      // Commands
      .replace(/\b(npx|npm|pnpm|yarn|install|add|init|create-next-app|create-remix|create-astro|create-vite|shadcn|git|mkdir|cd|ls|powershell|Get-ChildItem)\b/g, '<span style="color: #61afef">$1</span>')
      // Flags
      .replace(/(\s)(-\w+|--[\w-]+)/g, '$1<span style="color: #d19a66">$2</span>')
      // Paths
      .replace(/(\/|\\)[\w\-\._\/\\]+/g, '<span style="color: #e5c07b">$&</span>');
  } else if (lang === "html" || lang === "xml") {
    highlighted = highlighted
      // Tags
      .replace(/(&lt;\/?)([\w-]+)/g, '$1<span style="color: #e06c75">$2</span>')
      // Attributes
      .replace(/(\s)([\w-]+)(=)/g, '$1<span style="color: #d19a66">$2</span>$3')
      // Attribute values
      .replace(/(=")([^"]*)(")/g, '$1<span style="color: #98c379">$2</span>$3');
  }

  return highlighted;
}
