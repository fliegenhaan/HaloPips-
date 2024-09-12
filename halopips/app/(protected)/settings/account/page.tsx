import { getSession } from "@/lib/getSession";
import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import EmailChangeForm from "./EmailChangeForm";
import db from "@/lib/db";
import { getDoc, doc } from "firebase/firestore";
import PasswordChangeForm from "./PasswordChangeForm";

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
    const email = user.email;
    const password = user.password;
    return (
      <div className="flex flex-col items-start p-8 w-1/2 h-full fixed right-0 bg-[#F1EB99]">
        <SettingsNavbar page="account" />
        <EmailChangeForm initialEmail={email} />
        <PasswordChangeForm initialPassword={password} />
      </div>
    );
  } else {
    console.log("No such document!");
    return;
  }
};

export default AccountSettingsPage;
