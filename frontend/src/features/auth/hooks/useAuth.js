import {useContext} from 'react'
import { AuthContext } from '../auth.context.jsx'
import { login,Register,logout } from '../services/auth.api.js'

export const useAuth=()=>{

  const context=useContext(AuthContext)

  const {user,setUser,loading,setLoading}=context

  const handleLogin=async({email,password})=>{
    setLoading(true)
    try {
      const data=await login({email,password})
      setUser(data.user)
      setLoading(false)
      return true
    } catch (error) {
      console.error("error loggin in ",error)
      setLoading(false)
      return false
    
    }
    
  }

  const handleRegister=async({username,fullname,email,password})=>{
    setLoading(true)

    try {
      const data=await Register({username,fullname,email,password})
      setUser(data.user)
      return true
    } catch (error) {
      console.error("Error registering user:", error)
      return false
    }finally{
      setLoading(false)
    }
    
  }

  const handleLogout=async()=>{
    setLoading(true)
    try {
      await logout()
      setUser(null)
    } catch (error) {
      console.error("Error logging out:",error)
      
    }finally{
      setLoading(false)
    }
    
  }

  return {user,loading,handleRegister,handleLogin,handleLogout}
}