import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { getUserByEmail } from "./data";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID, // nanti dimasukin client idnya di .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, //nanti dimasukkin di .env juga
    }),

    Credentials({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (!email || !password) {
          throw new CredentialsSignin("Please provide both email & password");
        }
        const user = await getUserByEmail(email);
        if (!user || !user.data()) {
          throw new Error("Invalid email or password");
        }
        const isMatched = await compare(password, user.data().password);

        if (!isMatched) {
          throw new Error("Password did not matched");
        }
        const userData = user.data(); // Get the plain object data
        return {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          role: userData.role,
          id: user.id,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
