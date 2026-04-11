"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { truths, dares } from '@/lib/constants';
import { Flame, CheckSquare, UserPlus, Trash2, RotateCcw, Play, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type GameStage = 'add_players' | 'spin' | 'choose_source' | 'system_choice' | 'result' | 'manual_play';
type QuestionType = 'truth' | 'dare' | null;

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
            ctx.fillText(players[i].substring(0, 8), radius * 0.6, 0);
            ctx.restore();
        }
        ctx.restore();
        
        // Draw pointer
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(centerX + radius + 5, centerY);
        ctx.lineTo(centerX + radius + 20, centerY - 15);
        ctx.lineTo(centerX + radius + 20, centerY + 15);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.stroke();

    }, [spin, segments, players, arc]);

    useEffect(() => {
        draw();
    }, [draw]);
    
    const startSpin = () => {
        if(isSpinning) return;
        setIsSpinning(true);
        const randomRotations = Math.random() * 10 + 5; 
        const duration = 4000; 
        let start = 0;
        
        const animate = (time: number) => {
            if (!start) start = time;
            const progress = time - start;
            const easeOut = 1 - Math.pow(1 - progress / duration, 4);
            const currentSpin = easeOut * randomRotations * 2 * Math.PI;
            setSpin(currentSpin);

            if(progress < duration) {
                requestAnimationFrame(animate);
            } else {
                const finalAngle = currentSpin % (2 * Math.PI);
                // Winning segment is pointed to by the 3 o'clock position (angle 0)
                // but since we rotate clockwise, we calculate backwards
                const winningSegment = Math.floor(segments - (finalAngle / arc)) % segments;
                onFinished(players[winningSegment]);
                setIsSpinning(false);
            }
        };
        requestAnimationFrame(animate);
    }

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="relative p-4 rounded-full bg-card border-4 border-primary/20 shadow-xl">
                <canvas ref={canvasRef} width="320" height="320" className="rounded-full shadow-inner" />
            </div>
            <Button size="lg" className="w-full max-w-xs text-xl h-14" onClick={startSpin} disabled={isSpinning || players.length < 2}>
                 {isSpinning ? 'Spinning...' : 'SPIN THE WHEEL'}
            </Button>
        </div>
    )
}

