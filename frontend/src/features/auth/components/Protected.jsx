import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'
import { motion } from "framer-motion";

const Protected = ({children}) => {
  const {loading,user}=useAuth()

  const MotionSvg=motion(LoaderSvg)


  if(loading){
    return (
          <div className="bg-neutral-300 h-screen flex items-center justify-center">

          <MotionSvg/>

        </div>
    )
  }

  if(!user){
    return <Navigate to="/login"/>
  }

  return <>{children}</>
}

export default Protected

const LoaderSvg=()=>{
  return(
    <svg  xmlns="http://www.w3.org/2000/svg" width="24" height="24"  
    fill="currentColor" viewBox="0 0 24 24" >

    <path d="M12 18a2 2 0 1 0 0 4 2 2 0 1 0 0-4m0-16a2 2 0 1 0 0 4 2 2 0 1 0 0-4M7.76 19.07c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M19.07 7.76c-.78.78-2.05.78-2.83 0s-.78-2.05 0-2.83 2.05-.78 2.83 0 .78 2.05 0 2.83M4 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m16 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M4.93 7.76c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0m11.31 11.31c-.78-.78-.78-2.05 0-2.83s2.05-.78 2.83 0 .78 2.05 0 2.83-2.05.78-2.83 0"></path>
</svg>
  )
}