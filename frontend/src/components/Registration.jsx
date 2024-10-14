import {useState}from 'react'

// import axios from 'axios';
import logo from '../logo.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
function Registration() {
  const navigate = useNavigate()
  const [user,setUser] = useState({
    email:"",
    username:"",   
    password:"",
    phone:""
  }
    
  )

  const {storeInLS} = useAuth()

  const userRegitration = (e)=>{
    try {
      let name = e.target.name
      let value = e.target.value
      setUser({
        ...user,
        [name]:value
      })

      
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending request...');
      const response = await fetch(`http://localhost:8000/api/auth/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
        credentials: 'include'
      });
  
      console.log('Request sent, awaiting response...');
  
      if (response.ok) {
        storeInLS(response.token)
        const data = await response.json();  // Parse the JSON response
        console.log('Registration successful:', data);
        navigate("/login");  // Redirect to the login page
        setUser({ email: "", username: "", password: "", phone: "" });  // Clear the form
      } else {
        const errorData = await response.json();  // Parse error details
        console.error('Registration failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred:', error.message);
    }
  };
  
  return (
    <div>
    <div className='bg-blue-950 w-[100vw] h-screen overflow-hidden flex items-center justify-center'>
    
      
    <form onSubmit={handleSubmit} className='w-[30vw] h-[80vh] bg-white rounded-xl shadow-gray-100 shadow-lg relative'>
    <img src={logo} className='w-[10vw] absolute -translate-x-1/2  left-1/2'/>
    <h1 className="font-bold absolute -translate-x-1/2  left-1/2 top-[12vh] ">Welcome</h1>
    <label className='absolute -translate-x-1/2  left-[4vw] top-[18vh] font-bold'>Email</label><br/>
    <input className='absolute -translate-x-1/2 left-[10vw] top-[23vh] border-2 rounded-lg border-black px-2' name='email' value={user.email} placeholder='email' type='email' onChange={userRegitration} /><br/>
    <label className='absolute -translate-x-1/2  left-[5vw] top-[29vh] font-bold'>Username</label><br/>
    <input className='absolute -translate-x-1/2 left-[10vw] top-[33vh] border-2 rounded-lg border-black px-2' name='username' value={user.username}  placeholder='useranme' type='text' onChange={userRegitration} /><br/>

    <label className='absolute -translate-x-1/2  left-[5vw] top-[39vh] font-bold'>Password</label><br/>
    <input  className="absolute -translate-x-1/2  left-[10vw] top-[45vh] border-2 rounded-lg border-black  px-2" name='password' value={user.password} placeholder='password' type='password' onChange={userRegitration} /><br/>
    <label className='absolute -translate-x-1/2  left-[5vw] top-[50vh] font-bold'>Phone no.</label><br/>
    <input className='absolute -translate-x-1/2 left-[10vw] top-[55vh] border-2 rounded-lg border-black px-2' name='phone' placeholder='phone' value={user.phone} type='text' onChange={userRegitration} /><br/>
    <button className='absolute -translate-x-1/2  left-1/2 top-[63vh] border bg-blue-600 rounded-lg px-4 py-2 text-white' type='submit'>Submit</button>
    </form>
     
   
    
  </div>
       
     
      
    </div>
  ) 
}

export default Registration
