"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { login, signInGoogle } from "@/action/user";
import { IconBrandGoogle } from "@tabler/icons-react";
import { Button } from "../ui/button";

const FormLogin = () => {
  return (
    <div className="flex flex-col m-4 px-10 py-8 items-center justify-center bg-[#FFFFFF] bg-opacity-60 rounded-xl min-w-[255px] w-7/12 h-7/12 shadow-2xl">
      <h1 className="text-pips-600 font-bold text-4xl">Sign In</h1>
      <form className="mt-4 w-full p-0" action={login}>
        <Label className="text-pips-600 font-bold text-xl" htmlFor="email">
          Email Address
        </Label>
        <Input
          id="email"
          placeholder="user@email.com"
          type="email"
          name="email"
          className="rounded-xl bg-pips-600 text- h-12 text-lg text-[#F1EB99]"
        />
        <Label className="text-pips-600 font-bold text-xl" htmlFor="password">
          Password
        </Label>
        <Input
          id="password"
          placeholder="**********"
          type="password"
          name="password"
          className="rounded-xl bg-pips-600 text- h-12 text-lg text-[#F1EB99]"
        />

        <Button
          variant="outline"
          type="submit"
          className="border-pips-600 bg-transparent text-lg w-full mt-4 hover:bg-pips-600 hover:text-[#F1EB99]"
        >
          Login
        </Button>
      </form>
      <p className="text-pips-600">or</p>
      <p className="text-pips-600 text-sm mt-2">
        Don&apos;t have an account?
        <Link href="/register" className="text-pips-300">
          Sign up
        </Link>
      </p>
      
    </div>
  );
};

export default FormLogin;
