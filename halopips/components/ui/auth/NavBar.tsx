import React from "react";
import Link from "next/link";
import { Button } from "../button";
import { signOut } from "@/auth";
import { getSession } from "@/lib/getSession";

const NavBar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <nav className="flex fixed top-0 right-0 left-0 justify-around items-center py-4 bg-[#141414] text-white">
      <Link href="/" className="text-xl font-bold hover:text-green">
        Halopips
      </Link>
      <ul className="hidden md:flex space-x-4 list-none">
        {!user && (
          <>
            <li>
              <Link href="/login" className="hover:text-green">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-green">
                Register
              </Link>
            </li>
          </>
        )}
        {user && (
          <>
            <li>
              <Link href="/dashboard" className="hover:text-green">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-green">
                My Profile
              </Link>
            </li>
            <li>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <Button
                  type="submit"
                  variant={"ghost"}
                  className="hover:text-green"
                >
                  Logout
                </Button>
              </form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
