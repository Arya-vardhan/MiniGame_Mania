import type { Metadata } from 'next';
import MemoryMatchGame from './memory-match-game';

export const metadata: Metadata = {
  title: 'Memory Match | MiniGame Mania',
  description: 'Test your memory by finding matching pairs of cards.',
};

export default function MemoryMatchPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Memory Match</h1>
        <p className="text-muted-foreground text-center">
          Flip cards to find all the matching pairs!
        </p>
      </div>
      <MemoryMatchGame />
    </div>
  );
}
