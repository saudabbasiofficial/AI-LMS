import React from 'react'

const CTA = () => {
  return (
<>
<section className='bg-[#2C2C2C] gap-4 rounded-4xl flex items-center text-center flex-col py-5 px-4 w-1/3 max-lg:w-full'>
  <p className='bg-[#FCCC41] p-1 rounded-full '>Start learning your way</p>
  <h1 className='text-3xl font-bold text-white'>Build and personalize your learning companian</h1>
  <p className='text-white font-light '>Pick a name, subject, voice, & personality — and start learning through voice conversations that feel natural and fun.</p>
<img src="/cta.png" alt="" className='px-20' />
<a href="/companian/new" className='text-white font-medium bg-[#00000077] rounded-xl px-2 py-1'>
+ Build a new companian
</a>
</section>

</>
  )
}

export default CTA
