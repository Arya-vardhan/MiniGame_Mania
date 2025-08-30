import type { Metadata } from 'next';
import RockPaperScissorsGame from './rock-paper-scissors-game';

export const metadata: Metadata = {
  title: 'Rock Paper Scissors | MiniGame Mania',
  description: 'Play the classic game of Rock Paper Scissors against the computer.',
};

export default function RockPaperScissorsPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Rock Paper Scissors</h1>
        <p className="text-muted-foreground text-center">
          Make your choice and see if you can beat the computer!
        </p>
      </div>
      <RockPaperScissorsGame />
    </div>
  );
}
