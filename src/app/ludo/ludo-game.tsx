"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

type PlayerColor = 'green' | 'yellow' | 'blue' | 'red';
type Player = {
  color: PlayerColor;
  pieces: number[]; // -1 for home, 0-51 for board path, 52-57 for final path, 58 for finished
};

const playerColors: Record<PlayerColor, { base: string, piece: string, path: string, text: string }> = {
    green: { base: 'bg-green-200', piece: 'bg-green-500', path: 'bg-green-300', text: 'text-green-700' },
    yellow: { base: 'bg-yellow-200', piece: 'bg-yellow-500', path: 'bg-yellow-300', text: 'text-yellow-700' },
    blue: { base: 'bg-blue-200', piece: 'bg-blue-500', path: 'bg-blue-300', text: 'text-blue-700' },
    red: { base: 'bg-red-200', piece: 'bg-red-500', path: 'bg-red-300', text: 'text-red-700' },
};

const playerStartPositions: Record<PlayerColor, number> = {
  green: 0,
  yellow: 13,
  blue: 26,
  red: 39,
};

const safePositions = [0, 8, 13, 21, 26, 34, 39, 47];

const pathCoordinates = [
    { r: 6, c: 1 }, { r: 6, c: 2 }, { r: 6, c: 3 }, { r: 6, c: 4 }, { r: 6, c: 5 },
    { r: 5, c: 6 }, { r: 4, c: 6 }, { r: 3, c: 6 }, { r: 2, c: 6 }, { r: 1, c: 6 },
    { r: 0, c: 6 }, { r: 0, c: 7 }, { r: 0, c: 8 },
    { r: 1, c: 8 }, { r: 2, c: 8 }, { r: 3, c: 8 }, { r: 4, c: 8 }, { r: 5, c: 8 },
    { r: 6, c: 9 }, { r: 6, c: 10 }, { r: 6, c: 11 }, { r: 6, c: 12 }, { r: 6, c: 13 },
    { r: 6, c: 14 }, { r: 7, c: 14 }, { r: 8, c: 14 },
    { r: 8, c: 13 }, { r: 8, c: 12 }, { r: 8, c: 11 }, { r: 8, c: 10 }, { r: 8, c: 9 },
    { r: 9, c: 8 }, { r: 10, c: 8 }, { r: 11, c: 8 }, { r: 12, c: 8 }, { r: 13, c: 8 },
    { r: 14, c: 8 }, { r: 14, c: 7 }, { r: 14, c: 6 },
    { r: 13, c: 6 }, { r: 12, c: 6 }, { r: 11, c: 6 }, { r: 10, c: 6 }, { r: 9, c: 6 },
    { r: 8, c: 5 }, { r: 8, c: 4 }, { r: 8, c: 3 }, { r: 8, c: 2 }, { r: 8, c: 1 },
    { r: 8, c: 0 }, { r: 7, c: 0 },
];

const finalPathCoordinates: Record<PlayerColor, { r: number; c: number }[]> = {
    green: [ { r: 7, c: 1 }, { r: 7, c: 2 }, { r: 7, c: 3 }, { r: 7, c: 4 }, { r: 7, c: 5 }, {r: 7, c: 6} ],
    yellow: [ { r: 1, c: 7 }, { r: 2, c: 7 }, { r: 3, c: 7 }, { r: 4, c: 7 }, { r: 5, c: 7 }, { r: 6, c: 7 } ],
    blue: [ { r: 7, c: 13 }, { r: 7, c: 12 }, { r: 7, c: 11 }, { r: 7, c: 10 }, { r: 7, c: 9 }, { r: 7, c: 8 } ],
    red: [ { r: 13, c: 7 }, { r: 12, c: 7 }, { r: 11, c: 7 }, { r: 10, c: 7 }, { r: 9, c: 7 }, { r: 8, c: 7 } ],
};

