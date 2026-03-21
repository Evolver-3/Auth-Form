import {useContext,useEffect} from 'react'
import { AuthContext } from '../auth.context.jsx'
import { login,Register,logout,profile } from '../services/auth.api.js'

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

   useEffect(()=>{
    const getAndSetUser=async()=>{
      try {
        const data=await profile()
        setUser(data.user)
        
      } catch (error) {
        console.error("Error fetching user profile:",error)
        setUser(null)
        
      }finally{
        setLoading(false)
      }
    }
    getAndSetUser()
  },[])

  

  return {user,loading,handleRegister,handleLogin,handleLogout}
}