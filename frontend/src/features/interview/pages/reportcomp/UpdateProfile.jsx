import React,{useEffect, useState} from 'react'
import HomePageWrapper from './HomePageWrapper'
import { useAuth } from '../../../auth/hooks/useAuth'
import PasswordUpdate from './PasswordUpdate'

const UpdateProfile = () => {
   const {user,updateAvatarImage}=useAuth()
   const [newAvatar,setNewAvatar]=useState(null)

   useEffect(()=>{
    if(!newAvatar) return

    const upload=async()=>{
      const success=await updateAvatarImage({avatar:newAvatar})
      if(success){
        console.log("avatar updated successfully")
      }
    }
    upload()
   },[newAvatar])
  return (
    <HomePageWrapper >

     <div className='alignDiv px-4'>
       <h2 className='h2Headings'>Update your profile</h2>

      <div className='w-3/4 lg:w-3/5 py-10 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 bg-slate-100 rounded-md shadow-weird'>

        <div className="relative">
         
        <img src={newAvatar ? URL.createObjectURL(newAvatar): user?.avatar} alt="user-image" className="size-44 lg:size-80 rounded-full lg:rounded-sm shadow-finta ring-1 ring-rose-200"/>
        
        <input
        onChange={(e)=>setNewAvatar(e.target.files[0])}
        id="avatarInput"
        type="file"
        name='avatar'
        accept="image/*"
        className="hidden"/>  
        
        <label
        htmlFor='avatarInput'
        className="absolute bottom-10 right-5 p-1 md:p-2 rounded-full bg-blue-500 opacity-80 group hover:opacity-100">
          <svg
          className="text-white group-hover:text-neutral-300"  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
          fill="currentColor" viewBox="0 0 24 24" >
          <path d="M5 21h14c1.1 0 2-.9 2-2v-7h-2v7H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2"></path><path d="M7 13v3c0 .55.45 1 1 1h3c.27 0 .52-.11.71-.29l9-9a.996.996 0 0 0 0-1.41l-3-3a.996.996 0 0 0-1.41 0l-9.01 8.99A1 1 0 0 0 7 13m10-7.59L18.59 7 17.5 8.09 15.91 6.5zm-8 8 5.5-5.5 1.59 1.59-5.5 5.5H9z"></path>
          </svg>
          </label>
        </div>
      
        <div className='w-full md:w-1/2'>
          <PasswordUpdate/>
        </div>

      </div>
     </div>
    </HomePageWrapper>
  )
}

export default UpdateProfile