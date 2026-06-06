import Link from 'next/link';
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import type { Game } from '@/lib/types';
import React from 'react';

const gradientMap: Record<string, { gradient: string; text: string; shadowRgb: string }> = {
  '/memory-match': {
    gradient: 'from-indigo-500 to-cyan-500',
    text: 'text-cyan-400',
    shadowRgb: '6, 182, 212',
  },
  '/sentence-puzzles': {
    gradient: 'from-emerald-500 to-teal-500',
    text: 'text-teal-400',
    shadowRgb: '20, 184, 166',
  },
  '/tic-tac-toe': {
    gradient: 'from-rose-500 to-pink-500',
    text: 'text-pink-400',
    shadowRgb: '236, 72, 153',
  },
  '/truth-or-dare': {
    gradient: 'from-orange-500 to-amber-500',
    text: 'text-amber-400',
    shadowRgb: '245, 158, 11',
  },
  '/rock-paper-scissors': {
    gradient: 'from-sky-400 to-indigo-500',
    text: 'text-sky-400',
    shadowRgb: '14, 165, 233',
  },
  '/hangman': {
    gradient: 'from-red-500 to-rose-600',
    text: 'text-rose-400',
    shadowRgb: '244, 63, 94',
  },
  '/dumb-charades': {
    gradient: 'from-purple-500 to-pink-500',
    text: 'text-pink-400',
    shadowRgb: '236, 72, 153',
  },
  '/emoji-pictionary': {
    gradient: 'from-yellow-400 to-orange-500',
    text: 'text-orange-400',
    shadowRgb: '249, 115, 22',
  },
  '/quiz-trivia': {
    gradient: 'from-blue-500 to-indigo-600',
    text: 'text-blue-400',
    shadowRgb: '59, 130, 246',
  },
  '/would-you-rather': {
    gradient: 'from-violet-500 to-fuchsia-500',
    text: 'text-fuchsia-400',
    shadowRgb: '217, 70, 239',
  },
  '/never-have-i-ever': {
    gradient: 'from-fuchsia-500 to-pink-600',
    text: 'text-pink-400',
    shadowRgb: '236, 72, 153',
  },
  '/chess': {
    gradient: 'from-violet-600 to-indigo-900',
    text: 'text-violet-400',
    shadowRgb: '139, 92, 246',
  },
};

export function GameCard({ title, description, href, icon: Icon }: Game) {
  const colors = gradientMap[href] || {
    gradient: 'from-primary to-purple-600',
    text: 'text-primary',
    shadowRgb: '139, 92, 246',
  };

  return (
    <Link href={href} className="group block h-full">
      <Card
        className="glassmorphic glassmorphic-hover h-full text-center items-center justify-center p-4 sm:p-6 aspect-square rounded-2xl relative overflow-hidden flex flex-col"
        style={{
          ['--glow-rgb' as any]: colors.shadowRgb,
        }}
      >
        {/* Dynamic backdrop radial gradient glow inside card */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, rgba(var(--glow-rgb), 0.8) 0%, transparent 70%)`
          }}
        />

        <CardContent className="p-0 flex flex-col items-center justify-center h-full w-full gap-3 sm:gap-4 z-10">
          <div className={`flex size-12 sm:size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${colors.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(var(--glow-rgb),0.4)]`}>
            <Icon className="size-6 sm:size-8 text-white animate-pulse-subtle" />
          </div>
          
          <div className="flex flex-col gap-1 sm:gap-1.5 w-full">
            <CardTitle className="text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-white text-glow-dynamic">
              {title}
            </CardTitle>
            <CardDescription className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2 px-1 sm:px-2 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
              {description}
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
