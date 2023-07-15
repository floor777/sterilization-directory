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
        url: "http://localhost:3000/auth/logout"

      })
      .then(response => {
        if(response.config.method === "post" && response.data == "OK" ) {

          console.log('Logout was successful');
          navigate("/");
          
        }
        else  {
          // console.log(response.config.method);
          // console.log(response.status);
          // console.log(response.data);
          console.log('Non-200 response recorded in dashboard.jsx');
        }
      }).catch(err => {
        console.log(err);
      });
    }

    const getUser = () => {
      axios({
        method: "get",
        withCredentials: true,
        url: "http://localhost:3000/auth/currentuser"
      }).then((response) => {
        // console.log(response);
        const currentUser = response.data;
        setAuthorizedUserName(currentUser);
        
      });
    };

  return (
    <>
    <div>
        <h1>Welcome back, {authorizedUsername}!</h1>
        <p>Find a nearby doctor who understands and respects the decisions you make</p>
        <button onClick={getUser}>Get loggedin user</button>
        <button onClick={logout}>Logout</button>
        <Home />
    </div>

    </>
  )
}

export default Dashboard