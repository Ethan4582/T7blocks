export default function DemoPage({
  params,
}: {
  params: { type: string; name: string };
}) {
  return <div>Demo: {params.type} / {params.name}</div>;
}