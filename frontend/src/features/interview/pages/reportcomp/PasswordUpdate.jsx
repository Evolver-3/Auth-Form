import React, { useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'

const PasswordUpdate = () => {

  const {PasswordChange}=useAuth()
  const [originalPassword,setOriginalPassword]=useState()
  const [newPassword,setNewPassword]=useState()
  const [confirmNew,setConfirmNew]=useState()

  const handleClick=async(e)=>{
    e.preventDefault()

    const success=await PasswordChange({currentPassword:originalPassword,
      newPassword:newPassword,
      confirmNewPassword:confirmNew})

      if(success){
        console.log("Password updated ", success)
        
      }
  }
  return (
    <div className=' flex flex-col items-center justify-center gap-3 w-full '>
      
     <form onSubmit={handleClick}
     className='gap-4 w-3/4 md:w-full'>
       <InputItem
      type="password"
      itemName={"Old Password"}
      placeholder={"Enter Your old password"}
      onChange={(e)=>{setOriginalPassword(e.target.value)}}/>

      <InputItem
      type="password"
      itemName={"New Password"}
      placeholder={"Enter Your new password"}
      onChange={(e)=>{setNewPassword(e.target.value)}}/>

      <InputItem
      type="password"
      itemName={"Confirm new Password"}
      placeholder={"Confirm Your new password"}
      onChange={(e)=>{setConfirmNew(e.target.value)}}/>

      <button className="px-3 py-1" >Update Password</button>

     </form>
     
    </div>
  )
}

export default PasswordUpdate


const InputItem=({type,itemName,placeholder,onChange})=>{
  return(
    <div className='inputGroup'>
      <input
      type={type}
      name={itemName}
      placeholder={placeholder}
      className="inputBody"
      onChange={onChange}
      />
    </div>
  )
}