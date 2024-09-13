'use client';

import { useState } from "react";
import { uploadImage } from "@/action/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PhotoUploadForm = ({ currentPhotoURL }: { currentPhotoURL: string }) => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [previewURL, setPreviewURL] = useState(currentPhotoURL);

  const handlePhotoUpload = async (formData: FormData) => {
    try {
      const result = await uploadImage(formData);
      setMessage(result.message);
      setIsError(false);
      setPreviewURL(result.photoURL);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
      setIsError(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-col pb-4">
        <h2 className="font-bold text-pips-500 text-2xl">Update Profile Photo</h2>
        <div className="p-2 border bg-white w-80 h-80 rounded-lg mt-2">
          {previewURL && (
            <img src={previewURL} alt="Profile" className="w-full h-full object-cover rounded-lg" />
          )}
        </div>
      </div>
      <form action={handlePhotoUpload}>
        <Label className="font-bold text-xl font-mono" htmlFor="photo">
          Select New Photo
        </Label>
        <Input
          id="photo"
          type="file"
          name="photo"
          accept="image/*"
          className="rounded-xl bg-white h-12 text-lg text-pips-500"
          onChange={handleFileChange}
          required
        />
        <Button type="submit" className="mt-4">Upload Photo</Button>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PhotoUploadForm;