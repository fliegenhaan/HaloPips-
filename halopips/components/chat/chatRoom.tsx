"use client";
import React, { useRef, useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import db from "@/lib/db";

interface MessagesProps {
  senderId: string;
  content: string;
  time: string;
  readBy: boolean;
}
const ChatRoom = (chat: {
  messages: MessagesProps[];
  chatId: string;
  userId: string;
}) => {
  const messagesList = chat.messages;
  const chatId = chat.chatId;
  const userId = chat.userId;
  const messageEndRef = useRef<null | HTMLDivElement>(null);
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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messagesContentList]);

  return (
    <div className="grow w-full overflow-y-scroll">
      <div className="w-full max-w-full h-full">
        {messagesContentList.map((message, index) => (
          <div key={index}>
            {message.senderId === userId ? (
              <div className="w-full p-2 h-fit flex justify-end" key={index}>
                <div className="bg-pips-400 w-auto p-2 rounded-2xl shadow-xl break-words max-w-3/4">
                  <p>{message.content}</p>
                  <small className="text-gray-700">
                    {new Date(message.time).toLocaleString()}
                  </small>
                </div>
              </div>
            ) : (
              <div className="w-full p-2 h-fit" key={index}>
                <div className="bg-pips-300 w-fit p-2 rounded-2xl shadow-xl break-words max-w-3/4">
                  <p>{message.content}</p>
                  <small>{new Date(message.time).toLocaleString()}</small>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
