import { useState } from 'react'
import './login.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { redirect } from 'react-router-dom';
import axios from 'axios';

const getUser = () => {
  axios({
    method: "get",
    withCredentials: true,
    url: "http://localhost:3000/currentuser"
  });
};

function Login() { 
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const login = () => {

      axios({
        method: "post",
        data: {
          email: loginEmail,
          password: loginPassword,
        },
        withCredentials: true,
        url: "http://localhost:3000/login"
              
      })
      .then(res => console.log(res));
    };

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
