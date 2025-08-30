"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type PlayerColor = 'green' | 'yellow' | 'blue' | 'red';
type Player = {
  color: PlayerColor;
  pieces: number[]; // -1 for home, 0-51 for board path, 52-56 for final path, 57 for finished
};

const playerColors: Record<PlayerColor, string> = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
};

const playerTextColors: Record<PlayerColor, string> = {
    green: 'text-green-700',
    yellow: 'text-yellow-700',
    blue: 'text-blue-700',
    red: 'text-red-700',
}

const playerStartPositions: Record<PlayerColor, number> = {
  green: 1,
  yellow: 14,
  blue: 27,
  red: 40,
};

// Simplified path for one quadrant, to be rotated
const boardPathLayout = [
    { row: 6, col: 2 }, { row: 6, col: 3 }, { row: 6, col: 4 }, { row: 6, col: 5 }, { row: 6, col: 6 },
    { row: 5, col: 7 }, { row: 4, col: 7 }, { row: 3, col: 7 }, { row: 2, col: 7 }, { row: 1, col: 7 },
    { row: 1, col: 8 }, { row: 1, col: 9 },
    // up to yellow start
];

// This is a simplified representation. A full ludo board is complex.
const getPositionOnBoard = (index: number) => {
    if (index > 51) return null; // Simplified, not handling final path

    const positions = [
        // Bottom path (green)
        {r: 10, c: 7}, {r: 9, c: 7}, {r: 8, c: 7}, {r: 7, c: 7}, {r: 6, c: 7},
        {r: 5, c: 8}, {r: 5, c: 9}, {r: 5, c: 10}, {r: 5, c: 11},
        {r: 4, c: 11}, {r: 3, c: 11}, {r: 2, c: 11}, {r: 1, c: 11},
        // Right path (yellow)
        {r: 1, c: 10}, {r: 1, c: 9}, {r: 1, c: 8}, {r: 1, c: 7}, {r: 1, c: 6},
        {r: 2, c: 5}, {r: 3, c: 5}, {r: 4, c: 5}, {r: 5, c: 5},
        {r: 6, c: 4}, {r: 6, c: 3}, {r: 6, c: 2}, {r: 6, c: 1},
        // Top path (blue)
        {r: 7, c: 1}, {r: 8, c: 1}, {r: 9, c: 1}, {r: 10, c: 1}, {r: 11, c: 1},
        {r: 11, c: 2}, {r: 11, c: 3}, {r: 11, c: 4}, {r: 11, c: 5},
        {r: 10, c: 6}, {r: 9, c: 6}, {r: 8, c: 6}, {r: 7, c: 6},
         // Left path (red)
        {r: 11, c: 7}, {r: 11, c: 8}, {r: 11, c: 9}, {r: 11, c: 10}, {r: 11, c: 11},
        {r: 10, c: 11}, {r: 9, c: 11}, {r: 8, c: 11}, {r: 7, c: 11},
    ];
    // This is a dummy implementation
    const flatPath = [
        {r: 10, c: 7}, {r: 9, c: 7}, {r: 8, c: 7}, {r: 7, c: 7}, {r: 6, c: 7}, {r: 5, c: 8}, {r: 5, c: 9}, {r: 5, c: 10}, {r: 5, c: 11}, {r: 4, c: 11}, {r: 3, c: 11}, {r: 2, c: 11}, {r: 1, c: 11},
        {r: 1, c: 10}, {r: 1, c: 9}, {r: 1, c: 8}, {r: 1, c: 7}, {r: 1, c: 6}, {r: 2, c: 5}, {r: 3, c: 5}, {r: 4, c: 5}, {r: 5, c: 5}, {r: 6, c: 4}, {r: 6, c: 3}, {r: 6, c: 2}, {r: 6, c: 1},
        {r: 7, c: 1}, {r: 8, c: 1}, {r: 9, c: 1}, {r: 10, c: 1}, {r: 11, c: 1}, {r: 11, c: 2}, {r: 11, c: 3}, {r: 11, c: 4}, {r: 11, c: 5}, {r: 10, c: 6}, {r: 9, c: 6}, {r: 8, c: 6}, {r: 7, c: 6},
        {r: 7, c: 2}, {r: 7, c: 3}, {r: 7, c: 4}, {r: 7, c: 5}, {r: 7, c: 6},
        {r: 2, c: 7}, {r: 3, c: 7}, {r: 4, c: 7}, {r: 5, c: 7}, {r: 6, c: 7},
        {r: 9, c: 2}, {r: 9, c: 3}, {r: 9, c: 4}, {r: 9, c: 5}, {r: 9, c: 6},
        {r: 2, c: 9}, {r: 3, c: 9}, {r: 4, c: 9}, {r: 5, c: 9}, {r: 6, c: 9},
    ];

    const pos = [
        {c:6,r:1},{c:6,r:2},{c:6,r:3},{c:6,r:4},{c:6,r:5},
        {c:5,r:6},{c:4,r:6},{c:3,r:6},{c:2,r:6},{c:1,r:6},
        {c:0,r:6},{c:0,r:7},
        {c:1,r:7},{c:2,r:7},{c:3,r:7},{c:4,r:7},{c:5,r:7},
        {c:6,r:8},{c:6,r:9},{c:6,r:10},{c:6,r:11},{c:6,r:12},
        {c:6,r:13},{c:7,r:13},
        {c:7,r:12},{c:7,r:11},{c:7,r:10},{c:7,r:9},{c:7,r:8},
        {c:8,r:7},{c:9,r:7},{c:10,r:7},{c:11,r:7},{c:12,r:7},
        {c:13,r:7},{c:13,r:6},
        {c:12,r:6},{c:11,r:6},{c:10,r:6},{c:9,r:6},{c:8,r:6},
        {c:7,r:5},{c:7,r:4},{c:7,r:3},{c:7,r:2},{c:7,r:1},
        {c:7,r:0},{c:6,r:0},
    ];
    return pos[index] || {c: 1, r: 1};
};


