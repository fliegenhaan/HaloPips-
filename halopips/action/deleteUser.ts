import { doc, deleteDoc } from "firebase/firestore";
import db from "@/lib/db";

export const deleteUserHmif = async (id: string) => {
  await deleteDoc(doc(db, "user", id));
};
