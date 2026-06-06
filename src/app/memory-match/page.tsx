import type { Metadata } from 'next';
import MemoryMatchGame from './memory-match-game';

export const metadata: Metadata = {
  title: 'Memory Match | MiniGame Mania',
  description: 'Test your memory by finding matching pairs of cards.',
};

export default function MemoryMatchPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Memory Match
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Flip cards to find all the matching pairs!
        </p>
      </div>
      <MemoryMatchGame />
    </div>
  );
}
