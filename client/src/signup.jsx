import { useState } from 'react'
import './login.css'
import React from 'react';
import axios from 'axios';


function Signup() { 
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");
    const [signupLocation, setSignupLocation] = useState("");
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
        url: "http://localhost:3000/signup"
              
      })
      .then(res => console.log(res));
    };
    const getUser = () => {
      // axios({
      //   method: "get",
      //   withCredentials: true,
      //   url: "http://localhost:3000/signup"
        
      // },
      // )
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
