import React from 'react'
import { motion } from 'motion/react'
import { LoaderCircle } from 'lucide-react'

const SpinButton = ({text,className='',loading,onClick}) => {
  return (
    <motion.button className={`${className} w-1/2 flex items-center justify-center ${loading?' py-2':"py-1"}`} onClick={onClick}
    disabled={loading}
    type='submit'>
      {loading ? 
      (
        <LoaderCircle className="spinner" size={24} />
    
      ):(
        text
      )}
      
    </motion.button>
  )
}

export default SpinButton