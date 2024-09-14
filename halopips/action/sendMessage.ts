import { db } from "@/lib/db";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import z from "zod";
const formSchema = z.object({
  content: z.string().min(1),
});
export async function sendMessage(
  values: z.infer<typeof formSchema>,
  senderId: string,
  chatId: string
) {
  const content = values.content;
  const docRef = doc(db, "chat", chatId);
  const time = new Date();
  const timeString = time.toString();
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const chat = docSnap.data();
    const messages = chat.messages;
    messages.push({
      senderId,
      content,
      time: timeString,
      read: false,
    });
    const chatDocRef = doc(db, "chat", chatId);
    await updateDoc(chatDocRef, { messages });
  } else {
    return null;
  }
}
