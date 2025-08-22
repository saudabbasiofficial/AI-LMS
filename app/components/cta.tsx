import React from 'react'

const CTA = () => {
  return (
<>
<section className="bg-[#2C2C2C] rounded-3xl flex flex-col items-center text-center gap-4 p-6 w-1/3 max-lg:w-full">
  <p className="bg-[#FCCC41] text-black text-sm px-3 py-1 rounded-full">
    Start learning your way
  </p>

  <h1 className="text-2xl font-semibold text-white leading-snug">
    Build and personalize your learning companion
  </h1>

  <p className="text-gray-300 text-sm max-w-md">
    Pick a name, subject, voice & personality — then start learning through voice conversations that feel natural and fun.
  </p>

  <img src="/cta.png" alt="Learning Companion" className="max-w-[200px] w-full" />

  <a
    href="/companian/new"
    className="bg-yellow-400 text-black font-medium rounded-lg px-4 py-2 hover:bg-yellow-500 transition"
  >
    + Build a new companion
  </a>
</section>


</>
  )
}

export default CTA
