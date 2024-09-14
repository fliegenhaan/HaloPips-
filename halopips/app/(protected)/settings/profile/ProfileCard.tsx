"use client";

import { useState } from "react";
import { updateProfile } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ProfileCard = ({
  initialFullname,
  initialNickname,
  initialFakultas,
  initialNim,
  initialInstagram,
  initialLinkedin,
  initialIdline,
}: {
  initialFullname: string;
  initialNickname: string;
  initialFakultas: string;
  initialNim: string;
  initialInstagram: string;
  initialLinkedin: string;
  initialIdline: string;
}) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdateProfile = async (formData: FormData) => {
    try {
      const result = await updateProfile(formData);
      setMessage(result.message);
      setIsError(false);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
      setIsError(true);
    }
  };

  return (
    <div className="p-2 h-full">
      <form className="h-full" action={handleUpdateProfile}>
        <Label className="font-bold text-xl font-mono" htmlFor="fullName">
          Full Name
        </Label>
        <Input
          id="fullName"
          placeholder="Full Name"
          defaultValue={initialFullname}
          type="text"
          name="fullName"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="nickName">
          Nickname
        </Label>
        <Input
          id="nickName"
          placeholder="Nickname"
          defaultValue={initialNickname}
          type="text"
          name="nickName"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="fakultas">
          Fakultas
        </Label>
        <Input
          id="fakultas"
          placeholder="Fakultas"
          defaultValue={initialFakultas}
          type="text"
          name="fakultas"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="nim">
          NIM
        </Label>
        <Input
          id="nim"
          placeholder="NIM"
          defaultValue={initialNim}
          type="text"
          name="nim"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="instagram">
          Instagram
        </Label>
        <Input
          id="instagram"
          placeholder="Instagram"
          defaultValue={initialInstagram}
          type="text"
          name="instagram"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="linkedin">
          LinkedIn
        </Label>
        <Input
          id="linkedin"
          placeholder="LinkedIn"
          defaultValue={initialLinkedin}
          type="text"
          name="linkedin"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="idline">
          ID Line
        </Label>
        <Input
          id="idline"
          placeholder="ID Line"
          defaultValue={initialIdline}
          type="text"
          name="idline"
          className="rounded-xl bg-white h-12 text-lg text-pips-500 font-semibold w-96"
          required
        />
        <Button type="submit" className="mt-4">
          Update Profile
        </Button>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ProfileCard;
