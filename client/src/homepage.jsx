import { useState } from 'react'
import './login.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import './homepage.css';

function Homepage() { 


  return (
    <>

      <nav className='navbar'>
      {/* <img src='./src/assets/react.svg'></img> */}
      <a href="/"><img class="navbar-brand" src="./src/assets/react.svg" alt="HomePage"></img></a>

      
      {/* <h1 id='website-title'>Childfree Socially </h1> */}
      <Link to="/">
        <button id='homepage-title' type="button">
          Childfree Socially
        </button>
      </Link>


      <div id='signlog'>
      <Link to="/login">
        <button id='login-button' type="button">
          Login
        </button>
      </Link>

      <Link to="/signup">
        <button id='signup-button' type="button">
          Signup
        </button>
      </Link>


        
      </div>

      </nav>
     
      {/* <h1>Homepage</h1> */}
        


    </>
  )
}

export default Homepage
