"use server";

import { triviaQuestions } from "@/lib/constants";
import { z } from "zod";

const QuizParamsSchema = z.object({
  count: z.number().min(1).max(20),
});

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export async function getTriviaQuestionsAction(count: number = 5) {
  const validatedCount = QuizParamsSchema.safeParse({ count });

  if (!validatedCount.success) {
    return {
      message: "Invalid question count.",
      error: validatedCount.error.flatten().fieldErrors,
      questions: null,
    };
  }

  try {
    const shuffled = shuffleArray([...triviaQuestions]);
    const questions = shuffled.slice(0, validatedCount.data.count);
    
    return {
      message: "Trivia questions generated!",
      error: null,
      questions: questions,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate questions. Please try again.",
      error: { _errors: ["Service failed"] },
      questions: null,
    };
  }
}
