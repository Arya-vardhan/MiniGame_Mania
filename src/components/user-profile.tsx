"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Settings } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from './ui/skeleton';

export default function UserProfile() {
  const { user, updateUser, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age ? String(user.age) : '');

  React.useEffect(() => {
    if (isLoaded) {
      setName(user.name);
      setAge(user.age ? String(user.age) : '');
    }
  }, [isLoaded, user]);

  const handleSave = () => {
    updateUser({ name, age: age ? parseInt(age, 10) : null });
    setIsOpen(false);
  };

  if (!isLoaded) {
    return <Skeleton className="h-10 w-24 rounded-full" />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-10 flex items-center gap-2.5 px-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(14,165,233,0.15)] transition-all group duration-300"
        >
          <div className="relative flex">
            <Avatar className="size-6 border border-primary/20">
              <AvatarFallback className="text-[10px] bg-primary/20 text-primary font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="absolute -bottom-0.5 -right-0.5 block size-2 rounded-full bg-emerald-500 ring-1 ring-background animate-pulse" />
          </div>
          <span className="hidden md:inline text-xs font-semibold truncate max-w-[80px] text-white/90 group-hover:text-white transition-colors">
            {user.name}
          </span>
          <Settings className="size-3.5 text-muted-foreground group-hover:text-white transition-colors duration-300" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="glassmorphic border-white/10 text-white sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight text-white">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-white/80">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age" className="text-sm font-medium text-white/80">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="bg-white/5 border-white/10 focus-visible:ring-primary/50 text-white placeholder:text-muted-foreground/50"
            />
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <DialogClose asChild>
            <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 text-white hover:text-white transition-colors">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/20 transition-all">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
