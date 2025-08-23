import Card from "./components/card";
import CompList from "./components/complist";
import CTA from "./components/cta";
import dbConnect from "./libs/db";
import CompanianModel from "./models/companian";
CompanianModel

export default async function Home() {
  await dbConnect();

  // Fetch all companions from the database
  const companions = await CompanianModel.find().lean();

  return (
    <div className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5">
      <h1 className="font-bold text-4xl">Popular Companion</h1>

      <section className="flex gap-4 justify-between items-center w-full max-lg:flex-col-reverse max-lg:items-center">
        {companions.slice(0, 3).map((companion) => (
          <Card key={companion._id} data={companion} />
        ))}
      </section>

      <section className="flex justify-between gap-6 max-lg:flex-col py-10">
        <CompList companions={companions} />
        <CTA />
      </section>
    </div>
  );
}
