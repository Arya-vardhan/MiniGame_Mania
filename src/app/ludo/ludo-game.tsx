
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, RotateCcw, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type PlayerColor = 'green' | 'yellow' | 'blue' | 'red';
type Player = {
  color: PlayerColor;
  pieces: number[]; // -1 for home, 0-51 for board path, 52-57 for final path, 58 for finished
};

const playerColors: Record<PlayerColor, { base: string, piece: string, path: string, text: string }> = {
    green: { base: 'bg-green-200', piece: 'bg-green-500', path: 'bg-green-300', text: 'text-green-400' },
    yellow: { base: 'bg-yellow-200', piece: 'bg-yellow-500', path: 'bg-yellow-300', text: 'text-yellow-400' },
    blue: { base: 'bg-blue-200', piece: 'bg-blue-500', path: 'bg-blue-300', text: 'text-blue-400' },
    red: { base: 'bg-red-200', piece: 'bg-red-500', path: 'bg-red-300', text: 'text-red-400' },
};


const playerStartPositions: Record<PlayerColor, number> = {
  green: 1,
  yellow: 14,
  blue: 27,
  red: 40,
};

// Positions on the 52-tile path that are safe.
const safePositions = [1, 9, 14, 22, 27, 35, 40, 48];

// Maps a position on the 52-tile path to a grid coordinate {r, c}.
const pathCoordinates = [
    // Top-left to top-right (Yellow path enters)
    { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    { r: 5, c: 6 }, { r: 4, c: 6 }, { r: 3, c: 6 }, { r: 2, c: 6 }, { r: 1, c: 6 },
    { r: 0, c: 6 }, { r: 0, c: 7 }, { r: 0, c: 8 },
    // Top-right to bottom-right (Blue path enters)
    { r: 1, c: 8 }, { r: 2, c: 8 }, { r: 3, c: 8 }, { r: 4, c: 8 }, { r: 5, c: 8 },
    { r: 6, c: 9 }, { r: 6, c: 10 }, { r: 6, c: 11 }, { r: 6, c: 12 }, { r: 6, c: 13 },
    { r: 6, c: 14 }, { r: 7, c: 14 }, { r: 8, c: 14 },
    // Bottom-right to bottom-left (Red path enters)
    { r: 8, c: 13 }, { r: 8, c: 12 }, { r: 8, c: 11 }, { r: 8, c: 10 }, { r: 8, c: 9 },
    { r: 9, c: 8 }, { r: 10, c: 8 }, { r: 11, c: 8 }, { r: 12, c: 8 }, { r: 13, c: 8 },
    { r: 14, c: 8 }, { r: 14, c: 7 }, { r: 14, c: 6 },
     // Bottom-left to top-left (Green path enters)
    { r: 13, c: 6 }, { r: 12, c: 6 }, { r: 11, c: 6 }, { r: 10, c: 6 }, { r: 9, c: 6 },
    { r: 8, c: 5 }, { r: 8, c: 4 }, { r: 8, c: 3 }, { r: 8, c: 2 }, { r: 8, c: 1 },
    { r: 8, c: 0 }, { r: 7, c: 0 }, { r: 6, c: 0 },
];

const finalPathCoordinates: Record<PlayerColor, { r: number; c: number }[]> = {
    green: [ { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, { r: 7, c: 6 } ],
    yellow: [ { r: 1, c: 7 }, { r: 2, c: 7 }, { r: 3, c: 7 }, { r: 4, c: 7 }, { r: 5, c: 7 }, { r: 6, c: 7 } ],
    blue: [ { r: 7, c: 13 }, { r: 7, c: 12 }, { r: 7, c: 11 }, { r: 7, c: 10 }, { r: 7, c: 9 }, { r: 7, c: 8 } ],
    red: [ { r: 13, c: 7 }, { r: 12, c: 7 }, { r: 11, c: 7 }, { r: 10, c: 7 }, { r: 9, c: 7 }, { r: 8, c: 7 } ],
};

// Get grid coordinate for a piece
const getPiecePosition = (player: Player, pieceIndex: number) => {
    const pos = player.pieces[pieceIndex];
    if (pos === -1 || pos > 58) return null;

    if (pos >= 52) { // Final path
        return finalPathCoordinates[player.color][pos - 52];
    }
    
    // The path starts at position 1, but array is 0-indexed.
    const boardIndex = (playerStartPositions[player.color] + pos - 1) % 52;
    return pathCoordinates[boardIndex];
};


const LudoBoard = ({ players, onPieceClick, currentPlayerColor }: { players: Player[]; onPieceClick: (color: PlayerColor, pieceIndex: number) => void, currentPlayerColor: PlayerColor }) => {
    
    const getPiecesAt = (r: number, c: number) => {
        const pieces: {color: PlayerColor, pieceIndex: number}[] = [];
        players.forEach(player => {
            player.pieces.forEach((_, pieceIndex) => {
                const pos = getPiecePosition(player, pieceIndex);
                if (pos && pos.r === r && pos.c === c) {
                    pieces.push({color: player.color, pieceIndex});
                }
            });
        });
        return pieces;
    }
    
    return (
        <div className="relative w-[500px] h-[500px] bg-background p-2 border-4 border-muted/30 rounded-lg shadow-lg">
            <div className="grid grid-cols-15 grid-rows-15 w-full h-full">
                {Array.from({length: 15*15}).map((_, index) => {
                    const r = Math.floor(index / 15);
                    const c = index % 15;
                    
                    let cellBg = 'bg-transparent';
                    let isFinalPath = false;
                    let isStart = false;

                    const pathIndex = pathCoordinates.findIndex(p => p.r === r && p.c === c);
                    if (pathIndex !== -1) {
                        cellBg = 'bg-muted/30';
                    }

                    if ( (r >= 0 && r < 6 && c >= 0 && c < 6) ) cellBg = playerColors.green.base;
                    if ( (r >= 0 && r < 6 && c > 8 && c <= 14) ) cellBg = playerColors.yellow.base;
                    if ( (r > 8 && r <= 14 && c >= 0 && c < 6) ) cellBg = playerColors.red.base;
                    if ( (r > 8 && r <= 14 && c > 8 && c <= 14) ) cellBg = playerColors.blue.base;

                    for (const color of ['green', 'yellow', 'blue', 'red'] as PlayerColor[]) {
                         if (finalPathCoordinates[color].some(p => p.r === r && p.c === c)) {
                            isFinalPath = true;
                            cellBg = playerColors[color].path;
                            break;
                        }
                    }
                    
                    if (pathIndex === playerStartPositions.green -1) isStart = true;
                    if (pathIndex === playerStartPositions.yellow -1) isStart = true;
                    if (pathIndex === playerStartPositions.blue -1) isStart = true;
                    if (pathIndex === playerStartPositions.red -1) isStart = true;

                    const boardIndex = pathCoordinates.findIndex(p => p.r === r && p.c === c);
                    const isSafe = safePositions.includes(boardIndex + 1);
                    const pieces = getPiecesAt(r, c);

                    return (
                        <div key={index} style={{gridRow: r+1, gridColumn: c+1}} className={cn("border border-muted/20 relative", cellBg)}>
                            {(isSafe || isStart) && <Star className="absolute text-xs text-muted-foreground/50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 fill-muted-foreground/30" />}
                            <div className="relative w-full h-full flex items-center justify-center">
                                {pieces.map((piece, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "absolute rounded-full w-4/5 h-4/5 shadow-md border-2 border-gray-100 cursor-pointer transition-all duration-300",
                                            playerColors[piece.color].piece,
                                            currentPlayerColor === piece.color ? 'ring-4 ring-offset-1 ring-black scale-110' : ''
                                        )}
                                        onClick={() => onPieceClick(piece.color, piece.pieceIndex)}
                                        style={{
                                            zIndex: 10 + idx,
                                            transform: `translate(${idx * 3}px, ${-idx * 3}px)`
                                        }}
                                    >
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                })}
                 {/* Center Home */}
                <div className="col-start-7 row-start-7 col-span-3 row-span-3 bg-muted/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full relative transform rotate-45">
                        <div className="absolute w-1/2 h-1/2 top-0 left-0 bg-yellow-400"></div>
                        <div className="absolute w-1/2 h-1/2 top-0 right-0 bg-blue-400"></div>
                        <div className="absolute w-1/2 h-1/2 bottom-0 left-0 bg-green-400"></div>
                        <div className="absolute w-1/2 h-1/2 bottom-0 right-0 bg-red-400"></div>
                    </div>
                </div>

                {/* Player Bases */}
                <div className="absolute top-2 left-2 w-[calc(40%-0.5rem)] h-[calc(40%-0.5rem)]">
                    <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-3 border-2 border-green-500">
                        {players[0].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-inner cursor-pointer bg-green-500 border-2 border-green-700 ${currentPlayerColor === 'green' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('green', i)}></div>)}
                    </div>
                </div>
                 <div className="absolute top-2 right-2 w-[calc(40%-0.5rem)] h-[calc(40%-0.5rem)]">
                    <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-3 border-2 border-yellow-500">
                        {players[1].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-inner cursor-pointer bg-yellow-500 border-2 border-yellow-700 ${currentPlayerColor === 'yellow' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('yellow', i)}></div>)}
                    </div>
                </div>
                 <div className="absolute bottom-2 right-2 w-[calc(40%-0.5rem)] h-[calc(40%-0.5rem)]">
                    <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-3 border-2 border-blue-500">
                        {players[2].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-inner cursor-pointer bg-blue-500 border-2 border-blue-700 ${currentPlayerColor === 'blue' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('blue', i)}></div>)}
                    </div>
                </div>
                <div className="absolute bottom-2 left-2 w-[calc(40%-0.5rem)] h-[calc(40%-0.5rem)]">
                    <div className="w-full h-full bg-background/80 backdrop-blur-sm rounded-lg grid grid-cols-2 grid-rows-2 gap-2 p-3 border-2 border-red-500">
                         {players[3].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-inner cursor-pointer bg-red-500 border-2 border-red-700 ${currentPlayerColor === 'red' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('red', i)}></div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const DiceControl = ({ onRoll, diceValue, disabled, isRolling }: { onRoll: () => void; diceValue: number | null; disabled: boolean; isRolling: boolean; }) => {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <button
                onClick={onRoll}
                disabled={disabled || isRolling}
                className={cn(
                    "text-6xl font-bold p-4 border-4 rounded-lg bg-background text-foreground w-24 h-24 flex items-center justify-center shadow-inner cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105 active:scale-95",
                    (disabled || isRolling) && "cursor-not-allowed opacity-50"
                )}
                aria-label={isRolling ? "Rolling dice" : `Dice value: ${diceValue || 'none'}. Click to roll.`}
            >
                {isRolling ? <Dices className="animate-spin h-12 w-12" /> : diceValue}
            </button>
        </div>
    )
}

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
    const [winner, setWinner] = useState<PlayerColor | null>(null);
    const [diceRolling, setDiceRolling] = useState(false);
    
    const currentPlayer = players[currentPlayerIndex];

    const rollDice = () => {
        if(winner || diceValue || diceRolling) return;
        setDiceRolling(true);
        
        let rollCount = 0;
        const interval = setInterval(() => {
            setDiceValue(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            if (rollCount > 10) { // Animate for a bit
                clearInterval(interval);
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                setDiceValue(finalRoll);
                setDiceRolling(false);
                handleDiceRoll(finalRoll);
            }
        }, 100);
    };

    const handleDiceRoll = (roll: number) => {
        const currentPlayer = players[currentPlayerIndex];
        const movablePieces = currentPlayer.pieces.filter(p => p !== -1 && (p + roll) <= 58);
        const canMoveFromHome = roll === 6 && currentPlayer.pieces.some(p => p === -1);
        const piecesOnBoard = currentPlayer.pieces.filter(p => p !== -1).length;

        // Automatically move piece if only one is on board and it's not a 6
        if (piecesOnBoard === 1 && movablePieces.length === 1 && roll !== 6) {
             const pieceIndex = currentPlayer.pieces.findIndex(p => p === movablePieces[0]);
             setTimeout(() => movePiece(currentPlayer.color, pieceIndex, roll), 500);
        } else if (movablePieces.length === 0 && !canMoveFromHome) {
             setTimeout(() => {
                nextTurn();
            }, 1500);
        } else {
             // Player needs to select a piece
        }
    };

    const movePiece = (color: PlayerColor, pieceIndex: number, roll?: number) => {
        const moveValue = roll || diceValue;
        if (winner || players[currentPlayerIndex].color !== color || !moveValue) {
            return;
        }

        let newPlayers = JSON.parse(JSON.stringify(players));
        let player = newPlayers.find((p: Player) => p.color === color)!;
        let piecePos = player.pieces[pieceIndex];

        if (piecePos === -1) { // Move from home
            if (moveValue === 6) {
                player.pieces[pieceIndex] = 1; // Start position
                setDiceValue(null); 
            } else {
                return;
            }
        } else { // Move on board
            const newPos = piecePos + moveValue;
            if (newPos > 58) {
                return;
            }
            player.pieces[pieceIndex] = newPos;

            // Capture logic
            if (newPos < 52) {
                const globalPos = (playerStartPositions[player.color] + newPos -1) % 52;
                if(!safePositions.includes(globalPos + 1)){
                    newPlayers.forEach((otherPlayer: Player) => {
                        if (otherPlayer.color !== color) {
                            otherPlayer.pieces = otherPlayer.pieces.map((p: number, idx: number) => {
                                if (p !== -1 && p < 52) {
                                    const otherGlobalPos = (playerStartPositions[otherPlayer.color] + p - 1) % 52;
                                    if (otherGlobalPos === globalPos) {
                                        return -1; // Send back to home
                                    }
                                }
                                return p;
                            });
                        }
                    });
                }
            }
            
            if(newPos === 58) {
                 setDiceValue(null);
            } else if (moveValue === 6) {
                setDiceValue(null);
            } else {
                nextTurn();
            }
        }
        
        setPlayers(newPlayers);


        if(player.pieces.every((p: number) => p === 58)) {
            setWinner(player.color);
        }
    }

    const nextTurn = () => {
        const newIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(newIndex);
        setDiceValue(null);
    }
    
    const dicePositionClasses: Record<PlayerColor, string> = {
        green: 'top-0 left-0 -translate-x-[110%] -translate-y-[10%]',
        yellow: 'top-0 right-0 translate-x-[110%] -translate-y-[10%]',
        blue: 'bottom-0 right-0 translate-x-[110%] translate-y-[10%]',
        red: 'bottom-0 left-0 -translate-x-[110%] translate-y-[10%]'
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-4 bg-background rounded-xl mt-8 mb-8">
           <div className="relative">
                <LudoBoard 
                    players={players} 
                    onPieceClick={(color, pieceIndex) => movePiece(color, pieceIndex)} 
                    currentPlayerColor={players[currentPlayerIndex].color}
                />
                <div className={cn(
                    "absolute transform transition-all duration-500 ease-in-out",
                    "left-1/2 -bottom-56 -translate-x-1/2 lg:bottom-auto lg:top-auto lg:left-auto lg:right-auto",
                    dicePositionClasses[currentPlayer.color]
                )}>
                    <DiceControl
                        onRoll={rollDice}
                        diceValue={diceValue}
                        isRolling={diceRolling}
                        disabled={!!winner || (diceValue !== null && !diceRolling)}
                    />
                 </div>
           </div>
        </div>
    );
}
