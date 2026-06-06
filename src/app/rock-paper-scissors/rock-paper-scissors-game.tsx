"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Hand, Scissors, Gem, RotateCcw, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';
type Result = 'win' | 'lose' | 'draw' | null;

const choices: { name: Choice; icon: LucideIcon }[] = [
  { name: 'rock', icon: Gem },
  { name: 'paper', icon: Hand },
  { name: 'scissors', icon: Scissors },
];

export default function RockPaperScissorsGame() {
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [computerChoice, setComputerChoice] = useState<Choice | null>(null);
  const [result, setResult] = useState<Result>(null);
  const [scores, setScores] = useState({ player: 0, computer: 0 });

  const handlePlayerChoice = (choice: Choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)].name;
    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    determineWinner(choice, computerChoice);
  };

  const determineWinner = (player: Choice, computer: Choice) => {
    if (player === computer) {
      setResult('draw');
    } else if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      setResult('win');
      setScores(prev => ({ ...prev, player: prev.player + 1 }));
    } else {
      setResult('lose');
      setScores(prev => ({ ...prev, computer: prev.computer + 1 }));
    }
  };

  const resetRound = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
  };
  
  const resetGame = () => {
    resetRound();
    setScores({ player: 0, computer: 0 });
  }
  
  const getResultText = () => {
    switch (result) {
        case 'win': return "You Win!";
        case 'lose': return "You Lose!";
        case 'draw': return "It's a Draw!";
        default: return "Choose your weapon!";
    }
  }

  const ChoiceIcon = ({ choice, size = "lg" }: { choice: Choice | null, size?: "sm" | "lg" }) => {
    if (!choice) return <div className={cn(size === 'lg' ? "w-24 h-24" : "w-16 h-16", "bg-white/5 rounded-full animate-pulse border border-white/10")}></div>;
    const Icon = choices.find(c => c.name === choice)!.icon;
    return <Icon className={cn(size === 'lg' ? "w-24 h-24" : "w-16 h-16", "text-white text-glow-dynamic")} style={{ ['--glow-rgb' as any]: '14, 165, 233' }} />;
  }

  return (
    <Card className="glassmorphic border-white/10 w-full max-w-2xl text-center rounded-2xl">
      <CardHeader>
        <CardTitle className="text-3xl text-glow-dynamic text-white" style={{ ['--glow-rgb' as any]: '14, 165, 233' }}>Rock, Paper, Scissors</CardTitle>
        <div className="flex justify-around items-center pt-4 text-xl font-bold text-white/90">
            <span>Player: {scores.player}</span>
            <span>Computer: {scores.computer}</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8">
        {result ? (
            <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex items-center justify-around w-full">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">You</span>
                        <ChoiceIcon choice={playerChoice} size="lg"/>
                    </div>
                     <span className="text-4xl font-bold text-muted-foreground/30 select-none">VS</span>
                    <div className="flex flex-col items-center gap-2">
                         <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Computer</span>
                        <ChoiceIcon choice={computerChoice} size="lg"/>
                    </div>
                </div>
                <h2 className={cn(
                    "text-4xl font-extrabold text-glow-dynamic",
                    result === 'win' && 'text-green-400',
                    result === 'lose' && 'text-red-500',
                    result === 'draw' && 'text-white/60',
                )}
                style={{
                  ['--glow-rgb' as any]: result === 'win' ? '34, 197, 94' : result === 'lose' ? '239, 68, 68' : '255, 255, 255'
                }}
                >
                    {getResultText()}
                </h2>
                <Button onClick={resetRound} size="lg" className="bg-primary hover:bg-primary/85 text-white rounded-xl shadow-lg shadow-primary/20">Play Again</Button>
            </div>
        ) : (
             <div className="flex flex-col items-center gap-6">
                <h2 className="text-2xl font-semibold text-white/80">{getResultText()}</h2>
                <div className="flex justify-center gap-4 md:gap-8">
                    {choices.map(({ name, icon: Icon }) => (
                        <Button
                            key={name}
                            variant="outline"
                            className="bg-white/5 border-white/10 flex flex-col h-32 w-32 md:h-40 md:w-40 items-center justify-center gap-2 rounded-2xl shadow-md transition-all hover:scale-105 hover:border-sky-500/40 hover:bg-white/10 text-white"
                            onClick={() => handlePlayerChoice(name)}
                        >
                            <Icon className="w-16 h-16" />
                            <span className="text-lg font-semibold capitalize">{name}</span>
                        </Button>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
      <CardFooter className="justify-center pb-6">
        <Button onClick={resetGame} variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-xs h-9">
          <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
          Reset Game Score
        </Button>
      </CardFooter>
    </Card>
  );
}