import React from 'react'
import { useAuth } from '../hooks/useAuth'

const Skeleton = () => {

  const {loading} =useAuth()
  return (
  <div className='animate-pulse'>

  </div>
    
  )
}

export default Skeleton