"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/action/user";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "@/components/ui/button";

const FormRegister = () => {
  return (
    <div className="flex flex-col m-4 px-10 py-8 items-center justify-center bg-[#FFFFFF] bg-opacity-60 rounded-xl min-w-[255px] w-7/12 h-[420px] shadow-2xl">
      <h1 className="text-pips-600 font-bold text-4xl">Sign Up</h1>
      <ScrollArea className="w-full m-0 pr-3">
        <form className="w-full p-1" action={register}>
          <Label className="text-pips-600 font-bold text-xl" htmlFor="fullname">
            Full Name
          </Label>
          <Input
            id="fullname"
            placeholder="John"
            type="text"
            name="fullname"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Label className="text-pips-600 font-bold text-xl" htmlFor="nickname">
            Nickname
          </Label>
          <Input
            id="nickname"
            placeholder="Doe"
            type="text"
            name="nickname"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Label className="text-pips-600 font-bold text-xl" htmlFor="email">
            Email Address
          </Label>
          <Input
            id="email"
            placeholder="johndoe@email.com"
            type="email"
            name="email"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Label className="text-pips-600 font-bold text-xl" htmlFor="password">
            Password
          </Label>
          <Input
            id="password"
            placeholder="**********"
            type="password"
            name="password"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Label className="text-pips-600 font-bold text-xl" htmlFor="nim">
            NIM
          </Label>
          <Input
            id="nim"
            placeholder="Your NIM"
            type="text"
            name="nim"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Label className="text-pips-600 font-bold text-xl" htmlFor="fakultas">
            Fakultas
          </Label>
          <Input
            id="fakultas"
            placeholder="Kedokteran"
            type="text"
            name="fakultas"
            className="rounded-xl bg-pips-600 text-[#F1EB99] h-12 text-lg"
          />
          <Button
            variant="outline"
            className="border-pips-600 bg-transparent w-full mt-4 hover:bg-pips-600 text-lg hover:text-[#F1EB99]"
          >
            Register
          </Button>

          <p className="text-pips-600 text-sm mt-2">
            Already have an account?
            <Link href="/login" className="text-pips-300">
              Log in
            </Link>
          </p>
        </form>
      </ScrollArea>
    </div>
  );
};

export default FormRegister;
