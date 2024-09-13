import React from "react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const BioData = (data: { data: Props }) => {
  const user = data.data;
  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-36 h-36 m-7">
        <AvatarImage src={user.image} />
        <AvatarFallback className="text-6xl font-semibold text-gray-500 opacity-70">
          {user.fallBack}
        </AvatarFallback>
        {user.isOnline && (
          <div className="h-5 w-5 absolute border border-pips-400 bg-pips-300 rounded-full right-0 bottom-0"></div>
        )}
      </Avatar>
      <Card className="w-fit px-10 py-3 bg-pips-600 border-none shadow-2xl">
        <CardTitle className="text-pips-100 text-xl font-bold">
          Nama Lengkap
        </CardTitle>
        <CardDescription className="text-pips-100">
          {user.fullName}
        </CardDescription>
        <CardTitle className="text-pips-100 text-xl font-bold">
          Nama Panggilan
        </CardTitle>
        <CardDescription className="text-pips-100">
          {user.nickName}
        </CardDescription>
        <CardTitle className="text-pips-100 text-xl font-bold">NIM</CardTitle>
        <CardDescription className="text-pips-100">{user.nim}</CardDescription>
        <CardTitle className="text-pips-100 text-xl font-bold">
          Angkatan
        </CardTitle>
        <CardDescription className="text-pips-100">
          {user.angkatan}
        </CardDescription>
        <CardTitle className="text-pips-100 text-xl font-bold">
          Status
        </CardTitle>
        <CardDescription className="text-pips-100">
          Mahasiswa {user.status}
        </CardDescription>
      </Card>
      <div className="flex justify-center my-2 w-full">
        {user.instagram && (
          <Popover>
            <PopoverTrigger>
              <div className="bg-pips-600 p-1 m-1 rounded-sm">
                <Image
                  src="/images/ig.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                ></Image>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit bg-pips-500 border-none shadow-2xl font-bold text-pips-100">
              {user.instagram}
            </PopoverContent>
          </Popover>
        )}
        {user.linkedin && (
          <Popover>
            <PopoverTrigger>
              <div className="bg-pips-600 p-1 m-1 rounded-sm">
                <Image
                  src="/images/in.png"
                  alt="Linkedin"
                  width={40}
                  height={40}
                ></Image>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit bg-pips-500 border-none shadow-2xl font-bold text-pips-100">
              {user.linkedin}
            </PopoverContent>
          </Popover>
        )}
        {user.idline && (
          <Popover>
            <PopoverTrigger>
              <div className="bg-pips-600 p-1 m-1 rounded-sm">
                <Image
                  src="/images/line.png"
                  alt="Line"
                  width={40}
                  height={40}
                ></Image>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit bg-pips-500 border-none shadow-2xl font-bold text-pips-100">
              {user.idline}
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default BioData;
