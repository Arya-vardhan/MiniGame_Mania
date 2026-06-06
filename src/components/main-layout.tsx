"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2 } from 'lucide-react';
import UserProfile from './user-profile';
import { cn } from '@/lib/utils';
import { games } from '@/lib/constants';

const colorGlowMap: Record<string, string> = {
  '/memory-match': '14, 165, 233', // Sky Blue
  '/sentence-puzzles': '14, 165, 233', // Sky Blue
  '/tic-tac-toe': '14, 165, 233', // Sky Blue
  '/truth-or-dare': '14, 165, 233', // Sky Blue
  '/rock-paper-scissors': '14, 165, 233', // Sky Blue
  '/hangman': '14, 165, 233', // Sky Blue
  '/dumb-charades': '14, 165, 233', // Sky Blue
  '/emoji-pictionary': '14, 165, 233', // Sky Blue
  '/quiz-trivia': '14, 165, 233', // Sky Blue
  '/would-you-rather': '14, 165, 233', // Sky Blue
  '/never-have-i-ever': '14, 165, 233', // Sky Blue
  '/chess': '14, 165, 233', // Sky Blue
};

const AppHeader = () => {
  const pathname = usePathname();
  const activeGame = games.find(g => g.href === pathname);
  const glowRgb = activeGame ? (colorGlowMap[activeGame.href] || '139, 92, 246') : null;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-md shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-85 transition-opacity group">
          <Gamepad2 className="size-6 text-primary group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
          <span className="text-white group-hover:text-white/80 transition-all duration-300">
            MiniGame Mania
          </span>
        </Link>
        
        <nav className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Link 
              href="/" 
              className={cn(
                "transition-all duration-300 relative py-1.5 px-3 rounded-lg text-xs sm:text-sm font-semibold tracking-wide border border-transparent",
                pathname === "/" 
                  ? "text-primary bg-primary/10 border-primary/20 shadow-[0_0_15px_rgba(14,165,233,0.15)]" 
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5 hover:border-white/5"
              )}
            >
              Home
            </Link>
            {activeGame && (
              <>
                <span className="text-muted-foreground/30 font-light select-none">/</span>
                <span 
                  className="text-xs sm:text-sm font-semibold tracking-wide text-white py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 text-glow-dynamic"
                  style={{
                    ['--glow-rgb' as any]: glowRgb
                  }}
                >
                  {activeGame.title}
                </span>
              </>
            )}
          </div>
          <div className="h-5 w-px bg-white/10" />
          <UserProfile />
        </nav>
      </div>
    </header>
  );
};

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
