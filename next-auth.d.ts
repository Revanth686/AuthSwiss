import { DefaultSession } from "next-auth";
//extending session of user
export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

//add any custom field in user session here
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
