  import  { useEffect, useState } from 'react'
  import axios  from 'axios'
  import {useAuth} from "./auth"
  import { Link } from 'react-router-dom'
 


  function Post() {
    const [posts,setPosts] = useState([])
    const {authenticationToken}= useAuth()
    const categories = ["Music", "Tech", "All", "Sports", "Fashion", "Movies"];
    const params = new URLSearchParams();
    params.append("categories", categories.join(","));
    
  console.log("Sending params:", params.toString()); 
    const addElipis = (str,limit)=>{
      return str.length > limit ? str.substring(0, limit)+ "..." : str
    }
 
    const fetchData = async()=>{
      try {
        
        const post = await axios.get(`http://localhost:8000/api/auth/post`,{       
          params, 
             
          headers:{
           
            "Content-Type":"application/json",
             Authorization: authenticationToken
            
          }
        })
        setPosts(post.data)
      }
        
      catch (error) {
        console.log(error,"post fetch nhi ho rhi h ")
      }
    }
  useEffect(()=>{
  fetchData()

  },[])

    
    

      
    return (
      <div className='grid grid-cols-3 gap-[4vw] -ml-9 '>
        {posts && posts.length > 0 ? posts.map((post,index)=>{
          return(
            <Link to={`details/${post._id}`}  key={index}>
                <div className='border-2 border-black'>
            <img src ={post.image?post.image: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBn53rDmJWmSn6rbAxIL4xvFMYvVecdMgBGY3r5CMYiXSlSsU2KI7_QphICSNMa-DZbo&usqp=CAU`} alt={post.title || 'Default Image'}/>
            <div className='flex justify-between'>
            <h1 className='font-bold capitalize pl-1'>{addElipis(post.title,15)}</h1>
            <h4 className='pr-1'>{new Date(post.createdAt).toLocaleDateString()}</h4>
            </div>
            <h1 className='capitalize pl-1'>{post.username}</h1>
            <h1 className='pl-1'>{addElipis(post.description,15)}</h1>
           
            
            
            <h3 className='pl-1'>{post.categories}</h3>
           

      
          </div>
            </Link>
          
          )
      


        }):
        <h1>nothing to display</h1>
      }
        
      </div>
    )
  }

  export default Post
