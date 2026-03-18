import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [form,setForm]=useState({
    fullname:"",
    email:"",
    username:"",
    password:""
  })

  const navigate=useNavigate()

  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async (e)=>{
    e.preventDefault()

    try{
      console.log(form)
      const res=await axios.post("http://localhost:5000/api/v1/users/register",form)

      console.log(res.data)
      navigate("/login")

    }catch(error){
      console.log(error)
      
    }
  }


  return (
    <div className='bg-neutral-500 h-screen flex flex-col items-center py-20 gap-10'>

      <h2 className='text-white font-mono text-4xl lg:text-6xl'>Register User</h2>

    <form onSubmit={handleSubmit} className=' gap-4 py-10 w-2/3 ring-1 ring-slate-200 rounded-md bg-slate-500 flex flex-col items-center justify-center '>

      <div className='grid grid-cols-2 gap-2 '>

      <label>Enter fullname</label>
      <input type="text" name="fullname" onChange={handleChange} placeholder='Fullname' className='rounded-sm ring-1 outline-none px-2'/>
      <label>Enter email</label>
      <input type="email" name="email" onChange={handleChange}  placeholder='Email'/>
      <label>Enter username</label>
      <input type="text" name="username" onChange={handleChange}  placeholder='Username'/>
      <label>Enter password</label>
      <input type='password' name="password" onChange={handleChange} placeholder="password"/>
      </div>
      <button type='submit' className='bg-lime-600 text-white py-2 px-4 rounded-md hover:bg-lime-700 hover:ring-1 hover:ring-lime-500 transition-all duration-150 hover:text-shadow-sm hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>Register</button>
    </form>
    </div>
  )
}

export default Register