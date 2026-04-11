import {useContext,useEffect, useRef} from 'react'
import { AuthContext } from '../auth.context.jsx'
import { login,Register,logout,profile,updateProfile,updatePassword} from '../services/auth.api.js'

export const useAuth=()=>{

  const context=useContext(AuthContext)

  const {user,setUser,loading,setLoading,error}=context

  const hasFetched=useRef(false)

  const handleLogin=async({email,password})=>{
    setLoading(true)
    try {
      const data=await login({email,password})
      setUser(data.user.user)
      setLoading(false)

      return true
    } catch (error) {
      console.error("error loggin in ",error)
      setLoading(false)
      return false
    
    }
    
  }

  const handleRegister=async({username,fullname,email,password,avatar,coverImage})=>{
    setLoading(true)

    try {
      const data=await Register({username,fullname,email,password,avatar,coverImage})
      setUser(data.user)
      return true
    } catch(error){
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

  const updateAvatarImage=async({avatar})=>{
    setLoading(true)


    try{
      const data=await updateProfile({avatar})
      setUser(prev=>({
        ...prev,
        avatar:data.data
      }))
 
    
      return true

    }catch(error){
      console.log("error updating avatar image", error)
    }finally{
      setLoading(false)
    }
  }


  const PasswordChange=async({currentPassword,newPassword,confirmNewPassword})=>{
    setLoading(true)

    console.log(currentPassword,newPassword,confirmNewPassword)

    try{
      const data=await updatePassword({currentPassword,newPassword,confirmNewPassword})
      console.log(data)
      setUser(data)
      return true
      
    }catch(error){
      console.log("error changing password",error)
      throw error

    }finally{
      setLoading(false)
    }
  }

   useEffect(()=>{

    if(hasFetched.current) return 
    hasFetched.current=true

    if(user)return

    const getAndSetUser=async()=>{
      try {
        const data=await profile()
        if(data?.user){
          setUser(data.user)
        }
      } catch (error) {
        console.error("Error fetching user profile:",error)
       
        
      }finally{
        setLoading(false)
      }
    }
    getAndSetUser()
  },[])

  

  return {user,loading,handleRegister,handleLogin,handleLogout,updateAvatarImage,PasswordChange}
}