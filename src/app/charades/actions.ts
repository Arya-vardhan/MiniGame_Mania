"use server";

import { generateCharade } from "@/ai/flows/generate-charade";
import { z } from "zod";

const CategorySchema = z.object({
  category: z.string().min(1, "Category cannot be empty."),
});

export async function getCharadeAction(prevState: any, formData: FormData) {
  const validatedFields = CategorySchema.safeParse({
    category: formData.get("category"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid category.",
      error: validatedFields.error.flatten().fieldErrors,
      charade: null,
    };
  }

  try {
    const charade = await generateCharade({ category: validatedFields.data.category });
    return {
      message: "Charade generated!",
      error: null,
      charade: charade,
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate charade. Please try again.",
      error: { _errors: ["AI service failed"] },
      charade: null,
    };
  }
}
