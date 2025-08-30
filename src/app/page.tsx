import { GameCard } from '@/components/game-card';
import { games } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Selection | MiniGame Mania',
  description: 'Choose from a variety of fun mini-games.',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Game Selection</h1>
        <p className="text-muted-foreground">
          Pick a game to play from the list below
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}
      </div>
    </div>
  );
}
