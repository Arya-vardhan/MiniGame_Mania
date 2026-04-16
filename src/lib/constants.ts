
import type { Game, SentencePuzzle, EmojiPuzzle, TriviaQuestion, WouldYouRatherQuestion, NeverHaveIEverQuestion } from '@/lib/types';
import { LayoutGrid, Puzzle, Hash, Swords, Flame, Trophy, Hand, ALargeSmall, Theater, Smile, BrainCircuit, GitCompareArrows, HelpCircle, Brain, Clapperboard } from 'lucide-react';

export const games: Game[] = [
  {
    title: 'Memory Match',
    description: 'Flip cards to find matching pairs. Test your memory!',
    href: '/memory-match',
    icon: Brain,
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
    title: 'Dumb Charades',
    description: 'A classic team-based acting game with various categories.',
    href: '/dumb-charades',
    icon: Clapperboard,
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
  },
  {
    title: 'Never Have I Ever',
    description: 'A classic party game of "Never Have I Ever".',
    href: '/never-have-i-ever',
    icon: HelpCircle,
  }
];

export const navLinks = [
  { href: '/', label: 'Home', icon: LayoutGrid },
  ...games.map(({ href, title, icon }) => ({ href, label: title, icon })),
  { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
];

export const truthOrDareCategories = [
  { id: 'family', label: 'Family' },
  { id: 'social', label: 'Social Interaction' },
  { id: 'friends', label: 'Friends (Raw Truth)' },
  { id: 'naughty', label: 'Naughty' },
  { id: 'intimate', label: 'Very Intimate' },
];

export const truths: Record<string, string[]> = {
  family: [
    "What's the most childish thing you still do?", "What is a weird food that you love?", "What is your biggest fear?", "What's a movie that made you cry?", "What is your go-to karaoke song?", "If you could be invisible for a day, what would you do?", "What is the silliest thing you have an emotional attachment to?", "What is the worst gift you have ever received?", "What is a secret talent you have?", "If you had to eat one meal for the rest of your life, what would it be?",
    "What was the most embarrassing moment of your childhood?", "Which family member do you think you are most like?", "What's the funniest lie you ever told your parents?", "What's a family tradition you secretly dislike?", "If you could change one thing about your childhood, what would it be?", "What was your favorite cartoon growing up?", "Have you ever accidentally broken something and blamed it on a sibling?", "What is the worst meal you've ever cooked?", "What is your favorite family memory?", "What's the longest you've gone without showering?",
    "What's a deeply weird habit you have when you're alone?", "Which family member complains the most?", "Who in the family is the worst driver?", "If you won the lottery tomorrow, what is the first thing you'd buy?", "What is the most ridiculous thing you've ever bought?", "What's your biggest pet peeve?", "Do you talk in your sleep?", "What's the scariest nightmare you've ever had?", "If you had to live in a TV show, which one would it be?", "What was your worst haircut ever?",
    "What is the strangest dream you've had involving a family member?", "Have you ever faked being sick to miss a family event?", "What's the most embarrassing thing your parents have caught you doing?", "What's a secret you kept from your parents during high school?", "What is the most trouble you've ever been in at school?", "Have you ever snuck out of the house?", "What is your most irrational fear?", "What's the funniest joke you know by heart?", "If you were an animal, what would you be?", "What's your weirdest phobia?"
  ],
  social: [
    "What's the biggest misconception people have about you?", "What is the biggest lie you have ever told?", "What is the most trouble you have been in?", "What's your most annoying habit?", "Have you ever pretended to be sick to get out of something?", "If you could trade lives with someone for a day, who would it be?", "What's something you're terrible at but wish you were good at?", "Have you ever been fired from a job?", "If you could only use one emoji for the rest of your life, which one would it be?", "What's the strangest thing you've ever eaten?",
    "What's the most awkward conversation you've ever had with a stranger?", "Have you ever stolen something from a workplace?", "What's the worst date you've ever been on?", "Have you ever completely forgotten someone's name while talking to them?", "What is the most embarrassing thing you've posted on social media?", "Have you ever accidentally liked an old photo while stalking someone?", "What is your worst habit in a social setting?", "Who is the most famous person you've ever met?", "What is the most petty reason you've stopped talking to someone?", "Have you ever RSVP'd 'yes' to a party but never showed up?",
    "What is your go-to excuse to leave a conversation?", "Have you ever eavesdropped on a stranger's conversation?", "What's the weirdest thing you've done to impress someone?", "What's the longest you've stalked someone on social media?", "Have you ever faked a phone call to avoid someone?", "What's the biggest party foul you've ever committed?", "Have you ever laughed at a joke you completely didn't understand?", "What is the most embarrassing text you've sent to the wrong person?", "Have you ever been caught talking to yourself?", "What's the most useless piece of trivia you know?",
    "What's your favorite conspiracy theory?", "If you had to give a TED talk right now, what would it be about?", "Have you ever lied about your age?", "Have you ever lied about your job to sound cooler?", "What is the worst trend you've ever participated in?", "Have you ever regifted a present to the person who gave it to you?", "What is the most cringe-worthy pickup line you've used or heard?", "Have you ever gotten caught in a massive lie?", "What's the most awkward thing that's happened to you in a public restroom?", "If you could delete an app from everyone's phone, what would it be?"
  ],
  friends: [
    "What's the most embarrassing thing you've ever done?", "What's a secret you've never told anyone?", "What is your guilty pleasure?", "Have you ever cheated on a test?", "What is the most embarrassing song on your phone?", "Have you ever snooped through someone’s phone?", "Who is the person in this room you trust the most?", "What is the most jealous you've ever been?", "What's the biggest mistake you've ever made?", "Have you ever lied to someone in this room?",
    "Which friend in this room do you think will get married first?", "Who in this room do you think has the worst fashion sense?", "What's the weirdest thing you've done at a friend's house?", "Have you ever had a crush on a friend's sibling?", "What is the most annoying thing about the person to your left?", "If we were stranded on a deserted island, who would survive the longest?", "Have you ever secretly disliked a partner of someone in this room?", "What's the worst advice you've ever given a friend?", "Who in this room is the biggest drama queen?", "What's a secret you immediately told someone else after promising you wouldn't?",
    "Have you ever borrowed something from a friend and never returned it?", "Have you ever ignored a call from a friend because you just didn't want to talk to them?", "What is the stupidest argument you've ever had with a friend?", "Which friend in this room would be the best getaway driver?", "Who is the worst texter in the group?", "Have you ever judged a friend for their life choices?", "What's the most embarrassing thing we've done together?", "If you had to room with one person here for the rest of your life, who would it be?", "Who in this group do you think is the smartest?", "Who is the most likely to get arrested?",
    "What's a habit of a friend that drives you absolutely crazy?", "Have you ever forgotten a friend's birthday?", "Have you ever made an excuse to avoid hanging out with us?", "What is the most expensive thing you've broken that belonged to a friend?", "If you could swap lives with anyone in this room, who would it be?", "What's the biggest lie you've ever told a best friend?", "Have you ever kissed a friend purely out of boredom?", "What is the most embarrassing photo you have of someone in this room?", "Who do you think has the highest screen time?", "If you had to eliminate one person from our friend group, who would it be?"
  ],
  naughty: [
    "Who is your secret crush?", "What's the most awkward date you've been on?", "What fictional character do you have a crush on?", "Have you ever ghosted someone?", "What's your biggest turn-on?", "What's the most scandalous thing you've done in public?", "Who in this room do you think is the best kisser?", "Have you ever had a crush on a friend's partner?", "What's your wildest fantasy?", "Have you ever sent a risky text to the wrong person?",
    "What's your favorite part of a partner's body?", "Have you ever skinny-dipped?", "What is the weirdest place you've ever made out with someone?", "What is your biggest turn-off?", "Have you ever had a romantic dream about someone in this room?", "What's the longest you've gone without any intimacy?", "Have you ever been caught in a compromising position?", "What's your strangest kink or fetish?", "What is the most adventurous thing you've done in bed?", "Have you ever had a one-night stand?",
    "What is the most embarrassing thing that happened to you during an intimate moment?", "Have you ever crushed on a teacher or boss?", "What is your favorite type of underwear on a partner?", "Have you ever sent nudes to someone?", "Have you ever engaged in a ‘friends with benefits’ situation?", "What's the hottest thing a partner has ever whispered to you?", "Who in this room do you think would be the wildest in bed?", "Have you ever kissed more than one person in a day?", "What is the thickest lie you've told to get out of a date?", "Do you prefer giving or receiving massages?",
    "Have you ever had a crush on a celebrity that is much older than you?", "What's the dirtiest thought you've had today?", "Have you ever practiced kissing in a mirror?", "What is your favorite romantic trope?", "If you could hook up with any historical figure, who would it be?", "Have you ever secretly filmed or recorded an intimate moment?", "What's the boldest move you've ever made on someone?", "Have you ever faked pleasure?", "Do you enjoy dirty talk?", "What is the most inappropriate time you've ever been turned on?"
  ],
  intimate: [
    "What's the most deeply personal secret you've never told anyone here?", "When did you last feel completely and utterly vulnerable with a partner?", "What is the most intimate and romantic memory you have of us (or a partner)?", "What's a silent struggle or burden you carry everyday that no one knows about?", "When was the last time someone broke your heart, and how did it change you?", "What's the one thing that makes you feel unconditionally loved?", "If we were to date, what is the absolute hardest thing to deal with about you?", "What role does physical intimacy play in your emotional connection to someone?", "What do you most desire from a relationship that you've never been able to get?", "Tell me about a time you realized you were truly in love.",
    "What is your biggest fear when it comes to long-term commitment?", "Which of your flaws do you think affects your relationships the most?", "Have you ever felt like you loved someone more than they loved you?", "What does emotional intimacy look like to you?", "When was the last time you were afraid of losing someone you cared about?", "What is a boundary you have that you will never compromise on?", "How do you know when you fully trust someone?", "What is the most beautiful compliment you've ever received?", "Describe the moment you felt most disconnected from a partner.", "What's a trauma from your past that still affects how you love today?",
    "If you could ask your future partner one question and get the absolute truth, what would it be?", "What is the most toxic trait you bring to a relationship?", "Do you think you are easy or difficult to love?", "What is the hardest lesson you've had to learn about love?", "Have you ever stayed in a relationship longer than you should have? Why?", "What's a topic you're terrified to bring up in a relationship?", "How do you handle jealousy when it creeps in?", "What does 'home' mean to you in the context of a person?", "When you feel disconnected, what do you need most to regain intimacy?", "Have you ever lost yourself while trying to love someone else?",
    "What was the specific moment you realized your last relationship was over?", "Do you think true love is found or built?", "What's the longest you've ever held onto feelings for someone who didn't return them?", "What is your primary love language, and how do you prefer it to be shown?", "Have you ever self-sabotaged a good relationship?", "What is the deeply hidden soft side of you that very few people see?", "How do you want to be remembered by the people you've loved?", "What is a non-physical trait you find irresistibly attractive?", "Do you believe someone can change if they truly love you?", "What is the most courageous thing you've ever done for love?"
  ]
};

export const dares: Record<string, string[]> = {
  family: [
    "Sing a song out loud.", "Talk in a funny accent for the next 3 rounds.", "Do your best dance move.", "Imitate a family member until someone guesses who it is.", "Try to lick your elbow.", "Talk and act like a robot.", "Hold your breath for as long as you can.", "Speak only in rhymes for the next 3 minutes.", "Do an impression of another player until someone guesses who it is.", "Howl like a wolf at the moon (or ceiling).",
    "Walk around the room with a book on your head without dropping it.", "Try to do a handstand against the wall.", "Let someone in the room draw a unibrow on you with a washable marker.", "Eat a spoonful of mustard or hot sauce.", "Speak without opening your lips for the next round.", "Do 20 jumping jacks while shouting the alphabet.", "Try to touch your nose with your tongue.", "Act like a monkey until it's your turn again.", "Let another player give you a temporary new hairstyle.", "Pretend to be an airplane and fly around the room for 1 minute.",
    "Try to juggle three random items chosen by the group.", "Wear socks on your hands for the next 3 rounds.", "Spin around 10 times and then try to walk in a straight line.", "Do your best evil villain laugh.", "Recite a nursery rhyme in the most dramatic voice possible.", "Try to make the person across from you laugh without touching them.", "Sit on the floor and try to stand up without using your hands.", "Pretend you are an operatic singer and sing your next sentence.", "Pantomime your morning routine.", "Let the group tickle you for 30 seconds straight.",
    "Act out a scene from your favorite movie until someone guesses it.", "Hold a plank position for 30 seconds.", "Try to catch three pieces of popcorn in your mouth.", "Wear your clothes backward for the rest of the game.", "Give a piggie back ride to another player.", "Let someone wrap you up tightly in a blanket like a burrito.", "Attempt to breakdance.", "Speak like Yoda for the next two rounds.", "Act like a cat and rub your head against a player's leg.", "Crawl across the room like a baby."
  ],
  social: [
    "Let someone draw on your face with a pen.", "Let the group choose a word you have to use in every sentence for 10 minutes.", "Spin around 10 times and try to walk in a straight line.", "Attempt to juggle 3 items of the group's choosing.", "Try to breakdance for 30 seconds.", "Let the group create a silly hairstyle for you.", "Speak in a high-pitched voice for the rest of the round.", "Try to sell a random object in the room to the group.", "Do your best catwalk model strut.", "Do 10 pushups.",
    "Let someone text a random contact from your phone.", "Post a completely out-of-context photo on your social media.", "Call a pizza place and ask if they sell hamburgers.", "Make up a 30-second rap about the person to your left.", "Put an ice cube down your shirt and let it melt.", "Let the group update your social media status.", "Take a shot (or sip) of an unusual condiment mixed with water.", "Do an interpretive dance to a song chosen by the group.", "Speak in an alien language until your next turn.", "Let the person to your right draw a fake tattoo on your arm.",
    "Stand outside and wave at the next 3 cars that pass by.", "Act entirely like a dog for the next 2 minutes.", "Try to lick your foot.", "Eat a completely raw slice of onion.", "Let the group browse through your recent web history for 10 seconds.", "Sing everything you say for the next 5 minutes.", "Call your mom or dad and tell them you want to adopt a pet monkey.", "Hold a funny face for exactly one minute.", "Put your shoe on your head and keep it there for 2 rounds.", "Trade an item of clothing with the person to your right.",
    "Give a completely dramatic monologue about a potato.", "Let someone apply lipstick on you while they are blindfolded.", "Smell the feet of the person to your left.", "Drink a mystery mixture created by the group (non-toxic!).", "Pretend to be the host of a cooking show while making a simple snack.", "Act like you are deeply underwater for the next round.", "Do 15 squats while shouting out your favorite foods.", "Let someone wrap your head in toilet paper like a mummy.", "Perform a magic trick (even if it makes no sense).", "Speak in the 3rd person for the rest of the game."
  ],
  friends: [
    "Post an embarrassing photo of yourself online.", "Let someone tickle you for 30 seconds.", "Eat a spoonful of a condiment (like mustard or ketchup).", "Wear socks on your hands for the next 10 minutes.", "Do your best impression of a baby being born.", "Let the person to your left do your makeup.", "Let the group text a random contact from your phone.", "Let someone post a silly status on your social media.", "Eat a raw onion slice.", "Call a random contact in your phone and sing them happy birthday.",
    "Switch phones with the person across from you for 5 minutes.", "Let the group look through your camera roll for 60 seconds.", "Call your crush or an ex and immediately hang up.", "Give a sincere compliment to everyone in the room.", "Perform a synchronized dance routine with another player.", "Let the group write an embarrassing comment on a celebrity's Instagram post from your account.", "Show the group your most embarrassing childhood photo.", "Allow the person to your left to blindfold you and feed you something out of the fridge.", "Let the group choose a random YouTube video for you to recreate.", "Do the worm across the floor.",
    "Record a 30-second voice memo of you making animal noises and send it to your best friend not here.", "Let everyone in the room give you a wet willy.", "Eat a spoonful of cinnamon (or something similarly difficult).", "Put your hands in someone else's pockets for the next round.", "Let the group read your last 5 text messages aloud.", "Let the person to your right rest their legs on you for 2 rounds.", "Call a sibling and tell them you lost your memory.", "Put on a makeshift diaper over your clothes.", "Wear all your clothes inside out for the remainder of the evening.", "Try to do a cartwheel in the living room.",
    "Lick the bottom of your shoe.", "Let the group wrap you in toilet paper.", "Put an ice cube in your mouth and try to sing a song.", "Let the group draw a fake mustache on your face.", "Do an impression of the person to your left.", "Call an acquiantance and tell them you miss them.", "Wear a funny hat for the rest of the game.", "Read the most embarrassing text on your phone out loud.", "Let someone brush your teeth for you.", "Hold a staring contest with the person across from you. Loser drinks water."
  ],
  naughty: [
    "Serenade the person to your right.", "Give a sensual massage to the person on your left for 1 minute.", "Do a 30-second lap dance for someone the group chooses.", "Kiss the cheek of the person across from you.", "Whisper something naughty into the ear of the person next to you.", "Remove one piece of clothing (keep it appropriate for the setting).", "Demonstrate your best kissing technique on your hand.", "Let someone bite your neck gently.", "Describe your perfect date in extreme detail.", "Send a flirty text to the 5th contact in your phone.",
    "Kiss the person to your right anywhere except the lips.", "Let someone trace an invisible word on your lower back, guess what it is.", "Give a deeply passionate fake-out kiss to a pillow.", "Allow the person across from you to run their hands through your hair for 1 minute.", "Nibble on the earlobe of the person to your left.", "Demonstrate your favorite sexual position using some pillows.", "Slowly eat a piece of fruit while making direct eye contact with someone.", "Leave a hickey on your own arm.", "Kiss the inner thigh of the person of your choice (over clothing).", "Let someone playfully spank you.",
    "Give a suggestive wink to every person in the room.", "Make up a dirty rap and perform it for the group.", "Let the group blindfold you and feed you a mystery food in a sensual manner.", "Send a heart emoji to the last person you texted.", "Show the group the spiciest photo you have saved on your phone.", "Do 10 pushups with someone sitting on your back.", "Let another player carefully undo one button on your shirt.", "Make out with the back of your hand, passionately, for 10 seconds.", "Tell the group exactly how to turn you on.", "Gaze seductively into the eyes of the person across from you for a minute.",
    "Moan loudly like you are having the best time of your life.", "Let someone slide an ice cube down your chest.", "Bite your lip seductively while staring at the nearest person.", "Let the group pick a suggestive song for you to strip search to.", "Slowly unbuckle your belt and buckle it again while holding eye contact.", "Give a purely physical compliment to someone in the group.", "Send a completely out-of-context 'I want you' text to an ex.", "Let someone whisper their deepest fantasy in your ear.", "Perform a strip-tease taking only your socks off.", "Taste a drop of honey or syrup off the finger of the person next to you."
  ],
  intimate: [
    "Stare deeply into the eyes of the person to your left for 60 seconds without speaking.", "Give the person of your choice a slow, sensual neck massage for 2 minutes.", "Whisper the most romantic thing you can think of into the ear of the person next to you.", "Hold hands with the person you find most attractive here for the next 3 rounds.", "Share a passionate, 10-second kiss on the cheek with the person across from you.", "Describe the exact moment you felt the strongest romantic pull toward someone in this room.", "Caress the arm and hand of the person to your right while giving them 3 genuine compliments.", "Blindfold yourself and let someone in the group softly trace a letter on your arm; guess the letter.", "Let the person next to you sit on your lap for the next round.", "Demonstrate how you would initiate making a move on someone you're attracted to.",
    "Gently brush the hair away from the face of the person across from you out of affection.", "Let someone map the lines on your palm with their finger for a full minute.", "Rest your head on the shoulder of the person next to you for the next 3 rounds.", "Feed the person to your left a small snack, doing it as affectionately as possible.", "Write a short, romantic poem on the spot for someone in the room.", "Softly kiss the forehead of the person you feel closest to.", "Trace the outline of someone's lips with your thumb.", "Hold eye contact with a partner and tell them exactly why you appreciate them.", "Allow someone to rest their hand softly on your chest over your heartbeat.", "Exchange a piece of clothing with the person next to you.",
    "Cuddle with the person of your choice for two full minutes.", "Let the person to your left listen to your heartbeat with their ear against your chest.", "Close your eyes and let someone trace your jawline.", "Share a slow, intimate dance with someone in the room to a song of their choice.", "Give the person to your right a long, deeply emotional hug.", "Hold the sides of a partner's face and tell them they are beautiful.", "Softly kiss the knuckles of the person across from you.", "Let someone slowly trace the curve of your neck with their fingertips.", "Interlock fingers with someone for the rest of the game.", "Describe to the group what true intimacy feels like to you.",
    "Whisper your deepest insecurity into the ear of the person next to you.", "Let someone blindfolded guess your identity by only touching your face.", "Give a warm, affectionate shoulder rub to the person on your left.", "Have an intense staring contest, but you must smile warmly the entire time.", "Compliment the soul of the person across from you, not their appearance.", "Let someone trace letters on your bare back until you guess the word.", "Confess a romantic feeling you've never shared before.", "Hold your hands over someone else's hands and close your eyes for 30 seconds in silence.", "Let someone gently stroke your hair for 2 minutes.", "Trace a heart onto the palm of the person to your left."
  ]
};

export const hangmanWords: string[] = [
    'react', 'nextjs', 'tailwind', 'typescript', 'javascript', 'firebase', 'genkit', 
    'component', 'developer', 'interface', 'program', 'software', 'hardware', 
    'function', 'variable', 'constant', 'array', 'object', 'class', 'module',
    'database', 'query', 'schema', 'server', 'client', 'network', 'protocol',
    'authentication', 'authorization', 'encryption', 'security', 'vulnerability',
    'algorithm', 'debug', 'deploy', 'framework', 'library', 'package', 'repository',
    'keyboard', 'monitor', 'processor', 'memory', 'storage', 'bandwidth', 'pixel',
    'responsive', 'accessibility', 'usability', 'performance', 'optimization',
    'galaxy', 'planet', 'comet', 'nebula', 'supernova', 'astronaut', 'universe',
    'elephant', 'giraffe', 'penguin', 'dolphin', 'kangaroo', 'chimpanzee', 'crocodile',
    'symphony', 'concerto', 'orchestra', 'melody', 'harmony', 'rhythm', 'opera',
    'mountain', 'volcano', 'river', 'canyon', 'desert', 'forest', 'waterfall',
    'history', 'philosophy', 'psychology', 'sociology', 'economics', 'politics', 'literature'
];

export const dumbCharades = {
  "Hollywood Movies": ["The Dark Knight", "Forrest Gump", "The Shawshank Redemption", "Gladiator", "Finding Nemo", "Toy Story", "The Silence of the Lambs", "Braveheart", "Die Hard", "Home Alone"],
  "Bollywood Movies": ["Dilwale Dulhania Le Jayenge", "3 Idiots", "Lagaan", "Sholay", "Dangal", "Gangs of Wasseypur", "Kabhi Khushi Kabhie Gham", "My Name Is Khan", "Queen", "Barfi!"],
  "Tollywood Movies": [
    "Baahubali: The Beginning",
    "RRR",
    "Eega",
    "Magadheera",
    "Arjun Reddy",
    "Pushpa: The Rise",
    "Kalki 2898 AD",
    "Sita Ramam",
    "Jersey",
    "Mahanati",
    "Rangasthalam",
    "Ala Vaikunthapurramuloo",
    "Agent Sai Srinivasa Athreya",
    "C/o Kancharapalem",
    "Brochevarevarura",
    "Mathu Vadalara",
    "Goodachari",
    "Kshanam",
    "Pelli Choopulu",
    "Ee Nagaraniki Emaindi",
    "Athadu",
    "Pokiri",
    "Okkadu",
    "Kushi",
    "Manmadhudu",
    "Nuvvu Naaku Nachav",
    "Bommarillu",
    "Happy Days",
    "Arundhati",
    "Yamadonga",
    "Gabbar Singh",
    "Dookudu",
    "Businessman",
    "Julayi",
    "Mirchi",
    "Attarintiki Daredi",
    "Race Gurram",
    "Srimanthudu",
    "Janatha Garage",
    "Sarrainodu",
    "Geetha Govindam",
    "F2: Fun and Frustration",
    "Jathi Ratnalu",
    "DJ Tillu",
    "Major",
    "Dasara",
    "Virupaksha",
    "Hanu-Man",
    "Hi Nanna",
    "Animal",
    "Salaar: Part 1 - Ceasefire",
    "Devara: Part 1",
    "Baby",
    "Mangalavaaram",
    "Guntur Kaaram",
    "Tillu Square",
    "Kartikeya 2",
    "Bimbisara",
    "Shyam Singha Roy",
    "Akhanda",
    "Uppena",
    "Krack",
    "Bheeshma",
    "V",
    "Hit: The First Case",
    "Evaru",
    "Oh! Baby",
    "Agent",
    "Liger",
    "Saaho",
    "Maharshi",
    "Bharat Ane Nenu",
    "Aravinda Sametha Veera Raghava",
    "Fidaa",
    "Ninnu Kori",
    "Sye Raa Narasimha Reddy",
    "Gautamiputra Satakarni",
    "Manam",
    "Legend",
    "Badri",
    "Indra",
    "Tagore",
    "Chatrapathi",
    "Vikramarkudu",
    "Stalin",
    "Desamuduru",
    "Jalsa",
    "Ready",
    "Kick",
    "Adhurs",
    "Brindavanam",
    "Vedam",
    "Leader",
    "Maryada Ramanna",
    "Darling",
    "Mr. Perfect",
    "100% Love",
    "Ishq",
    "Swamy Ra Ra",
    "Uyyala Jampala",
    "Oohalu Gusagusalade",
    "A Aa",
    "Nenu Local",
    "Middle Class Abbayi",
    "Sathamanam Bhavati",
    "Awe",
    "Gamyam",
    "Prasthanam",
    "Kanche",
    "Mallieswari",
    "Nuvve Kavali",
    "Chirutha",
    "Varsham",
    "Arya",
    "Arya 2",
    "Sye",
    "Gharshana",
    "Anand",
    "Godavari",
    "Aithe",
    "Anukokunda Oka Roju",
    "Mayabazar",
    "Sagara Sangamam",
    "Shankarabharanam",
    "Swathi Muthyam",
    "Rudraveena",
    "Jagadeka Veerudu Athiloka Sundari",
    "Aditya 369",
    "Shiva",
    "Kshana Kshanam",
    "Money",
    "Hello Brother",
    "Gulabi",
    "Ninne Pelladata",
    "Preminchukundam Raa",
    "Tholi Prema",
    "Suswagatham",
    "Swayamkrushi",
    "Sirivennela",
    "Muthyala Muggu",
    "Daana Veera Soora Karna",
    "Pathala Bhairavi",
    "Missamma",
    "Gulebakavali Katha",
    "Aasthi Janedu Aasa Baredu",
    "Pellaniki Premalekha Priyuraliki Subhalekha",
    "Maa Aavida Meeda Ottu Mee Aavida Chala Manchidi",
    "Athanu Hardware Aame Software",
    "Sreemadvirata Potuluri Veerabrahmendra Swamy Charitra",
    "Sahasa Veerudu Sagara Kanya",
    "Anaganaga O Dheerudu",
    "Yekkadiki Pothavu Chinnavada",
    "Samba",
    "Simhadri",
    "Narasimha Naidu",
    "Samarasimha Redddy",
    "Khaidi",
    "Muthu",
    "Basha",
    "Annamayya",
    "Sri Ramadasu",
    "Pelli Sandadi",
    "Murari",
    "Okariki Okaru",
    "7G Brindavan Colony",
    "Happy",
    "Parugu",
    "Bujjigadu",
    "Ek Niranjan",
    "Orange",
    "Donga Dongadi",
    "Venky",
    "Dubai Seenu",
    "King",
    "Dhee",
    "Ashta Chamma",
    "Golconda High School",
    "Ala Modalaindi",
    "Pilla Zamindar",
    "Sudigadu",
    "Karthikeya",
    "Drushyam",
    "Bengal Tiger",
    "Supreme",
    "Nene Raju Nene Mantri",
    "iSmart Shankar",
    "Bhaagamathie",
    "Zombie Reddy",
    "Masooda",
    "The Ghost",
    "Waltair Veerayya"
  ],
  "Famous Personalities": ["Mahatma Gandhi", "Nelson Mandela", "Queen Elizabeth II", "Donald Trump", "Sachin Tendulkar", "Amitabh Bachchan", "Shah Rukh Khan", "Tom Cruise", "Oprah Winfrey", "Mother Teresa"],
  "Common Objects": ["Ceiling Fan", "Pressure Cooker", "Washing Machine", "Traffic Light", "Vending Machine", "Key", "Wallet", "Spectacles", "Backpack", "Headphones"],
  "Actions / Verbs": ["Crying", "Laughing", "Fighting", "Sleeping", "Eating", "Driving", "Swimming", "Reading", "Writing", "Singing"],
  "Idioms and Phrases": ["Bite the bullet", "Break a leg", "Hit the road", "Spill the beans", "Piece of cake", "Once in a blue moon", "A dime a dozen", "Blessing in disguise", "Cry over spilt milk", "Curiosity killed the cat"]
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
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "What has an eye, but cannot see?",
    solution: "A needle",
  },
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "An apple a day keeps the [_] away.",
    solution: "doctor",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "I’m tall when I’m young, and I’m short when I’m old. What am I?",
    solution: "A candle",
  },
  {
    puzzleType: "Fill in the Blank",
    puzzleContent: "When in Rome, do as the [_] do.",
    solution: "Romans",
  },
  {
    puzzleType: "Riddle",
    puzzleContent: "What is so fragile that saying its name breaks it?",
    solution: "Silence",
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
  { emojis: '🎤💧', solution: 'Mic drop' },
  { emojis: '🇨🇦🥞', solution: 'Canadian pancake' },
  { emojis: '👨‍🚀🌕', solution: 'Astronaut on the moon' },
  { emojis: '🥐🇫🇷', solution: 'French croissant' },
  { emojis: '🍍+🖊️', solution: 'Pen-Pineapple-Apple-Pen' },
  { emojis: '🧛‍♂️🦇', solution: 'Dracula' },
  { emojis: '👨‍🎨👂', solution: 'Van Gogh' },
  { emojis: '🎂🎉', solution: 'Birthday party' },
  { emojis: '📖🐛', solution: 'Bookworm' },
  { emojis: '☀️😎', solution: 'Sunglasses' },
  { emojis: '🤖👮‍♂️', solution: 'Robocop' },
  { emojis: '🏃‍♂️💨', solution: 'Fast and Furious' },
  { emojis: '💻🐭', solution: 'Computer mouse' },
  { emojis: '💍+💍+💍', solution: 'Lord of the Rings' },
  { emojis: '👨‍👩‍👧‍👦🌳', solution: 'Family tree' },
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
  },
  {
    question: "What is the currency of Switzerland?",
    options: ["Euro", "Dollar", "Franc", "Pound"],
    correctAnswer: "Franc"
  },
  {
    question: "How many bones are in the human body?",
    options: ["206", "201", "209", "212"],
    correctAnswer: "206"
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Lime"],
    correctAnswer: "Avocado"
  },
  {
    question: "Who was the first person to walk on the moon?",
    options: ["Buzz Aldrin", "Yuri Gagarin", "Michael Collins", "Neil Armstrong"],
    correctAnswer: "Neil Armstrong"
  },
  {
    question: "Which artist cut off his own ear?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Salvador Dalí", "Claude Monet"],
    correctAnswer: "Vincent van Gogh"
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "In which city were the first modern Olympic Games held?",
    options: ["Paris", "London", "Athens", "Rome"],
    correctAnswer: "Athens"
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    correctAnswer: "100°C"
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
  { optionA: "Have a photographic memory", optionB: "Be able to forget anything you want" },
  { optionA: "Live where it is always winter", optionB: "Live where it is always summer" },
  { optionA: "Have the ability to teleport", optionB: "Have the ability of telekinesis" },
  { optionA: "Be an amazing singer", optionB: "Be an amazing dancer" },
  { optionA: "Never be stuck in traffic again", optionB: "Never get a cold again" },
  { optionA: "Be able to breathe underwater", optionB: "Be able to run at 100 mph" },
  { optionA: "Explore a new planet", optionB: "Explore the deep ocean" },
  { optionA: "Never have to sleep again", optionB: "Be able to eat whatever you want without gaining weight" },
  { optionA: "Be the funniest person alive", optionB: "Be the most intelligent person alive" },
];

