import { examples } from '@/data/networks';
import { PlaygroundWrapper } from '@/components/playground-wrapper';

export default async function Page({
  params
}: {
  params: Promise<Record<string, string[]>>;
}) {
  const { network } = await params;

  if (network && !(network[0] in examples)) {
    return <div>Network example not found.</div>;
  }

  return (
    <PlaygroundWrapper
      config={
        !network || network.length === 0
          ? undefined
          : examples[network[0] as keyof typeof examples]
      }
    />
  );
}
