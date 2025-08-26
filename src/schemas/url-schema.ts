import z from "zod";

const saveUrlSchema = z.object({
    longUrl: z.string({ error: "longUrl must be an URL" })
});

const shortCodeSchema = z.object({
    shortCode: z.string({ error: "shortCode must be an string" })
});

const deleteUrlSchema = z.object({
    id: z.int({ error: "URL ID must be a number" })
});

export { saveUrlSchema, shortCodeSchema, deleteUrlSchema };
