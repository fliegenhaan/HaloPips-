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
  getDoc,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import { compare, hash } from "bcryptjs";
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
  const id = session?.user.id;

  if (!id) {
    throw new Error("No authenticated user found");
  }

  try {
    const userDocRef = doc(db, "user", id);
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
  const inputOldPassword = formData.get("oldpassword") as string;
  const newPassword = formData.get("newpassword") as string;

  if (!newPassword || !inputOldPassword) {
    throw new Error("Please fill the password field");
  };

  if (inputOldPassword === newPassword) {
    throw new Error("Please enter a different password");
  }

  const session = await getSession();
  const id = session?.user.id;

  try {
    const userDocRef = doc(db, "user", id);
    const docSnap = await getDoc(userDocRef);
    const userdata = docSnap.data()
    const oldPassword = userdata.password;
    const isMatched = await compare(inputOldPassword, oldPassword);

    if (!isMatched) {
      return {success: false, message: "Please input your current password correctly"};
    } else {
        const hashedPassword = await hash(newPassword, 12);

        await updateDoc(userDocRef, {
          password: hashedPassword,
        });

        return {success: true, message: "Password updated successfully"};
    }

  } catch (error) {
    console.error("Error updating password:", error);
    throw new Error("Failed to update password. Please try again.");
  }
};

const updateProfile = async (formData: FormData) => {
  const updatedFullName = formData.get("fullName") as string;
  const updatedNickName = formData.get("nickName") as string;
  const updatedNim = formData.get("nim") as string;
  const updatedFakultas = formData.get("fakultas") as string;
  const updatedInstagram = formData.get("instagram") as string;
  const updatedLinkedin = formData.get("linkedin") as string;
  const updatedIdline = formData.get("idline") as string;

  const session = await getSession();
  const id = session?.user.id;

  try {
    const userDocRef = doc(db, "user", id);
    await updateDoc(userDocRef, {
      fullName: updatedFullName,
      nickName: updatedNickName,
      nim: updatedNim,
      fakultas: updatedFakultas,
      instagram: updatedInstagram,
      linkedin: updatedLinkedin,
      idline: updatedIdline,
    });

    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile. Please try again.");
  }
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

export { register, login, logout, signInGoogle, updateEmail, updatePassword, updateProfile };
