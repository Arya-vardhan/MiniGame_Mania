"use server";

import { emojiPuzzles } from "@/lib/constants";

export async function getEmojiPuzzleAction() {
  try {
    const puzzle = emojiPuzzles[Math.floor(Math.random() * emojiPuzzles.length)];
    return {
      message: "Puzzle generated!",
      error: null,
      puzzle: puzzle,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate puzzle. Please try again.",
      error: { _errors: ["Service failed"] },
      puzzle: null,
    };
  }
}
