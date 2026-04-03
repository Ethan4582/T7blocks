export default function BackgroundPage({
  params,
}: {
  params: { type: string; id: string };
}) {
  return <div>Background: {params.type} / {params.id}</div>;
}