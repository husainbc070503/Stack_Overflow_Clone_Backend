import { z } from "zod";

const PostQuestion = z.object({
    title: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(1, { message: "Title should not be empty" }),

    body: z
        .string({ required_error: "Body is required" })
        .trim()
        .min(1, { message: "Body should not be empty" }),

    tags: z
        .string()
        .array(),

    postedOn: z
        .string()
});

export default PostQuestion;