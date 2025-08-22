import Card from "@/app/components/card";
import { getAllCompanion } from "@/app/libs/actions";
import CompanianModel from "@/app/models/companian";
import React from "react";

const Page = async ({ searchParams }: any) => {
  const params = await searchParams;

  const topic = params.topic ? params.topic : "";
  const subject = params.subject ? params.subject : "";
  let companians = await getAllCompanion({ subject, topic });
  return (
    <>
      <main className="max-sm:px-2 w-screen pb-10 px-10">
  <section>
    <header className="mb-6">
      <h1 className="text-3xl font-bold text-gray-800">Companions Library</h1>
      <p className="text-gray-500 mt-1">Browse companions using the filters below.</p>
    </header>

    {/* Filters placeholder */}
    <div className="mb-6">
      <p className="text-sm font-medium text-gray-600">Filters</p>
      {/* Add filter UI here */}
    </div>

    {/* Cards grid */}
    <section className=" flex flex-wrap py- justify-center gap-6 w-full justify-between;
  }">
      {companians?.map((companian: any, index: number) => (
        <Card data={companian} key={index} />
      ))}
    </section>
  </section>
</main>

    </>
  );
};

export default Page;
