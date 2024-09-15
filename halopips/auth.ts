import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./lib/db";
import { getUserByEmail } from "./data";
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role as "tpb" | "hmif" | "admin";
      }

      return session;
    },

    async jwt({ token, user }) {
      if (!token.sub) return token;
      if (user) {
        const id = token.sub;
        const userDocRef = doc(db, "user", id);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userdata = docSnap.data();
          token.role = userdata.role;
        } else {
          return token;
        }
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
  session: { strategy: "jwt" },
  ...authConfig,
});
