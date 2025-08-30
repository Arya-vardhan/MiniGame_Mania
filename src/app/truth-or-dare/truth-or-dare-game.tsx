"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { truths, dares } from '@/lib/constants';
import { Flame, CheckSquare } from 'lucide-react';

type GameMode = 'truth' | 'dare' | null;

export default function TruthOrDareGame() {
  const [mode, setMode] = useState<GameMode>(null);
  const [currentItem, setCurrentItem] = useState<string>('');

  const selectItem = (type: 'truth' | 'dare') => {
    setMode(type);
    const list = type === 'truth' ? truths : dares;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentItem(list[randomIndex]);
  };
  
  const reset = () => {
    setMode(null);
    setCurrentItem('');
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">
            {mode ? `A ${mode} for you...` : 'Choose wisely...'}
          </CardTitle>
          <CardDescription>
            {mode ? "Complete it and then it's the next player's turn!" : "Select Truth or Dare to get your challenge."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mode ? (
            <div className="flex flex-col items-center gap-6 p-8 min-h-[150px] justify-center bg-muted/50 rounded-lg">
                <p className="text-xl font-semibold text-primary">{currentItem}</p>
                <Button onClick={reset}>Next Player</Button>
            </div>
          ) : (
            <div className="flex justify-center gap-4 p-8">
              <Button size="lg" variant="outline" className="text-lg border-primary text-primary hover:bg-primary/10 hover:text-primary" onClick={() => selectItem('truth')}>
                <CheckSquare className="mr-2 h-5 w-5" />
                Truth
              </Button>
              <Button size="lg" className="text-lg bg-accent hover:bg-accent/90" onClick={() => selectItem('dare')}>
                <Flame className="mr-2 h-5 w-5" />
                Dare
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
