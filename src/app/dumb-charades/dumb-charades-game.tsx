
"use client";

import { useState, useEffect, useCallback, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getDumbCharadeAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Play, Check, SkipForward, Home, ArrowLeft, ArrowRight } from 'lucide-react';
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
  const [initialState, setInitialState] = useState<{message: string; charade: {word: string} | null; error: any}>({ message: '', charade: null, error: null });
  const [state, formAction, isGettingNextWord] = useActionState(getDumbCharadeAction, initialState);

  const [category, setCategory] = useState(categories[0]);
  const [gameState, setGameState] = useState<'setup' | 'playing'>('setup');
  const [wordHistory, setWordHistory] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  // Effect to handle the start of the game
  useEffect(() => {
    if (state.charade && gameState === 'setup') {
      setWordHistory([state.charade.word]);
      setCurrentIndex(0);
      setGameState('playing');
    }
  }, [state.charade, gameState]);

  // Effect to add newly fetched words to history
  useEffect(() => {
    if (state.charade && gameState === 'playing' && !wordHistory.includes(state.charade.word)) {
      setWordHistory(prev => [...prev, state.charade.word]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [state.charade, gameState, wordHistory]);


  const fetchNewWord = useCallback(() => {
    const formData = new FormData();
    formData.append('category', category);
    formAction(formData);
  }, [category, formAction]);

  const handleNext = useCallback(() => {
    if (currentIndex < wordHistory.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      fetchNewWord();
    }
  }, [currentIndex, wordHistory.length, fetchNewWord]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleEndGame = () => {
    setGameState('setup');
    setWordHistory([]);
    setCurrentIndex(-1);
    // Reset server action state for a new game
    setInitialState({ message: '', charade: null, error: null });
  }

  // Keyboard navigation effect
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          handleNext();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          handlePrev();
          break;
        case 'Enter':
          event.preventDefault();
          fetchNewWord(); // Always get a new word on Enter
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, handleNext, handlePrev, fetchNewWord]);

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

  const currentWord = wordHistory[currentIndex];

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <CardTitle className="text-primary">{category}</CardTitle>
        <CardDescription>Time to act it out!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-8 bg-muted rounded-lg min-h-[120px] flex items-center justify-center">
           {isGettingNextWord && currentIndex === wordHistory.length -1 ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
           ) : (
             <p className="text-3xl font-bold tracking-wider">{currentWord}</p>
           )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex justify-center items-center gap-4 w-full">
            <Button variant="outline" size="icon" onClick={handlePrev} disabled={currentIndex <= 0}>
                <ArrowLeft className="h-5 w-5"/>
                <span className="sr-only">Previous</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex-grow" size="lg" onClick={handleNext} disabled={isGettingNextWord}>
                <Check className="mr-2"/> Correct / Next
            </Button>
             <Button variant="outline" size="icon" onClick={handleNext} disabled={isGettingNextWord}>
                <ArrowRight className="h-5 w-5"/>
                 <span className="sr-only">Next</span>
            </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="secondary" size="lg" onClick={fetchNewWord} disabled={isGettingNextWord}>
                <SkipForward className="mr-2"/> New Word
            </Button>
            <Button onClick={handleEndGame} size="lg" variant="secondary">
                <Home className="mr-2 h-5 w-5"/>
                Back to Setup
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
