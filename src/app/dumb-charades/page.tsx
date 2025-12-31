import type { Metadata } from 'next';
import DumbCharadesGame from './dumb-charades-game';

export const metadata: Metadata = {
  title: 'Dumb Charades | MiniGame Mania',
  description: 'A fun game of acting out words and phrases for your team.',
};

export default function DumbCharadesPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Dumb Charades</h1>
        <p className="text-muted-foreground text-center">
          Select a category and get ready to act for your team!
        </p>
      </div>
      <DumbCharadesGame />
    </div>
  );
}
