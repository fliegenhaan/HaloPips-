import React from "react";
import BioData from "@/components/card/biodata";
import { doc, getDoc } from "firebase/firestore";
import db from "@/lib/db";
interface Props {
  id: string;
  fullName: string;
  nickName: string;
  nim: string;
  jurusan: string;
  jabatan: string;
  image: string;
  angkatan: string;
  fallBack: string;
  isOnline: boolean;
  status: string;
  idline: string;
  linkedin: string;
  instagram: string;
}
//Profile {params.id}

async function getData(id: string): Promise<Props> {
  const docRef = doc(db, "user", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const user = docSnap.data();
    const fullName = user.fullName;
    const nim = user.nim;
    let fallBack = fullName[0];
    for (let i = 1; i < fullName.length; i++) {
      if (fullName[i - 1] === " ") {
        fallBack += fullName[i];
      }
    }
    const angkatan = "20" + nim.slice(3, 5);
    return {
      id,
      fullName: user.fullName,
      nickName: user.nickName,
      nim: user.nim,
      jurusan: user.jurusan,
      jabatan: user.jabatan,
      image: user.image,
      angkatan,
      fallBack,
      isOnline: user.isOnline,
      status: user.status,
      idline: user.idline,
      linkedin: user.linkedin,
      instagram: user.instagram,
    };
  } else {
    return {
      id: "",
      fullName: "",
      nickName: "",
      nim: "",
      jurusan: "",
      jabatan: "",
      image: "",
      angkatan: "",
      fallBack: "",
      isOnline: false,
      status: "",
      idline: "",
      linkedin: "",
      instagram: "",
    };
  }
}

const Profile = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  if (data.id !== "") {
    return (
      <div className="flex h-full justify-between">
        <div className="flex justify-center items-center w-1/2 border-r-4 border-pips-600">
          <BioData data={data}></BioData>
        </div>
        <div className="flex justify-center items-center w-1/2">asd</div>
      </div>
    );
  } else {
    return <div>User not found</div>;
  }
};

export default Profile;
