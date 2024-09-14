"use server";
import { Posts, columns } from "./columns";
import { DataTable } from "./data-table";
import React from "react";
import { db } from "@/lib/db";
import { collection, query, where, getDocs } from "firebase/firestore";
import Link from "next/link";
async function getData(): Promise<Posts[]> {
  const q = query(collection(db, "user"), where("role", "==", "hmif"));
  const querySnapshot = await getDocs(q);
  const users = [] as Posts[];
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    users.push({
      id: user.id,
      role: user.role,
      email: user.email,
      fullName: user.fullName,
      nim: user.nim,
      status: user.status,
      jurusan: user.jurusan,
      jabatan: user.jabatan,
      image: user.image,
    });
  });
  return users;
}
const User = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto p-10 bg-white">
      <Link href="/admin/user/create">Create</Link>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default User;
