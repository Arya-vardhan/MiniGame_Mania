"use server";

import { wouldYouRatherQuestions } from "@/lib/constants";

export async function getWouldYouRatherQuestionAction() {
  try {
    const question = wouldYouRatherQuestions[Math.floor(Math.random() * wouldYouRatherQuestions.length)];
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