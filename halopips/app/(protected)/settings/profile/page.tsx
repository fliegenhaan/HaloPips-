import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import { getSession } from "@/lib/getSession";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import ProfileCard from "./ProfileCard";
import { db } from "@/lib/db";
import PhotoUploadForm from "./UploadImgCard";

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
    const instagram = user.instagram;
    const linkedin = user.linkedin;
    const idline = user.idline;
    return (
      <div className="flex flex-col items-start p-8 w-1/2 overflow-y-scroll h-[91vh] absolute right-0 bg-[#F1EB99]">
        <SettingsNavbar page="profile" />
        <PhotoUploadForm currentPhotoURL={user.image}></PhotoUploadForm>
        <ProfileCard
          initialFullname={fullName}
          initialNickname={nickName}
          initialNim={nim}
          initialFakultas={fakultas}
          initialInstagram={instagram}
          initialLinkedin={linkedin}
          initialIdline={idline}
        />
      </div>
    );
  } else {
    console.log("No such document!");
    return;
  }
};

export default ProfileSettings;
