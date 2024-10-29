import z from "zod";

const envScheme = z.object({
  PORT: z.string().optional().default("8000"),
  MODE: z.enum(["development", "production"]),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
});

export const env = envScheme.parse(process.env);
