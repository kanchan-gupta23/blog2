import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaSquarePen } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Comments from './Comments';
import { useAuth } from './auth';

function Details() {
  const { authenticationToken } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/auth/posts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authenticationToken,
          },
        });
        setPost(response.data);
      } catch (error) {
        setError("Error fetching post data.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, authenticationToken]); // Removed 'post' from dependencies

  const deleteData = async () => {
    try {
      const delresponse = await axios.delete(`http://localhost:8000/api/auth/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticationToken,
        },
      });
      if (delresponse.status === 200) {
        console.log(delresponse);
        navigate("/");
      }
    } catch (error) {
      console.log("Error deleting post:", error);
    }
  };

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='relative'>
      <img  className='w-screen object-conatin  h-[40vh]' src={post.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLBn53rDmJWmSn6rbAxIL4xvFMYvVecdMgBGY3r5CMYiXSlSsU2KI7_QphICSNMa-DZbo&usqp=CAU'} alt={post.title || 'Default Image'} />
      <div className='absolute right-0 flex gap-4  '>
        <Link to={`/update/${post._id}`}><FaSquarePen  className="text-[5vh] text-blue-900 " /></Link>
        <button onClick={deleteData}><MdDelete  className="text-[5vh] text-red-700" /></button>
      </div>
      <div className='ml-4'>
      <h1 className='font-bold pl-3 capitalize text-[5vh] absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2'>{post.title}</h1>
      <div className='flex justify-between mt-9 '>
        <div className=''>
      <span>author:</span><span  className='font-bold pl-3 capitalize text-[3vh]' >{post.username}</span></div>
      <h4 className='mr-7'>{new Date(post.createdAt).toLocaleDateString()}</h4>
      </div>
      <h1 className=''>{post.description}</h1>
      {/* <h3>{post.categories}</h3> */}
     
      </div>
      
      <Comments post={post} />
    </div>
  );
}

export default Details;
