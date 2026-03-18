import React,{useState} from'react'
import axios from 'axios'

const Login = () => {
  const [login,setLogin]=useState({
    username :"",
    password:""
  })

  const handleChange=(e)=>{
    setLogin({
      ...login,
      [e.target.name]:e.target.value
    })
  }

  const handleClick=async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post("http://localhost:5000/api/v1/users/login",login)

      console.log(res.data)
    }catch(error){
      console.log(error)
    }
  }
  return (
    <form onSubmit={handleClick}>
      <input type="text" name='username' onChange={handleChange} placeholder="username"/>
      <input type="password" name="password" onChange={handleChange} placeholder="password"/>
      <button type='submit'>Login</button>
    </form>
  )
}

export default Login