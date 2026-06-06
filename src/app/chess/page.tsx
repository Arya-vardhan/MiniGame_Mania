import type { Metadata } from 'next';
import ChessGame from './chess-game';

export const metadata: Metadata = {
  title: 'Chess | MiniGame Mania',
  description: 'Play standard Chess against a friend locally or test your skills against the computer!',
};

export default function ChessPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Chess
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Play standard Chess against a friend locally or challenge the computer!
        </p>
      </div>
      <ChessGame />
    </div>
  );
}
