"use client";
import React, { useEffect, useRef, useState } from "react";
import { configureAssistant, vapi } from "../libs/vapi";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from "../libs/soundwaves.json";
import { useUser } from "@clerk/nextjs";
import { Mic, MicOff, PhoneCall, Repeat1Icon } from "lucide-react";
import { addtoHistory } from "../libs/serveractions";
// import { addtoHistory } from "../libs/actions";

enum ECallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

const CompanianComponent = ({ data }: any) => {
  const [Callstatus, setCallstatus] = useState<ECallStatus>(ECallStatus.INACTIVE);
  const [isSpeaking, setisSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const { user } = useUser();

  const ConnectCall = async () => {
    setCallstatus(ECallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: {
        subject: data.subject,
        topic: data.topic,
        style: data.style,
      
      },
    };

    try {
      await vapi.start(configureAssistant(data.voice, data.style), assistantOverrides);
      setCallstatus(ECallStatus.ACTIVE);
    } catch (err) {
      console.error("Failed to start assistant:", err);
      setCallstatus(ECallStatus.INACTIVE);
    }
  };

  useEffect(() => {
  async function initDevices() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        console.log("Available devices:", devices);
      } else {
        console.warn("No mediaDevices API available (no microphone detected). Skipping mic setup.");
      }
    } catch (error) {
      console.error("Microphone access failed:", error);
    }
  }

  initDevices();
}, []);

  const DisConnectCall = () => {
    vapi.stop();
    setCallstatus(ECallStatus.FINISHED);
    addtoHistory(data._id)
  
  };

  useEffect(() => {
    if (lottieRef.current) {
      isSpeaking ? lottieRef.current.play() : lottieRef.current.stop();
    }
  }, [isSpeaking]);

  useEffect(() => {
    const onCallStart = () => setCallstatus(ECallStatus.ACTIVE);
    const onCallEnd = () => setCallstatus(ECallStatus.FINISHED);
    const onSpeechStart = () => setisSpeaking(true);
    const onSpeechEnd = () => setisSpeaking(false);
    const onError = (error: Error) => console.error("VAPI error:", error);

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("error", onError);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("error", onError);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
    };
  }, []);

  const toggleMic = () => {
    if (Callstatus !== ECallStatus.ACTIVE) {
      console.warn("Cannot toggle mic: No active call");
      return;
    }

    try {
      const nextMutedState = !isMuted;
      vapi.setMuted?.(nextMutedState); // Safely call if available
      setIsMuted(nextMutedState);
    } catch (error) {
      console.error("Failed to toggle mic:", error);
    }
  };

  return (
    <>
      <section className="flex max-md:flex-col gap-5">
        <div className="h-[70vh] border rounded-2xl flex flex-col gap-3 items-center justify-center w-full">
          {(Callstatus === ECallStatus.INACTIVE || Callstatus === ECallStatus.FINISHED) && (
            <img src="/next.svg" alt="Idle" className="h-15 object-contain" />
          )}

          {Callstatus === ECallStatus.ACTIVE && (
            <Lottie lottieRef={lottieRef} animationData={soundwaves} autoplay={false} />
          )}

          <h1 className="font-bold text-4xl">{data.name}</h1>
        </div>

        <section className="w-1/3 max-md:w-full flex flex-col gap-4">
          <div className="rounded-lg border h-90 flex items-center justify-center gap-2 p-10 flex-col">
            <img
              src={user?.imageUrl}
              alt="User"
              className="rounded-xl h-30 object-contain"
            />
            <p className="font-semibold text-lg">{user?.firstName}</p>
          </div>
          <div className="flex gap-2 max-md:flex-col">
            <button
              className="p-5 border rounded-lg flex flex-col items-center justify-center"
              onClick={toggleMic}
              disabled={Callstatus !== ECallStatus.ACTIVE}
            >
              {!isMuted ? (
                <>
                  <Mic />
                  <p className="font-bold">Turn off Mic</p>
                </>
              ) : (
                <>
                  <MicOff />
                  <p className="font-bold">Turn On Mic</p>
                </>
              )}
            </button>
  
          </div>
          <button
            className="font-bold text-white bg-orange-500 rounded-lg py-2"
            onClick={Callstatus === ECallStatus.ACTIVE ? DisConnectCall : ConnectCall}
          >
            {Callstatus === ECallStatus.ACTIVE
              ? "End lesson"
              : Callstatus === ECallStatus.CONNECTING
              ? "Connecting..."
              : "Start Lesson"}
          </button>
        </section>
      </section>
      <div className="no-scr">MESSAGES</div>
    </>
  );
};

export default CompanianComponent;
