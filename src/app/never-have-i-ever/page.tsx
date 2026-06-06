import type { Metadata } from 'next';
import NeverHaveIEverGame from './never-have-i-ever-game';

export const metadata: Metadata = {
  title: 'Never Have I Ever | MiniGame Mania',
  description: 'A classic party game of "Never Have I Ever".',
};

export default function NeverHaveIEverPage() {
  return (
    <div className="flex flex-col gap-10 items-center py-6">
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white text-glow-dynamic"
          style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
        >
          Never Have I Ever
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl leading-relaxed">
          A classic party game to get to know your friends better!
        </p>
      </div>
      <NeverHaveIEverGame />
    </div>
  );
}
