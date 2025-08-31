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
        <h1 className="text-4xl font-bold tracking-tight">Game Selection</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Pick a game to play from the list below. More games coming soon!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}
      </div>
    </div>
  );
}
