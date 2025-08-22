"use client"
import React, { useEffect, useRef, useState } from 'react'
import { vapi } from '../libs/vapi'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'
import soundwaves from "../libs/soundwaves.json"
import { currentUser } from '@clerk/nextjs/server'
import { useUser } from '@clerk/nextjs'
import { Mic, MicOff, PhoneCall, Repeat1Icon } from 'lucide-react'
enum ECallStatus{
    INACTIVE="INACTIVE",
    CONNECTING="CONNECTING" ,
    ACTIVE="ACTIVE",
    FINISHED="FINISHED"
}
const CompanianComponent = ({data}:any) => {
    const [Callstatus, setCallstatus] = useState<ECallStatus>(ECallStatus.INACTIVE)
    const [isSpeaking,setisSpeaking]=useState(false)
    const [IsMuted,setIsMuted]=useState(false)
function ConnectCall(){}
function DisConnectCall(){}
    const lottieRef=useRef<LottieRefCurrentProps>(null)
    const {user} = useUser()
    useEffect(() => {
    
  if(lottieRef){
    if(isSpeaking) {lottieRef.current?.play()}
        else lottieRef.current?.stop()
  }
  
  }, [isSpeaking,lottieRef])
  
  useEffect(()=>{
    const onCallStart=()=>{setCallstatus(ECallStatus.ACTIVE)}
    const onCallEnd=()=>{setCallstatus(ECallStatus.FINISHED)}
    const onMessage=()=>{}
    const onSpeechStart=()=>{setisSpeaking(true)}
    const onSpeechEnd=()=>{setisSpeaking(false)}
    const onError=(error:Error)=>{console.log(error)}
    vapi.on("call-start",onCallStart)
    vapi.on("call-end",onCallEnd)
    vapi.on("error",onError)
    vapi.on("speech-start",onSpeechStart)
    vapi.on("speech-end",onSpeechEnd)
    vapi.on("message",onMessage)
    return ()=>{
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("error", onError);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("message", onMessage);
    }
  },[])


  const toggleMic=()=>{
    const isMuted=vapi.isMuted();
    vapi.setMuted(!isMuted)
    setIsMuted(!isMuted)
  }
    return (
      <>
        <section className="flex max-md:flex-col gap-5">
          <div className="h-[70vh] border rounded-2xl flex flex-col gap-3 items-center justify-center w-full ">
            <div
              className={
                Callstatus === ECallStatus.INACTIVE ||
                Callstatus === ECallStatus.FINISHED
                  ? "block"
                  : "hidden"
              }
            >
              <img src="/next.svg" alt="" className="h-15 object-contain" />
            </div>
            <div
              className={Callstatus === ECallStatus.ACTIVE ? "block" : "hidden"}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
              />
            </div>
            <h1 className="font-bold text-4xl">{data.name}</h1>
          </div>

          <section className="w-1/3 max-md:w-full flex flex-col gap-4">
            <div className="  rounded-lg border h-90 flex items-center justify-center gap-2 p-10 flex-col ">
              <img src={user?.imageUrl} alt="" className="rounded-xl h-30 object-contain" />
              <p className='font-semibold text-lg'>{user?.firstName}</p>
            </div>
            <div className='flex gap-2 max-md:flex-col'>
<button className='p-5 border rounded-lg flex flex-col items-center' onClick={toggleMic}>
   {!IsMuted?
   
   <>
   <Mic/>
   <p className='font-bold'>Turn off Mic</p>
   </>
   
   :
   <>
   <MicOff/>
   <p className='font-bold'>Turn On Mic</p>
   </>
   }


</button>
<button className='p-5 border rounded-lg flex-col items-center'>
    <Repeat1Icon/>
    <p className='font-bold'>Repeat</p>
</button>
            </div>
            <button className='font-bold text-white bg-orange-500 rounded-lg py-2' onClick={Callstatus===ECallStatus.ACTIVE? DisConnectCall:ConnectCall} >

{Callstatus===ECallStatus.ACTIVE?"End lesson":
Callstatus===ECallStatus.CONNECTING?"Connecting":

"Start Lesson"

}
                
              



            </button>
          </section>
          <section>

          </section>
        </section >
            <div className='no-scr'>
                MESSAGES
            </div>
      </>
    );
}

export default CompanianComponent
