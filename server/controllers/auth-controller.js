
const User = require ("../db/userSchema")
const Post = require ("../db/postSchema")
const Comment = require ("../db/commentSchema")
const url = 'https://localhost:8000'
const grid = require("gridfs-stream")
const mongoose = require("mongoose")
const conn = mongoose.connection
let gfs;
let gridfsBucket
conn.once("open",()=>{
   
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);

    // Specify the collection for GridFS
    gfs.collection("fs");

    console.log("GridFS initialized successfully!");
})

const Registration = async (req,res)=>{
try {

   
    const {email,username,password,phone} = req.body
    const userExist = await User.findOne({email})
    if (userExist){
        return res.status(404).json({msg:"user already exist"})
    }
 
    const userCreate = await User.create({email, username, password, phone})
    const token = await userCreate.generateToken();
    res.status(200).json({msg:userCreate, token, user_ID:userCreate._id})
    
} catch (error) {
    console.log(error)
}
}

const Login = async (req,res)=>{
    try {
        const {email, password} =req.body
        const userExist = await User.findOne({ email });

        if(!userExist){
            return res.status(400).json({msg:"invalid credentials"})
        }
        const validUser = await userExist.comparePassword(password)
        if(!validUser){
            return res.status(400).json({msg:"invalid credentials"})
        }
        const token = await userExist.generateToken();
        return res.status(200).json({msg:userExist, token ,user_id:userExist._id})

    } catch (error) {
        console.log(error)
    }
}

const user = async (req,res)=>{
    try {
        const userData = req.user
        res.status(200).json({msg:userData})
       
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
        
    }
}

const uploadImage = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded." }); // Change to 400 for bad request
        }

        // Construct the image URL based on your backend configuration
        const imageUrl = `${url}/file/${req.file.filename}`;

        // Return the image URL in the response
        return res.status(200).json({ imageUrl }); // Return as an object for better structure
    } catch (error) {
        console.error("Image upload error:", error); // Log the error for debugging
        return res.status(500).json({ msg: "Internal server error." }); // Handle server error
    }
};

const getImage = async(req,res)=>{
    try {
       const file= await gfs.files.findOne({filename:req.params.filename})
      const readstream=  gridfsBucket.openDownloadStream(file._id)
      readstream.pipe(res)
        
    } catch (error) {
        console.log("image get nhi ho rhi h ")}

}

const create = async (req,res)=>{
    try {
        const {title,description,createdAt,username,categories,image} = req.body
        const post = await Post.create({title,description,createdAt,username,categories,image})
       
     res.status(200).json({msg:post})
        
    } catch (error) {
        console.log("post craete nhi hui h ")
    }
}

const post = async (req,res)=>{
   
    try{
        const category = req.query.categories
        console.log("Received categories: ", category); 
        let posts;
        if(category){
            const categoryArray = category.split(",")
            console.log(categoryArray); 
            posts = await Post.find({categories: { $regex: categoryArray.join("|"), $options: "i" } })

        }
        else{
            posts= await Post.find({})
           
        }
     return   res.status(200).json(posts)
        
      
    }
    catch(error){
        console.log(error,"post fetch nhi ho rhi h")
    }
}

const posts = async (req,res)=>{
    try {
        const data = await Post.findById(req.params.id)
        return res.status(200).json(data)
        
    } catch (error) {
        console.log(error);
        
    }
}

const update = async (req,res)=>{
    try {
        const data = await Post.findById(req.params.id)
        if (!data){
            res.status(404).json({msg:"update data nhi mil rha"})
        }
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body})
        return res.status(200).json(data)
        
    } catch (error) {
        console.log(error);
    }
}

const deletePost = async (req,res)=>{
    try {
        const data = await Post.findById(req.params.id)
        await data.deleteOne()
        return res.status(200).json({ msg: "Post deleted successfully" });
        
    } catch (error) {
        console.log(error)
        
    }
}

const comments = async (req, res)=>{
    try {
       const  {comment,postId,name,date} = req.body
        const data = await Comment.create({comment,postId,name,date})
        return res.status(200).json({msg:data})
    } catch (error) {
        console.log(error)
        
    }
}
const commentsData = async (req, res)=>{
    try {
     
        const data = await Comment.find({postId:req.params.id})
        return res.status(200).json({msg:data})
    } catch (error) {
        console.log(error)
        
    }
}



  

module.exports = {Registration,Login,user,uploadImage,getImage,create,post, posts, update, deletePost,comments,commentsData}