"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <Button
        variant="outline"
        className="bg-transparent text-white py-9 text-4xl font-semibold rounded-full my-3 focus:bg-gray-400"
        onClick={() => router.push("/register")}
      >
        Register
      </Button>
      <Button
        variant="outline"
        className="bg-transparent text-white py-9 text-4xl font-semibold rounded-full my-3 focus:bg-gray-400"
        onClick={() => router.push("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthButton;
