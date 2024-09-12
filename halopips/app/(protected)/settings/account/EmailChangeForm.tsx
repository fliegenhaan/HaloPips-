'use client';

import { useState } from "react";
import { updateEmail } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const EmailChangeForm = ({ initialEmail }: { initialEmail: string }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdateEmail = async (formData: FormData) => {
    try {
      const result = await updateEmail(formData);
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
      <div className="flex flex-col pb-4">
        <h2 className="font-bold text-pips-500 text-2xl">Change Email</h2>
        <p className="font-mono pt-2 text-xl font-bold ">Your current email</p>
        <div className="p-2 border bg-white w-80 rounded-lg">
          <p className="font-semibold text-gray-500">{initialEmail}</p>
        </div>
      </div>
      <form action={handleUpdateEmail}>
        <Label className="font-bold text-xl font-mono" htmlFor="email">
          Input New Email Address
        </Label>
        <Input
          id="email"
          placeholder="user@email.com"
          type="email"
          name="email"
          className="rounded-xl bg-white h-12 text-lg text-pips-500"
          required
        />
        <Button type="submit" className="mt-4">Update Email</Button>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmailChangeForm;