import type { Metadata } from 'next';
import EmojiPictionaryGame from './emoji-pictionary-game';

export const metadata: Metadata = {
  title: 'Emoji Pictionary | MiniGame Mania',
  description: 'Guess the phrase from the emojis!',
};

export default function EmojiPictionaryPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Emoji Pictionary</h1>
        <p className="text-muted-foreground text-center">
          Can you guess the word or phrase from the emojis?
        </p>
      </div>
      <EmojiPictionaryGame />
    </div>
  );
}
