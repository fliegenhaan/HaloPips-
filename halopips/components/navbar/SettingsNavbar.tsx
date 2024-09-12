import React from "react";
import Link from "next/link";

interface Props {
  page: string;
}

const SettingsNav = ({ page }: Props) => {
    if (page === "account") {
        return (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-x-36 -translate-y-1/2">
            <div className="relative py-1 px-10 font-bold text-lg rounded-full bg-[#F1EB99] text-pips-600">
              Account
            </div>
            <Link href="/settings/profile">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Profile
              </div>
            </Link>
            <Link href="/settings/verification">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Verification
              </div>
            </Link>
          </div>
        );
      } else if (page === "profile") {
        return (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-x-36 -translate-y-1/2">
            <Link href="/settings/account">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Account
              </div>
            </Link>
            <div className="relative py-1 px-10 font-bold text-lg rounded-full bg-[#F1EB99] text-pips-600">
              Profile
            </div>
            <Link href="/settings/verification">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Verification
              </div>
            </Link>
          </div>
        );
      } else {
        return (
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-x-36 -translate-y-1/2">
            <Link href="/settings/account">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Account
              </div>
            </Link>
            <Link href="/settings/profile">
              <div className="relative py-1 px-10 font-bold text-lg rounded-full text-[#F1EB99] hover:cursor-pointer">
                Profile
              </div>
            </Link>
            <div className="relative py-1 px-10 font-bold text-lg rounded-full bg-[#F1EB99] text-pips-600">
              Verification
            </div>
          </div>
        );
      };
    };
export default SettingsNav;
