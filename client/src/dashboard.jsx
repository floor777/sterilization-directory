import { useState } from 'react'
import './login.css'
import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Home from './map';

function Dashboard() { 
    const [authorizedUsername, setAuthorizedUserName] = useState("");
    const navigate = useNavigate();

    const logout = () => {
      axios({
        method: "post",
        withCredentials: true,
        url: "https://sterilizationdirectoryserver.azurewebsites.net/auth/logout"

      })
      .then(response => {
        if(response.config.method === "post" && response.data == "OK" ) {
          navigate("/");
        }
        else  {
          console.log('Non-200 response recorded in dashboard.jsx');
        }
      }).catch(err => {
        console.log(err);
      });
    }


  return (
    <>
    <div>
        <h1>Welcome back!</h1>
        <p>Find a nearby doctor who understands and respects the decisions you make</p>
        {/* <button onClick={getUser}>Get loggedin user</button> */}
        <button onClick={logout}>Logout</button>
        <Home />
    </div>

    </>
  )
}

export default Dashboard