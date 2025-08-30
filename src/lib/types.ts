import type { LucideIcon } from 'lucide-react';

export interface Game {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

export interface User {
  name: string;
  age: number | null;
}

export interface SentencePuzzle {
  puzzleType: string;
  puzzleContent: string;
  solution: string;
}
