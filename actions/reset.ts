"use server";

import * as z from "zod";

import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateResetPasswordToken } from "@/lib/token";
import { sendResetPasswordMail } from "@/lib/mail";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  try {
    const rToken = await generateResetPasswordToken(email);
    await sendResetPasswordMail(email, rToken.token);
  } catch (e) {
    return { error: `${e}` };
  }

  return { success: "Reset email sent!" };
};
