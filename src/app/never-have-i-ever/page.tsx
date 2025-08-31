import type { Metadata } from 'next';
import NeverHaveIEverGame from './never-have-i-ever-game';

export const metadata: Metadata = {
  title: 'Never Have I Ever | MiniGame Mania',
  description: 'A classic party game of "Never Have I Ever".',
};

export default function NeverHaveIEverPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Never Have I Ever</h1>
        <p className="text-muted-foreground text-center">
          A classic party game to get to know your friends better!
        </p>
      </div>
      <NeverHaveIEverGame />
    </div>
  );
}
