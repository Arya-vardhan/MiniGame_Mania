"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type Player = 'X' | 'O';
type SquareValue = Player | null;

function calculateWinner(squares: SquareValue[]): SquareValue | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Square = ({ value, onClick, isWinnerSquare }: { value: SquareValue; onClick: () => void; isWinnerSquare: boolean }) => (
  <button
    className={cn(
        "flex items-center justify-center text-5xl font-bold border border-border aspect-square transition-colors",
        isWinnerSquare ? 'bg-primary/20' : 'bg-card hover:bg-accent/20',
        value === 'X' ? 'text-primary' : 'text-accent'
    )}
    onClick={onClick}
  >
    {value}
  </button>
);


export default function TicTacToeGame() {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<SquareValue | null>(null);

  useEffect(() => {
    const newWinner = calculateWinner(board);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!board.includes(null)) {
        setWinner('draw' as any); // A bit of a hack for draw state
    }
  }, [board]);

  const handleClick = (i: number) => {
    if (winner || board[i]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[i] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };
  
  const getStatus = () => {
    if (winner) {
        if(winner === 'draw' as any) return "It's a Draw!";
        return `Winner: ${winner}!`;
    }
    return `Next player: ${currentPlayer}`;
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-semibold">{getStatus()}</h2>
      <Card className="p-2">
        <CardContent className="p-0">
           <div className="grid grid-cols-3 grid-rows-3 gap-2 w-64 h-64 sm:w-80 sm:h-80">
            {board.map((square, i) => (
              <Square
                key={i}
                value={square}
                onClick={() => handleClick(i)}
                isWinnerSquare={false} // Would need more logic to highlight winning squares
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Button onClick={resetGame}>
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset Game
      </Button>
    </div>
  );
}
