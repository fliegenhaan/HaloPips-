import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { setDoc, doc } from "firebase/firestore";
import db from "./lib/db";
import { getUserByEmail } from "./data";
export const { handlers, signIn, signOut, auth } = NextAuth({
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

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role as "user";
      }

      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;
      if (user) {
        token.role = "user";
      }
      return token;
    },

    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        try {
          const { email, name, image, id } = user;
          const alreadyUser = await getUserByEmail(email);

          if (!alreadyUser || !alreadyUser.data()) {
            if (id) {
              await setDoc(doc(db, "user", id), {
                email,
                name,
                image,
                authProviderId: id,
              });
            }
            // await User.create({ email, name, image, authProviderId: id });
          } else {
            return true;
          }
        } catch (error) {
          throw new Error("Error while creating user");
        }
      }

      if (account?.provider === "credentials") {
        return true;
      } else {
        return false;
      }
    },
  },
});
