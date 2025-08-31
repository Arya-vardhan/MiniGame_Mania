import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Game } from '@/lib/types';
import { ArrowRight } from 'lucide-react';
import { Badge } from './ui/badge';

export function GameCard({ title, description, href, icon: Icon }: Game) {
  return (
    <Link href={href} className="group">
      <Card className="flex flex-col h-full transition-all duration-300 ease-in-out border-muted-foreground/20 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        <CardHeader>
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="size-7" />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto">
          <Button asChild className="w-full" variant="outline">
            <span>
              Play Now <ArrowRight className="ml-2 size-4" />
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
