"use server";
import db from "@/lib/db";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";
import { nanoid } from "nanoid";
import { getSession } from "@/lib/getSession";

const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    return someError.cause;
  }
  redirect("/dashboard");
};

const register = async (formData: FormData) => {
  const fullName = formData.get("fullname") as string;
  const nickName = formData.get("nickname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const nim = formData.get("nim") as string;
  const fakultas = formData.get("fakultas") as string;

  if (!fullName || !nickName || !email || !password || !nim || !fakultas) {
    throw new Error("Please fill all the fields");
  }
  //existing user
  const q = query(collection(db, "user"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  let count = 0;
  querySnapshot.forEach((doc) => {
    count += 1;
  });
  if (count) {
    throw new Error("User with this email is already exist");
  }

  const hashedPassword = await hash(password, 12);
  const id = nanoid();
  await setDoc(doc(db, "user", id), {
    id,
    fullName,
    nickName,
    email,
    password: hashedPassword,
    nim,
    fakultas,
    role: "tpb",
    image: "",
    isOnline: false,
    lastOnline: "",
    friend: [],
    idline: "",
    instagram: "",
    linkedin: "",
    verified: false,
  });
  redirect("/login");
};

const updateEmail = async (formData: FormData) => {
  const newEmail = formData.get("email") as string;

  if (!newEmail) {
    throw new Error("Please fill the email field");
  }

  const session = await getSession();
  const user = session?.user;

  if (!user) {
    throw new Error("No authenticated user found");
  }

  try {
    const userDocRef = doc(db, "user", user.id);
    await updateDoc(userDocRef, {
      email: newEmail,
    });

    return { success: true, message: "Email updated successfully" };
  } catch (error) {
    console.error("Error updating email:", error);
    throw new Error("Failed to update email. Please try again.");
  }
};


const updatePassword = async (formData: FormData) => {

};

const logout = async () => {
  if (!login) {
    return false;
  } else {
    await signOut();
  }
};

const signInGoogle = async () => {
  await signIn("google");
};

export { register, login, logout, signInGoogle, updateEmail, updatePassword };
