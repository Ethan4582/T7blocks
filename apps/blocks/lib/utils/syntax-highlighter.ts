export function highlightCode(code: string, language: string): string {
  if (!code) return "";

  let text = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const lang = language.toLowerCase();
  const tokens: string[] = [];
  
  const addToken = (content: string, className: string) => {
    const index = tokens.length;
    const placeholder = `__TOKEN_${index}__`;
    tokens.push(`<span class="${className}">${content}</span>`);
    return placeholder;
  };

  if (lang === "javascript" || lang === "typescript" || lang === "tsx" || lang === "json" || lang === "ts") {
    text = text.replace(/\/\/.*/g, m => addToken(m, "sh-comment"));
    text = text.replace(/\/\*[\s\S]*?\*\//g, m => addToken(m, "sh-comment"));
    text = text.replace(/`[\s\S]*?`/g, m => addToken(m, "sh-string"));
    text = text.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, m => addToken(m, "sh-string"));
    text = text.replace(/(&lt;\/?)([A-Z][\w\.]*)/g, (m, p1, p2) => p1 + addToken(p2, "sh-keyword"));
    text = text.replace(/(&lt;\/?)([a-z][\w]*)/g, (m, p1, p2) => p1 + addToken(p2, "sh-tag"));
    const keywords = /\b(import|export|from|const|let|var|function|return|if|else|for|while|await|async|type|interface|class|default|new|try|catch|string|number|boolean|any|unknown|void|null|undefined|true|false|Readonly|ReactNode|component|params|props|static|public|private|protected|readonly)\b/g;
    text = text.replace(keywords, m => addToken(m, "sh-keyword"));
    text = text.replace(/([\s\{])([\w-]+)(?==)/g, (m, s, a) => s + addToken(a, "sh-attr"));
    text = text.replace(/\b([a-z_][a-z0-9_]*)(?=\s*\()/gi, m => addToken(m, "sh-fn"));
    text = text.replace(/\b(\d+)\b/g, m => addToken(m, "sh-num"));
  } else if (lang === "css") {
    text = text.replace(/\/\*[\s\S]*?\*\//g, m => addToken(m, "sh-comment"));
    text = text.replace(/^([\s\.]*)([a-z0-9\-\.#\s,:]+)(?=\s*\{)/gim, (m, p1, p2) => p1 + addToken(p2, "sh-keyword"));
    text = text.replace(/([\s\{;])([a-z\-]+)(?=\s*:)/gi, (m, p1, p2) => p1 + addToken(p2, "sh-attr"));
    text = text.replace(/(:)([^;\}]+)(?=[;\}])/g, (m, p1, p2) => p1 + addToken(p2, "sh-string"));
    text = text.replace(/(@[\w-]+)/g, m => addToken(m, "sh-keyword"));
    text = text.replace(/(--[\w-]+)/g, m => addToken(m, "sh-attr"));
    text = text.replace(/(oklch|rgb|rgba|hsl|hsla|var|calc)(?=\()/g, m => addToken(m, "sh-fn"));
  } else if (lang === "bash" || lang === "sh" || lang === "terminal") {
    text = text.replace(/\b(npx|npm|pnpm|yarn|install|add|init|create-next-app|create-remix|create-astro|create-vite|shadcn|git|mkdir|cd|ls|powershell|Get-ChildItem|sh)\b/g, m => addToken(m, "sh-fn"));
    text = text.replace(/(\s)(-\w+|--[\w-]+)/g, (m, s, f) => s + addToken(f, "sh-num"));
    text = text.replace(/(\/|\\)[\w\-\._\/\\]+/g, m => addToken(m, "sh-keyword"));
  } else if (lang === "html" || lang === "xml") {
    text = text.replace(/(&lt;\/?)([\w-]+)/g, (m, p1, p2) => p1 + addToken(p2, "sh-tag"));
    text = text.replace(/(=")([^"]*)(")/g, (m, p1, p2, p3) => p1 + addToken(p2, "sh-string") + p3);
    text = text.replace(/(\s)([\w-]+)(=)/g, (m, s, a, e) => s + addToken(a, "sh-attr") + e);
  }

  let i = 0;
  while (text.includes("__TOKEN_") && i < 5) {
    text = text.replace(/__TOKEN_(\d+)__/g, (match, index) => {
      return tokens[parseInt(index, 10)] || match;
    });
    i++;
  }

  return text;
}
