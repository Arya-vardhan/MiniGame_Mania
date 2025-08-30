import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ludo | MiniGame Mania',
  description: 'Play a game of Ludo.',
};

const PlayerArea = ({ color, position }: { color: string; position: string }) => (
  <div className={`grid grid-cols-2 grid-rows-2 gap-2 p-2 bg-gray-200 ${color} ${position}`}>
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="flex items-center justify-center">
        <div className={`h-6 w-6 rounded-full ${color} border-2 border-white shadow-md`}></div>
      </div>
    ))}
  </div>
);

const LudoBoard = () => {
  const pathColors = [
    ...Array(5).fill('bg-white'), 'bg-green-500', ...Array(6).fill('bg-white'), 'bg-yellow-500', ...Array(5).fill('bg-white'),
    ...Array(5).fill('bg-white'), 'bg-blue-500', ...Array(6).fill('bg-white'), 'bg-red-500', ...Array(5).fill('bg-white'),
  ];
  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Ludo Game</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="grid grid-cols-11 grid-rows-11 aspect-square w-full max-w-lg bg-gray-300 border-4 border-gray-400 shadow-lg">
          {/* Player areas */}
          <div className="col-span-5 row-span-5 bg-green-500 p-2 flex items-center justify-center"><PlayerArea color="bg-green-700" position="" /></div>
          <div className="col-span-5 col-start-7 row-span-5 bg-yellow-500 p-2 flex items-center justify-center"><PlayerArea color="bg-yellow-700" position="" /></div>
          <div className="col-span-5 row-span-5 row-start-7 bg-blue-500 p-2 flex items-center justify-center"><PlayerArea color="bg-blue-700" position="" /></div>
          <div className="col-span-5 col-start-7 row-start-7 bg-red-500 p-2 flex items-center justify-center"><PlayerArea color="bg-red-700" position="" /></div>
          
          {/* Center home */}
          <div className="col-span-1 row-span-1 col-start-6 row-start-6 bg-white flex items-center justify-center">
             <div className="w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-yellow-500 border-b-[20px] border-b-transparent"></div>
             <div className="w-0 h-0 border-t-[20px] border-t-blue-500 border-r-[20px] border-r-transparent border-b-[20px] border-b-transparent"></div>
             <div className="w-0 h-0 border-t-[20px] border-t-transparent border-l-[20px] border-l-green-500 border-b-[20px] border-b-transparent"></div>
             <div className="w-0 h-0 border-t-[20px] border-t-transparent border-r-[20px] border-r-transparent border-b-[20px] border-b-red-500"></div>

          </div>

          {/* Paths */}
          {Array.from({length: 5}).map((_, i) => <div key={`g-${i}`} className="col-start-6 row-start-10-i bg-green-500 border border-gray-400"></div>)}
          <div className="col-start-6 row-start-1 bg-white border border-gray-400"></div>
          <div className="col-start-6 row-start-2 bg-green-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-3 bg-green-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-4 bg-green-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-5 bg-green-500 border border-gray-400"></div>
          
          <div className="col-start-5 row-start-6 bg-white border border-gray-400"></div>
          <div className="col-start-4 row-start-6 bg-blue-500 border border-gray-400"></div>
          <div className="col-start-3 row-start-6 bg-blue-500 border border-gray-400"></div>
          <div className="col-start-2 row-start-6 bg-blue-500 border border-gray-400"></div>
          <div className="col-start-1 row-start-6 bg-blue-500 border border-gray-400"></div>
          
          <div className="col-start-6 row-start-7 bg-white border border-gray-400"></div>
          <div className="col-start-6 row-start-8 bg-red-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-9 bg-red-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-10 bg-red-500 border border-gray-400"></div>
          <div className="col-start-6 row-start-11 bg-red-500 border border-gray-400"></div>
          
          <div className="col-start-7 row-start-6 bg-white border border-gray-400"></div>
          <div className="col-start-8 row-start-6 bg-yellow-500 border border-gray-400"></div>
          <div className="col-start-9 row-start-6 bg-yellow-500 border border-gray-400"></div>
          <div className="col-start-10 row-start-6 bg-yellow-500 border border-gray-400"></div>
          <div className="col-start-11 row-start-6 bg-yellow-500 border border-gray-400"></div>
        </div>
      </CardContent>
    </Card>
  );
};


export default function LudoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ludo</h1>
        <p className="text-muted-foreground">
          The classic game of Ludo. A full game is coming soon!
        </p>
      </div>
      <LudoBoard />
    </div>
  );
}
