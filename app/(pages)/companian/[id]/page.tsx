import CompanianComponent from "@/app/components/companianComponent";
import { getAcompanian } from "@/app/libs/actions";
import React from "react";

const page = async ({ params }: any) => {
  const { id } = await params;
  const companian = await getAcompanian(id);
  console.log(companian);



  return (
    <>
      <main className="px-2 lg:px-[15%] py-10">
        <article className="flex flex-col gap-10">
          {/*######## top Header ############*/}
          <section className="flex items-center gap-2 border border-gray-500 rounded-4xl w-full justify-between py-4 px-4 ">
            <div className="px-4 py-2 flex gap-2">
              <img
                src="/logo.svg"
                alt=""
                className="bg-black p-1 max-md:hidden"
              />

              <div>
                <h1 className="font-bold text-2xl flex items-center gap-3 ">
                  {companian.name}{" "}
                  <p className="font-medium text-sm flex text-white bg-black rounded-full px-2 py-.5 mt-1 ">
                    {companian.subject}
                  </p>{" "}
                </h1>

                <p>{companian.topic}</p>
              </div>
            </div>

            <p className="font-medium text-lg max-md:hidden">45 mins</p>
          </section>

       
         <CompanianComponent data={companian.toJSON()}/>

       
        </article>
      </main>
    </>
  );
};

export default page;
