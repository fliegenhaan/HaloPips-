import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "@/lib/getSession";
import AuthNav from "@/components/auth/AuthNav";
import Image from "next/image";
const Login = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    redirect("/");
  } // mencegah user yang sedang login untuk mengakses halaman login

  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full fixed right-0 bg-[#F1EB99]">
      <Image
        src="/images/logo.png"
        className="h-40 w-40"
        alt="logo"
        width={160}
        height={160}
      ></Image>
      <AuthNav page={"login"}></AuthNav>
    </div>
  );
};

export default Login;
