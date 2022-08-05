import React from 'react'

const Loader = () => {
  return (
    <div className='flex flex-col justify-center items-center py-3'>
      <div className='animate-spin flex justify-center items-center rounded-full h-3 h-32 w-32 border-b-2 border-red-700'/>
      <p className='text-white text-sm font-light mt-2'>Processing...</p>
    </div>
  )
}

export default Loader;