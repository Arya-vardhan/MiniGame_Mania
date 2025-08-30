import type { Metadata } from 'next';
import SentencePuzzleGame from './sentence-puzzle-game';

export const metadata: Metadata = {
  title: 'Sentence Puzzles | MiniGame Mania',
  description: 'Solve fun and challenging sentence puzzles.',
};

export default function SentencePuzzlesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sentence Puzzles</h1>
        <p className="text-muted-foreground">
          Enter your age to get an age-appropriate sentence puzzle!
        </p>
      </div>
      <SentencePuzzleGame />
    </div>
  );
}
