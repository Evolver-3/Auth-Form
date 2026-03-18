import React,{useState} from'react'
import axios from 'axios'

const LoginPage = () => {
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
   

    <div className='bg-neutral-500 h-screen flex flex-col items-center py-20 gap-10'>

      <h2 className='text-white font-mono text-4xl lg:text-6xl'>Login User</h2>

    <form onSubmit={handleClick} className=' gap-4 py-10 w-2/3 ring-1 ring-slate-200 rounded-md bg-slate-500 flex flex-col items-center '>

      <div className='grid grid-cols-1 gap-2 lg:gap-5 px-10 w-full'>

      
      {Box("Enter username","text","username","Username",
        handleChange
      )}
      {Box("Enter password","password","password","Password",
        handleChange
      )}

      </div>
      <button type='submit' className='bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 hover:ring-1 hover:ring-lime-500 transition-all duration-150 hover:text-shadow-sm hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>Register</button>
    </form>
    </div>
  )
}

export default LoginPage


const Box=(text,type,name,placeholder,handleChange)=>{
  return (
    <div className='flex justify-between lg:px-10'>
      <label className='text-lg md:text-xl'>{text}</label>
      <input type={type} name={name} onChange={handleChange} placeholder={placeholder} className='rounded-sm ring-1 outline-none px-2 lg:w-2/3 '/>
    </div>
  )
}