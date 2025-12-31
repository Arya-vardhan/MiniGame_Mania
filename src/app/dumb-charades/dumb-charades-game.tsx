"use client";

import { useState, useEffect, useCallback, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getDumbCharadeAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Play, Check, SkipForward, Home } from 'lucide-react';
import { dumbCharades } from '@/lib/constants';

const categories = Object.keys(dumbCharades);

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
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  
  useEffect(() => {
    // This effect starts the game once the first charade is fetched.
    if (state.charade && gameState === 'setup') {
      setGameState('playing');
    }
  }, [state.charade, gameState]);

  const handleNextWord = useCallback((wasGuessed: boolean) => {
    // In a real multi-team game, you'd track scores here.
    // For now, we just get a new word.
    startTransition(() => {
      const formData = new FormData();
      formData.append('category', category);
      formAction(formData);
    });
  }, [category, formAction]);

  const handleEndGame = () => {
    setGameState('setup');
    // Reset state for a new game
    setInitialState({ message: '', charade: null, error: null });
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState === 'playing' && event.key === 'Enter') {
        // Prevent default form submission if any
        event.preventDefault();
        // Treat Enter as skipping to the next word
        handleNextWord(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, handleNextWord]);

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
          <CardFooter className="flex-col gap-4">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    );
  }

  const isGettingNextWord = isPending && gameState === 'playing';

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-primary">{category}</CardTitle>
        <CardDescription>Time to act it out!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-8 bg-muted rounded-lg min-h-[120px] flex items-center justify-center">
           {isGettingNextWord ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
           ) : (
             <p className="text-3xl font-bold tracking-wider">{state.charade?.word}</p>
           )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="outline" size="lg" onClick={() => handleNextWord(false)} disabled={isGettingNextWord}>
                <SkipForward className="mr-2"/> Skip
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" size="lg" onClick={() => handleNextWord(true)} disabled={isGettingNextWord}>
                <Check className="mr-2"/> Correct
            </Button>
        </div>
        <Button onClick={handleEndGame} size="lg" variant="secondary" className="w-full">
            <Home className="mr-2 h-5 w-5"/>
            Back to Setup
        </Button>
      </CardFooter>
    </Card>
  );
}
