"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { truths, dares } from '@/lib/constants';
import { Flame, CheckSquare, UserPlus, Trash2, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameMode = 'truth' | 'dare' | null;

const colors = ["#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0", "#E91E63", "#00BCD4", "#FF9800"];

const SpinWheel = ({ players, onFinished }: { players: string[], onFinished: (winner: string) => void }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spin, setSpin] = useState(0);

    const segments = players.length;
    const arc = 2 * Math.PI / segments;

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height } = canvas;
        const radius = width / 2 - 10;
        const centerX = width / 2;
        const centerY = height / 2;

        ctx.clearRect(0, 0, width, height);
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(spin);

        for (let i = 0; i < segments; i++) {
            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, radius, i * arc, (i + 1) * arc);
            ctx.lineTo(0, 0);
            ctx.fill();

            // Draw text
            ctx.save();
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.rotate(i * arc + arc / 2);
            ctx.fillText(players[i], radius * 0.6, 0);
            ctx.restore();
        }
        ctx.restore();
        
        // Draw pointer
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(centerX + radius + 5, centerY);
        ctx.lineTo(centerX + radius + 20, centerY - 10);
        ctx.lineTo(centerX + radius + 20, centerY + 10);
        ctx.fill();

    }, [spin, segments, players, arc]);

    useEffect(() => {
        draw();
    }, [draw]);
    
    const startSpin = () => {
        if(isSpinning) return;
        setIsSpinning(true);
        const randomSpin = Math.random() * 10 + 5; // rotations
        const duration = 5000; // ms
        let start = 0;
        
        const animate = (time: number) => {
            if (!start) start = time;
            const progress = time - start;
            const easeOut = 1 - Math.pow(1 - progress / duration, 4);
            const currentSpin = easeOut * randomSpin * 2 * Math.PI;
            setSpin(currentSpin);

            if(progress < duration) {
                requestAnimationFrame(animate);
            } else {
                const finalAngle = currentSpin % (2 * Math.PI);
                const winningSegment = Math.floor(segments - finalAngle / arc) % segments;
                onFinished(players[winningSegment]);
                setIsSpinning(false);
            }
        };
        requestAnimationFrame(animate);
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <canvas ref={canvasRef} width="300" height="300" />
            <Button onClick={startSpin} disabled={isSpinning || players.length < 2}>
                 {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
            </Button>
        </div>
    )
}


export default function TruthOrDareGame() {
  const [mode, setMode] = useState<GameMode>(null);
  const [currentItem, setCurrentItem] = useState<string>('');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [stage, setStage] = useState<'add_players' | 'spin' | 'play' | 'result'>('add_players');
  

  const addPlayer = () => {
    if (newPlayerName.trim() && !players.includes(newPlayerName.trim())) {
      setPlayers([...players, newPlayerName.trim()]);
      setNewPlayerName('');
    }
  };

  const removePlayer = (name: string) => {
      setPlayers(players.filter(p => p !== name));
  }
  
  const handleSpinFinish = (winner: string) => {
      setSelectedPlayer(winner);
      setStage('play');
  }

  const selectChoice = (type: 'truth' | 'dare') => {
    setMode(type);
    const list = type === 'truth' ? truths : dares;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentItem(list[randomIndex]);
    setStage('result');
  };
  
  const nextPlayer = () => {
    setMode(null);
    setCurrentItem('');
    setSelectedPlayer(null);
    setStage('spin');
  };
  
  const resetGame = () => {
    setPlayers([]);
    setNewPlayerName('');
    setMode(null);
    setCurrentItem('');
    setSelectedPlayer(null);
    setStage('add_players');
  }

  return (
    <div className="flex items-start justify-center">
      <Card className="w-full max-w-lg text-center">
        {stage === 'add_players' && (
            <>
            <CardHeader>
                <CardTitle>Add Players</CardTitle>
                <CardDescription>Enter the names of the players for the spin wheel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Input 
                        id="new-player" 
                        placeholder="Player Name" 
                        value={newPlayerName} 
                        onChange={(e) => setNewPlayerName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                    />
                    <Button onClick={addPlayer}><UserPlus className="mr-2"/> Add</Button>
                </div>
                <div className="space-y-2">
                    {players.map(player => (
                        <div key={player} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                            <span className="font-medium">{player}</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removePlayer(player)}>
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button onClick={() => setStage('spin')} disabled={players.length < 2}>
                    Done Adding Players
                </Button>
                <Button variant="link" onClick={resetGame}>Start Over</Button>
            </CardFooter>
            </>
        )}

        {stage === 'spin' && (
             <>
            <CardHeader>
                <CardTitle>Spin the Wheel!</CardTitle>
                <CardDescription>Time to see who's next.</CardDescription>
            </CardHeader>
            <CardContent>
                <SpinWheel players={players} onFinished={handleSpinFinish} />
            </CardContent>
            <CardFooter>
                 <Button variant="outline" onClick={() => setStage('add_players')}>Back to Edit Players</Button>
            </CardFooter>
            </>
        )}
        
        {(stage === 'play' || stage === 'result') && (
            <>
            <CardHeader>
                <CardTitle>
                    {stage === 'result' ? `A ${mode} for ${selectedPlayer}` : `${selectedPlayer}, choose wisely...`}
                </CardTitle>
                <CardDescription>
                     {stage === 'result' ? "Complete it and then it's time for the next player!" : "Select Truth or Dare to get your challenge."}
                </CardDescription>
            </CardHeader>
            <CardContent>
            {stage === 'result' ? (
                <div className="flex flex-col items-center gap-6 p-8 min-h-[150px] justify-center bg-muted/50 rounded-lg">
                    <p className="text-xl font-semibold text-primary">{currentItem}</p>
                    <Button onClick={nextPlayer}>Next Player</Button>
                </div>
            ) : (
                <div className="flex justify-center gap-4 p-8">
                <Button size="lg" variant="outline" className="text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => selectChoice('truth')}>
                    <CheckSquare className="mr-2 h-5 w-5" />
                    Truth
                </Button>
                <Button size="lg" className="text-lg bg-accent hover:bg-accent/90" onClick={() => selectChoice('dare')}>
                    <Flame className="mr-2 h-5 w-5" />
                    Dare
                </Button>
                </div>
            )}
            </CardContent>
            <CardFooter>
                <Button onClick={resetGame} variant="ghost">
                    <RotateCcw className="mr-2" /> Reset Game
                </Button>
            </CardFooter>
            </>
        )}

      </Card>
    </div>
  );
}
