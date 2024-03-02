import React from 'react'

function Menu({ isOpen, toggleOverlayFunction }) {

  if (!isOpen) { return null; }
  return (
    <div name="transparentBG" className='absolute top-0 left-0 bg-violet-500 bg-opacity-30 w-full flex flex-row min-h-screen justify-center items-center'>
      <div name="menuButtons" className='text-4xl text-slate-400'>
        Title<br></br><br></br>
        <button onClick={toggleOverlayFunction} className='p-2 text-black bg-white rounded-lg'>
          Play
        </button>
      </div>
    </div>
  )
}

export default Menu