import { z } from "zod";

const PostAsnwer = z.object({
    body: z
        .string({ required_error: "Title is required" })
        .trim()
        .min(1, { message: "Title should not be empty" }),

    question: z
        .string(),

    answeredOn: z
        .string()
});

export default PostAsnwer;