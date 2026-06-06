import { GameCard } from '@/components/game-card';
import { games } from '@/lib/constants';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Game Selection | MiniGame Mania',
  description: 'Choose from a variety of fun mini-games.',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-6">
      <div className="space-y-3 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow">
          Game Selection
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
          Pick a game to play from our premium selection. Play solo against the AI or challenge a friend locally!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.href} {...game} />
        ))}
      </div>
    </div>
  );
}
