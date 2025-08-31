import type { Metadata } from 'next';
import WouldYouRatherGame from './would-you-rather-game';

export const metadata: Metadata = {
  title: 'Would You Rather? | MiniGame Mania',
  description: 'Make a tough choice between two challenging scenarios!',
};

export default function WouldYouRatherPage() {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-center">Would You Rather...</h1>
        <p className="text-muted-foreground text-center">
          Choose between two difficult scenarios and see what others picked!
        </p>
      </div>
      <WouldYouRatherGame />
    </div>
  );
}