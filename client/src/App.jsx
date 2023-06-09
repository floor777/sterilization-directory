import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './login';
import Signup from './signup';
import Homepage from './homepage';
import Dashboard from './dashboard';

function App() {
  return (
    
    <Routes>
      
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route exact path='/' element={<Homepage />}></Route>
      <Route path='/dashboard' element={<Dashboard />}></Route>
      
    </Routes>
  )
}

export default App
