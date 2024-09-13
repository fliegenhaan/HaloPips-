import { getSession } from "@/lib/getSession";
import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import PhotoUploadForm from "./UploadImgCard";
import db from "@/lib/db";
import { getDoc, doc } from "firebase/firestore";

const AccountSettingsPage = async () => {
  const session = await getSession();
  const id = session?.user.id;
  
  if (!id) {
    return;
  }
  
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const user = docSnap.data();
    const image = user.image || "";
    
    return (
      <div className="flex flex-col items-start p-8 w-1/2 h-full fixed right-0 bg-[#F1EB99]">
        <SettingsNavbar page="verification" />
        <PhotoUploadForm currentPhotoURL={image} />

      </div>
    );
  } else {
    console.log("No such document!");
    return;
  }
};

export default AccountSettingsPage;