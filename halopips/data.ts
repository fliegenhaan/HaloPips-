"use server";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "./lib/db";
export async function getUserByEmail(email: string | null | undefined) {
  if (!email) {
    return null;
  }
  const q = query(collection(db, "user"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc;
  }
  return null;
}
