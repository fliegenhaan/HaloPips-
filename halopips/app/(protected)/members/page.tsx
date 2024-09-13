"use server";
import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from "@/lib/db";
import GalleryGrid from "@/components/members/gallery";

interface Props {
  id: string;
  nickName: string;
  nim: string;
  jurusan: string;
  jabatan: string;
  image: string;
  angkatan: string;
  fallBack: string;
}

async function getData(): Promise<Props[]> {
  const q = query(collection(db, "user"), where("role", "==", "hmif"));
  const querySnapshot = await getDocs(q);
  const users = [] as Props[];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    const nim = user.nim;
    const fullName = user.fullName;
    let fallBack = fullName[0];
    for (let i = 1; i < fullName.length; i++) {
      if (fullName[i - 1] === " ") {
        fallBack += fullName[i];
      }
    }
    const angkatan = "20" + nim.slice(3, 5);
    users.push({
      id: user.id,
      nickName: user.nickName,
      nim: user.nim,
      jurusan: user.jurusan,
      jabatan: user.jabatan,
      image: user.image,
      angkatan,
      fallBack: fallBack.toUpperCase(),
    });
  });
  return users;
}
const Members = async () => {
  const data = await getData();
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="flex justify-center text-3xl font-bold text-pips-600">
        Ayo berbicara dengan Mahasiswa Jurusan (˶˃ ᵕ ˂˶)
      </div>
      <div className="w-10/12 m-10">
        <GalleryGrid data={data}></GalleryGrid>
      </div>
    </div>
  );
};

export default Members;
