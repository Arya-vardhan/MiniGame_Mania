
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
  const [gameKey, setGameKey] = useState(0);
  return <DumbCharadesInner key={gameKey} onEndGame={() => setGameKey(k => k + 1)} />;
}

function DumbCharadesInner({ onEndGame }: { onEndGame: () => void }) {
  const [initialState, setInitialState] = useState<{message: string; charade: {word: string} | null; error: any}>({ message: '', charade: null, error: null });
  const [state, formAction, isGettingNextWord] = useActionState(getDumbCharadeAction, initialState);
  const [isPending, startTransition] = useTransition();


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
      const word = state.charade.word;
      setWordHistory(prev => [...prev, word]);
      setCurrentIndex(prev => prev + 1);
    }
  }, [state.charade, gameState, wordHistory]);


  const fetchNewWord = useCallback(() => {
    startTransition(() => {
      const formData = new FormData();
      formData.append('category', category);
      formAction(formData);
    });
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
    onEndGame();
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
      <Card className="glassmorphic border-white/10 w-full max-w-md rounded-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Setup Your Game</CardTitle>
          <CardDescription className="text-white/60">Choose a category to get started.</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent className="space-y-4">
            <Select name="category" value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="glassmorphic border-white/10 text-white">
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat} className="focus:bg-white/10 focus:text-white">{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.error?.category && <p className="text-sm font-medium text-destructive mt-2">{state.error.category[0]}</p>}
          </CardContent>
          <CardFooter className="flex-col gap-4 pb-6">
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    );
  }

  const currentWord = wordHistory[currentIndex];
  const isLoading = isGettingNextWord || isPending;

  return (
    <Card className="glassmorphic border-white/10 w-full max-w-md text-center rounded-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-glow-dynamic text-white" style={{ ['--glow-rgb' as any]: '14, 165, 233' }}>{category}</CardTitle>
        <CardDescription className="text-white/60">Time to act it out!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="p-8 bg-white/5 border border-white/5 rounded-xl min-h-[120px] flex items-center justify-center">
           {isLoading && currentIndex === wordHistory.length -1 ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
           ) : (
             <p className="text-3xl font-extrabold tracking-wider text-white text-glow-dynamic" style={{ ['--glow-rgb' as any]: '14, 165, 233' }}>{currentWord}</p>
           )}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-4 pb-6">
        <div className="flex justify-center items-center gap-4 w-full">
            <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10" onClick={handlePrev} disabled={currentIndex <= 0}>
                <ArrowLeft className="h-5 w-5 text-muted-foreground"/>
                <span className="sr-only">Previous</span>
            </Button>
            <Button className="bg-green-600 hover:bg-green-600/85 flex-grow rounded-xl text-white shadow-lg shadow-green-600/10" size="lg" onClick={handleNext} disabled={isLoading}>
                <Check className="mr-2"/> Correct / Next
            </Button>
             <Button variant="outline" size="icon" className="rounded-xl border-white/10 bg-white/5 hover:bg-white/10" onClick={handleNext} disabled={isLoading}>
                <ArrowRight className="h-5 w-5 text-muted-foreground"/>
                 <span className="sr-only">Next</span>
            </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full">
            <Button variant="secondary" size="lg" onClick={fetchNewWord} disabled={isLoading}>
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
