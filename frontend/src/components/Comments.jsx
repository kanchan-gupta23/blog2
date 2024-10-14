import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './auth';
import { useParams } from 'react-router-dom';

function Comments({ post }) {
    const { id } = useParams();
    const { user, authenticationToken } = useAuth();

    const [comment, setComment] = useState({
        name: "",
        postId: "",
        comment: "",
        date: new Date(),
    });
    const [comments, setComments] = useState([]);

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setComment({
            ...comment,
            [name]: value,
        });
    };

    useEffect(() => {
        if (user && post) {
            setComment((prevComment) => ({
                ...prevComment,
                name: user.username,
                postId: post._id, // Ensure you are using post._id
            }));
        }
    }, [user, post]);

    const handleSubmit = async () => {
        const response = await axios.post(`http://localhost:8000/api/auth/comments`, comment, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authenticationToken,
            },
        });

        if (response.status === 200) {
            console.log(response.data);
            setComment({ ...comment, comment: "" });
            fetchData(); // Call fetchData to refresh the comments list
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/auth/comments/${post._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authenticationToken,
                },
            });

            if (response.status === 200) {
                console.log('Fetched comments response:', response.data);
                setComments(response.data.msg); // Ensure this is the correct path
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData on mount
    }, [post]); // Fetch comments whenever post changes

    return (
        <div>
            <div className='flex justify-center mt-7 gap-3' >
                <textarea
                    onChange={handleInput}
                    name="comment"
                    value={comment.comment}
                    className='w-[70vw] h-[18vh] border-black border-2'
                    placeholder='Type your comment'
                ></textarea>
                <button className='bg-blue-700 h-[6.5vh] w-[6vw] rounded-[10%] mt-14' type='submit' onClick={handleSubmit}>Post</button>
            </div>
            
            <h1 className='font-bold text-[3vh] ml-4'>Comments:</h1>
            {comments.length > 0 ? ( // Check if comments exist
                comments.map((comment, index) => (
                    <div key={comment._id} className='w-[50vw] border-black border-2 rounded-xl bg-zinc-200 my-3 ml-4'>
                        <div className='flex  justify-between'>
                        <h1 className='capitalize pl-2 font-bold'>{comment.name}</h1>
                        <h4 className='pr-2'>{new Date(comment.date).toLocaleDateString()}</h4>
                        </div>
                        <h2 className='pl-5'>{comment.comment}</h2>
                        {/* <h3>{comment.postId}</h3> */}
                       
                    </div>
                ))
            ) : (
                <h2>No comments yet.</h2> // Display message when no comments
            )}
        </div>
    );
}

export default Comments;
