import React from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { getSession } from "@/lib/getSession";
import db from "@/lib/db";
import ChatNav from "@/components/chat/chatNav";
import Close from "./close";
import ChatRoom from "@/components/chat/chatRoom";
import SendMessage from "@/components/chat/sendMessage";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import NavBar from "@/components/navbar/NavBar";

interface Props {
  id: string;
  fullName: string;
  image: string;
  isActive: boolean;
  lastOnline: string;
}
async function getUserData(id: string): Promise<Props> {
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const fullName = user.fullName;
    const image = user.image;
    const isActive = user.isActive;
    const lastOnline = user.lastOnline;
    return { id, fullName, image, isActive, lastOnline };
  } else {
    return { id, fullName: "", image: "", isActive: false, lastOnline: "" };
  }
}

async function getData(): Promise<Props[]> {
  const session = await getSession();
  const id = session?.user.id;
  if (!id) return [];
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const friend = user.friend;
    const friendsData = [];
    let friendData;
    for (let i = 0; i < friend.length; i++) {
      friendData = await getUserData(friend[i]);
      friendsData.push(friendData);
    }
    return friendsData;
  } else {
    return [];
  }
}

interface MessagesProps {
  senderId: string;
  content: string;
  time: string;
  readBy: boolean;
}

function getChatId(id1: string, id2: string) {
  let sortList = [id1, id2];
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
  return chatId;
}

const Chatroom = async ({ params }: { params: { chatId: string } }) => {
  const session = await getSession();
  const sessionId = session?.user.id;
  if (sessionId) {
    const friendList = await getData();
    const chatId = getChatId(sessionId, params.chatId);
    let messages: MessagesProps[];
    const docRef = doc(db, "chat", chatId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const chat = docSnap.data();
      messages = chat.messages;
    } else {
      messages = [];
    }
    const receiverData = await getUserData(params.chatId);
    return (
      <div className="w-full h-full flex justify-between">
        <div className="w-5/12 shrink-0 border-r-4 border-pips-600">
          <ChatNav friendList={friendList}></ChatNav>
        </div>
        <div className="w-7/12 flex flex-col justify-between shrink-0">
          <div className="p-5 flex justify-between h-fit w-full bg-pips-500">
            <div className="text-pips-100 text-3xl font-bold">
              {receiverData.fullName}
            </div>
            <div>
              <Close></Close>
            </div>
          </div>
          <ChatRoom
            messages={messages}
            chatId={chatId}
            userId={sessionId}
          ></ChatRoom>

          <div className="bg-pips-600 h-fit w-full p-2">
            <SendMessage sessionId={sessionId} chatId={chatId}></SendMessage>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>not logged in</div>;
  }
};

export default Chatroom;
