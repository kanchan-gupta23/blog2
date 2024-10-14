const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');

const bcryptjs = require("bcryptjs")
const user= new mongoose.Schema({
        
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },

    

})

user.pre("save", async function(req,res){
    try {
    const genSalt = await bcryptjs.genSalt(10)
    const hash_passwords = await bcryptjs.hash(this.password,genSalt)
    this.password= hash_passwords
        
    } catch (error) {
        console.log(error)
    }
})

user.methods.comparePassword = async function(password) {
  try {
    const compare = await bcryptjs.compare(password, this.password);
    return compare; // Return the comparison result
  } catch (error) {
    console.log(error);
    throw new Error("Password comparison failed"); // Optional: throw an error for better handling
  }
};

user.methods.generateToken = async function() { 
  console.log("Generating token for user:", this._id);// Use regular function instead of arrow function
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        username: this.username,
      },
      process.env.SECRET_KEY, // Ensure this is defined
      { expiresIn: "30d" }
    );
    return token; // Return the generated token
  } catch (error) {
    console.log("Token generation failed", error);
    throw new Error("Token generation failed");
  }
};


const User = mongoose.model("User",user)

module.exports = User