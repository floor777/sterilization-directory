import { useState } from 'react'
import './login.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from "react-router-dom";
import axios from 'axios';

// const getUser = () => {
//   axios({
//     method: "get",
//     withCredentials: true,
//     url: "http://localhost:3000/currentuser"
//   }).then((response) => {
//     console.log(response);
//     const 
//   });
// };

function Dashboard() { 
    const [authorizedUsername, setAuthorizedUserName] = useState("");
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
        url: "http://localhost:3000/login"
              
      })
      .then(response => {
        if(response.status === 200) {
          console.log('Login was successful');
          navigate("/dashboard");
          // getUser();
        }
        else  {
          console.log('Non-200 response recorded in login.jsx');
        }
      }).catch(err => {
        console.log(err);
      });
    };

    const getUser = () => {
      axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:3000/currentuser"
      }).then((response) => {
        console.log(response);
        const currentUser = response.data.name;
        setAuthorizedUserName(currentUser);
        // console.log("asdsa" + authorizedUsername);
      });
    };

  return (
    <>
    <div>
        <h1>Welcome back, {authorizedUsername}!</h1>
        <p>New events with like-minded people are waiting for you</p>
        <input placeholder='email' onChange={e => setLoginEmail(e.target.value)}></input>
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)}></input>
        <button onClick={login}>Submit</button>
        <button onClick={getUser}> get loggedin user</button>


    </div>

    </>
  )
}

export default Dashboard
