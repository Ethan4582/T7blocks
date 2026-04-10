import { registry } from "@/lib/registry";
import { notFound } from "next/navigation";

// Since it's Next.js 16 (from package.json), params is likely a Promise.
// But let's check the current implementation's use. 
// Looking at the existing file, it was using { params }: Props without await.
// I will keep it simple but add the dynamic import part.

type Props = { params: Promise<{ type: string; name: string }> };

export function generateStaticParams() {
  return registry
    .filter((c) => c.category === "components")
    .map((c) => ({
      type: c.type,
      name: c.name,
    }));
}

export default async function ComponentPage({ params }: Props) {
  const { type, name } = await params;
  
  const entry = registry.find(
    (c) => c.type === type && c.name === name
  );

  if (!entry) return notFound();

  // Dynamically import the content based on type and name
  // This expects lib/content/components/[type]/[name].ts to exist
  let allContent;
  try {
    allContent = await import(`@/lib/content/components/${type}/${name}`);
  } catch (err) {
    console.error("Failed to load content:", err);
    return notFound();
  }

  if (entry.isPremium) {
    return (
      <div>
        <span>PRO</span>
        <h1>{entry.displayName}</h1>
        {entry.videoUrl && <video src={entry.videoUrl} autoPlay muted loop />}
        <a href="https://pro.t7blocks.com">Get Pro →</a>
      </div>
    );
  }

  // free component
  return (
    <div>
      <h1>{entry.displayName}</h1>
      <p>{entry.description}</p>

      {/* dependency install */}
      <pre>{entry.cliCommand}</pre>

      {/* code block — content imported from lib/content/ */}
      <pre>{allContent.codeBlock}</pre>

      {/* props table */}
      <table>
        <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
        <tbody>
          {allContent.propsTable.map((p: any) => (
            <tr key={p.name}>
              <td>{p.name}</td><td>{p.type}</td><td>{p.default}</td><td>{p.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* demo link */}
      {entry.demoUrl && (
        <a href={entry.demoUrl} target="_blank" rel="noopener noreferrer">
          Live Demo →
        </a>
      )}
    </div>
  );
}
