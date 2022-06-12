import mongoose from "mongoose";
const blogSchema= new mongoose.Schema({
    title: String,
    description:String,
    image: String,
    postedBy:
        {
            type: mongoose.Types.ObjectId,
            ref: "user"
        }
    
   
})
const blogModel= mongoose.model('allblog',blogSchema)
export default blogModel