"use server";

import { charades } from "@/lib/constants";
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
    const category = validatedFields.data.category as keyof typeof charades;
    const words = charades[category];
    if (!words) {
      throw new Error(`Category not found: ${category}`);
    }
    const word = words[Math.floor(Math.random() * words.length)];
    
    return {
      message: "Charade generated!",
      error: null,
      charade: { word },
    };
  } catch (e) {
    console.error(e);
    return {
      message: "Failed to generate charade. Please try again.",
      error: { _errors: ["Service failed"] },
      charade: null,
    };
  }
}
