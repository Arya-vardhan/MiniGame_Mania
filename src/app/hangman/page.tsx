import type { Metadata } from 'next';
import HangmanGame from './hangman-game';

export const metadata: Metadata = {
  title: 'Hangman | MiniGame Mania',
  description: 'Play a game of hangman and guess the word.',
};

export default function HangmanPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Hangman</h1>
        <p className="text-muted-foreground text-center">
          Can you guess the word before the stick figure is complete?
        </p>
      </div>
      <HangmanGame />
    </div>
  );
}
