import type { Metadata } from 'next';
import WouldYouRatherGame from './would-you-rather-game';

export const metadata: Metadata = {
  title: 'Would You Rather? | MiniGame Mania',
  description: 'Make a tough choice between two challenging scenarios!',
};

export default function WouldYouRatherPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Would You Rather...
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          Choose between two difficult scenarios and see what others picked!
        </p>
      </div>
      <WouldYouRatherGame />
    </div>
  );
}