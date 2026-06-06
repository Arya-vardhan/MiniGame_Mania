import type { Metadata } from 'next';
import EmojiPictionaryGame from './emoji-pictionary-game';

export const metadata: Metadata = {
  title: 'Emoji Pictionary | MiniGame Mania',
  description: 'Guess the phrase from the emojis!',
};

export default function EmojiPictionaryPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Emoji Pictionary
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Can you guess the word or phrase from the emojis?
        </p>
      </div>
      <EmojiPictionaryGame />
    </div>
  );
}
