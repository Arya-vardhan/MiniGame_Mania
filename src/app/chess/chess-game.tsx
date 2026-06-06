"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Chess } from 'chess.js';
import { Chessboard, defaultPieces } from 'react-chessboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Undo2, RotateCcw, Swords, Cpu, User, AlertCircle, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

const PIECE_VALUES: Record<string, number> = {
  p: 10,
  n: 30,
  b: 30,
  r: 50,
  q: 90,
  k: 1000
};

// Standard Unicode Symbols for Chess Pieces
const WHITE_SYMBOLS: Record<string, string> = { p: '♙', n: '♘', b: '♗', r: '♖', q: '♕' };
const BLACK_SYMBOLS: Record<string, string> = { p: '♟', n: '♞', b: '♝', r: '♜', q: '♛' };

const STARTING_PIECES = { p: 8, n: 2, b: 2, r: 2, q: 1 };

const customPieces = {
  ...defaultPieces,
  bP: (props: any) => defaultPieces.bP({ ...props, fill: '#64748b' }),
  bN: (props: any) => defaultPieces.bN({ ...props, fill: '#64748b' }),
  bB: (props: any) => defaultPieces.bB({ ...props, fill: '#64748b' }),
  bR: (props: any) => defaultPieces.bR({ ...props, fill: '#64748b' }),
  bQ: (props: any) => defaultPieces.bQ({ ...props, fill: '#64748b' }),
  bK: (props: any) => defaultPieces.bK({ ...props, fill: '#64748b' }),
};

