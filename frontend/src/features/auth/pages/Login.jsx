import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'


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
    return (<main><h1>Loading.....</h1></main>)
  }

  return (
    <main >
      <div className='container'>
        <h1 className=''>Login</h1>

        {error && <p className='text-red-600'>{error}</p>}

        <form onSubmit={handleSubmit}>
          
          <div className='InputGroup'>
            <label htmlFor='email' >Email</label>
            <input type="email" name="email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='Enter your email'/>
          </div>

          <div className='InputGroup'>
            <label htmlFor='password'>Password</label>

            <input type="password" name="password" 
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="enter password"/>
          </div>

          <button>Login</button>
        </form>


        <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  )
}

export default Login