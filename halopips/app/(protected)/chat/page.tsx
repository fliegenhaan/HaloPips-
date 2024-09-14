import React from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/db";
import { getSession } from "@/lib/getSession";

import ChatNav from "@/components/chat/chatNav";

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

const Chat = async () => {
  const friendList = await getData();
  return (
    <div className="flex h-full justify-between">
      <div className="w-5/12 border-r-4 border-pips-600">
        <ChatNav friendList={friendList} currentId={null}></ChatNav>
      </div>{" "}
    </div>
  );
};

export default Chat;
