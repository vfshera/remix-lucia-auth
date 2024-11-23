/* eslint-disable no-console */
import { config } from "dotenv";
import { expand } from "dotenv-expand";

import { z } from "zod";

const stringBoolean = z.coerce
  .string()
  .transform((val) => {
    return val === "true";
  })
  .default("false");

const EnvSchema = z.object({
  DB_MIGRATING: stringBoolean,
  SESSION_SECRET: z.string().min(16, "Must be at least 16 characters long"),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

const { data: env, error } = EnvSchema.safeParse(process.env);

if (error) {
  console.error("❌ Invalid env:");
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

export default env!;
