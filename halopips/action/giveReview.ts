import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/db";

const updateReview = async (formData: FormData, id: string) => {
  const newReview = formData.get("review") as string;

  if (!newReview || newReview.trim() === "") {
    throw new Error("Please provide a valid review");
  }

  try {
    const userDocRef = doc(db, "user", id);

    await updateDoc(userDocRef, {
      reviews: arrayUnion(newReview),
    });

    return { success: true, message: "Review updated successfully" };
  } catch (error) {
    console.error("Error updating review:", error);
    throw new Error("Failed to update review. Please try again.");
  }
};

export { updateReview };
