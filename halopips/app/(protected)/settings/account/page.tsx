// import { updateEmail, updatePassword } from "@/action/user";
// import SettingsNavbar from "@/components/navbar/SettingsNavbar";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { getSession } from "@/lib/getSession";
// import React from "react";

// const AccountSettings = async () => {
//   const session = await getSession();
//   const user = session?.user;
//   if (user) {
//     return (
//       <div className="flex flex-col items-start p-8 w-1/2 h-full fixed right-0 bg-[#F1EB99]">
//         <SettingsNavbar page="account" />
//         <div className="p-2">
//           <div className="flex flex-col pb-4">
//             <h2 className="font-bold text-pips-500 text-2xl">Change Email</h2>
//             <p className="font-mono pt-2 text-xl font-bold ">Your current email</p>
//             <div className="p-2 border bg-white w-80 rounded-lg">
//               <p className="font-semibold text-gray-500">johndoe@gmail.com</p>
//             </div>
//           </div>
//           <form action={updateEmail}>
//             <Label className="font-bold text-xl font-mono" htmlFor="email">
//               Input New Email Adress
//             </Label>
//             <Input
//               id="email"
//               placeholder="user@email.com"
//               type="email"
//               name="email"
//               className="rounded-xl bg-white h-12 text-lg text-[#F1EB99]"
//             />
//           </form>
//         </div>
//         <div className="p-2">
//           <form action={updatePassword}>
//             <div className="flex flex-col py-4">
//               <h2 className="font-bold text-pips-500 text-2xl">Change Password</h2>
//               <Label className="font-bold text-xl font-mono pt-2" htmlFor="password">
//                 Enter Your Current Password
//               </Label>
//               <Input
//                 id="password"
//                 placeholder="**********"
//                 type="password"
//                 name="password"
//                 className="rounded-xl bg-white h-12 text-lg text-[#F1EB99]"
//               />
//             </div>
//             <Label className="font-bold text-xl font-mono" htmlFor="password">
//               Input New Password
//             </Label>
//             <Input
//               id="password"
//               placeholder="**********"
//               type="password"
//               name="password"
//               className="rounded-xl bg-white h-12 text-lg text-[#F1EB99]"
//             />
//           </form>
//         </div>
//       </div>
//     );
// };
// };

// export default AccountSettings;
import { getSession } from "@/lib/getSession";
import SettingsNavbar from "@/components/navbar/SettingsNavbar";
import EmailChangeForm from "./EmailChangeForm";

const AccountSettingsPage = async () => {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    return;
  }

  return (
    <div className="flex flex-col items-start p-8 w-1/2 h-full fixed right-0 bg-[#F1EB99]">
      <SettingsNavbar page="account" />
      <EmailChangeForm initialEmail={user.email} />
    </div>
  );
};

export default AccountSettingsPage;