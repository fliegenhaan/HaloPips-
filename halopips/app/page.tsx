import React from "react";
import AuthButton from "@/components/auth/AuthButton";

const Home = () => {
  return (
    <div>
      <div className="w-2/4 absolute top-[130px] left-1/2 -translate-x-1/2">
        <div className="text-8xl font-bold text-center w-full text-pips-600">
          Welcome
        </div>
        <div className="w-full h-72"></div>
        <AuthButton></AuthButton>
      </div>
    </div>
  );
};

export default Home;
