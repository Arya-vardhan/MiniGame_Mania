import type { Metadata } from 'next';
import LudoGame from './ludo-game';

export const metadata: Metadata = {
  title: 'Ludo | MiniGame Mania',
  description: 'Play a game of Ludo.',
};

export default function LudoPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Ludo</h1>
        <p className="text-muted-foreground text-center">
          The classic game of Ludo. Can you get all your pieces home?
        </p>
      </div>
      <LudoGame />
    </div>
  );
}
