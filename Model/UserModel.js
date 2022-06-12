import mongoose from "mongoose";
const {Schema} = mongoose
const userSchema= new mongoose.Schema({
  
    name:String,
    email:String,
    password:String,
    blogs:[
        {
        type:mongoose.Types.ObjectId,
        ref:'allblog'
    }
]
})


const userModel= mongoose.model('user',userSchema)
export default userModel