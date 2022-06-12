import blogModel from "../Model/BlogModel.js";
import mongoose from "mongoose";
import userModel from "../Model/UserModel.js";
const insertblog=async(req,res)=>{
 const {title,description,image} = req.body
 const {_id} =req.params 
 //console.log(_id)
   // console.log('title:',title, 'des:',description)
   const data = blogModel({
     title,description,image,
     postedBy:_id 
   })
   const result = await data.save()
   //console.log(result._id)
  await userModel.updateOne({_id:_id},{
     $push:{
       blogs: result._id
     }

   })
   res.status(200).json({message:'blog posted successfully!'})
}

const getBlog=async(req,res)=>{
 try {
  const data = await blogModel.find().populate('postedBy')
  res.status(200).json(data)
  
 } catch (error) {
   res.status(400).json({message:'error'})
   
 }

}

const deleteblog=async(req,res)=>{
 
    const {_id} = req.params
    //console.log(_id)
 try {
   const deletedblog = await blogModel.findByIdAndRemove({_id:_id})
    
     if(deletedblog){
       res.status(200).json('delete successfully')
       
     }else{
       res.status(400).json({message:'user already deleted!'})
     }
   
 } catch (error) {
   res.json(error)
   
 }
 
  
}

const updateblog=async(req,res)=>{
 
    const {title,description} = req.body
   // console.log('title:',title, 'des:',description)
    const {_id} = req.params
   // console.log(_id)
try {
  const updatedblog= await blogModel.findByIdAndUpdate({_id:_id},{title,description})
  if(updatedblog){
    res.status(200).json({message:'blog updated successfully!'})
  }
} catch (error) {
  res.status(400).json({message:'something went wrong!'})
  
}
  } 


  const getByid= async(req,res)=>{
    const {_id} = req.params
    try {
      const data = await blogModel.findById(_id).populate('postedBy')
      if(data){
        res.status(200).json(data)
      }else{
        res.status(400).json({message:'no blog exists in this id!'})
      }
    } catch (error) {
      
    }
  }


export {insertblog,getBlog,deleteblog,updateblog,getByid}