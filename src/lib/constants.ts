import type { Game } from '@/lib/types';
import { LayoutGrid, Puzzle, Hash, Swords, Flame, Trophy, Hand, ALargeSmall, Theater } from 'lucide-react';

export const games: Game[] = [
  {
    title: 'Ludo',
    description: 'A classic strategy board game for up to four players.',
    href: '/ludo',
    icon: Swords,
  },
  {
    title: 'Sentence Puzzles',
    description: 'Unscramble words and fill in the blanks to solve puzzles.',
    href: '/sentence-puzzles',
    icon: Puzzle,
  },
  {
    title: 'Tic Tac Toe',
    description: 'The classic game of noughts and crosses. Can you win?',
    href: '/tic-tac-toe',
    icon: Hash,
  },
  {
    title: 'Truth or Dare',
    description: 'A fun party game with revealing questions and bold dares.',
    href: '/truth-or-dare',
    icon: Flame,
  },
  {
    title: 'Rock Paper Scissors',
    description: 'The timeless game of choices. Can you outsmart the computer?',
    href: '/rock-paper-scissors',
    icon: Hand,
  },
  {
    title: 'Hangman',
    description: 'Guess the word one letter at a time before the time runs out.',
    href: '/hangman',
    icon: ALargeSmall,
  },
  {
    title: 'Charades',
    description: 'Act out words and phrases for your friends to guess.',
    href: '/charades',
    icon: Theater,
  }
];

export const navLinks = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  ...games.map(({ href, title, icon }) => ({ href, label: title, icon })),
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export const truths: string[] = [
  "What's the most embarrassing thing you've ever done?",
  'What is a weird food that you love?',
  'What is your biggest fear?',
  "What's a secret you've never told anyone?",
  "What's the most childish thing you still do?",
  'What is your guilty pleasure?',
  "Who is your secret crush?",
  'What is the biggest lie you have ever told?',
];

export const dares: string[] = [
  'Do 10 pushups.',
  'Sing a song out loud.',
  'Talk in a funny accent for the next 3 rounds.',
  'Let someone draw on your face with a pen.',
  'Do your best dance move.',
  'Post an embarrassing photo of yourself online.',
  'Imitate a celebrity until someone guesses who it is.',
  'Let the group choose a word you have to use in every sentence for 10 minutes.',
];

export const hangmanWords: string[] = [
    'react', 'nextjs', 'tailwind', 'typescript', 'javascript', 'firebase', 'genkit', 
    'component', 'developer', 'interface', 'program', 'software', 'hardware', 
    'function', 'variable', 'constant', 'array', 'object', 'class', 'module',
    'database', 'query', 'schema', 'server', 'client', 'network', 'protocol',
    'authentication', 'authorization', 'encryption', 'security', 'vulnerability',
];
