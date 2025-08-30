import type { Metadata } from 'next';
import LudoGame from './ludo-game';

export const metadata: Metadata = {
  title: 'Ludo | MiniGame Mania',
  description: 'Play a game of Ludo.',
};

export default function LudoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ludo</h1>
        <p className="text-muted-foreground">
          The classic game of Ludo. A full game is coming soon!
        </p>
      </div>
      <LudoGame />
    </div>
  );
}