export default function TruthOrDareGame() {
  const [stage, setStage] = useState<GameStage>('add_players');
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [mode, setMode] = useState<QuestionType>(null);
  const [currentItem, setCurrentItem] = useState<string>('');

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
      setStage('choose_source');
  }

  const selectSource = (source: 'system' | 'manual') => {
      if (source === 'system') {
          setStage('system_choice');
      } else {
          setStage('manual_play');
      }
  }

  const selectChoice = (type: 'truth' | 'dare') => {
    setMode(type);
    const list = type === 'truth' ? truths : dares;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentItem(list[randomIndex]);
    setStage('result');
  };
  
  const backToWheel = () => {
    setMode(null);
    setCurrentItem('');
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
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-2xl overflow-hidden">
        {stage === 'add_players' && (
            <>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Setup Players</CardTitle>
                <CardDescription>Add at least 2 friends to start the game.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-2">
                    <div className="flex-1 space-y-1">
                        <Label htmlFor="new-player" className="sr-only">Player Name</Label>
                        <Input 
                            id="new-player" 
                            placeholder="Type a name..." 
                            value={newPlayerName} 
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addPlayer()}
                        />
                    </div>
                    <Button onClick={addPlayer} variant="secondary">
                        <UserPlus className="mr-2 h-4 w-4"/> Add
                    </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {players.map(player => (
                        <div key={player} className="flex items-center justify-between bg-muted/40 px-3 py-2 rounded-lg border">
                            <span className="truncate font-medium">{player}</span>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removePlayer(player)}>
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        </div>
                    ))}
                    {players.length === 0 && (
                        <div className="col-span-full py-8 text-center text-muted-foreground italic">
                            No players added yet.
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
                <Button className="w-full" size="lg" onClick={() => setStage('spin')} disabled={players.length < 2}>
                    <Play className="mr-2 h-5 w-5"/> Start Game
                </Button>
            </CardFooter>
            </>
        )}

        {stage === 'spin' && (
             <>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl flex items-center justify-center gap-2">
                    Spin the Bottle!
                </CardTitle>
                <CardDescription>Who's going to be the lucky one?</CardDescription>
            </CardHeader>
            <CardContent className="py-10">
                <SpinWheel players={players} onFinished={handleSpinFinish} />
            </CardContent>
            <CardFooter className="justify-center gap-4">
                 <Button variant="outline" onClick={() => setStage('add_players')}>Edit Players</Button>
                 <Button variant="ghost" onClick={resetGame} className="text-muted-foreground">Reset All</Button>
            </CardFooter>
            </>
        )}
        
        {stage === 'choose_source' && (
            <>
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <UserCircle className="w-20 h-20 text-primary" />
                </div>
                <CardTitle className="text-4xl text-primary">{selectedPlayer}</CardTitle>
                <CardDescription className="text-lg">It's your turn! How do you want to play?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 py-6">
                <Button size="lg" className="h-20 text-xl font-bold" onClick={() => selectSource('system')}>
                    Use System Questions
                </Button>
                <Button size="lg" variant="outline" className="h-20 text-xl font-bold border-2" onClick={() => selectSource('manual')}>
                    We have our own question
                </Button>
            </CardContent>
            <CardFooter className="justify-center">
                <Button variant="ghost" onClick={backToWheel}>
                    <RotateCcw className="mr-2 h-4 w-4"/> Respin
                </Button>
            </CardFooter>
            </>
        )}

        {stage === 'system_choice' && (
            <>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">System Question</CardTitle>
                <CardDescription>{selectedPlayer}, pick your poison...</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-6 py-10">
                <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-32 text-2xl flex flex-col gap-2 border-primary/50 text-primary hover:bg-primary/5" 
                    onClick={() => selectChoice('truth')}
                >
                    <CheckSquare className="h-8 w-8" />
                    Truth
                </Button>
                <Button 
                    size="lg" 
                    className="h-32 text-2xl flex flex-col gap-2 bg-accent hover:bg-accent/90" 
                    onClick={() => selectChoice('dare')}
                >
                    <Flame className="h-8 w-8" />
                    Dare
                </Button>
            </CardContent>
            <CardFooter className="justify-center">
                <Button variant="ghost" onClick={backToWheel}>Back to Wheel</Button>
            </CardFooter>
            </>
        )}

        {stage === 'result' && (
            <>
            <CardHeader className="text-center">
                <CardTitle className="text-2xl capitalize text-primary">{mode} for {selectedPlayer}</CardTitle>
            </CardHeader>
            <CardContent className="py-10">
                <div className="bg-muted/50 p-8 rounded-2xl text-center border shadow-inner min-h-[160px] flex items-center justify-center">
                    <p className="text-2xl font-medium italic leading-relaxed">
                        "{currentItem}"
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button className="w-full" size="lg" onClick={backToWheel}>
                    Done! Next Player
                </Button>
                <Button variant="ghost" onClick={() => setStage('system_choice')}>
                    New Question (Same Player)
                </Button>
            </CardFooter>
            </>
        )}

        {stage === 'manual_play' && (
            <>
            <CardHeader className="text-center">
                <CardTitle className="text-3xl">Custom Question</CardTitle>
                <CardDescription>The group asks {selectedPlayer} a question!</CardDescription>
            </CardHeader>
            <CardContent className="py-20 text-center space-y-4">
                <p className="text-xl font-medium">Wait for the group to decide your fate...</p>
                <p className="text-muted-foreground italic text-sm">Once the task is finished, click below to move on.</p>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button className="w-full" size="lg" onClick={backToWheel}>
                    Done! Next Player
                </Button>
                <Button variant="ghost" onClick={() => setStage('choose_source')}>
                    Change Mind (Use System)
                </Button>
            </CardFooter>
            </>
        )}

      </Card>
    </div>
  );
}
