"use server";
import { User } from "@/schema/User";
import connectDB from "@/lib/db";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { signIn, signOut } from "@/auth";

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
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("Please fill all the fields");
  }

  await connectDB();

  //existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email is already exist");
  }

  const hashedPassword = await hash(password, 12);

  await User.create({ firstName, lastName, email, password: hashedPassword });
  console.log("User created successfully");
  redirect("/login");
};

const logout = async () => {
    if (!login) {
        await signOut();
    } else {
        return false;
    }
}

export {register, login, logout};

