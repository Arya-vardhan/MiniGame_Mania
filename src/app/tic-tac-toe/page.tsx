import type { Metadata } from 'next';
import TicTacToeGame from './tic-tac-toe-game';

export const metadata: Metadata = {
  title: 'Tic Tac Toe | MiniGame Mania',
  description: 'Play a classic game of Tic Tac Toe.',
};

export default function TicTacToePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tic Tac Toe</h1>
        <p className="text-muted-foreground">
          The classic game of X's and O's.
        </p>
      </div>
      <TicTacToeGame />
    </div>
  );
}
