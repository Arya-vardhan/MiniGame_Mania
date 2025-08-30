import type { Metadata } from 'next';
import CharadesGame from './charades-game';

export const metadata: Metadata = {
  title: 'Charades | MiniGame Mania',
  description: 'A fun game of acting out words and phrases.',
};

export default function CharadesPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Charades</h1>
        <p className="text-muted-foreground text-center">
          Select a category and get ready to act!
        </p>
      </div>
      <CharadesGame />
    </div>
  );
}
