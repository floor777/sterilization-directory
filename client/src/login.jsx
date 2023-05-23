import { useState } from 'react'
import './login.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
const login = () => {};
const getUser = () => {};

function Login() { 
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

  return (
    <>
    <div>
        <h1>Login Page</h1>
        <input placeholder='email' onChange={e => setLoginEmail(e.target.value)}></input>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
        <button onClick={getUser}> get loggedin user</button>


    </div>

    </>
  )
}

export default Login
