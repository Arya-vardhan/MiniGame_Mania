import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Trophy } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leaderboard | MiniGame Mania',
  description: 'See the top players across all games.',
};

const leaderboardData = [
  { rank: 1, player: 'Alice', game: 'Tic Tac Toe', score: 1250 },
  { rank: 2, player: 'Bob', game: 'Ludo', score: 1100 },
  { rank: 3, player: 'Charlie', game: 'Sentence Puzzles', score: 980 },
  { rank: 4, player: 'David', game: 'Tic Tac Toe', score: 950 },
  { rank: 5, player: 'Eve', game: 'Ludo', score: 890 },
  { rank: 6, player: 'Frank', game: 'Truth or Dare', score: 760 },
  { rank: 7, player: 'Grace', game: 'Sentence Puzzles', score: 720 },
  { rank: 8, player: 'Heidi', game: 'Tic Tac Toe', score: 650 },
  { rank: 9, player: 'Ivy', game: 'Quiz Trivia', score: 610 },
  { rank: 10, player: 'Jack', game: 'Quiz Trivia', score: 580 },
];

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="text-muted-foreground">
          Check out the high scores of our top players!
        </p>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Game</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry) => (
              <TableRow key={entry.rank}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {entry.rank <= 3 ? (
                      <Trophy
                        className={`size-4 ${
                          entry.rank === 1
                            ? 'text-yellow-500'
                            : entry.rank === 2
                            ? 'text-gray-400'
                            : 'text-orange-600'
                        }`}
                      />
                    ) : (
                      <span className="inline-block w-4"></span>
                    )}
                    {entry.rank}
                  </div>
                </TableCell>
                <TableCell>{entry.player}</TableCell>
                <TableCell>{entry.game}</TableCell>
                <TableCell className="text-right">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
