import type { Metadata } from 'next';
import RockPaperScissorsGame from './rock-paper-scissors-game';

export const metadata: Metadata = {
  title: 'Rock Paper Scissors | MiniGame Mania',
  description: 'Play the classic game of Rock Paper Scissors against the computer.',
};

export default function RockPaperScissorsPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Rock Paper Scissors
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Make your choice and see if you can beat the computer!
        </p>
      </div>
      <RockPaperScissorsGame />
    </div>
  );
}
