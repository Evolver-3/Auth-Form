import React, { useEffect } from 'react'
import {AnimatePresence, motion} from 'motion/react'
import { Link } from 'react-router-dom'
import AllReport from './AllReport'
import { useAuth } from '../../../auth/hooks/useAuth.js'
import { useNavigate } from 'react-router-dom'

const Settings = () => {

  const navigate=useNavigate()

  const {handleLogout}=useAuth()

  const handleLoggedOutDone=async()=>{
    await handleLogout()
    navigate("/login")
  }
  


  const bodyVariant={
    hidden:{},
    show:{
      transition:{
        staggerChildren:0.1
      }
      
    }
  }

  const childVariant={
    hidden:{x:70,opacity:0},
    show:{
      x:0,
      opacity:1,
      transition:{
        type:"spring"
      }

    }
  }
  return (
    <AnimatePresence>
      <motion.div
    className='absolute top-0 right-1 md:right-5 lg:right-10 max-w-fit h-100 bg-white  shadow-weird rounded-b-sm overflow-hidden selection:bg-transparent'>
      <motion.ul
      variants={bodyVariant}
      initial="hidden"
      animate="show"
      exit="hidden"
      className='text-[14px] md:text-[16px] text-neutral-500 leading-tight py-2 flex flex-col '>

        <motion.li
        variants={childVariant}
        className='navli'>
          <Link to={'/allreports'}>
          Reports collection
          </Link>
        </motion.li>

        <motion.li
        variants={childVariant}
        className='navli'>
          <Link to={"/updateProfile"}>Update Profile</Link>
        </motion.li>

        <motion.li
        variants={childVariant}
        className='navli' 
        onClick={handleLoggedOutDone}>Sign Out
        </motion.li>

      </motion.ul>
      
    </motion.div>
    </AnimatePresence>
  )
}

export default Settings