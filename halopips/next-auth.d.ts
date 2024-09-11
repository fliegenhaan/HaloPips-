import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "user";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
