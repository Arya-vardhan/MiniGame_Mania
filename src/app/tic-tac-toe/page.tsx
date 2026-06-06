import type { Metadata } from 'next';
import TicTacToeGame from './tic-tac-toe-game';

export const metadata: Metadata = {
  title: 'Tic Tac Toe | MiniGame Mania',
  description: 'Play a classic game of Tic Tac Toe.',
};

export default function TicTacToePage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Tic Tac Toe
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          The classic game of X's and O's. Play against a friend locally!
        </p>
      </div>
      <TicTacToeGame />
    </div>
  );
}
