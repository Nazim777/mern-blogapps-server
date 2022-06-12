import mongoose from "mongoose";
const databaseconnect =()=>{
   mongoose.connect(process.env.DATABASE)
    console.log('database connected successfully')
    

}
export default databaseconnect