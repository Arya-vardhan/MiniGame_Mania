import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Game } from '@/lib/types';

export function GameCard({ title, description, href, icon: Icon }: Game) {
  return (
    <Link href={href} className="group contents">
      <Card className="flex flex-col h-full transition-all duration-300 ease-in-out border-muted-foreground/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 text-center items-center justify-center p-4 aspect-square">
        <CardContent className="p-0 flex flex-col items-center gap-4">
           <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-8" />
          </div>
          <div className='flex flex-col'>
            <CardTitle className='text-base'>{title}</CardTitle>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
