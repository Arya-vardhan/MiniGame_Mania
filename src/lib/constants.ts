import type { Game, SentencePuzzle, EmojiPuzzle, TriviaQuestion, WouldYouRatherQuestion } from '@/lib/types';
import { LayoutGrid, Puzzle, Hash, Swords, Flame, Trophy, Hand, ALargeSmall, Theater, Smile, BrainCircuit, GitCompareArrows } from 'lucide-react';

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
  },
  {
    title: 'Would You Rather?',
    description: 'Make a tough choice between two challenging scenarios!',
    href: '/would-you-rather',
    icon: GitCompareArrows,
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
  'What is the most trouble you have been in?',
  'What is the worst gift you have ever received?',
  'If you could be invisible for a day, what would you do?',
  "What's your most annoying habit?",
  'Have you ever cheated on a test?',
  'What is the silliest thing you have an emotional attachment to?',
  "What's a movie that made you cry?",
  'What is your go-to karaoke song?',
  "What's the most awkward date you've been on?",
  'If you had to eat one meal for the rest of your life, what would it be?',
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
  'Try to lick your elbow.',
  'Talk and act like a robot.',
  'Let someone tickle you for 30 seconds.',
  'Spin around 10 times and try to walk in a straight line.',
  'Eat a spoonful of a condiment (like mustard or ketchup).',
  'Wear socks on your hands for the next 10 minutes.',
  'Attempt to juggle 3 items of the groups choosing.',
  'Hold your breath for as long as you can.',
  'Speak only in rhymes for the next 3 minutes.',
  "Do your best impression of a baby being born.",
];

export const hangmanWords: string[] = [
    'react', 'nextjs', 'tailwind', 'typescript', 'javascript', 'firebase', 'genkit', 
    'component', 'developer', 'interface', 'program', 'software', 'hardware', 
    'function', 'variable', 'constant', 'array', 'object', 'class', 'module',
    'database', 'query', 'schema', 'server', 'client', 'network', 'protocol',
    'authentication', 'authorization', 'encryption', 'security', 'vulnerability',
    'algorithm', 'debug', 'deploy', 'framework', 'library', 'package', 'repository',
    'keyboard', 'monitor', 'processor', 'memory', 'storage', 'bandwidth', 'pixel',
    'responsive', 'accessibility', 'usability', 'performance', 'optimization',
];

export const charades = {
  "Movie": ["Titanic", "Jurassic Park", "The Matrix", "Star Wars", "Pulp Fiction", "Forrest Gump", "The Godfather", "Inception", "The Lion King", "Avatar", "E.T.", "Back to the Future"],
  "TV Show": ["Friends", "The Office", "Game of Thrones", "Breaking Bad", "Stranger Things", "The Simpsons", "Seinfeld", "Squid Game", "The Crown", "Sherlock"],
  "Object": ["Telescope", "Guitar", "Microwave", "Stapler", "Slinky", "Yo-yo", "Lawnmower", "Helicopter", "Trampoline", "Blender", "Camera", "Typewriter"],
  "Animal": ["Monkey", "Elephant", "Penguin", "Kangaroo", "Octopus", "T-Rex", "Giraffe", "Flamingo", "Sloth", "Crab", "Caterpillar", "Peacock"],
  "Action": ["Typing", "Fishing", "Playing basketball", "Ballet dancing", "Doing laundry", "Shoveling snow", "Riding a rollercoaster", "Scuba diving", "Building a snowman", "Doing magic tricks"],
  "Person": ["Albert Einstein", "Beyonce", "Michael Jackson", "Harry Potter", "Darth Vader", "Cleopatra", "Charlie Chaplin", "Elvis Presley", "Wonder Woman", "Santa Claus"],
  "Song": ["Bohemian Rhapsody", "Stayin' Alive", "Single Ladies", "Baby Shark", "YMCA", "Macarena", "Thriller", "I Will Survive", "Uptown Funk", "Let It Go"],
};

export const sentencePuzzles: SentencePuzzle[] = [
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "A wet bird never flies at [_].",
    solution: "night",
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
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "Don't count your [_] before they hatch.",
    solution: "chickens",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "What is full of holes but still holds water?",
    solution: "A sponge",
  },
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "A [_] in time saves nine.",
    solution: "stitch",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "What question can you never answer yes to?",
    solution: "Are you asleep yet?",
  },
   {
    puzzleType: "Riddle",
    puzzleContent: "What is always in front of you but can’t be seen?",
    solution: "The future",
  },
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "Actions speak louder than [_].",
    solution: "words",
  }
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
  { emojis: '🎤💧', solution: 'Mic drop' },
  { emojis: '🇨🇦🥞', solution: 'Canadian pancake' },
  { emojis: '👨‍🚀🌕', solution: 'Astronaut on the moon' },
  { emojis: '🥐🇫🇷', solution: 'French croissant' },
  { emojis: '🍍+🖊️', solution: 'Pen-Pineapple-Apple-Pen' },
  { emojis: '🧛‍♂️🦇', solution: 'Dracula' },
  { emojis: '👨‍🎨👂', solution: 'Van Gogh' },
  { emojis: '🎂🎉', solution: 'Birthday party' },
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
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo"
  },
  {
    question: "Who discovered penicillin?",
    options: ["Marie Curie", "Alexander Fleming", "Isaac Newton", "Albert Einstein"],
    correctAnswer: "Alexander Fleming"
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["South Africa", "India", "Australia", "Brazil"],
    correctAnswer: "Australia"
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    correctAnswer: "Vatican City"
  },
  {
    question: "What is the most spoken language in the world?",
    options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
    correctAnswer: "Mandarin Chinese"
  },
  {
    question: "Who invented the telephone?",
    options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
    correctAnswer: "Alexander Graham Bell"
  }
];

export const wouldYouRatherQuestions: WouldYouRatherQuestion[] = [
  { optionA: "Be able to fly", optionB: "Be able to turn invisible" },
  { optionA: "Have hands for feet", optionB: "Have feet for hands" },
  { optionA: "Live in a world without music", optionB: "Live in a world without movies" },
  { optionA: "Be able to talk to animals", optionB: "Be able to speak all human languages" },
  { optionA: "Give up social media forever", optionB: "Give up watching TV shows and movies forever" },
  { optionA: "Always be 10 minutes late", optionB: "Always be 20 minutes early" },
  { optionA: "Live in a house shaped like a triangle", optionB: "Live in a house shaped like a circle" },
  { optionA: "Have a personal chef", optionB: "Have a personal driver" },
  { optionA: "Control the weather", optionB: "Control time" },
  { optionA: "Never have to do laundry again", optionB: "Never have to wash dishes again" },
  { optionA: "Be a famous movie star", optionB: "Be a famous scientist" },
  { optionA: "Live on a houseboat", optionB: "Live in a treehouse" },
  { optionA: "Have unlimited free flights", optionB: "Have unlimited free meals at any restaurant" },
  { optionA: "Find true love", optionB: "Win the lottery" },
  { optionA: "End world hunger", optionB: "End all wars" },
];
