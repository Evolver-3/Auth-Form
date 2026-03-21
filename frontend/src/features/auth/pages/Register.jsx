import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const Register = () => {

  const navigate=useNavigate()
  const [username,setUsername]=useState("")
  const [fullname, setFullname] = useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const [error,setError]=useState(null)

  const {loading,handleRegister}=useAuth()

  const handleSubmit=async(e)=>{
    e.preventDefault()
    setError("")

    const success=await handleRegister({username,fullname,email,password})
    if(success){
      navigate("/login")
    }else{
      setError("Registration failed. Please try again.")
    }
  }

  if(loading){
    return (<main><h1>Loading.....</h1></main>)
  }
  return (
    <main>
      <div className='container'>
        <h1 className=''>Register</h1>

        {error && <p className='text-red-600'>{error}</p>}

        <form onSubmit={handleSubmit}>

          <div className='grid grid-cols-2 gap-5'>
            <div className='InputGroup'>
            <label htmlFor='fullname' >Fullname</label>
            <input type="text" name="fullname"
            onChange={(e)=>{setFullname(e.target.value)}}
            placeholder='Enter your fullname'/>
          </div>

          <div className='InputGroup'>
            <label htmlFor='username' >Username</label>
            <input type="text" name="username" 
            onChange={(e)=>{setUsername(e.target.value)}}
            placeholder='Enter your username'/>
          </div>
          
          <div className='InputGroup'>
            <label htmlFor='email' >Email</label>
            <input type="email" name="email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder='Enter your email'/>
          </div>

          <div className='InputGroup'>
            <label htmlFor='password'>Password</label>

            <input type="password" name="password" 
            onChange={(e)=>{setPassword(e.target.value)}}placeholder="enter password"/>
          </div>
          </div>

          <button>Register</button>
        </form>

        <p>Already have an account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  )
}

export default Register