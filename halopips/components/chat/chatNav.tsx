"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  fullName: string;
  image: string;
  isActive: boolean;
  lastOnline: string;
}

const ChatNav = (friendList: { friendList: Props[] }) => {
  const router = useRouter();
  const friends = friendList.friendList;
  return (
    <div>
      {friends.map((item, index) => (
        <div
          onClick={() => router.push("/chat/" + item.id)}
          className="w-full h-10 border-b border-pips-600 hover:cursor-pointer"
          key={index}
        >
          {item.fullName}
        </div>
      ))}
    </div>
  );
};

export default ChatNav;
