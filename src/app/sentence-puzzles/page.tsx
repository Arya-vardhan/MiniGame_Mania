import type { Metadata } from 'next';
import SentencePuzzleGame from './sentence-puzzle-game';

export const metadata: Metadata = {
  title: 'Sentence Puzzles | MiniGame Mania',
  description: 'Solve fun and challenging sentence puzzles.',
};

export default function SentencePuzzlesPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Sentence Puzzles
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Enter your age to get an age-appropriate sentence puzzle!
        </p>
      </div>
      <SentencePuzzleGame />
    </div>
  );
}
