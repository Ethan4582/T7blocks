export default function HeroDemoPage({
  params,
}: {
  params: { type: string; name: string };
}) {
  return <div>Hero demo: {params.type} / {params.name}</div>;
}