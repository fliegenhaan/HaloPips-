import { login } from "@/action/user";
import { signIn } from "@/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGoogle } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from 'react';
import { getSession } from "@/lib/getSession";


const Login = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    redirect("/");
  } // mencegah user yang sedang login untuk mengakses halaman login

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-screen">
      <h1 className="text-[#221F1F] font-bold text-4xl">Log in</h1>
      <div className="flex flex-col m-4 px-16 py-8 items-center justify-center bg-[#221F1F] rounded-xl border border-white w-[400px] min-h-[500px]">


        <form className="mt-4 w-full" action={login}>
            <Label className="text-white" htmlFor="email">Email Address</Label>
            <Input
            id="email" 
            placeholder="user@email.com" 
            type="email"
            name="email" 
            className="mb-4"
            />
            <Label className="text-white" htmlFor="password">Password</Label>
            <Input
            id="password" 
            placeholder="**********" 
            type="password"
            name="password" 
            className="mb-4"
            />

            <button className="bg-green-700 text-white p-2 rounded-lg mt-4 w-full hover:bg-white">Log in &rarr;</button>
        </form>
        <p className="text-neutral-300">or</p>
        <form className="w-full" action={async () => {
          "use server";
          await signIn("google");
        }}>
            <button 
             className="bg-green-700 text-white p-2 rounded-lg w-full hover:bg-white flex items-center justify-center" 
             type="submit">
                <IconBrandGoogle className="w-4 h-4 text-neutral-800 mr-2"/>
                <span className="text-neutral-800 text-sm">Google</span>
            </button>
            <p className="text-white text-sm mt-2">Don't have an account? <Link href="/register">Sign up</Link></p>
        </form>
      </div>

    </div>
  )
}

export default Login;
