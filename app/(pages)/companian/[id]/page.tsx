import React from 'react'

const page = async({params}:any) => {
  const {id}=await params;
  return (
    <div>
      {id}
      Companian Session
    </div>
  )
}

export default page
