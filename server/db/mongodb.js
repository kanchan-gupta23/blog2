const mongoose = require("mongoose")
const URI = (process.env.MONGOOSE_URL)

const connectDB = async(req,res)=>{
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("database connected successfull")
    } catch (error) {
        console.log("OOPs connection fail")
        
    }
}

module.exports = connectDB