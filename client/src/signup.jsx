import { useState } from 'react'
import './login.css'
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const getUser = () => {
  axios({
    method: "get",
    withCredentials: true,
    url: "http://localhost:3000/currentuser"
  })
};

function Signup() { 
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupLocation, setSignupLocation] = useState("");
    const navigate = useNavigate();
    const register = () => {
      axios({
        method: "post",
        data: {
          email: signupEmail,
          password: signupPassword,
          name: signupName,
          location: signupLocation
        },
        withCredentials: true,
        url: "http://localhost:3000/user/createuser"
              
      })
      .then(response => {
        if(response.config.method === "post" && response.data.message == "User was created" ) {
          // console.log(response);
          console.log('Signup was successful');
          navigate("/login");
          
        }
        else  {
          // console.log(response.config.method);
          // console.log(response.status);
          // console.log(response.data.message);
          console.log('Non-200 response recorded in signup.jsx');
        }
      }).catch(err => {
        console.log(err);
      });
    };


  return (
    <>
    <div>
        <h1>Signup Page</h1>
        <input placeholder='name' onChange={e => setSignupName(e.target.value)}></input>
        <input placeholder='email' onChange={e => setSignupEmail(e.target.value)}></input>
        <input placeholder='password' onChange={e => setSignupPassword(e.target.value)}></input>
        <input placeholder='location' onChange={e => setSignupLocation(e.target.value)}></input>
        <button onClick={register}>Submit</button>
        <button onClick={getUser}> get current user</button>


    </div>

    </>
  )
}

export default Signup
