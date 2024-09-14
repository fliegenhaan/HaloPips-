"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { submitVerify } from "@/action/submitVerify";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const VerifyForm = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [previewURL, setPreviewURL] = useState("");
  const [useCamera, setUseCamera] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snapshot, setSnapshot] = useState("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  useEffect(() => {
    const startWebcam = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };
    startWebcam();
  }, [useCamera]);

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
        console.log("test");
      });
      setStream(null);
    }
  };
  const handleSendRequest = async (formData: FormData) => {
    if (!snapshot) return setMessage("Please capture using camera");
    try {
      const result = await submitVerify(formData, snapshot);
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
  const captureSnapshot = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setSnapshot(dataUrl);
      }
    }
  };

  return (
    <div>
      <>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", height: "auto" }}
        />
        <Button onClick={captureSnapshot}>Capture Snapshot</Button>
        <br />
        <button onClick={stopWebcam}>Turn Off Camera</button>
        <br></br>
        <button
          onClick={() => {
            if (useCamera) {
              setUseCamera(false);
            } else {
              setUseCamera(true);
            }
          }}
        >
          Turn On Camera
        </button>
        <canvas
          ref={canvasRef}
          style={{ display: "none" }}
          width={640}
          height={480}
        />
        {snapshot && (
          <Image height={200} width={200} src={snapshot} alt="Snapshot" />
        )}
      </>
      <div className="p-2">
        <div className="flex flex-col pb-4">
          <h2 className="font-bold text-pips-500 text-2xl">preview ktm</h2>
          <div className="p-2 border bg-white w-80 h-60 rounded-lg mt-2">
            {previewURL && (
              <Image
                src={previewURL}
                alt="Profile"
                height={240}
                width={320}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </div>
        </div>
        <form action={handleSendRequest}>
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
          <Button type="submit" className="mt-4">
            Send Verification Request
          </Button>
        </form>
        {message && (
          <p className={`mt-4 ${isError ? "text-red-500" : "text-green-500"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyForm;
