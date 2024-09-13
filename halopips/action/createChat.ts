import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import db from "@/lib/db";

export async function createChat(sender: string, receiver: string) {
  let sortList = [sender, receiver];
  function sortThings(
    a: string | null | undefined,
    b: string | null | undefined
  ) {
    if (!a || !b) return 0;
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a > b ? -1 : b > a ? 1 : 0;
  }
  sortList = sortList.sort(sortThings).reverse();
  const chatId = sortList[0] + sortList[1];
  const docRef = doc(db, "chat", chatId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return null;
  } else {
    //create chat
    await setDoc(doc(db, "chat", chatId), {
      chatId,
      participants: [sender, receiver],
      messages: [],
    });
    //add friend to sender
    const docRefSender = doc(db, "user", sender);
    const docSnapSender = await getDoc(docRefSender);

    if (docSnapSender.exists()) {
      const senderData = docSnapSender.data();
      const friendList = senderData.friend;
      friendList.push(receiver);
      const userDocRef = doc(db, "user", sender);
      await updateDoc(userDocRef, {
        friend: friendList,
      });
    } else {
      console.log("sender id doesnt exist");
      return null;
    }
    //add friend to receiver
    const docRefReceiver = doc(db, "user", receiver);
    const docSnapReceiver = await getDoc(docRefReceiver);
    if (docSnapReceiver.exists()) {
      const senderData = docSnapReceiver.data();
      const friendList = senderData.friend;
      friendList.push(sender);
      const userDocRef = doc(db, "user", receiver);
      await updateDoc(userDocRef, {
        friend: friendList,
      });
      console.log("receiver id doesnt exist");
      return null;
    }
    console.log("chat and friend successfully created");
    return null;
  }
}
