
import CompList from "@/app/components/complist";
import dbConnect from "@/app/libs/db";
import { GetHistory, GetuserCompanian } from "@/app/libs/serveractions";
import Session_Model from "@/app/models/session_history";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CheckCircle2, GraduationCap } from "lucide-react";


const Page = async() => {
  const user =await currentUser();

  
const history=await GetHistory()
const mycompanians:any=await GetuserCompanian()

  
  return (
    <>
      <main className="flex flex-col justify-between px-10">
        <section className="flex max-md:flex-col max-md:gap-5 justify-between items-center sm:px-30">
          <div className="flex gap-4 py-5 ">
            <img src={user?.imageUrl} alt="pfp" className="h-24 rounded-2xl object-contain" />
            <div className="flex flex-col justify-between py-2">

            <h1 className="font-bold text-2xl">
              {user?.fullName}
              
              </h1>
              <p>{user?.emailAddresses[0].emailAddress}</p>
            </div>
          </div>

          <div className="flex gap-10 py-10 "> 

<div className="border rounded-xl flex flex-col items-center justify-center p-5">
  <div className="flex gap-2 items-center justify-center">

<CheckCircle2/>
<p>{history.length} </p>


  </div>
  <p className="font-bold">

  Lesson Completed
  </p>
</div >
<div className="border rounded-xl flex flex-col items-center justify-center p-5">
  <div className="flex gap-2 items-center justify-center">

<GraduationCap/>
<p >{mycompanians.length} </p>


  </div>
  <p className="font-bold ">

  Companion Created 
  </p>
</div>


          </div>
        </section>

        <section className="flex flex-col gap-10 items-center">
          <CompList companions={mycompanians} heading={`My Companions   ( ${mycompanians.length} )`} />
          <CompList companions={history} heading={"Completed Sessions"} />
        </section>
      </main>
    </>
  );
};

export default Page;
