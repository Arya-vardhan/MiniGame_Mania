"use client";

import { useState, useEffect, useCallback } from 'react';
import type { User } from '@/lib/types';

const USER_STORAGE_KEY = 'minigame-user';

const isClient = typeof window !== 'undefined';

export function useUser() {
  const [user, setUser] = useState<User>({ name: 'Player', age: null });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isClient) {
      try {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage', error);
      }
      setIsLoaded(true);
    }
  }, []);

  const updateUser = useCallback((newUserData: Partial<User>) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, ...newUserData };
      if (isClient) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
      }
      return updatedUser;
    });
  }, []);

  return { user, updateUser, isLoaded };
}
