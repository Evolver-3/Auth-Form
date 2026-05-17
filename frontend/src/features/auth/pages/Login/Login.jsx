import React, { useState,useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FrontPageComponent } from '../FrontPageComponent'
import { Link } from 'react-router-dom'
import SpinButton from '../../../interview/pages/reportcomp/SpinButton'
import { motion,AnimatePresence } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const Login = () => {

  const {handleLogin}=useAuth()

  const navigate=useNavigate()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [showPassword,setShowPassword]=useState(false)

  const [error,setError]=useState(null)

  const [submitting,setSubmitting]=useState(false)


  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")

    if(!email.trim() || !password.trim()){
      setError("No fields should be empty!!")
      }

    setSubmitting(true)

    const success=await handleLogin({email,password})

    

    setSubmitting(false)
    if(success){
      setTimeout(()=>{
        navigate("/")
      },500)
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
        return()=>clearTimeout(timer)
      }
    },[error])

  return (<>

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
          
          <div className='flex flex-col items-center justify-center gap-6 md:gap-10 px-3 pb-5 md:px-2 lg:px-5 md:w-3/4'>

            <div className='inputGroup'>
              <DataLabels 
              text={"Email"} 
              type={"email"} 
              name={"Email"} 
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              placeholder={"Enter Your Email"}/>
            </div>

            <div className=" inputGroup relative">

              <label >Password<span className='text-red-600'>*</span></label>
         
              <div className=' inputBody flex items-center justify-between'>

              <input
              className='bg-transparent outline-none'
              type={showPassword ? "text": "password"} 
              placeholder="Enter Your Password" name="Password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}/>

              <div className=' cursor-pointer text-neutral-400 hover:text-neutral-500 bg-transparent ' onClick={()=>setShowPassword(!showPassword)}>
              { showPassword ? <EyeOff size={24}/> :<Eye size={24}/>  }
            </div>
         </div>
          </div>
      

          </div>
          
          <SpinButton text={"Sign In"} loading={submitting}  className='w-1/2 mt-4'/>
        </form>

        <p className="text-[12px] md:text-[15px] text-center ">
          Don't have an account? <Link
        className="text-blue-600 hover:underline hover:underline-offset-2 transform-gpu duration-200 focus:scale-[101%]" to={"/register"}>Sign up</Link></p>

     

      </div>
 
    </FrontPageComponent>
    </>
  )
}

export default Login


export const DataLabels=({text,type,placeholder,name,onChange,value})=>{
  return(
    <>
      <label>{text}<span className='text-red-600'>*</span></label>
      <input
      className='inputBody'
      type={type} 
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}/>
    </>
  )
}

