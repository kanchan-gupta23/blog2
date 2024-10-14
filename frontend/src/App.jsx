import React from 'react'
import Login from './components/Login'
import Home from './components/Home'
import {Routes,Route,BrowserRouter} from "react-router-dom"

import Navbar from './components/Navbar'
import Registration from './components/Registration'
import Createpost from  './components/Createpost'
import Logout from "./components/Logout"
import Details from "./components/Details"
import Update from './components/Update'
import Comments from './components/Comments'
function App() {
 
  return (
   
    <div className='overflow-hidden'>
     
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     <Route path='/registration' element={<Registration/>}/>
     <Route path='/createpost' element={<Createpost/>}/>
     <Route path='/logout' element={<Logout/>}></Route>
     <Route path='/details/:id' element={<Details/>}></Route>
     <Route path='/update/:id' element={<Update/>}></Route>
     <Route path='/comments/:id' element={<Comments/>}></Route>

     
      </Routes>
      </BrowserRouter>
  

      
    </div>

  )
}

export default App


