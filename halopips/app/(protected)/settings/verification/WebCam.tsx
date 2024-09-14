"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

const WebcamComponent = () => {
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
      }); // Stop each track of the media stream
      setStream(null); // Clear the stream state
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
        <button onClick={captureSnapshot}>Capture Snapshot</button>
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
    </div>
  );
};

export default WebcamComponent;
