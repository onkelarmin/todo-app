import { z } from "astro:schema";

export const todoSchema = z.object({
  todo: z.preprocess(
    (val) => (typeof val === "string" ? val : ""),
    z
      .string()
      .trim()
      .min(1, { message: "Task need to have at least one character" })
      .max(80, { message: "Task can't be longer than 80 characters" }),
  ),
});
