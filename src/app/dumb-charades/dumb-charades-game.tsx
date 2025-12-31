"use client";

import { useState, useEffect, useCallback, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getDumbCharadeAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Play, Check, SkipForward, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { dumbCharades } from '@/lib/constants';

const categories = Object.keys(dumbCharades);
const ROUND_TIME = 60; // 60 seconds

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5" />}
      Start Game
    </Button>
  );
}

export default function DumbCharadesGame() {
  const [initialState, setInitialState] = useState({ message: '', charade: null, error: null });
  const [state, formAction] = useActionState(getDumbCharadeAction, initialState);
  const [isPending, startTransition] = useTransition();

  const [category, setCategory] = useState(categories[0]);
  const [gameState, setGameState] = useState<'setup' | 'playing' | 'end'>('setup');
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  
  useEffect(() => {
    // This effect starts the game once the first charade is fetched.
    if (state.charade && gameState === 'setup') {
      setGameState('playing');
      setTimeLeft(ROUND_TIME);
    }
  }, [state.charade, gameState]);

  useEffect(() => {
    if (gameState !== 'playing' || timeLeft <= 0) {
      if(timeLeft <= 0) {
        setGameState('end');
      }
      return;
    };

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);
  
  const handleNextWord = (wasGuessed: boolean) => {
    // In a real multi-team game, you'd track scores here.
    // For now, we just get a new word.
    startTransition(() => {
      const formData = new FormData();
      formData.append('category', category);
      formAction(formData);
    });
  }

  const handleEndGame = () => {
    setGameState('setup');
    // Reset state for a new game
    setInitialState({ message: '', charade: null, error: null });
  }
  
  const handlePlayAgain = () => {
    const formData = new FormData();
    formData.append('category', category);
    startTransition(() => {
        formAction(formData);
    });
    setGameState('playing');
    setTimeLeft(ROUND_TIME);
  }

  if (gameState === 'setup') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Setup Your Game</CardTitle>
          <CardDescription>Choose a category to get started.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <Select name="category" value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.error?.category && <p className="text-sm font-medium text-destructive mt-2">{state.error.category[0]}</p>}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    );
  }

  if (gameState === 'end') {
     return (
         <Card className="w-full max-w-md text-center">
            <CardHeader>
                <CardTitle>Time's Up!</CardTitle>
                <CardDescription>The round is over.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-lg">The word was: <span className="font-bold">{state.charade?.word}</span></p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button onClick={handlePlayAgain} size="lg">Play Another Round</Button>
                <Button onClick={handleEndGame} size="lg" variant="outline">Back to Setup</Button>
            </CardFooter>
        </Card>
     )
  }

  const isGettingNextWord = isPending && gameState === 'playing';

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-primary">{category}</CardTitle>
        <CardDescription>Time to act it out!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-center gap-2 font-mono text-2xl">
          <Clock className="h-6 w-6" />
          <span>{timeLeft}</span>
        </div>
        <Progress value={(timeLeft / ROUND_TIME) * 100} className="w-full" />

        <div className="p-8 bg-muted rounded-lg min-h-[120px] flex items-center justify-center">
           {isGettingNextWord ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
           ) : (
             <p className="text-3xl font-bold tracking-wider">{state.charade?.word}</p>
           )}
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-4">
        <Button variant="outline" size="lg" onClick={() => handleNextWord(false)} disabled={isGettingNextWord}>
            <SkipForward className="mr-2"/> Skip
        </Button>
        <Button className="bg-green-600 hover:bg-green-700" size="lg" onClick={() => handleNextWord(true)} disabled={isGettingNextWord}>
            <Check className="mr-2"/> Correct
        </Button>
      </CardFooter>
    </Card>
  );
}
