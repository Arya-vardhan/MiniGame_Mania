"use server";

import { neverHaveIEverQuestions } from "@/lib/constants";

export async function getNeverHaveIEverQuestionAction() {
  try {
    const question = neverHaveIEverQuestions[Math.floor(Math.random() * neverHaveIEverQuestions.length)];
    return {
      message: "Question generated!",
      error: null,
      question: question,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate question. Please try again.",
      error: { _errors: ["Service failed"] },
      question: null,
    };
  }
}
