export default function HeroComponentPage({
  params,
}: {
  params: { type: string; name: string };
}) {
  return <div>Hero: {params.type} / {params.name}</div>;
}