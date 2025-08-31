"use client";

import { useState, useEffect, useActionState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { getNeverHaveIEverQuestionAction } from './actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Loader2, RefreshCw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function NextQuestionButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg">
      {pending ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <RefreshCw className="mr-2 h-5 w-5" />}
      New Statement
    </Button>
  );
}

export default function NeverHaveIEverGame() {
  const [initialState, setInitialState] = useState({ message: '', question: null, error: null });
  const [state, formAction] = useActionState(getNeverHaveIEverQuestionAction, initialState);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // Initially load a question
    startTransition(() => {
        const formData = new FormData();
        formAction(formData);
    });
  }, []);

  return (
    <Card className="w-full max-w-2xl text-center">
      <CardHeader>
        <CardTitle>Never Have I Ever...</CardTitle>
        <CardDescription>Be honest! Have you done it?</CardDescription>
      </CardHeader>
      <CardContent className="min-h-[150px] flex flex-col items-center justify-center gap-4 p-8 bg-muted rounded-lg">
        {!state.question ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <p className="text-2xl font-bold tracking-tight text-primary">
            ...{state.question}
          </p>
        )}
      </CardContent>
       <CardFooter className="flex-col gap-4 pt-6">
          <form action={formAction}>
              <NextQuestionButton />
          </form>
          {state.error && <p className="text-sm font-medium text-destructive">{state.error._errors}</p>}
      </CardFooter>
    </Card>
  );
}