export default function ChessGame() {
  const [game, setGame] = useState(() => new Chess());
  const [gameFen, setGameFen] = useState(() => game.fen());
  const [gameMode, setGameMode] = useState<'local' | 'computer'>('local');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [isThinking, setIsThinking] = useState(false);
  const [playerColor, setPlayerColor] = useState<'w' | 'b'>('w');
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

  // Synchronize board and game status
  const updateGameState = useCallback((gameInstance: Chess) => {
    setGame(gameInstance);
    setGameFen(gameInstance.fen());
    setMoveHistory(gameInstance.history());
    
    if (gameInstance.isGameOver()) {
      if (gameInstance.isCheckmate()) {
        const loserColor = gameInstance.turn();
        setWinner(loserColor === 'w' ? 'Black (AI/Opponent)' : 'White (You)');
      } else if (gameInstance.isDraw()) {
        setWinner('Draw');
      }
    } else {
      setWinner(null);
    }
  }, []);

  const restartGame = useCallback(() => {
    const newGame = new Chess();
    updateGameState(newGame);
    setIsThinking(false);
    setSelectedSquare(null);
    setPossibleMoves([]);
  }, [updateGameState]);

  // Track captured pieces dynamically
  const capturedPieces = useMemo(() => {
    const currentCounts = {
      w: { p: 0, n: 0, b: 0, r: 0, q: 0 },
      b: { p: 0, n: 0, b: 0, r: 0, q: 0 }
    };

    const board = game.board();
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const square = board[r][c];
        if (square) {
          const color = square.color; // 'w' or 'b'
          const type = square.type as keyof typeof STARTING_PIECES;
          if (type in STARTING_PIECES) {
            currentCounts[color][type]++;
          }
        }
      }
    }

    const capturedByWhite: string[] = [];
    const capturedByBlack: string[] = [];

    // Calculate black pieces captured by white
    (Object.keys(STARTING_PIECES) as Array<keyof typeof STARTING_PIECES>).forEach((type) => {
      const diff = STARTING_PIECES[type] - currentCounts.b[type];
      for (let i = 0; i < diff; i++) {
        capturedByWhite.push(BLACK_SYMBOLS[type]);
      }
    });

    // Calculate white pieces captured by black
    (Object.keys(STARTING_PIECES) as Array<keyof typeof STARTING_PIECES>).forEach((type) => {
      const diff = STARTING_PIECES[type] - currentCounts.w[type];
      for (let i = 0; i < diff; i++) {
        capturedByBlack.push(WHITE_SYMBOLS[type]);
      }
    });

    return {
      white: capturedByWhite,
      black: capturedByBlack
    };
  }, [gameFen]);

  const customSquareStyles = useMemo(() => {
    const styles: Record<string, React.CSSProperties> = {};
    
    if (selectedSquare) {
      styles[selectedSquare] = {
        backgroundColor: 'rgba(245, 158, 11, 0.25)', // Orange/Amber tint overlay
      };
    }
    
    possibleMoves.forEach((square) => {
      const piece = game.get(square as any);
      if (piece) {
        styles[square] = {
          background: 'radial-gradient(circle, transparent 65%, rgba(16, 185, 129, 0.6) 65%)', // neon green capture ring
        };
      } else {
        styles[square] = {
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.6) 24%, transparent 24%)', // neon green dot
        };
      }
    });
    
    return styles;
  }, [selectedSquare, possibleMoves, gameFen, game]);

  // Positional and material valuation function
  const evaluateBoard = useCallback((board: any[][], computerColor: 'w' | 'b') => {
    let score = 0;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const square = board[r][c];
        if (square) {
          const type = square.type;
          const color = square.color;
          const isComputer = color === computerColor;
          
          let pieceScore = PIECE_VALUES[type] || 0;
          
          // Positional bonuses: prefer center squares for pawns/knights
          if (type === 'p' || type === 'n') {
            if (r >= 3 && r <= 4 && c >= 3 && c <= 4) {
              pieceScore += 2;
            }
          }
          
          score += isComputer ? pieceScore : -pieceScore;
        }
      }
    }
    return score;
  }, []);

  // Alpha-Beta Minimax search
  const minimax = useCallback((
    currentChess: Chess,
    depth: number,
    alpha: number,
    beta: number,
    isMaximizing: boolean,
    computerColor: 'w' | 'b'
  ): number => {
    if (depth === 0 || currentChess.isGameOver()) {
      return evaluateBoard(currentChess.board(), computerColor);
    }

    const moves = currentChess.moves();
    if (isMaximizing) {
      let maxEval = -Infinity;
      for (const move of moves) {
        currentChess.move(move);
        const evaluation = minimax(currentChess, depth - 1, alpha, beta, false, computerColor);
        currentChess.undo();
        maxEval = Math.max(maxEval, evaluation);
        alpha = Math.max(alpha, evaluation);
        if (beta <= alpha) break;
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        currentChess.move(move);
        const evaluation = minimax(currentChess, depth - 1, alpha, beta, true, computerColor);
        currentChess.undo();
        minEval = Math.min(minEval, evaluation);
        beta = Math.min(beta, evaluation);
        if (beta <= alpha) break;
      }
      return minEval;
    }
  }, [evaluateBoard]);

  // Compute best move for the AI
  const getBestMove = useCallback((currentChess: Chess, computerColor: 'w' | 'b') => {
    const moves = currentChess.moves({ verbose: true });
    if (moves.length === 0) return null;

    // Set search depth based on difficulty
    let depth = 2;
    if (difficulty === 'easy') depth = 1;
    if (difficulty === 'hard') depth = 3;

    let bestMove = moves[0];
    let bestValue = -Infinity;
    
    // Shuffle moves to avoid repetitive games
    const shuffledMoves = [...moves].sort(() => Math.random() - 0.5);

    for (const move of shuffledMoves) {
      currentChess.move(move.san);
      const boardValue = minimax(currentChess, depth - 1, -Infinity, Infinity, false, computerColor);
      currentChess.undo();

      if (boardValue > bestValue) {
        bestValue = boardValue;
        bestMove = move;
      }
    }

    return bestMove;
  }, [difficulty, minimax]);

  // Make computer move asynchronously
  const makeComputerMove = useCallback(() => {
    if (game.isGameOver()) return;
    setIsThinking(true);

    setTimeout(() => {
      const computerColor = playerColor === 'w' ? 'b' : 'w';
      const gameCopy = new Chess(game.fen());
      const aiMove = getBestMove(gameCopy, computerColor);
      if (aiMove) {
        gameCopy.move(aiMove.san);
        updateGameState(gameCopy);
      }
      setIsThinking(false);
    }, 450); // Small delay to feel natural
  }, [game, playerColor, getBestMove, updateGameState]);

  // Effect to trigger AI move if it's the computer's turn
  useEffect(() => {
    if (gameMode === 'computer' && game.turn() !== playerColor && !winner) {
      makeComputerMove();
    }
  }, [gameFen, gameMode, playerColor, makeComputerMove, winner, game]);

  // Handle square clicks for click-to-move
  const handleSquareClick = ({ square }: { square: string }) => {
    if (winner || isThinking) return;
    if (gameMode === 'computer' && game.turn() !== playerColor) return;

    const piece = game.get(square as any);
    const isPlayerTurn = gameMode === 'local' || game.turn() === playerColor;

    if (selectedSquare) {
      if (selectedSquare === square) {
        setSelectedSquare(null);
        setPossibleMoves([]);
        return;
      }

      // If clicking another piece of player's color, switch selection
      if (piece && ((gameMode === 'local' && piece.color === game.turn()) || (gameMode === 'computer' && piece.color === playerColor))) {
        const gameCopy = new Chess(game.fen());
        const moves = gameCopy.moves({ square: square as any, verbose: true }) as any[];
        setSelectedSquare(square);
        setPossibleMoves(moves.map(m => m.to));
        return;
      }

      // If clicking a valid move target, execute move
      if (possibleMoves.includes(square)) {
        const gameCopy = new Chess(game.fen());
        try {
          const move = gameCopy.move({
            from: selectedSquare,
            to: square,
            promotion: 'q' // Auto-promote to Queen
          });

          if (move) {
            updateGameState(gameCopy);
            setSelectedSquare(null);
            setPossibleMoves([]);
          }
        } catch (e) {
          console.error("Failed to execute move:", e);
        }
        return;
      }

      // Clicked invalid square, deselect
      setSelectedSquare(null);
      setPossibleMoves([]);
    } else {
      // Select piece if it's player's turn and color matches
      const activeColor = gameMode === 'computer' ? playerColor : game.turn();
      if (piece && piece.color === activeColor && isPlayerTurn) {
        const gameCopy = new Chess(game.fen());
        const moves = gameCopy.moves({ square: square as any, verbose: true }) as any[];
        setSelectedSquare(square);
        setPossibleMoves(moves.map(m => m.to));
      }
    }
  };

  const undoLastMove = () => {
    if (isThinking) return;
    
    const gameCopy = new Chess(game.fen());
    // Undo player move
    gameCopy.undo();
    
    // If playing computer, also undo computer's move so it remains the player's turn
    if (gameMode === 'computer' && gameCopy.turn() !== playerColor) {
      gameCopy.undo();
    }
    
    updateGameState(gameCopy);
    setSelectedSquare(null);
    setPossibleMoves([]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-5xl">
      {/* Board Column */}
      <div className="lg:col-span-7 flex flex-col items-center gap-5">
        {/* Graveyard Black */}
        <div className="flex items-center justify-between h-10 w-full bg-white/5 px-4 rounded-xl border border-white/5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Captured by Black:</span>
            <div className="flex gap-0.5 text-xl tracking-tight text-white/70 select-none">
              {capturedPieces.black.length > 0 ? capturedPieces.black.join(' ') : <span className="text-xs italic text-muted-foreground/40 font-normal">None</span>}
            </div>
          </div>
          {capturedPieces.black.length > 0 && (
            <span className="text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-white/60 px-1.5 py-0.5 rounded">
              +{capturedPieces.black.length}
            </span>
          )}
        </div>

        {/* Board Box */}
        <div className="w-full max-w-[480px] aspect-square rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl p-2 md:p-3 relative shadow-[0_0_50px_rgba(139,92,246,0.15)]">
          <Chessboard 
            options={{
              position: gameFen,
              onSquareClick: handleSquareClick,
              onPieceDrop: () => false,
              boardOrientation: playerColor === 'w' ? 'white' : 'black',
              darkSquareStyle: { backgroundColor: '#1e1e24' }, // Custom Graphite Obsidian
              lightSquareStyle: { backgroundColor: '#e2e8f0' }, // Custom Slate Silver
              allowDragging: false,
              squareStyles: customSquareStyles,
              darkSquareNotationStyle: { color: '#e2e8f0', fontSize: '10px', opacity: 0.5 },
              lightSquareNotationStyle: { color: '#1e1e24', fontSize: '10px', opacity: 0.5 },
              pieces: customPieces
            }}
          />
        </div>

        {/* Graveyard White */}
        <div className="flex items-center justify-between h-10 w-full bg-white/5 px-4 rounded-xl border border-white/5 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mr-1">Captured by White:</span>
            <div className="flex gap-0.5 text-xl tracking-tight text-white select-none">
              {capturedPieces.white.length > 0 ? capturedPieces.white.join(' ') : <span className="text-xs italic text-muted-foreground/40 font-normal">None</span>}
            </div>
          </div>
          {capturedPieces.white.length > 0 && (
            <span className="text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-white/60 px-1.5 py-0.5 rounded">
              +{capturedPieces.white.length}
            </span>
          )}
        </div>
      </div>

      {/* Control Panel Column */}
      <div className="lg:col-span-5 flex flex-col gap-6">
        <Card className="glassmorphic border-white/10 h-full flex flex-col rounded-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <Swords className="w-5 h-5 text-primary text-glow-dynamic" style={{ ['--glow-rgb' as any]: '14, 165, 233' }} /> Game Controls
            </CardTitle>
            <CardDescription className="text-white/60 text-xs mt-1">Configure game mode and options.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 flex-1">
            {/* Mode Select */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Game Mode</label>
              <div className="grid grid-cols-2 gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                <Button 
                  variant="ghost"
                  onClick={() => { setGameMode('local'); restartGame(); }}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg text-xs transition-all duration-300 py-2.5 h-9",
                    gameMode === 'local' 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <User className="w-3.5 h-3.5" /> Pass & Play
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => { setGameMode('computer'); restartGame(); }}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-lg text-xs transition-all duration-300 py-2.5 h-9",
                    gameMode === 'computer' 
                      ? "bg-primary text-white shadow-lg shadow-primary/20" 
                      : "text-muted-foreground hover:text-white hover:bg-white/5"
                  )}
                >
                  <Cpu className="w-3.5 h-3.5" /> Vs. Computer
                </Button>
              </div>
            </div>

            {/* Computer Options */}
            {gameMode === 'computer' && (
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Play As</label>
                  <Select 
                    value={playerColor} 
                    onValueChange={(val) => { setPlayerColor(val as 'w' | 'b'); restartGame(); }}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl text-xs h-9 focus:ring-primary/40">
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic border-white/10 text-white">
                      <SelectItem value="w" className="text-xs focus:bg-white/10 focus:text-white">White (First)</SelectItem>
                      <SelectItem value="b" className="text-xs focus:bg-white/10 focus:text-white">Black</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">AI Level</label>
                  <Select 
                    value={difficulty} 
                    onValueChange={(val) => setDifficulty(val as any)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white rounded-xl text-xs h-9 focus:ring-primary/40">
                      <SelectValue placeholder="AI Difficulty" />
                    </SelectTrigger>
                    <SelectContent className="glassmorphic border-white/10 text-white">
                      <SelectItem value="easy" className="text-xs focus:bg-white/10 focus:text-white">Easy</SelectItem>
                      <SelectItem value="medium" className="text-xs focus:bg-white/10 focus:text-white">Medium</SelectItem>
                      <SelectItem value="hard" className="text-xs focus:bg-white/10 focus:text-white">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Game Status */}
            <div className="pt-4 border-t border-white/5">
              {winner ? (
                <div className="flex items-center gap-3 p-4 bg-primary/10 text-primary border border-primary/20 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                  <Award className="w-5.5 h-5.5 animate-bounce text-primary" />
                  <div>
                    <p className="font-bold text-sm text-white">Game Over</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{winner === 'Draw' ? 'The game ended in a draw.' : `Winner: ${winner}`}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl">
                  {isThinking ? (
                    <div className="flex items-center gap-2.5">
                      <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />
                      <span className="text-[11px] font-medium text-white/90">Computer is calculating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${game.turn() === 'w' ? 'bg-white shadow-[0_0_8px_#fff]' : 'bg-slate-900 border border-white/20 shadow-[0_0_8px_rgba(255,255,255,0.1)]'}`} />
                      <span className="text-[11px] font-medium text-white/90">
                        Active Turn: <span className="font-bold text-white">{game.turn() === 'w' ? 'White' : 'Black'}</span>
                      </span>
                    </div>
                  )}
                  {game.inCheck() && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 border border-red-500/20 px-2 py-0.5 rounded-full animate-pulse flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Check!
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Move History */}
            <div className="space-y-2 flex flex-col h-44">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Move History</label>
              <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 overflow-y-auto text-xs font-mono space-y-1.5 select-none scrollbar-thin">
                {moveHistory.length === 0 ? (
                  <p className="text-muted-foreground/30 italic text-center py-12">No moves made yet.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    {Array.from({ length: Math.ceil(moveHistory.length / 2) }).map((_, i) => (
                      <React.Fragment key={i}>
                        <div className="text-muted-foreground flex items-center gap-2">
                          <span className="opacity-45 text-[10px]">{i + 1}.</span>
                          <span className="text-white/80">{moveHistory[i * 2]}</span>
                        </div>
                        <div className="text-primary font-semibold text-glow-dynamic" style={{ ['--glow-rgb' as any]: '14, 165, 233' }}>
                          {moveHistory[i * 2 + 1] || ''}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="grid grid-cols-2 gap-3 border-t border-white/5 pt-4 pb-5 px-6 bg-white/[0.01] rounded-b-2xl">
            <Button variant="outline" className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-white transition-all rounded-xl text-xs h-9" onClick={undoLastMove} disabled={moveHistory.length === 0 || isThinking}>
              <Undo2 className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> Undo
            </Button>
            <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-all rounded-xl border border-white/5 text-xs h-9" onClick={restartGame}>
              <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" /> Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
