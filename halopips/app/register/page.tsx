import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
import FormRegister from "@/components/auth/FormRegister";
import AuthNav from "@/components/auth/AuthNav";

const Register = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    redirect("/");
  } // mencegah user yang sedang login untuk register;

  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full fixed right-0 bg-[#F1EB99]">
      <img src="/images/logo.png" className="h-40 w-40"></img>
      <FormRegister></FormRegister>
      <AuthNav page={"register"}></AuthNav>
    </div>
  );
};

export default Register;
