import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className=' shadow-weird bg-white flex flex-col items-center py-3 gap-5'>
      
      <div className='flex flex-col gap-2 text-neutral-600 '>
        <h2 className='text-sm'>© 2026 ReAi</h2>
        <h2 className='text-sm'>Made by <span className='font-semibold text-rose-500'>Ashu</span></h2>
        
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-x-40 gap-y-1'>
        <h2 className='footerLink'><Link to={"/"}>Home</Link></h2>
        <h2 className='footerLink'><Link to={"/allreports"}>All Reports</Link></h2>
        <h2 className='footerLink'>Contact</h2>
        <h2 className='footerLink'>Terms of Service</h2>
      </div>
    </div>
  )
}

export default Footer