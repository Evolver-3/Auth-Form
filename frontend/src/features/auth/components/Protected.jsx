import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import React from 'react'
import {Loader,LoaderCircle} from 'lucide-react'


const Protected = ({children}) => {
  const {loading,user}=useAuth()

  if(loading){
    return (
          <div className="bg-neutral-300 h-screen flex items-center justify-center">

          <LoaderCircle className="spinner" size={24}/>

        </div>
    )
  }

  if(!user){
    return <Navigate to="/login"/>
  }

  return <>{children}</>
}

export default Protected
