// // import { children, createContext, useContext, useState  } from "react"
// // import axios from "axios"

// // export const AuthContext = createContext()

// // export const AuthProvider = ({children})=>{
// //     const [token , setToken]=useState(localStorage.getItem('token'))
// //     const [userData, setuserData]= useState("")
// //     const storeTokenLS = (serverToken)=>{
// //         setToken(serverToken);
// //         return localStorage.setItem('token',serverToken)
        
        
// //     }
// //     const isLoggedIn = !!token
// //     const logoutUser = ()=>{
// //         setToken("")
// //         return localStorage.removeItem("token")
// //     }

// //     // const authUserData = async()=>{
// //     //     if (!token) {
// //     //         return console.error("No token found");
// //     //       }
// //     //     try {
// //     //         const response = await axios.get(`http://localhost:8000/api/auth/user`,{
// //     //             headers:{
// //     //                 Authorization:   `Bearer ${token}`           }
// //     //                 }
// //     //         )
// //     //         console.log(response.data); 
// //     //         if(response.status === 200){
        
// //     //          setuserData(response.data)
// //     //          console.log(userData)
// //     //         }
// //     //     } catch (error) {
// //     //         console.log(error)
            
// //     //     }
// //     // }
// //     return <AuthContext.Provider value={{storeTokenLS, logoutUser,isLoggedIn,  }}>

// //         {children}
// //     </AuthContext.Provider>
// // }

// // export const useAuth = ()=>{
// //     const authContextValue = useContext(AuthContext)
// //     return authContextValue;
// // }


// import axios from 'axios';

// import { createContext, useContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// // eslint-disable-next-line react/prop-types
// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem('Token'));
//   const [user,setUser]= useState("")
// const authenticationToken = `Bearer ${token}`
//   const storeInLS = (newToken) => {
//   setToken(newToken)
//     try {
//       if (newToken) {
//         localStorage.setItem('Token', newToken);
        
//       } else {
//         console.error('No token provided');
//       }
//     } catch (error) {
//       console.error('Failed to store token:', error);
//     }
//   };

//   const isLoggedIn = !!token;

//   const LogoutUser = () => {
   
//     try {
//       setToken("");
//       localStorage.removeItem('Token');
//     } catch (error) {
//       console.error('Failed to remove token:', error);
//     }
//   };

//   const authContactUser =  async ()=>{
//     try {
//       const contactData = await fetch(`http://localhost:8000/api/auth/user`,{
//         method:"GET",
//         headers:{
//           Authorization: authenticationToken
//         }
//       })
  
//       if(contactData.ok){
//         const data = await contactData.json()
//         setUser(data)
    
//       }
//     }
//     catch (error) {
      
//       console.log(error)
//     }
//     } 

//    useEffect(()=>{
    
//     authContactUser()
//    },[])

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, LogoutUser, storeInLS,user,  authenticationToken }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('Token'));
  const [user, setUser] = useState("");

  const authenticationToken = `Bearer ${token}`;

  const storeInLS = (newToken) => {
    setToken(newToken);
    try {
      if (newToken) {
        localStorage.setItem('Token', newToken);
      } else {
        console.error('No token provided');
      }
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    try {
      setToken("");
      localStorage.removeItem('Token');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  const authUser = async () => {
    if (!token) {
      console.error("No token available for fetching user data.");
      return;
    }

    try {
      const contactData = await axios.get(`http://localhost:8000/api/auth/user`, {
        headers: {
          Authorization: authenticationToken
        },
      });

      if (contactData.status === 200) {
        const data = contactData.data;
        setUser(data.msg); // Assuming the API returns the user data
        console.log("User data fetched:", data); // Log the user data for debugging
      } else {
        console.error("Failed to fetch user data:", contactData);
      }
    } catch (error) {
      console.log("Error in fetching user data:", error);
    }
  };

  useEffect(() => {
    if (token) {
      authUser();
    }
  }, [token]); // Run this effect when 'token' changes

  return (
    <AuthContext.Provider value={{ isLoggedIn, LogoutUser, storeInLS, user, authenticationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
