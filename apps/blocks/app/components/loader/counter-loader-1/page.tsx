export default function ComponentPage({
  params,
}: {
  params: { type: string; name: string };
}) {
  return <div>Component: {params.type} / {params.name}</div>;
}