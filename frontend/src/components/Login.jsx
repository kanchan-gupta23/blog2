import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';

function Login() {
  const navigate = useNavigate();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });

  const userLoginForm = (e) => {
    try {
      const { name, value } = e.target;
      setUserLogin({
        ...userLogin,
        [name]: value
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:8000/api/auth/login`, userLogin, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.status===200) {
        // Store token in local storage or context
        localStorage.setItem('Token', response.data.token); // or use your auth context
        console.log("Response", response.data);
         // Redirect to home or desired page
         navigate("/");
      } else {
        console.error('Login failed:', response.data);
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='bg-blue-950 w-[100vw] h-screen overflow-hidden flex items-center justify-center'>
      <form onSubmit={handleSubmit} className='w-[30vw] h-[50vh] bg-white rounded-xl shadow-gray-100 shadow-lg relative'>
        <img src={logo} className='w-[10vw] absolute -translate-x-1/2 left-1/2' alt="Logo" />
        <h1 className="font-bold absolute -translate-x-1/2 left-1/2 top-[12vh]">Welcome</h1>
        <label className='absolute -translate-x-1/2 left-[5vw] top-[18vh] font-bold'>Email</label><br />
        <input className='absolute -translate-x-1/2 left-[10vw] top-[23vh] border-2 rounded-lg border-black px-2' 
               name='email' 
               value={userLogin.email} 
               placeholder='email' 
               type='email' 
               onChange={userLoginForm} /><br />
        <label className='absolute -translate-x-1/2 left-[5vw] top-[29vh] font-bold'>Password</label><br />
        <input className="absolute -translate-x-1/2 left-[10vw] top-[33vh] border-2 rounded-lg border-black px-2" 
               name='password' 
               value={userLogin.password}  
               placeholder='password' 
               type='password' 
               onChange={userLoginForm} /><br />
        <button className='absolute -translate-x-1/2 left-1/2 top-[39vh] border bg-blue-600 rounded-lg px-4 py-2 text-white' type='submit'>Submit</button>
      </form>
    </div>
  );
}

export default Login;
