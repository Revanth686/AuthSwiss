import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

//these endpoints are used to authenticate users at custom login/register
export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: { signIn: "/auth/login", error: "/auth/error" },
  events: {
    async linkAccount({ user }) {
      //if user REGISTER with OAUTH- verifyEmail as oauth providers take of it b4hand
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    //NOTE: called after signIn/signOut/... are triggered
    async signIn({ user, account, profile, email, credentials }) {
      // allow oauth without email verification
      const existingUser = await getUserById(user.id as string);
      if (account!.provider != "credentials") return true;

      if (!existingUser!.emailVerified) return false;

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );
        if (!twoFactorConfirmation) {
          return false;
        }
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      //HACK: for useSession/session.data.user in client/servrComp
      //field is in our db, to reflect in next-auth
      if (session.user && token.role) {
        session.user.role = token.role as "ADMIN" | "USER";
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token; //no loggedin

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAcc = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAcc;

      //@ts-ignore
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
