import type { Metadata } from 'next';
import HangmanGame from './hangman-game';

export const metadata: Metadata = {
  title: 'Hangman | MiniGame Mania',
  description: 'Play a game of hangman and guess the word.',
};

export default function HangmanPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Hangman
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Can you guess the word before the stick figure is complete?
        </p>
      </div>
      <HangmanGame />
    </div>
  );
}
