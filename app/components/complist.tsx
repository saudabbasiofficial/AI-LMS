import React from "react";
import { getSubjectColor } from "../libs/actions";



const CompList = ({ companions ,heading}: any) => {
  return (
    <section className="border rounded-2xl p-6 w-2/3 max-lg:w-full bg-white shadow-sm">
      <h1 className="font-semibold text-2xl mb-4">{heading}</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-900 :text-gray-300 text-sm">
              <th className="pb-2">Lessons</th>
              <th className="pb-2">Subjects</th>
            </tr>
          </thead>
          <tbody>
            {companions?.length > 0 ? (
              companions.map((c:any) => (
                <tr
                  key={c._id}
                  className="border-t border-gray-200 hover:bg-gray-50  transition"
                >
                  <td className="py-3 flex items-center gap-3">
                    
                    <img src="/file.svg" alt="" className="h-14 w-14 p-1 rounded-lg " style={{backgroundColor:getSubjectColor(c?.subject)}} />
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-gray-700">{c.topic}</p>
                    </div>
                  </td>
                  <td>
                    <span className="inline-block text-xs font-medium bg-gray-100   rounded-full px-3 py-1">
                      {c.subject}
                    </span>
                  </td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-6 text-center text-gray-500">
                  No recent companions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CompList;
