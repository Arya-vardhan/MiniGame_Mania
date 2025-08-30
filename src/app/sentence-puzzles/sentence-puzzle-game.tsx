"use client";

import { useEffect, useState, useMemo } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getPuzzleAction } from './actions';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useUser } from '@/hooks/use-user';
import { Lightbulb, Check, X, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Generate Puzzle
    </Button>
  );
}

export default function SentencePuzzleGame() {
  const { user, isLoaded } = useUser();
  const [initialState, setInitialState] = useState({ message: '', puzzle: null, error: null });
  const [state, formAction] = useFormState(getPuzzleAction, initialState);

  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  
  const [age, setAge] = useState('');

  useEffect(() => {
    if(isLoaded && user.age) {
        setAge(String(user.age));
    }
  }, [isLoaded, user.age]);

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
  
  const formattedPuzzle = useMemo(() => {
    if (!state.puzzle) return null;
    return state.puzzle.puzzleContent.replace(/\[_\]/g, '_____');
  }, [state.puzzle]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Get Your Puzzle</CardTitle>
        </CardHeader>
        <form action={formAction}>
          <CardContent>
            <Label htmlFor="age">Your Age</Label>
            {isLoaded ? (
                 <Input
                    id="age"
                    name="age"
                    type="number"
                    placeholder="E.g., 8"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
            ) : <Skeleton className="h-10 w-full" />}
            {state.error?.age && <p className="text-sm font-medium text-destructive mt-2">{state.error.age[0]}</p>}
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      {state.puzzle && (
        <Card>
          <CardHeader>
            <CardTitle>{state.puzzle.puzzleType}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-center font-medium tracking-widest">{formattedPuzzle}</p>
            <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
              <Input 
                type="text" 
                placeholder="Your answer" 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
              <Button onClick={checkAnswer}>Check</Button>
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
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="outline" onClick={() => setShowSolution(!showSolution)}>
              <Lightbulb className="mr-2 h-4 w-4" />
              {showSolution ? 'Hide' : 'Show'} Solution
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
