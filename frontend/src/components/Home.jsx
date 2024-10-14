import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Post from './Post'

function Home() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category')
  let categories = [
   
    {id:1, type:"Music"},
    {id:2, type:"Movies"},
  {id:3, type:"Fashion"},
  {id:4, type:"Sports"}, 
  {id:5, type:"Tech"},
  
  ]
  return (
   
    <div className='w-screen '>
     <div className='bg-cover bg-no-repeat bg-[url("https://res.cloudinary.com/worldpackers/image/upload/c_fill,f_auto,q_auto,w_1024/v1/guides/article_cover/vdw3fdnjrjqyxxscep5n")] w-screen h-[45vh]'> </div>
     <Link to={`/createpost?catergory=${category||""}`}>  <button className='py-2 m-3 px-2 rounded-xl text-white bg-blue-800 m'>Create Blog</button></Link> 
      <div className='grid grid-cols-2 w-screen '>
        
        <div className=' w-[35%] '>
       <Link to="/"><h1 className='font-bold px-3  '>All Categories</h1></Link>
        {categories.map((category,index)=>{
          return(
            <Link to={`/?category=${category.type}`} key={index}>
             <h1 className=' py-2 px-3 font-medium border-y  border-zinc-500'> {category.type}</h1> </Link>
           

          )

        })
      }
        </div>
        <div className='w-[55vw] -ml-[15vw] '>
          <Link to={`/details ${Post._id}`}>
          <Post/>
          </Link>
        
        </div>

      </div>
    </div>
   
  )
}

export default Home
