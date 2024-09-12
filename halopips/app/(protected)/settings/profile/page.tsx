import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import React from "react";

const ProfileSettings = () => {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-full fixed right-0 bg-[#F1EB99]">
      <SettingsNavbar page="profile" />
      Profile Settings
    </div>
  )
};

export default ProfileSettings;
