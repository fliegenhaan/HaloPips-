"use client";
import React, { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "@/lib/db";

interface MessagesProps {
  senderId: string;
  content: string;
  time: string;
  readBy: boolean;
}
const ChatRoom = (chat: { messages: MessagesProps[]; chatId: string }) => {
  const messagesList = chat.messages;
  const chatId = chat.chatId;
  const [messagesContentList, setMessagesContentList] = useState(messagesList);
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = onSnapshot(
      doc(db, "chat", chatId),
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const chatData = docSnapshot.data();
          setMessagesContentList(chatData.messages);
        }
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [chatId]);

  return (
    <div className="bg-opacity-70 h-3 grow">
      {messagesContentList.map((message, index) => (
        <div
          className="w-full h-10 border-b border-pips-600 hover:cursor-pointer"
          key={index}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ChatRoom;
