import Card from "./components/card";
import CompList from "./components/complist";
import CTA from "./components/cta";

export default function Home() {
  let data={
    name:"Neura the Brainy Explorer",
    topic:"Neural Network of the Brain",
    duration:45,
    subject:"Science"
  }
  return (
    <>
      <div className="mx-auto px-14 flex flex-col gap-8 bg-background h-full max-w-[1400px] pt-10 max-sm:px-2 mb-5;">
        <h1 className="font-bold text-4xl">Popular Companian</h1>
        <section className="flex gap-4 justify-between items-start w-full max-lg:flex-col-reverse max-lg:items-center;">
          <Card data={data} />
          <Card data={data} />
          <Card data={data} />
        </section>
<section className="flex justify-between gap-6 max-lg:flex-col py-10" >
        <CompList companian={data}  />
        <CTA />
</section>
      </div>
    </>
  );
}
