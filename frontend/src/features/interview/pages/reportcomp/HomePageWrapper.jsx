import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const HomePageWrapper = ({children}) => {
  return (
    <main className='overflow-hidden select-none flex flex-col  justify-between'>
      <Nav/>
      <div>{children}</div>
      <Footer/>
      </main>
  )
}

export default HomePageWrapper