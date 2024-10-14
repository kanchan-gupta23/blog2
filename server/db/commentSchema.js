const mongoose = require( "mongoose")

const commentSchema = new mongoose.Schema({
    comment:{type:String,
        require:true
     },
     postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
         },
     name:{
        type:String,
        require:true
     },
     date:{
        type:Date,
        
     }

})

const Comment = mongoose.model("Comment",commentSchema)
module.exports = Comment