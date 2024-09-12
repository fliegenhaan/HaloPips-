import React from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/db";
import FormCreate from "@/components/admin/formEdit";

const EditUser = async ({ params }: { params: { id: string } }) => {
  const docRef = doc(db, "user", params.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const fullName = user.fullName;
    const email = user.email;
    const nickName = user.nickName;
    const nim = user.nim;
    const status = user.status;
    const jabatan = user.jabatan;
    const jurusan = user.jurusan;
    // { id, email, fullName, nickName, nim, status, jurusan, jabatan, }
    return (
      <div className="w-1/2">
        <div>EditUser {params.id}</div>
        <FormCreate
          id={params.id}
          email={email}
          fullName={fullName}
          nickName={nickName}
          nim={nim}
          status={status}
          jurusan={jurusan}
          jabatan={jabatan}
        ></FormCreate>
      </div>
    );
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return <div>No such document!</div>;
  }
};

export default EditUser;
