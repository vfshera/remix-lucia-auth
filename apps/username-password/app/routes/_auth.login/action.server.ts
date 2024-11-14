import type { ActionFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { hashPassword } from "~/.server/auth/utils";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signInAction({ request }: ActionFunctionArgs) {
  const formData = Object.fromEntries(await request.formData());

  const { data, error } = loginSchema.safeParse(formData);

  if (error) {
    return error.message;
  }

  const hashedPass = await hashPassword(data.password);

  console.log({ ...data, hashedPass });

  return null;
}
