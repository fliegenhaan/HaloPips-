"use client";

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NavBar = () => {
  return (
    <div className="flex p-4 bg-pips-600 text-pips-200">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 hover:bg-black hover:bg-opacity-20 "
          >
            <img src="/images/Menu.png" alt="image" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="bg-pips-600 border-0 w-52 sm:w-72"
        >
          <SheetHeader>
            <SheetTitle className="text-pips-200">Menu</SheetTitle>
          </SheetHeader>
          <SheetFooter>
            <SheetClose asChild>
              <div>
                <Link href="/dashboard">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                    onClick={() => console.log("clicked")}
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link href="/members">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                    onClick={() => console.log("clicked")}
                  >
                    Members
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                    onClick={() => console.log("clicked")}
                  >
                    Chat
                  </Button>
                </Link>
                <Link href="/profile/me">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                    onClick={() => console.log("clicked")}
                  >
                    Profile
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    variant="ghost"
                    className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                    onClick={() => console.log("clicked")}
                  >
                    Settings
                  </Button>
                </Link>
                <Button
                  variant={"ghost"}
                  className="w-full hover:bg-black hover:bg-opacity-20 text-pips-200 hover:text-pips-100"
                  onClick={() => signOut()}
                >
                  Logout
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavBar;
