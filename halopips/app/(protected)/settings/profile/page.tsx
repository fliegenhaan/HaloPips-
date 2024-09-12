import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import { getSession } from "@/lib/getSession";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import ProfileCard from "./ProfileCard";
import db from "@/lib/db";

const ProfileSettings = async () => {
  const session = await getSession();
  const id = session?.user.id;
  if (!id) {
    return;
  }
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const fullName = user.fullName;
    const nickName = user.nickName;
    const nim = user.nim;
    const fakultas = user.fakultas;
    const role = user.role;
    const instagram = user.instagram;
    const linkedin = user.linkedin;
    const idline = user.idline;
    return (
      <div className="flex flex-col items-start p-8 w-1/2 h-full fixed right-0 bg-[#F1EB99]">
        <SettingsNavbar page="profile" />
        <ProfileCard 
        initialFullname={fullName} 
        initialNickname={nickName} 
        initialNim={nim} 
        initialFakultas={fakultas} 
        initialInstagram={instagram} 
        initialLinkedin={linkedin} 
        initialIdline={idline}  />
      </div>
    );
  } else {
    console.log("No such document!");
    return;
  }
};

export default ProfileSettings;
