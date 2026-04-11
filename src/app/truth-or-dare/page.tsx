import type { Metadata } from 'next';
import TruthOrDareGame from './truth-or-dare-game';

export const metadata: Metadata = {
  title: 'Truth or Dare | MiniGame Mania',
  description: 'A fun party game with revealing questions and bold dares.',
};

export default function TruthOrDarePage() {
  return (
    <div className="flex flex-col gap-8 items-center max-w-4xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Truth or Dare</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          The ultimate party starter. Spin the wheel, choose your fate, and reveal the truth!
        </p>
      </div>
      <TruthOrDareGame />
    </div>
  );
}
