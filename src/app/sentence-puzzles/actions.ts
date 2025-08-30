"use server";

import { generateSentencePuzzle } from "@/ai/flows/generate-sentence-puzzle";
import { z } from "zod";

const AgeSchema = z.object({
  age: z.coerce.number().int().positive("Age must be a positive number.").min(3, "Must be at least 3 years old.").max(120, "Age seems a bit high!"),
});

export async function getPuzzleAction(prevState: any, formData: FormData) {
  const validatedFields = AgeSchema.safeParse({
    age: formData.get("age"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid age provided.",
      error: validatedFields.error.flatten().fieldErrors,
      puzzle: null,
    };
  }

  try {
    const puzzle = await generateSentencePuzzle({ userAge: validatedFields.data.age });
    return {
      message: "Puzzle generated!",
      error: null,
      puzzle: puzzle,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate puzzle. Please try again.",
      error: { _errors: ["AI service failed"] },
      puzzle: null,
    };
  }
}
