import { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { useLocation } from "react-router-dom";
import { useAuth } from './auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Update() {
  const navigate = useNavigate();
  const [post, setpost] = useState({
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdAt: new Date()
  });

  const [file, setFile] = useState("");
  const location = useLocation();
  const {user,authenticationToken} = useAuth();
  const {id}= useParams()


  useEffect(() => {
    // Check if user is available and contains username
    if (user && user.username) {
      setpost((prevPost) => ({
        ...prevPost,
        username: user.username // Set the username from AuthContext
      }));
    } else {
      console.log("User data is not available or does not contain username", user);
    }
  }, [user]);  

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("file", file);

        try {
          const uploadFile = await axios.post(`http://localhost:8000/api/auth/file/upload`, data, {
            headers: {
              "Accept": "application/json",
              "Content-Type": "multipart/form-data"
            }
          });

          console.log("Response data:", uploadFile.data);
          setpost((prevPost) => ({
            ...prevPost,
            picture: uploadFile.data.imageUrl
          }));
        } catch (error) {
          console.error("File upload error:", error);
          if (error.response) {
            console.error("Response error:", error.response.data);
          } else {
            console.error("Error message:", error.message);
          }
        }
      }
    };

    getImage();
    setpost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split("=")[1] || "All",
      username: user.username 
    }));
  }, [file, location.search, user.username]);

  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await axios.get(`http://localhost:8000/api/auth/posts/${id}`,{
    
        headers:{
          "Content-Type":"application/json"
        }

      })
      setpost(response.data)
  }

 
 
  fetchData()
  },[id])


    const updatePost = async (e) => {
        e.preventDefault(); 
        
    
        try {
          const response = await axios.put(`http://localhost:8000/api/auth/update/${id}`, post, {
            headers: {
              "Content-Type": "application/json",
              Authorization: authenticationToken
    
            }
          });
    
          if (response.status === 200) {
            navigate("/");
            setpost(response.data)
          }
        } catch (error) {
          console.log("Post creation error:", error);
        }
      };
      const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setpost({
          ...post,
          [name]: value
        });
      };
  
  return (
    <div>
      <div className='w-screen flex justify-center'>
        <img
          className='w-[85vw] object-cover h-[45vh]'
          src={post.picture ? post.picture : `https://cdn.mos.cms.futurecdn.net/9QTpESGBXa32D29J77VR3d-1200-80.jpg`}
          alt='Post Preview'
        />
      </div>

      <form className='flex m-6 w-screen justify-center' encType="multipart/form-data" onSubmit={updatePost}>
        <label htmlFor='fileType'>
          <IoIosAddCircle className='text-[6vh]' />
        </label>
        <input type='file' id='fileType' name='file' className='hidden' onChange={(e) => setFile(e.target.files[0])} />
        <input
          type='text'
          className='border mx-5 rounded w-[50vw] border-zinc-500'
          name='title'
          value={post.title}
          placeholder='Title'
          onChange={handleInput}
        />
        <button type='submit'  className='bg-blue-700 text-white rounded-xl px-3 ml-[19vw]'>
          Update
        </button>
      </form>
      
      <div className='w-screen flex justify-center -mt-3'>
        <textarea
          className='border rounded w-[70vw] h-[33vh] border-black'
          name='description'
          value={post.description}
          placeholder='Start your blog....'
          onChange={handleInput}
        ></textarea>
      </div>
    </div>
  );
}

export default Update;

