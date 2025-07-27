import React from "react";

const CompList = ({companian}:any) => {
  return (
    <>
      <section className="border rounded-4xl p-10 w-2/3 max-lg:w-full">
        <h1 className="font-bold text-3xl py-3">Recent Companians</h1>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="font-sm font-medium">
                <th>Lessons</th>
                <th>Subjects</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>



             {/* {companian.map((data:any,index:number)=>( */}



               <tr className="border-b-2 border-[#b3b3b328]">
                <td className="flex items-center gap-3">
<img src="/file.svg" alt=""  className="aspect-square h-10"/>
<div>
<p className="font-bold text-lg">{companian.name} </p>
<p className="font-light text-sm">{companian.topic} </p>

</div>

                </td>
                <td >
                  <span className="text-white bg-black rounded-2xl px-3 py-1 ">
                    {companian.subject} 
                    </span>
                    </td>
                <td className="text-lg font-semibold flex justify-center">{companian.duration} </td>
              </tr>
              {/* ))} */}


          
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default CompList;
