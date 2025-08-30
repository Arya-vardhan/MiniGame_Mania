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
    return <Skeleton className="h-10 w-full" />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-auto w-full justify-start p-2 text-left"
        >
          <Avatar className="size-8">
            <AvatarFallback>
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2 flex-grow overflow-hidden">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.age ? `${user.age} years old` : 'Age not set'}
            </p>
          </div>
          <Settings className="ml-2 size-4 shrink-0" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
