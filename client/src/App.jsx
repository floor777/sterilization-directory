import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './login';
import Signup from './signup';
import Homepage from './homepage.jsx';
import Dashboard from './dashboard.jsx';
import RequireAuth from './requireauth';


function App() {
  return (
    
    <Routes>
      <Route
       path='/dashboard' element= {
      <RequireAuth>
        <Dashboard />

      </RequireAuth>
    }/>
      
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route exact path='/' element={<Homepage />}></Route>
      
    </Routes>
  )
}

export default App
