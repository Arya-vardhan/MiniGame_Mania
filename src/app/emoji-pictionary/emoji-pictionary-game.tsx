"use client";

import { useEffect, useState, useMemo, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getEmojiPuzzleAction } from './actions';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Check, X, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      New Puzzle
    </Button>
  );
}

export default function EmojiPictionaryGame() {
  const [initialState, setInitialState] = useState<{
    message: string;
    puzzle: { emojis: string; solution: string } | null;
    error: any;
  }>({ message: '', puzzle: null, error: null });
  const [state, formAction] = useActionState(getEmojiPuzzleAction, initialState);
  const [isPending, startTransition] = useTransition();

  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
  useEffect(() => {
    // Initially load a puzzle
    startTransition(() => {
        formAction();
    });
  }, []);

  useEffect(() => {
    setUserAnswer('');
    setIsCorrect(null);
    setShowSolution(false);
  }, [state.puzzle]);

  const checkAnswer = () => {
    if (!state.puzzle) return;
    const correct = userAnswer.trim().toLowerCase() === state.puzzle.solution.trim().toLowerCase();
    setIsCorrect(correct);
  };

  return (
    <div className="space-y-6">
      <Card className="glassmorphic border-white/10 w-full max-w-md rounded-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-white">Guess the Phrase</CardTitle>
          <CardDescription className="text-white/60">What do these emojis represent?</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            {!state.puzzle ? (
              <div className="space-y-4">
                  <Skeleton className="h-12 w-3/4 mx-auto bg-white/5 rounded-xl" />
                  <Skeleton className="h-10 w-full bg-white/5 rounded-xl" />
              </div>
            ) : (
                <div className="space-y-4">
                    <div className="text-5xl text-center font-medium tracking-widest bg-white/5 border border-white/5 p-6 rounded-xl text-glow-dynamic"
                      style={{ ['--glow-rgb' as any]: '14, 165, 233' }}
                    >
                        {state.puzzle.emojis}
                    </div>
                    <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
                    <Input 
                        type="text" 
                        placeholder="Your answer" 
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={showSolution}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); checkAnswer(); }}}
                        className="bg-white/5 border-white/10 text-white rounded-xl focus-visible:ring-primary/50 placeholder:text-muted-foreground/50 h-9"
                    />
                    <Button onClick={checkAnswer} type="button" disabled={showSolution} className="bg-primary hover:bg-primary/85 text-white rounded-xl h-9">Check</Button>
                    </div>
                    {isCorrect !== null && (
                    <Alert variant={isCorrect ? 'default' : 'destructive'} className={isCorrect ? "border-green-500/30 bg-green-500/10 text-green-400 rounded-xl" : "border-red-500/30 bg-red-500/10 text-red-400 rounded-xl"}>
                        {isCorrect ? <Check className="h-4 w-4 text-green-400" /> : <X className="h-4 w-4 text-red-400" />}
                        <AlertTitle>{isCorrect ? 'Correct!' : 'Not Quite!'}</AlertTitle>
                        <AlertDescription className="opacity-90">
                        {isCorrect ? 'Great job, you solved it!' : 'Try again or reveal the solution.'}
                        </AlertDescription>
                    </Alert>
                    )}

                    {showSolution && (
                        <Alert variant="default" className="border-white/10 bg-white/5 text-white/95 rounded-xl">
                            <Lightbulb className="h-4 w-4 text-primary" />
                            <AlertTitle>Solution</AlertTitle>
                            <AlertDescription className="font-semibold text-primary">
                                {state.puzzle.solution}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2 pb-6">
            <SubmitButton />
            {state.puzzle && (
                 <Button variant="outline" onClick={() => setShowSolution(!showSolution)} type="button" className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl w-full">
                    <Lightbulb className="mr-2 h-4 w-4 text-muted-foreground" />
                    {showSolution ? 'Hide' : 'Show'} Solution
                </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