export const neverHaveIEverQuestions: NeverHaveIEverQuestion[] = [
  "lied about my age.",
  "pretended to be sick to skip school or work.",
  "eaten a whole pizza by myself in one sitting.",
  "spied on my neighbors.",
  "Googled myself.",
  "cried during a Disney movie.",
  "used someone else's toothbrush.",
  "cut my own hair.",
  "fallen asleep in a movie theater.",
  "blamed a fart on someone else.",
  "lied in a game of 'Never Have I Ever.'",
  "ignored a call from my parents on purpose.",
  "re-gifted a present.",
  "stalked an ex on social media.",
  "eaten food that fell on the floor.",
  "pretended I knew what someone was talking about.",
  "dropped my phone in the toilet.",
  "told a secret I was supposed to keep.",
  "sung karaoke.",
  "danced in an elevator when I was alone.",
  "cheated on a test.",
  "been kicked out of a public place.",
  "lied to get out of a date.",
  "eaten an entire jar of Nutella.",
  "had a crush on a friend's sibling.",
  "pretended to be on the phone to avoid talking to someone.",
  "forgotten a close friend's birthday.",
  "tried to use a fake ID.",
  "broken something and not told anyone.",
  "worn the same outfit two days in a row.",
  "eavesdropped on a conversation.",
  "sent a text to the wrong person.",
  "been so scared I screamed out loud.",
  "laughed so hard I cried.",
  "stayed up all night for no reason.",
  "binge-watched an entire TV series in one weekend.",
  "made a silly face at a baby.",
  "tried to cut my pet's hair.",
  "lost a bet and had to do something embarrassing.",
  "pretended to laugh at a joke I didn't get.",
];
