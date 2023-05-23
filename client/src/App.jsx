import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './login';
import Signup from './signup';
import Homepage from './homepage';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/' element={<Homepage></Homepage>}></Route>
    </Routes>
  )
}

export default App
