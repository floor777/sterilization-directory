import { useState } from 'react'
import './login.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();
    const login = () => {

      axios({

        method: "post",
        data: {
          email: loginEmail,
          password: loginPassword,
        },
        withCredentials: true,
        
        url: "http://localhost:3000/auth/login"
              
      })
      .then(response => {
        if(response.config.method === "post" && response.data.message == "Login was successful" ) {
          console.log(response);
          console.log('Login was successful');
          navigate("/dashboard");
          
        }
        else  {
          console.log(response.config.method);
          console.log(response.status);
          console.log(response.data);
          console.log('Non-200 response recorded in login.jsx');
        }
      }).catch(err => {
        console.log(err);
      });
    };

  return (
    <>
    <div>
        <h1>Welcome back!</h1>
        <p>New events with like-minded people are waiting for you</p>
        <input placeholder='email' onChange={e => setLoginEmail(e.target.value)}></input>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
        <button onClick={getUser}> get loggedin user</button>


    </div>

    </>
  )
}

export default Login
