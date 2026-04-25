import { useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import NavTab from './NavTab'
import { AnimatePresence } from 'motion/react'
import { motion } from 'motion/react'


const Nav = () => {
  const [userAvatar,setUserAvatar]=useState(null)
  const [open,setOpen]=useState(false)

  const {user}=useAuth()

  return (<>
    <div className='flex items-center justify-between px-2 md:px-6 lg:px-12 shadow-finta py-1 overflow-hidden bg-white'>

  
      <motion.img
        key={user?.avatar}
        layoutId='avatar'
        src={user?.avatar  || "/default.png"} alt="profile" className='w-10 h-10 rounded-full ring-1 ring-red-400 shadow-md cursor-pointer'
        onClick={()=>setUserAvatar(!userAvatar)} />


      <svg 
      onClick={()=>setOpen(!open)}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
      <path d="M3 5h18v2H3zm2.5 6h13v2h-13zM8 17h8v2H8z"></path>
      </svg>
    </div>

    
        <motion.div
        className='relative'>
          <AnimatePresence>{open && <NavTab/>}
          </AnimatePresence>
        </motion.div>
      

       <AnimatePresence>
          {userAvatar && (
          <motion.div className='fixed top-5 left-5   rounded-md'
          onClick={()=>setUserAvatar(false)
          }>
            <motion.img 
            layoutId='avatar'
            src={user?.avatar} alt="profile-zoom" className='w-40 h-40 rounded-md shadow-weird ring-1 ring-red-400'/>
          </motion.div>
        )}
     
      </AnimatePresence>

      
      </>
  )
}

export default Nav