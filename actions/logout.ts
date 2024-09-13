"use server";
import { signOut } from "@/auth";
export const logOut = async () => {
  await signOut();
  return null;
};
