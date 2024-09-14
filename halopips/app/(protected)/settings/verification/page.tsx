import { getSession } from "@/lib/getSession";
import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import { db } from "@/lib/db";
import { getDoc, doc } from "firebase/firestore";
import VerifyForm from "./VerifyForm";

const AccountSettingsPage = async () => {
  const session = await getSession();
  const id = session?.user.id;
  if (!id) {
    return;
  }
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return (
      <div className="flex flex-col items-start p-8 w-1/2 h-[91vh] overflow-y-scroll fixed right-0 bg-[#F1EB99]">
        <SettingsNavbar page="verification" />
        <VerifyForm></VerifyForm>
      </div>
    );
  } else {
    console.log("No such document!");
    return;
  }
};

export default AccountSettingsPage;
