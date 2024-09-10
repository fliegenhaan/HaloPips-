import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/action/user";
import Link from "next/link";
import React from 'react';
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";


const Register = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    redirect("/");
  } // mencegah user yang sedang login untuk register;

  return (
    <div className="flex flex-col items-center justify-center bg-white w-full h-screen">
      <h1 className="text-[#221F1F] font-bold text-4xl">Sign up</h1>
      <div className="flex flex-col m-4 px-16 py-8 items-center justify-center bg-[#221F1F] rounded-xl border border-white w-[400px] min-h-[500px]">

        <form className="w-full" action={register}>
            <div className="py-6">
                <Label className="text-white" htmlFor="firstname">First Name</Label>
                <Input
                id="firstname"
                placeholder="John" 
                type="text" 
                name="firstname" 
                />
                <Label className="text-white" htmlFor="lastname">Last Name</Label>
                <Input
                id="lastname" 
                placeholder="Doe" 
                type="text" 
                name="lastname" 
                />
            </div>
            <Label className="text-white" htmlFor="email">Email Address</Label>
            <Input
            id="email" 
            placeholder="johndoe@email.com" 
            type="email"
            name="email" 
            />
            <Label className="text-white" htmlFor="password">Password</Label>
            <Input
            id="password" 
            placeholder="**********" 
            type="password"
            name="password" 
            />
        
            <button className="bg-green-700 text-white p-2 rounded-lg mt-4 w-full hover:bg-white">Sign up &rarr;</button>
            
            <p className="text-white text-sm mt-2">Already have an account? <Link href="/login">Log in</Link></p>

        </form>
      </div>

    </div>
  )
}

export default Register