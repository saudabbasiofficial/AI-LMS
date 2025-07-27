import { Bookmark, Clock } from "lucide-react";
import React from "react";

const Card = ({data}: any) => {
  return (
    <>
      <article className="p-4 gap-5 flex flex-col bg-green-200 w-full border rounded-4xl min-lg:max-w-[410px]">
        <div className="flex justify-between items-center">
          <p className="bg-black text-white rounded-lg px-3 ">{data.subject} </p>
          <p className="bg-black text-white rounded-lg p-1 ">
            <Bookmark />
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl">{data.name}</h1>
          <p>{data.topic} </p>
          <p className="flex items-center gap-1">
            <Clock size={20} /> {data.duration} mins duration
          </p>
        </div>
        
          <button className="text-center bg-black px-8 py-2 text-white rounded-xl">
            Launch Lesson
          </button>
        
      </article>
    </>
  );
};

export default Card;
