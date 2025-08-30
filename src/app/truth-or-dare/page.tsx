import type { Metadata } from 'next';
import TruthOrDareGame from './truth-or-dare-game';

export const metadata: Metadata = {
  title: 'Truth or Dare | MiniGame Mania',
  description: 'Play a fun game of Truth or Dare.',
};

export default function TruthOrDarePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Truth or Dare</h1>
        <p className="text-muted-foreground">
          Choose your fate. Will you tell the truth or take the dare?
        </p>
      </div>
      <TruthOrDareGame />
    </div>
  );
}
