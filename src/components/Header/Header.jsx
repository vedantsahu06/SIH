import React from 'react'
import { FloatingDockDemo } from "../FloatingDockDemo";
function Header() {
  return (
    <>

     <div className="fixed top-0 left-0 w-full flex justify-center z-30">
            <FloatingDockDemo />
          </div>
    </>
  )
}

export default Header
    