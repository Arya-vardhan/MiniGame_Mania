"use client";

import { useState, useEffect, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getWouldYouRatherQuestionAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, Shuffle, BarChart2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

function NextQuestionButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Shuffle className="mr-2 h-5 w-5" />}
      New Question
    </Button>
  );
}

export default function WouldYouRatherGame() {
  const [initialState, setInitialState] = useState({ message: '', question: null, error: null });
  const [state, formAction] = useActionState(getWouldYouRatherQuestionAction, initialState);
  const [isPending, startTransition] = useTransition();

  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [stats, setStats] = useState({ A: 50, B: 50 });

  useEffect(() => {
    // Initially load a question
    startTransition(() => {
        const formData = new FormData();
        formAction(formData);
    });
  }, []);

  useEffect(() => {
    // Reset selection and generate new random stats when a new question is loaded
    setSelectedOption(null);
    const percentA = Math.floor(Math.random() * 81) + 10; // 10-90%
    setStats({ A: percentA, B: 100 - percentA });
  }, [state.question]);

  const handleOptionSelect = (option: 'A' | 'B') => {
    if (!selectedOption) {
      setSelectedOption(option);
    }
  };

  const renderOption = (option: 'A' | 'B') => {
    const text = option === 'A' ? state.question?.optionA : state.question?.optionB;
    const percentage = option === 'A' ? stats.A : stats.B;
    const isSelected = selectedOption === option;

    return (
      <button
        onClick={() => handleOptionSelect(option)}
        disabled={!!selectedOption}
        className={cn(
          "relative w-full p-4 rounded-lg text-lg text-center transition-all duration-300 ease-in-out border-2 overflow-hidden disabled:cursor-not-allowed",
          isSelected ? "border-primary shadow-lg shadow-primary/20" : "border-muted-foreground/30 hover:border-primary/50",
          option === 'A' ? "bg-blue-900/20" : "bg-purple-900/20"
        )}
      >
        <span className="relative z-10 font-semibold">{text}</span>
        {selectedOption && (
          <>
            <div
              className={cn(
                  "absolute top-0 left-0 h-full transition-all duration-500",
                  option === 'A' ? 'bg-blue-500/30' : 'bg-purple-500/30'
              )}
              style={{ width: `${percentage}%` }}
            />
            <div className="relative z-10 flex items-center justify-center mt-4">
                <BarChart2 className="w-5 h-5 mr-2" />
                <span className="text-2xl font-bold">{percentage}%</span>
            </div>
          </>
        )}
      </button>
    );
  };

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>...{state.question ? '' : 'Loading...'}</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[250px] flex flex-col items-center justify-center gap-4">
        {!state.question ? (
          <div className="w-full space-y-4">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-8 w-20 mx-auto" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <>
            {renderOption('A')}
            <span className="text-xl font-bold text-muted-foreground">OR</span>
            {renderOption('B')}
          </>
        )}
      </CardContent>
       <CardFooter className="flex-col gap-4">
          <form action={formAction}>
              <NextQuestionButton />
          </form>
          {state.error && <p className="text-sm font-medium text-destructive">{state.error._errors}</p>}
      </CardFooter>
    </Card>
  );
}