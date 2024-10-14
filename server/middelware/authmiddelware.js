const jwt = require ("jsonwebtoken")
const User = require("../db/userSchema")
const authMiddleware = async (req, res, next) =>{
try {
  const token=  req.header("Authorization")
  if (!token){
     return res.status(404).json({msg:"token not found"})
  }
  
  try {
    const jwtToken = token.replace("Bearer","").trim()
    const isValid = jwt.verify(jwtToken,process.env.SECRET_KEY)

    const userData = await User.findOne({email:isValid.email}).select({password:0})
    if (!userData) {
        return res.status(404).json({ msg: "User not found" });
      }
    req.user= userData
    req.token = token
    req.userID = userData._id


    next()
  } catch (error) {
    console.log(error);
    
      
  }
} catch (error) {
    return res.status(401).json({ msg: "Unauthorized, invalid token", error: error.message });
}
}


module.exports = authMiddleware