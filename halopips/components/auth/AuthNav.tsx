import React from "react";
import Link from "next/link";

interface Props {
  page: string;
}
const AuthNav = ({ page }: Props) => {
  if (page === "register") {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-x-32 -translate-y-1/2">
        <div className="relative py-1 px-10 font-bold text-lg rounded-full bg-[#F1EB99] text-pips-600">
          Register
        </div>
        <Link href="/login">
          <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
            Login
          </div>
        </Link>
      </div>
    );
  } else {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-x-32 -translate-y-1/2">
        <Link href="/register">
          <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
            Register
          </div>
        </Link>
        <div className="relative py-1 px-10 font-bold text-lg rounded-full bg-[#F1EB99] text-pips-600">
          Login
        </div>
      </div>
    );
  }
};

export default AuthNav;
