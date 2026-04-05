import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { FrontPageComponent } from './FrontPageComponent'


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

  if(loading){
    return (<main><h1 className='h1style'>Loading.....</h1></main>)
  }

  return (
    <FrontPageComponent text={"Don't have an account?"} textspan={"Sign Up"} point={"/register"}>
  
      <div className='flex flex-col p-14 gap-10 my-16'>

        <h2 className='text-3xl text-neutral-600 font-semibold leading-tight'>Logged In</h2>
        
        {error && <p className='error-message'>{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className='flex flex-col items-center justify-center gap-6 w-full'>

            <div className='inputGroup'>
           
            <input type="email" name="email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='E-mail'
            className='inputBody'/>
          </div>

          <div className='inputGroup'>
           
            <div className='relative'>
              <input type={showPassword ? "text":"password"} name="password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className='inputBody'/>

            <div className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-black' onClick={()=>setShowPassword(!showPassword)}>
              {showPassword ? <SvgIcon/>:<SvgIconHide/>}
            </div>
            </div>
          </div>

          </div>

          <button className='py-1 px-8 md:px-16'>Sign In</button>
        </form>


      </div>
 
    </FrontPageComponent>
  )
}

export default Login


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