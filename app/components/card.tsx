import { Bookmark, Clock } from "lucide-react";
import React from "react";
import { getSubjectColor } from "../libs/actions";

const Card = ({data}: any) => {
  return (
    <>
     <article className="p-5 flex flex-col gap-4 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full max-w-md" style={{backgroundColor:getSubjectColor(data.subject)}}>
  {/* Subject & Bookmark */}
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium bg-gray-900 text-white px-3 py-1 rounded-full">
      {data.subject}
    </span>
    <button
      aria-label="Save Companion"
      className="p-2 rounded-full hover:bg-gray-100 transition-colors"
    >
      <Bookmark className="text-gray-700" />
    </button>
  </div>

  {/* Title & Info */}
  <div className="flex flex-col gap-1">
    <h2 className="font-semibold text-lg text-gray-900">{data.name}</h2>
    <p className="text-sm text-gray-500">{data.topic}</p>
    <p className="flex items-center gap-1 text-sm text-gray-500">
      <Clock size={16} /> {data.duration} mins
    </p>
  </div>

  {/* CTA Button */}
  <a className="mt-2 bg-gray-900 text-white text-sm font-medium py-2 text-center rounded-lg hover:bg-gray-800 transition-colors" href={`/companian/${data._id}`}>
    Launch Lesson
  </a>
</article>

    </>
  );
};

export default Card;
