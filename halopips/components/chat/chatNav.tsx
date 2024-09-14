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

const ChatNav = (friendList: {
  friendList: Props[];
  currentId: string | null;
}) => {
  const router = useRouter();
  const friends = friendList.friendList;
  const currentId = friendList.currentId;
  if (currentId) {
    return (
      <div>
        {friends.map((item, index) => (
          <div>
            {item.id === currentId ? (
              <div
                className="w-full h-14 border-b font-bold border-pips-600 bg-pips-300 p-2"
                key={index}
              >
                {item.fullName}
              </div>
            ) : (
              <div
                onClick={() => router.push("/chat/" + item.id)}
                className="w-full h-14 border-b font-semibold border-pips-600 hover:cursor-pointer p-2 hover:bg-pips-600 hover:bg-opacity-20"
                key={index}
              >
                {item.fullName}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {friends.map((item, index) => (
          <div
            onClick={() => router.push("/chat/" + item.id)}
            className="w-full h-14 border-b font-semibold border-pips-600 hover:cursor-pointer p-2 hover:bg-pips-600 hover:bg-opacity-20"
            key={index}
          >
            {item.fullName}
          </div>
        ))}
      </div>
    );
  }
};

export default ChatNav;
