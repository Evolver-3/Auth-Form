import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../auth/hooks/useAuth'
import SpinButton from './SpinButton'

const PasswordUpdate = () => {

  const {PasswordChange,error:authError,loading}=useAuth()
  const [originalPassword,setOriginalPassword]=useState()
  const [newPassword,setNewPassword]=useState()
  const [confirmNew,setConfirmNew]=useState()

  const [successMessage,setSuccessMessage]=useState('')
  const [errorMessage,setErrorMessage]=useState("")



  useEffect(()=>{
    if(authError){
      setErrorMessage(authError)
    }
  },[authError])
  const handleClick=async(e)=>{
    e.preventDefault()

    setSuccessMessage('')
    setErrorMessage("")

  if(!originalPassword || !newPassword || !confirmNew){
    setErrorMessage('All fields are required')
    return
  }

  if(newPassword !==confirmNew){
    setErrorMessage("New Password doesn't match")
    return
  }

  if(originalPassword === newPassword){
    setErrorMessage('New Password cannot be the same as old password')
    return
  }

  try{
    const success=await PasswordChange({currentPassword:originalPassword,
      newPassword:newPassword,
      confirmNewPassword:confirmNew})

      if(success){
        setSuccessMessage("Password updated successfully !!")

        setOriginalPassword('')
        setNewPassword('')
        setConfirmNew('')
      } 
  }catch(err){
    setErrorMessage(err.message || 'An error occurred')
  }

      
  }
  return (
    <div className=' flex flex-col items-center justify-center gap-3 w-full '>
      {successMessage &&(
        <h2 className='error-message'>
          {successMessage}
        </h2>
      )}
      {errorMessage && (
        <h2 className='error-message'>
          {errorMessage}
        </h2>
      )}
      
     <form onSubmit={handleClick}
     className='gap-4 w-3/4 md:w-full'>
       <InputItem
       text="Old password"
      type="password"
      itemName={"Old Password"}
      value={originalPassword}
      placeholder={"Enter Your old password"}
      disabled={loading}
      onChange={(e)=>{setOriginalPassword(e.target.value)}}
      />

      <InputItem
      text="New password"
      type="password"
      itemName={"New Password"}
      value={newPassword}
      disabled={loading}
      placeholder={"Enter Your new password"}
      onChange={(e)=>{setNewPassword(e.target.value)}}/>

      <InputItem
      text="Confirm new password"
      type="password"
      value={confirmNew}
      disabled={loading}
      itemName={"Confirm new Password"}
      placeholder={"Confirm Your new password"}
      onChange={(e)=>{setConfirmNew(e.target.value)}}/>

      
      <SpinButton loading={loading} text={"Update Password"} />

     </form>
     
    </div>
  )
}

export default PasswordUpdate


const InputItem=({text,type,itemName,placeholder,onChange,value,disabled})=>{
  return(
    <div className='inputGroup'>
      <label>{text}</label>
      <input
      className="inputBody"
      type={type}
      name={itemName}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      disabled={disabled}
      />
    </div>
  )
}