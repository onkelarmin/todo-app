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

// export const storedTodoSchema = z.object({
//   id: z.string(),
//   text: z.string().trim().min(1).max(80),
//   completed: z.boolean(),
//   order: z.number().int(),
//   createdAt: z.number(),
// });

// export const storedTodosSchema = z.array(storedTodoSchema);
