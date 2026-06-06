import type { Metadata } from 'next';
import QuizTriviaGame from './quiz-trivia-game';

export const metadata: Metadata = {
  title: 'Quiz Trivia | MiniGame Mania',
  description: 'Test your knowledge with a fun trivia quiz.',
};

export default function QuizTriviaPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Quiz Trivia
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Answer the questions and see how high you can score!
        </p>
      </div>
      <QuizTriviaGame />
    </div>
  );
}
