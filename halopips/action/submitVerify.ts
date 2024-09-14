"use server";
import { db, storage } from "@/lib/db";
import { getSession } from "@/lib/getSession";
import {
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";

const submitVerify = async (formData: FormData, snapshot: string) => {
  const image = formData.get("photo") as File | null;
  if (!image) {
    throw new Error("Please select a photo to upload");
  }
  const cam64 = await fetch(snapshot);
  const blob = await cam64.blob();
  const formData2 = new FormData();
  formData2.append("image", blob, "camera.png");
  const camera = formData2.get("image") as File | null;
  if (!camera) {
    throw new Error("Please select a photo to upload");
  }
  const session = await getSession();
  const id = session?.user.id;
  if (!id) throw new Error("Not signed in");
  try {
    const storageRef: StorageReference = ref(storage, `user_photos/${id}/ktm`);
    await uploadBytes(storageRef, image);
    const photoURL = await getDownloadURL(storageRef);
    const userDocRef = doc(db, "verification", id);
    await updateDoc(userDocRef, {
      ktm: photoURL,
    });

    const storageRef2: StorageReference = ref(
      storage,
      `user_photos/${id}/camera`
    );
    await uploadBytes(storageRef2, camera);
    const photoURL2 = await getDownloadURL(storageRef2);
    const userDocRef2 = doc(db, "verification", id);
    await updateDoc(userDocRef2, {
      camera: photoURL2,
    });

    return { success: true, message: "Photo uploaded successfully", photoURL };
  } catch (error) {
    console.error("Error submitting photo:", error);
    throw new Error("Failed to upload photo. Please try again.");
  }
};

export { submitVerify };
