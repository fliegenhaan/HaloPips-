import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "tpb" | "hmif" | "admin";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
