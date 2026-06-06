import type { Metadata } from 'next';
import DumbCharadesGame from './dumb-charades-game';

export const metadata: Metadata = {
  title: 'Dumb Charades | MiniGame Mania',
  description: 'A fun game of acting out words and phrases for your team.',
};

export default function DumbCharadesPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Dumb Charades
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Select a category and get ready to act for your team!
        </p>
      </div>
      <DumbCharadesGame />
    </div>
  );
}
