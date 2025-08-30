import type { Metadata } from 'next';
import QuizTriviaGame from './quiz-trivia-game';

export const metadata: Metadata = {
  title: 'Quiz Trivia | MiniGame Mania',
  description: 'Test your knowledge with a fun trivia quiz.',
};

export default function QuizTriviaPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Quiz Trivia</h1>
        <p className="text-muted-foreground text-center">
          Answer the questions and see how high you can score!
        </p>
      </div>
      <QuizTriviaGame />
    </div>
  );
}
