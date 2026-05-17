import React, { useState,useRef, useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { FrontPageComponent } from '../FrontPageComponent'
import SpinButton from '../../../interview/pages/reportcomp/SpinButton'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { DataLabels } from '../Login/Login'
import { EyeOff,Eye } from 'lucide-react'

const Register = () => {

  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [fullname, setFullname] = useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [avatarUpload,setAvatarUpload]=useState("")
  const [coverUpload,setCoverUpload]=useState("")

  const [showPassword, setShowPassword]=useState(false)

  const [error,setError]=useState(null)

  const [submitting,setSubmitting]=useState(false)

  const {handleRegister}=useAuth()

 
  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")
    if(!email.trim() || !password.trim() || !username.trim()|| !fullname.trim()){
      setError("No fields should be empty!!")
    }
    setSubmitting(true)

    const success=await handleRegister({username,fullname,email,password,avatar:avatarUpload,coverImage:coverUpload})

    setSubmitting(false)

    if(success){
      navigate("/login")
    }else{
      setError("Registration failed. Please try again.")
    }
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

  return (<>
    <FrontPageComponent >
     
      <div className='flex flex-col gap-2 md:gap-4 my-10 md:my-10 w-full relative '>

        <h2 className=' font-flamenco font-semibold text-4xl text-center'>Join Us</h2>
      
        <AnimatePresence>
          {error && 
        <motion.div
        variants={popVariant}
        initial="hidden"
        animate="show"
        exit="exit"
        className='bg-red-200 rounded-full px-2 py-1 ring-1 ring-red-100 shadow-finta absolute right-4 -top-8'><p className='error-message'>{error}</p></motion.div>
        }
        </AnimatePresence>

        <form onSubmit={handleSubmit} >

          <div className='w-full  flex flex-col items-center justify-center gap-4  px-3 pb-5 md:px-2 lg:px-5  '>


          <div className='w-4/5 grid grid-cols-1 gap-y-2 lg:gap-y-4'>

            <div className='inputGroup'>
            <DataLabels 
          text={"Fullname"}
          type={"text"}
          name={"Fullname"}
          value={fullname}
          onChange={(e)=>{setFullname(e.target.value)}}
          placeholder={"Enter Your Fullname"}/>
            </div>

            <div className='inputGroup'>
            <DataLabels 
          text={"Username"}
          type={"text"}
          name={"Username"}
          value={username}
          onChange={(e)=>{setUsername(e.target.value)}}
          placeholder={"Enter Your Username"}/>
            </div>
          
            <div className='inputGroup'>
            <DataLabels 
          text={"Email"}
          type={"email"}
          name={"Email"}
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          placeholder={"Enter Your Email"}/>
            </div>

        <div className=" inputGroup">

          <label >Password<span className='text-red-600'>*</span></label>
         
         <div className=' inputBody flex items-center justify-between relative'>
           <input
          className='bg-transparent outline-none'
          type={showPassword ? "text": "password"} placeholder="Enter Your Password" name="Password"
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}/>

          <div className='absolute -top-1/5 right-1 md:right-4 cursor-pointer text-neutral-400 hover:text-neutral-500 bg-transparent ' onClick={()=>setShowPassword(!showPassword)}>
              { showPassword ? <EyeOff size={24}/> :<Eye size={24}/>   }
            </div>
         </div>
          </div>
          </div>

          <div className='flex items-center gap-5 justify-between'>

          <label className=' uploadLabel'>
            <div className='uploadp'>
              <span className={`uploadSpan ${avatarUpload ? "text-green-500" : "text-red-500"}`}><UploadIcon/></span>
              <h2>Avatar</h2>
            </div>

            <input
            onChange={(e)=>setAvatarUpload(e.target.files[0])}
            type="file"
            name='avatar'
            accept="image/*"
            className="hidden"
            />  
          </label>

          <label className=' uploadLabel'>
            <div className='uploadp'>
              <span className={`uploadSpan ${coverUpload ? "text-green-500" : "text-red-500"}`}><UploadIcon/></span>
              <h2>Cover</h2>
            </div>
            
            
            <input
            onChange={(e)=>setCoverUpload(e.target.files[0])}
            type="file"
            name="coverImage"
            accept="image/*"
            className="hidden"
            />
          </label>
        </div>

          </div>
          <SpinButton text={"Create Account"} loading={submitting} className='w-1/2 mt-2'/>
        </form>

        <p className="text-[12px] md:text-[15px] text-center ">
          Already have an account? <Link
        className="text-blue-600 hover:underline hover:underline-offset-2 transform-gpu duration-200 focus:scale-[101%]" to={"/login"}>Sign in</Link></p>

      </div>
  
    </FrontPageComponent>
    </>
  )
}

export default Register


const UploadIcon=()=>{
  return (
    <svg  xmlns="http://www.w3.org/2000/svg" width="14" height="14"  
      fill="currentColor" viewBox="0 0 24 24" >
      <path d="M4 18h16v2H4zm7-15v7H7l5 6 5-6h-4V3z"></path>
    </svg>
  )
}