const LudoBoard = ({ players, onPieceClick }: { players: Player[]; onPieceClick: (color: PlayerColor, pieceIndex: number) => void }) => {
    return (
        <div className="relative aspect-square w-full max-w-lg mx-auto bg-card border-8 border-gray-400 shadow-lg p-2 grid grid-cols-15 grid-rows-15">
            {/* Player Bases */}
            <div className="col-span-6 row-span-6 bg-green-200 flex items-center justify-center rounded-lg"><div className="w-4/5 h-4/5 bg-green-300 grid grid-cols-2 grid-rows-2 gap-2 p-2">{players[0].pieces.filter(p => p === -1).map((_,i) => <div key={i} className="rounded-full bg-green-600 shadow-md cursor-pointer" onClick={() => onPieceClick('green', players[0].pieces.findIndex(p => p === -1))}></div>)}</div></div>
            <div className="col-span-6 row-span-6 col-start-10 bg-yellow-200 flex items-center justify-center rounded-lg"><div className="w-4/5 h-4/5 bg-yellow-300 grid grid-cols-2 grid-rows-2 gap-2 p-2">{players[1].pieces.filter(p => p === -1).map((_,i) => <div key={i} className="rounded-full bg-yellow-600 shadow-md cursor-pointer" onClick={() => onPieceClick('yellow', players[1].pieces.findIndex(p => p === -1))}></div>)}</div></div>
            <div className="col-span-6 row-span-6 row-start-10 bg-blue-200 flex items-center justify-center rounded-lg"><div className="w-4/5 h-4/5 bg-blue-300 grid grid-cols-2 grid-rows-2 gap-2 p-2">{players[2].pieces.filter(p => p === -1).map((_,i) => <div key={i} className="rounded-full bg-blue-600 shadow-md cursor-pointer" onClick={() => onPieceClick('blue', players[2].pieces.findIndex(p => p === -1))}></div>)}</div></div>
            <div className="col-span-6 row-span-6 col-start-10 row-start-10 bg-red-200 flex items-center justify-center rounded-lg"><div className="w-4/5 h-4/5 bg-red-300 grid grid-cols-2 grid-rows-2 gap-2 p-2">{players[3].pieces.filter(p => p === -1).map((_,i) => <div key={i} className="rounded-full bg-red-600 shadow-md cursor-pointer" onClick={() => onPieceClick('red', players[3].pieces.findIndex(p => p === -1))}></div>)}</div></div>

            {/* Center Home */}
            <div className="col-span-3 row-span-3 col-start-7 row-start-7 bg-card flex items-center justify-center">
                 <div className="w-full h-full">
                    <div className="w-0 h-0 border-solid border-t-transparent border-b-transparent border-r-[40px] border-r-yellow-500 border-t-[40px] border-b-[40px] absolute top-1/2 left-1/2 transform -translate-x-full -translate-y-1/2 rotate-45" style={{borderRightColor: 'hsl(var(--primary))'}}></div>
                    <div className="w-0 h-0 border-solid border-t-transparent border-b-transparent border-l-[40px] border-l-blue-500 border-t-[40px] border-b-[40px] absolute top-1/2 left-1/2 transform -translate-y-1/2 -rotate-45" style={{borderLeftColor: 'hsl(var(--accent))'}}></div>
                 </div>
            </div>

            {/* Paths */}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-7 row-start-${i+1} bg-gray-200 border-gray-300 border`}></div>)}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-8 row-start-${i+1} bg-gray-200 border-gray-300 border`}></div>)}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-9 row-start-${i+1} bg-gray-200 border-gray-300 border`}></div>)}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-${i+1} row-start-7 bg-gray-200 border-gray-300 border`}></div>)}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-${i+1} row-start-8 bg-gray-200 border-gray-300 border`}></div>)}
            {Array.from({length: 15}).map((_, i) => <div key={i} className={`col-start-${i+1} row-start-9 bg-gray-200 border-gray-300 border`}></div>)}
            
            {/* Player home paths */}
            {Array.from({length: 6}).map((_, i) => <div key={i} className={`col-start-8 row-start-${2+i} bg-green-300`}></div>)}
            <div className="col-start-2 row-start-8 bg-green-500 rounded-sm"></div>

            {Array.from({length: 6}).map((_, i) => <div key={i} className={`col-start-${9+i} row-start-8 bg-yellow-300`}></div>)}
            <div className="col-start-8 row-start-2 bg-yellow-500 rounded-sm"></div>

            {Array.from({length: 6}).map((_, i) => <div key={i} className={`col-start-8 row-start-${9+i} bg-blue-300`}></div>)}
            <div className="col-start-14 row-start-8 bg-blue-500 rounded-sm"></div>

            {Array.from({length: 6}).map((_, i) => <div key={i} className={`col-start-${2+i} row-start-8 bg-red-300`}></div>)}
            <div className="col-start-8 row-start-14 bg-red-500 rounded-sm"></div>


             {/* Pieces on board */}
            {players.map((player) => 
                player.pieces.map((pos, pIndex) => {
                    if (pos === -1 || pos > 51) return null;
                    const {c, r} = getPositionOnBoard((pos + playerStartPositions[player.color]) % 52);
                    return <div key={`${player.color}-${pIndex}`} className={`absolute rounded-full w-[calc(100%/15-2px)] h-[calc(100%/15-2px)] ${playerColors[player.color]} shadow-md border-2 border-white`} style={{ top: `calc(${r/15*100}%)`, left: `calc(${c/15*100}%)` }} onClick={() => onPieceClick(player.color, pIndex)}></div>
                })
            )}

        </div>
    );
};


export default function LudoGame() {
    const initialPlayers: Player[] = [
        { color: 'green', pieces: [-1, -1, -1, -1] },
        { color: 'yellow', pieces: [-1, -1, -1, -1] },
        { color: 'blue', pieces: [-1, -1, -1, -1] },
        { color: 'red', pieces: [-1, -1, -1, -1] },
    ];
    const [players, setPlayers] = useState<Player[]>(initialPlayers);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [diceValue, setDiceValue] = useState<number | null>(null);
    const [message, setMessage] = useState("Player 1 (Green) to start!");

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(roll);

        const currentPlayer = players[currentPlayerIndex];
        const canMove = currentPlayer.pieces.some(p => p !== -1 && p < 57) || (roll === 6 && currentPlayer.pieces.some(p => p === -1));

        if(roll !== 6 && !currentPlayer.pieces.some(p => p > -1)) {
            setMessage(`Player ${currentPlayerIndex + 1} rolled a ${roll} and has no pieces out. Next player's turn.`);
            setTimeout(() => {
                nextTurn();
            }, 1500);
            return;
        }

        setMessage(`Player ${currentPlayerIndex + 1} (${currentPlayer.color}) rolled a ${roll}. Select a piece to move.`);
        
    };

    const movePiece = (color: PlayerColor, pieceIndex: number) => {
        if (players[currentPlayerIndex].color !== color || !diceValue) {
            setMessage("It's not your turn or you haven't rolled the dice!");
            return;
        }

        let newPlayers = [...players];
        let player = { ...newPlayers.find(p => p.color === color)! };
        let piecePos = player.pieces[pieceIndex];

        if (piecePos === -1) {
            if (diceValue === 6) {
                player.pieces[pieceIndex] = 0; // Move to start
                setMessage('Piece is out! Roll again.');
            } else {
                setMessage('You need a 6 to get a piece out.');
                return;
            }
        } else {
             player.pieces[pieceIndex] += diceValue;
             if (player.pieces[pieceIndex] > 57) {
                 // Overshot, invalid move for this piece
                 setMessage('Cannot move this piece, select another.');
                 return;
             }
        }
        
        newPlayers = newPlayers.map(p => p.color === color ? player : p);
        setPlayers(newPlayers);

        if (diceValue !== 6) {
            nextTurn();
        } else {
            setDiceValue(null);
            setMessage('Rolled a 6! Roll again.');
        }

    }

    const nextTurn = () => {
        setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
        setDiceValue(null);
        setMessage(`Player ${(currentPlayerIndex + 2) % players.length} (${players[(currentPlayerIndex + 1) % players.length].color})'s turn.`);
    }

    const resetGame = () => {
        setPlayers(initialPlayers);
        setCurrentPlayerIndex(0);
        setDiceValue(null);
        setMessage("Player 1 (Green) to start!");
    }


    return (
        <div className="flex flex-col items-center gap-6">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center">Ludo Game</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button onClick={rollDice} disabled={diceValue !== null} >
                            <Dices className="mr-2 h-5 w-5" /> Roll Dice
                        </Button>
                        {diceValue && <div className="text-4xl font-bold p-4 border rounded-lg">{diceValue}</div>}
                    </div>
                    <p className={cn("font-semibold", playerTextColors[players[currentPlayerIndex].color])}>{message}</p>
                </CardContent>
            </Card>
            
            <LudoBoard players={players} onPieceClick={movePiece}/>
            
            <Button onClick={resetGame}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Game
            </Button>
        </div>
    );
}
