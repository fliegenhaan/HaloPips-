import db from "@/lib/db";
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
  console.log(values.content);
  const content = values.content;
  const docRef = doc(db, "chat", chatId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const chat = docSnap.data();
    const messages = chat.messages;
    console.log(messages);
    messages.push({
      senderId,
      content,
      time: new Date(),
      read: false,
    });
    console.log("message console: ", messages);
    const chatDocRef = doc(db, "chat", chatId);
    await updateDoc(chatDocRef, { messages });
  } else {
    console.log("dia ke sini");
    return null;
  }
}
