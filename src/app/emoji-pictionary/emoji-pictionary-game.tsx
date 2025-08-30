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
  const [initialState, setInitialState] = useState({ message: '', puzzle: null, error: null });
  const [state, formAction] = useActionState(getEmojiPuzzleAction, initialState);
  const [isPending, startTransition] = useTransition();

  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
  useEffect(() => {
    // Initially load a puzzle
    startTransition(() => {
        const formData = new FormData(); // Actions expect FormData
        formAction(formData);
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Guess the Phrase</CardTitle>
          <CardDescription>What do these emojis represent?</CardDescription>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            {!state.puzzle ? (
              <div className="space-y-4">
                  <Skeleton className="h-12 w-3/4 mx-auto" />
                  <Skeleton className="h-10 w-full" />
              </div>
            ) : (
                <div className="space-y-4">
                    <div className="text-5xl text-center font-medium tracking-widest bg-muted p-6 rounded-lg">
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
                    />
                    <Button onClick={checkAnswer} type="button" disabled={showSolution}>Check</Button>
                    </div>
                    {isCorrect !== null && (
                    <Alert variant={isCorrect ? 'default' : 'destructive'} className={isCorrect ? "border-green-500 text-green-700" : ""}>
                        {isCorrect ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                        <AlertTitle>{isCorrect ? 'Correct!' : 'Not Quite!'}</AlertTitle>
                        <AlertDescription>
                        {isCorrect ? 'Great job, you solved it!' : 'Try again or reveal the solution.'}
                        </AlertDescription>
                    </Alert>
                    )}

                    {showSolution && (
                        <Alert variant="default" className="border-accent text-accent-foreground bg-accent/20">
                            <Lightbulb className="h-4 w-4 text-accent" />
                            <AlertTitle>Solution</AlertTitle>
                            <AlertDescription>
                                {state.puzzle.solution}
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <SubmitButton />
            {state.puzzle && (
                 <Button variant="outline" onClick={() => setShowSolution(!showSolution)} type="button">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    {showSolution ? 'Hide' : 'Show'} Solution
                </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
