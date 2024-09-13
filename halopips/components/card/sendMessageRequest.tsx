"use client";
import React from "react";
import { createChat } from "@/action/createChat";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  sender: string;
  receiver: string;
}

const SendMessageRequest = ({ sender, receiver }: Props) => {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        createChat(sender, receiver).then(() =>
          router.push("/chat/" + receiver)
        )
      }
    >
      Send message
    </Button>
  );
};

export default SendMessageRequest;
