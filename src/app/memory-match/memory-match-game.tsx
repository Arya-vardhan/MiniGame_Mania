
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

const icons = [
    'Cat', 'Dog', 'Bird', 'Fish', 'Mouse', 'Squirrel', 'Turtle', 'Rabbit',
    'Apple', 'Banana', 'Carrot', 'Pizza', 'Sun', 'Moon', 'Star', 'Cloud'
] as const;

type IconName = typeof icons[number];

interface MemoryCard {
    id: number;
    icon: IconName;
    isFlipped: boolean;
    isMatched: boolean;
}

const generateCards = (): MemoryCard[] => {
    const cardIcons = [...icons, ...icons];
    const shuffledIcons = cardIcons.sort(() => Math.random() - 0.5);
    return shuffledIcons.map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
    }));
};

const GameCard = ({ card, onClick }: { card: MemoryCard, onClick: (id: number) => void }) => {
    const IconComponent = LucideIcons[card.icon as keyof typeof LucideIcons] as LucideIcons.LucideIcon;

    return (
        <div
            className={cn(
                "aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-transform duration-500 [transform-style:preserve-3d]",
                card.isFlipped ? '[transform:rotateY(180deg)]' : ''
            )}
            onClick={() => !card.isFlipped && !card.isMatched && onClick(card.id)}
        >
            <div className="absolute w-full h-full bg-primary/20 border border-primary/30 rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                <LucideIcons.Brain className="w-1/2 h-1/2 text-primary" />
            </div>
            <div className="absolute w-full h-full bg-white/5 border border-white/10 rounded-xl flex flex-col items-center justify-center p-2 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                {IconComponent && <IconComponent className={cn(
                    "w-1/2 h-1/2",
                    card.isMatched ? "text-green-500 text-glow-dynamic" : "text-white"
                )} 
                style={card.isMatched ? { ['--glow-rgb' as any]: '34, 197, 94' } : {}}
                />}
                <span className="text-[10px] sm:text-xs mt-1 text-white/70">{card.icon}</span>
            </div>
        </div>
    );
};

export default function MemoryMatchGame() {
    const [cards, setCards] = useState<MemoryCard[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [turns, setTurns] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    
    useEffect(() => {
      // Generate cards on the client side to avoid hydration errors
      setCards(generateCards());
    }, []);

    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            setTurns(prev => prev + 1);
            const [firstId, secondId] = flippedCards;
            const firstCard = cards.find(c => c.id === firstId);
            const secondCard = cards.find(c => c.id === secondId);

            if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
                // Match
                setCards(prevCards => prevCards.map(card => 
                    (card.id === firstId || card.id === secondId) ? { ...card, isMatched: true } : card
                ));
                setFlippedCards([]);
                setIsChecking(false);
            } else {
                // No match
                setTimeout(() => {
                    setCards(prevCards => prevCards.map(card => 
                        (card.id === firstId || card.id === secondId) ? { ...card, isFlipped: false } : card
                    ));
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    }, [flippedCards, cards]);

    const handleCardClick = (id: number) => {
        if (isChecking || flippedCards.length === 2) return;

        setCards(prevCards => prevCards.map(card =>
            card.id === id ? { ...card, isFlipped: true } : card
        ));
        setFlippedCards(prev => [...prev, id]);
    };

    const resetGame = () => {
        setCards(generateCards());
        setFlippedCards([]);
        setTurns(0);
        setIsChecking(false);
    };
    
    const isGameWon = cards.length > 0 && cards.every(card => card.isMatched);

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
            <Card className="glassmorphic border-white/10 p-5 rounded-2xl w-full">
                <CardContent className="p-0">
                    <div className="flex justify-between items-center mb-6">
                        <p className="text-lg font-bold text-white/95">Turns: {turns}</p>
                        <Button onClick={resetGame} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-xs h-9">
                            <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                            Reset Game
                        </Button>
                    </div>
                    {isGameWon ? (
                        <div className="text-center p-8 bg-green-500/10 border border-green-500/20 rounded-xl">
                            <h2 className="text-3xl font-extrabold text-green-400">You Won!</h2>
                            <p className="text-sm text-muted-foreground mt-2">You completed the game in {turns} turns.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 [perspective:1000px]">
                            {cards.map(card => (
                                <GameCard key={card.id} card={card} onClick={handleCardClick} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
