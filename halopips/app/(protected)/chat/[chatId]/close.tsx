"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Close = () => {
  const router = useRouter();
  return (
    <Image
      onClick={() => router.push("/chat")}
      src="/images/close.png"
      alt="close"
      width={40}
      height={40}
      className="hover:cursor-pointer"
    ></Image>
  );
};

export default Close;
