"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { hangmanWords } from '@/lib/constants';
import { cn } from '@/lib/utils';

const MAX_INCORRECT_GUESSES = 6;

const HANGMAN_PARTS = [
    // The gallows itself
    <line key="gallows-base" x1="10" y1="180" x2="100" y2="180" stroke="currentColor" strokeWidth="4" />,
    <line key="gallows-pole" x1="40" y1="180" x2="40" y2="20" stroke="currentColor" strokeWidth="4" />,
    <line key="gallows-beam" x1="40" y1="20" x2="120" y2="20" stroke="currentColor" strokeWidth="4" />,
    <line key="gallows-rope" x1="120" y1="20" x2="120" y2="50" stroke="currentColor" strokeWidth="4" />,
    // The hangman parts based on incorrect guesses
    <circle key="head" cx="120" cy="70" r="20" stroke="currentColor" strokeWidth="4" fill="none" />,
    <line key="body" x1="120" y1="90" x2="120" y2="140" stroke="currentColor" strokeWidth="4" />,
    <line key="left-arm" x1="120" y1="100" x2="100" y2="120" stroke="currentColor" strokeWidth="4" />,
    <line key="right-arm" x1="120" y1="100" x2="140" y2="120" stroke="currentColor" strokeWidth="4" />,
    <line key="left-leg" x1="120" y1="140" x2="100" y2="160" stroke="currentColor" strokeWidth="4" />,
    <line key="right-leg" x1="120" y1="140" x2="140" y2="160" stroke="currentColor" strokeWidth="4" />,
];


const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function HangmanGame() {
    const [word, setWord] = useState('');
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
    const [incorrectGuesses, setIncorrectGuesses] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [gameStatus, setGameStatus] = useState<'won' | 'lost' | 'playing'>('playing');

    const startNewGame = useCallback(() => {
        const newWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
        setWord(newWord);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setIsGameOver(false);
        setGameStatus('playing');
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleGuess = (letter: string) => {
        if (isGameOver || guessedLetters.includes(letter)) return;

        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);

        if (!word.includes(letter)) {
            setIncorrectGuesses(prev => prev + 1);
        }
    };
    
    useEffect(() => {
        if (incorrectGuesses >= MAX_INCORRECT_GUESSES) {
            setIsGameOver(true);
            setGameStatus('lost');
        } else {
            const wordGuessed = word.split('').every(letter => guessedLetters.includes(letter));
            if (word && wordGuessed) {
                setIsGameOver(true);
                setGameStatus('won');
            }
        }
    }, [incorrectGuesses, guessedLetters, word]);


    return (
        <Card className="w-full max-w-2xl text-center">
            <CardHeader>
                <CardTitle>Hangman</CardTitle>
                <CardDescription>Guess the word before it's too late!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-8">
                <svg viewBox="0 0 200 200" className="w-48 h-48 text-foreground">
                    {/* Gallows structure */}
                    {HANGMAN_PARTS.slice(0, 4)}
                    {/* Hangman body parts */}
                    {HANGMAN_PARTS.slice(4, 4 + incorrectGuesses)}
                </svg>

                <div className="flex justify-center gap-2 text-3xl font-bold tracking-widest">
                    {word.split('').map((letter, index) => (
                        <span key={index} className="w-10 h-12 flex items-center justify-center border-b-4">
                            {guessedLetters.includes(letter) || isGameOver ? letter.toUpperCase() : '_'}
                        </span>
                    ))}
                </div>

                {isGameOver ? (
                    <div className="flex flex-col items-center gap-4">
                         <p className={cn(
                            "text-2xl font-bold",
                            gameStatus === 'won' ? 'text-green-600' : 'text-destructive'
                         )}>
                           {gameStatus === 'won' ? "You won!" : "You lost! The word was:"}
                        </p>
                        {gameStatus === 'lost' && <p className="text-xl font-mono">{word.toUpperCase()}</p>}
                        <Button onClick={startNewGame}>
                            <RotateCcw className="mr-2"/>
                            Play Again
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-2">
                        {ALPHABET.map(letter => (
                            <Button
                                key={letter}
                                variant="outline"
                                size="icon"
                                className="w-10 h-10 text-lg"
                                onClick={() => handleGuess(letter)}
                                disabled={guessedLetters.includes(letter)}
                            >
                                {letter.toUpperCase()}
                            </Button>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