const getPiecePosition = (player: Player, pieceIndex: number) => {
    const pos = player.pieces[pieceIndex];
    if (pos === -1 || pos > 58) return null; // In base or finished

    if (pos >= 52 && pos <= 57) { // Final path
        return finalPathCoordinates[player.color][pos - 52];
    }
    
    // On main board
    const boardIndex = (pos + playerStartPositions[player.color]) % 52;
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
        <div className="relative aspect-square w-full max-w-lg mx-auto bg-card border-8 border-gray-300 shadow-lg p-2">
            <div className="grid grid-cols-15 grid-rows-15 h-full w-full">
                {/* Player Bases */}
                <div className="col-span-6 row-span-6 bg-green-200 flex items-center justify-center rounded-lg p-2"><div className="w-full h-full bg-green-300 rounded-md grid grid-cols-2 grid-rows-2 gap-2 p-4">{players[0].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-md cursor-pointer ${playerColors.green.piece} ${currentPlayerColor === 'green' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('green', i)}></div>)}</div></div>
                <div className="col-span-6 row-span-6 col-start-10 bg-yellow-200 flex items-center justify-center rounded-lg p-2"><div className="w-full h-full bg-yellow-300 rounded-md grid grid-cols-2 grid-rows-2 gap-2 p-4">{players[1].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-md cursor-pointer ${playerColors.yellow.piece} ${currentPlayerColor === 'yellow' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('yellow', i)}></div>)}</div></div>
                <div className="col-span-6 row-span-6 row-start-10 bg-blue-200 flex items-center justify-center rounded-lg p-2"><div className="w-full h-full bg-blue-300 rounded-md grid grid-cols-2 grid-rows-2 gap-2 p-4">{players[2].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-md cursor-pointer ${playerColors.blue.piece} ${currentPlayerColor === 'blue' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('blue', i)}></div>)}</div></div>
                <div className="col-span-6 row-span-6 col-start-10 row-start-10 bg-red-200 flex items-center justify-center rounded-lg p-2"><div className="w-full h-full bg-red-300 rounded-md grid grid-cols-2 grid-rows-2 gap-2 p-4">{players[3].pieces.map((p, i) => p === -1 && <div key={i} className={`rounded-full shadow-md cursor-pointer ${playerColors.red.piece} ${currentPlayerColor === 'red' ? 'ring-2 ring-offset-2 ring-black' : ''}`} onClick={() => onPieceClick('red', i)}></div>)}</div></div>

                {/* Center Home */}
                <div className="col-span-3 row-span-3 col-start-7 row-start-7 bg-card flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full relative">
                        <div className="absolute w-0 h-0 border-t-[50px] border-t-transparent border-r-[50px] border-r-green-500 border-b-[50px] border-b-transparent top-1/2 left-0 -translate-y-1/2"></div>
                        <div className="absolute w-0 h-0 border-l-[50px] border-l-transparent border-t-[50px] border-t-yellow-500 border-r-[50px] border-r-transparent top-0 left-1/2 -translate-x-1/2"></div>
                        <div className="absolute w-0 h-0 border-b-[50px] border-b-transparent border-l-[50px] border-l-blue-500 border-t-[50px] border-t-transparent top-1/2 right-0 -translate-y-1/2"></div>
                        <div className="absolute w-0 h-0 border-r-[50px] border-r-transparent border-b-[50px] border-b-red-500 border-l-[50px] border-l-transparent bottom-0 left-1/2 -translate-x-1/2"></div>
                    </div>
                </div>

                {/* Paths */}
                {Array.from({length: 15*15}).map((_, index) => {
                    const r = Math.floor(index / 15);
                    const c = index % 15;
                    
                    const isPath = pathCoordinates.some(p => p.r === r && p.c === c);
                    const isFinalPath = Object.values(finalPathCoordinates).flat().some(p => p.r === r && p.c === c);
                    let bgColor = 'bg-gray-100';

                    if (isPath || isFinalPath) {
                        bgColor = 'bg-white';
                    }

                    // Main path color blocks
                    if(r >= 6 && r <= 8 && (c < 6 || c > 8)) bgColor = 'bg-gray-100';
                    if(c >= 6 && c <= 8 && (r < 6 || r > 8)) bgColor = 'bg-gray-100';
                    if((r >= 6 && r <= 8) && (c >= 6 && c <= 8)) bgColor = 'bg-transparent';


                    if (pathCoordinates.some(p => p.r === r && p.c === c)) bgColor = 'bg-white'
                    if (r === 7 && c > 0 && c < 6) bgColor = playerColors.green.path;
                    if (c === 7 && r > 0 && r < 6) bgColor = playerColors.yellow.path;
                    if (r === 7 && c > 8 && c < 14) bgColor = playerColors.blue.path;
                    if (c === 7 && r > 8 && r < 14) bgColor = playerColors.red.path;
                    
                    // Start squares
                    if (r === 6 && c === 1) bgColor = playerColors.green.path;
                    if (r === 1 && c === 8) bgColor = playerColors.yellow.path;
                    if (r === 8 && c === 13) bgColor = playerColors.blue.path;
                    if (r === 13 && c === 6) bgColor = playerColors.red.path;

                    const boardIndex = pathCoordinates.findIndex(p => p.r === r && p.c === c);
                    const isSafe = safePositions.includes(boardIndex);
                    
                    const pieces = getPiecesAt(r, c);

                    return (
                        <div key={index} style={{gridRow: r+1, gridColumn: c+1}} className={cn("border border-gray-200 relative", bgColor)}>
                           {isSafe && <div className="absolute text-xs text-gray-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">★</div>}
                           <div className="relative w-full h-full flex items-center justify-center">
                            {pieces.length > 0 && (
                                <div
                                    className={cn(
                                        "rounded-full w-4/5 h-4/5 shadow-md border-2 border-white cursor-pointer",
                                        playerColors[pieces[0].color].piece,
                                        pieces.length > 1 && "ring-2 ring-white",
                                        currentPlayerColor === pieces[0].color ? 'ring-2 ring-offset-1 ring-black' : ''
                                    )}
                                    onClick={() => onPieceClick(pieces[0].color, pieces[0].pieceIndex)}
                                >
                                  {pieces.length > 1 && <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xs">{pieces.length}</span>}
                                </div>
                            )}
                           </div>
                        </div>
                    )
                })}
            </div>
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
    const [winner, setWinner] = useState<PlayerColor | null>(null);

    const rollDice = () => {
        if(winner) return;
        const roll = Math.floor(Math.random() * 6) + 1;
        setDiceValue(roll);

        const currentPlayer = players[currentPlayerIndex];
        const movablePieces = currentPlayer.pieces.filter(p => p !== -1 && (p + roll) <= 58);
        const canMoveFromHome = roll === 6 && currentPlayer.pieces.some(p => p === -1);

        if (movablePieces.length === 0 && !canMoveFromHome) {
            setMessage(`Player ${currentPlayerIndex + 1} rolled ${roll} but cannot move. Next player.`);
             setTimeout(() => {
                nextTurn();
            }, 1500);
            return;
        }

        setMessage(`Player ${currentPlayerIndex + 1} (${currentPlayer.color}) rolled a ${roll}. Select a piece.`);
    };

    const movePiece = (color: PlayerColor, pieceIndex: number) => {
        if (winner || players[currentPlayerIndex].color !== color || !diceValue) {
            return;
        }

        let newPlayers = JSON.parse(JSON.stringify(players));
        let player = newPlayers.find((p: Player) => p.color === color)!;
        let piecePos = player.pieces[pieceIndex];

        // Move from home
        if (piecePos === -1) {
            if (diceValue === 6) {
                player.pieces[pieceIndex] = 0;
                setMessage(`Player ${currentPlayerIndex + 1} moved a piece out! Roll again.`);
                setDiceValue(null); // Allow re-roll
            } else {
                setMessage('You need a 6 to move a piece from home.');
            }
            setPlayers(newPlayers);
            return;
        }

        // Move on board
        const newPos = piecePos + diceValue;
        if (newPos > 58) {
            setMessage('This piece cannot move that far. Try another piece.');
            return;
        }
        player.pieces[pieceIndex] = newPos;

        // Capture logic
        if (newPos < 52) { // Only capture on main path
            const boardIndex = (newPos + playerStartPositions[player.color]) % 52;
            if(!safePositions.includes(boardIndex)){
                newPlayers.forEach((otherPlayer: Player) => {
                    if (otherPlayer.color !== color) {
                        otherPlayer.pieces = otherPlayer.pieces.map((p: number) => {
                            if (p !== -1 && p < 52) {
                                const otherBoardIndex = (p + playerStartPositions[otherPlayer.color]) % 52;
                                if (otherBoardIndex === boardIndex) {
                                    return -1; // Send back to home
                                }
                            }
                            return p;
                        });
                    }
                });
            }
        }
        
        setPlayers(newPlayers);

        // Check for winner
        if(player.pieces.every((p: number) => p === 58)) {
            setWinner(player.color);
            setMessage(`Player ${currentPlayerIndex + 1} (${player.color}) wins!`);
            return;
        }

        if (diceValue !== 6 && newPos < 58) {
            nextTurn();
        } else {
            setDiceValue(null);
            setMessage(`Player ${currentPlayerIndex + 1} got a 6 or finished a piece! Roll again.`);
        }
    }

    const nextTurn = () => {
        const newIndex = (currentPlayerIndex + 1) % players.length;
        setCurrentPlayerIndex(newIndex);
        setDiceValue(null);
        setMessage(`Player ${newIndex + 1} (${players[newIndex].color})'s turn.`);
    }

    const resetGame = () => {
        setPlayers(initialPlayers);
        setCurrentPlayerIndex(0);
        setDiceValue(null);
        setWinner(null);
        setMessage("Player 1 (Green) to start!");
    }


    return (
        <div className="flex flex-col items-center gap-6 p-4 bg-blue-50 rounded-xl">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="text-center">Ludo Game</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button onClick={rollDice} disabled={diceValue !== null && !winner} >
                            <Dices className="mr-2 h-5 w-5" /> {winner ? 'Game Over' : 'Roll Dice'}
                        </Button>
                        {diceValue && <div className="text-4xl font-bold p-4 border rounded-lg bg-white">{diceValue}</div>}
                    </div>
                     {winner ? (
                        <p className={cn("font-semibold text-lg", playerColors[winner].text)}>🎉 {message} 🎉</p>
                     ) : (
                        <p className={cn("font-semibold", playerColors[players[currentPlayerIndex].color].text)}>{message}</p>
                     )}
                </CardContent>
            </Card>
            
            <LudoBoard players={players} onPieceClick={movePiece} currentPlayerColor={players[currentPlayerIndex].color}/>
            
            <Button onClick={resetGame} variant="default" size="lg">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Game
            </Button>
        </div>
    );
}
