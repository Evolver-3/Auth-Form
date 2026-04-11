import React, { useState,useEffect } from 'react'
import { useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { FrontPageComponent } from './FrontPageComponent'
import { Link } from 'react-router-dom'
import SpinButton from '../../interview/pages/reportcomp/SpinButton'
import { motion,AnimatePresence } from 'framer-motion'


const Login = () => {

  const {loading,handleLogin}=useAuth()

  const navigate=useNavigate()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)

  const [error,setError]=useState(null)


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")
    const success=await handleLogin({email,password})
    if(success){
      navigate("/")
    } else {
      setError("Invalid email or password")
    }
    console.log(success)
  }

  const popVariant={
    hidden:{
      opacity:0,
      x:50
    },
    show:{
      opacity:1,
      x:0,
      transition:{
        duration:0.5
      }
    },
    exit:{
      opacity:0,
      x:50,
      transition:{
        duration:0.5
      }
    }
  }

  useEffect(()=>{
      if(error){
        const timer=setTimeout(() => {
          setError(null)
        }, 2000);
        return()=>clearInterval(timer)
      }
    },[error])

  return (
    <FrontPageComponent >
  
      <div className='flex flex-col gap-2 md:gap-14 mt-20 md:mt-0 w-full rounded-md px-13 py-10 relative overflow-hidden'>

        <h2 className=' font-flamenco font-semibold text-4xl text-center'>Logged In</h2>
        
        <AnimatePresence>
          {error && 
        <motion.div
        variants={popVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className='bg-red-200 rounded-full px-2 py-1 ring-1 ring-red-100 shadow-finta absolute right-4 top-0'><p className='error-message'>{error}</p></motion.div>
        }
        </AnimatePresence>

        <form onSubmit={handleSubmit} >
          
          <div className='flex flex-col items-center justify-center gap-4 px-3 pb-5 md:px-2 lg:px-5 md:w-3/4'>

            <div className='inputGroup'>
              <DataLabels 
              text={"Email"} 
              type={"email"} 
              name={"Email"} 
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder={"Enter Your Email"}/>
            </div>

            <div className=" inputGroup relative">

              <label >Password<span className='text-red-600'>*</span></label>
         
              <div className=' inputBody flex items-center justify-between'>
              <input
             className='bg-transparent outline-none'
              type={showPassword ? "text": "password"} placeholder="Enter Your Password" name="Password" onChange={(e)=>{setPassword(e.target.value)}}/>

              <div className=' cursor-pointer text-neutral-400 hover:text-neutral-500 bg-transparent ' onClick={()=>setShowPassword(!showPassword)}>
              { showPassword ? <SvgIconHide/> : <SvgIcon/> }
            </div>
         </div>
          </div>
      

          </div>

      
          <SpinButton text={"Sign In"} loading={loading}  className='w-1/2 mt-4'/>
        </form>

        <p className="text-[12px] md:text-[15px] text-center ">
          Don't have an account? <Link
        className="text-blue-600 hover:underline hover:underline-offset-2 transform-gpu duration-200 focus:scale-[101%]" to={"/register"}>Sign up</Link></p>

     

      </div>
 
    </FrontPageComponent>
  )
}

export default Login


const DataLabels=({text,type,placeholder,name,onChange})=>{
  return(
    <>
      <label>{text}<span className='text-red-600'>*</span></label>
      <input
      className='inputBody '
      type={type} placeholder={placeholder} name={name} onChange={onChange}/>
    </>
  )
}


const SvgIcon=({className})=>{
  return(
    <svg className={className}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
      <path d="M12 9a3 3 0 1 0 0 6 3 3 0 1 0 0-6"></path><path d="M12 19c7.63 0 9.93-6.62 9.95-6.68.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68s-9.93 6.61-9.95 6.67c-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68Zm0-12c5.35 0 7.42 3.85 7.93 5-.5 1.16-2.58 5-7.93 5s-7.42-3.84-7.93-5c.5-1.16 2.58-5 7.93-5"></path>
      </svg>
  )
}

const SvgIconHide=({className})=>{
  return (
    <svg className={className}  xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
      <path d="M12 17c-5.35 0-7.42-3.84-7.93-5 .2-.46.65-1.34 1.45-2.23l-1.4-1.4c-1.49 1.65-2.06 3.28-2.08 3.31-.07.21-.07.43 0 .63.02.07 2.32 6.68 9.95 6.68.91 0 1.73-.1 2.49-.26l-1.77-1.77c-.24.02-.47.03-.72.03Zm9.95-4.68c.07-.21.07-.43 0-.63-.02-.07-2.32-6.68-9.95-6.68-1.84 0-3.36.39-4.61.97L2.71 1.29 1.3 2.7l4.32 4.32 1.42 1.42 2.27 2.27 3.98 3.98 1.8 1.8 1.53 1.53 4.68 4.68 1.41-1.41-4.32-4.32c2.61-1.95 3.55-4.61 3.56-4.65m-7.25.97c.19-.39.3-.83.3-1.29 0-1.64-1.36-3-3-3-.46 0-.89.11-1.29.3l-1.8-1.8c.88-.31 1.9-.5 3.08-.5 5.35 0 7.42 3.85 7.93 5-.3.69-1.18 2.33-2.96 3.55z"></path>
    </svg>
  )
}