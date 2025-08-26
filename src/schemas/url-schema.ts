import z from "zod";

const saveUrlSchema = z.object({
    longUrl: z.string({ error: "longUrl must be an URL" })
});

export { saveUrlSchema };