'use client';

import { useState } from "react";
import { updatePassword } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PasswordChangeForm = ({ initialPassword }: { initialPassword: string }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdatePassword = async (formData: FormData) => {
    try {
      const result = await updatePassword(formData);
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
    <div className="p-2">
      <form action={handleUpdatePassword}>
        <Label className="font-bold text-xl font-mono" htmlFor="oldpassword">
          Input Your Current Password
        </Label>
        <Input
          id="oldpassword"
          placeholder="************"
          type="password"
          name="oldpassword"
          className="rounded-xl bg-white h-12 text-lg text-[#F1EB99]"
          required
        />
        <Label className="font-bold text-xl font-mono" htmlFor="newpassword">
          Input New Password
        </Label>
        <Input
          id="newpassword"
          placeholder="************"
          type="password"
          name="newpassword"
          className="rounded-xl bg-white h-12 text-lg text-[#F1EB99]"
          required
        />
        <Button type="submit" className="mt-4">Update Password</Button>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PasswordChangeForm;