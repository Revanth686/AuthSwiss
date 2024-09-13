import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: String) => {
  try {
    const acc = await db.account.findFirst({
      where: { userId: userId as string },
    });
    return acc;
  } catch (error) {
    return { error: "error fetching acc from db" };
  }
};
