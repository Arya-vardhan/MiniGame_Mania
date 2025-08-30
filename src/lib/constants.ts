import type { Game, SentencePuzzle, EmojiPuzzle, TriviaQuestion } from '@/lib/types';
import { LayoutGrid, Puzzle, Hash, Swords, Flame, Trophy, Hand, ALargeSmall, Theater, Smile, BrainCircuit } from 'lucide-react';

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
  },
  {
    title: 'Emoji Pictionary',
    description: 'Guess the word or phrase from the emojis.',
    href: '/emoji-pictionary',
    icon: Smile,
  },
  {
    title: 'Quiz Trivia',
    description: 'Test your knowledge with a fun trivia quiz.',
    href: '/quiz-trivia',
    icon: BrainCircuit,
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

export const charades = {
  "Movie": ["Titanic", "Jurassic Park", "The Matrix", "Star Wars", "Pulp Fiction", "Forrest Gump"],
  "TV Show": ["Friends", "The Office", "Game of Thrones", "Breaking Bad", "Stranger Things"],
  "Object": ["Telescope", "Guitar", "Microwave", "Stapler", "Slinky", "Yo-yo"],
  "Animal": ["Monkey", "Elephant", "Penguin", "Kangaroo", "Octopus", "T-Rex"],
  "Action": ["Typing", "Fishing", "Playing basketball", "Ballet dancing", "Doing laundry"],
  "Person": ["Albert Einstein", "Beyonce", "Michael Jackson", "Harry Potter", "Darth Vader"],
  "Song": ["Bohemian Rhapsody", "Stayin' Alive", "Single Ladies", "Baby Shark", "YMCA"],
};

export const sentencePuzzles: SentencePuzzle[] = [
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "A wet bird never flies at [_].",
    solution: "night",
  },
  {
    puzzleType: "Word Unscramble",
    puzzleContent: "Unscramble 'RADC' to find a vehicle.",
    solution: "car",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
    solution: "A map",
  },
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "The early bird catches the [_].",
    solution: "worm",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "What has to be broken before you can use it?",
    solution: "An egg",
  },
];

export const emojiPuzzles: EmojiPuzzle[] = [
  { emojis: '👩‍🍳📖', solution: 'Cookbook' },
  { emojis: '⭐🐟', solution: 'Starfish' },
  { emojis: '🍎🥧', solution: 'Apple pie' },
  { emojis: '🏠🎈', solution: 'Up' },
  { emojis: '🕷️👨', solution: 'Spiderman' },
  { emojis: '👻busters', solution: 'Ghostbusters' },
  { emojis: '🍔👑', solution: 'Burger King' },
  { emojis: '🗼❤️', solution: 'Paris' },
  { emojis: '⏰➡️💰', solution: 'Time is money' },
  { emojis: '🔥🦊', solution: 'Firefox' },
];

export const triviaQuestions: TriviaQuestion[] = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"],
    correctAnswer: "Harper Lee"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "In what year did the Titanic sink?",
    options: ["1905", "1912", "1918", "1923"],
    correctAnswer: "1912"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Pb", "Fe"],
    correctAnswer: "Au"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    correctAnswer: "Diamond"
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "7"
  },
  {
    question: "Which is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: "Nile"
  }
];
