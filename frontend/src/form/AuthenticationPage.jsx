import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Login from './login'

const AuthenticationPage = () => {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default AuthenticationPage