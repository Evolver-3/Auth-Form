import React from 'react'
import Nav from './Nav'

const HomePageWrapper = ({children}) => {
  return (
    <main className='overflow-hidden'>
      <Nav/>

    <div>{children}</div>
      
      
      
      </main>
  )
}

export default HomePageWrapper