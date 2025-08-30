"use server";

import { sentencePuzzles } from "@/lib/constants";

export async function getPuzzleAction() {
  try {
    const puzzle = sentencePuzzles[Math.floor(Math.random() * sentencePuzzles.length)];
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
