import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { FrontPageComponent } from './FrontPageComponent'


const Login = () => {

  const {loading,handleLogin}=useAuth()

  const navigate=useNavigate()

  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

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
           
            <input type="password" name="password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className='inputBody'/>
          </div>

          </div>

          <button className='py-1 px-8 md:px-16'>Sign In</button>
        </form>


      </div>
 
    </FrontPageComponent>
  )
}

export default Login