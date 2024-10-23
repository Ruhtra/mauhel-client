//TODO trocar todos os procces.env para esse env.ts

import z from "zod";

const envScheme = z.object({
  PORT: z.string().optional(),
  MODE: z.enum(["DEVELOPMENT", "PRODUCTION"]),
});

export const env = envScheme.parse(process.env);
