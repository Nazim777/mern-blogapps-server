import userModel from "../Model/UserModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const register = async(req,res)=>{
    const {name,email,password} = req.body
   try {
      userModel.findOne({email:email},async(err,doc)=>{
          if(doc){
             // res.status(500).json({message:'user already exists'})
             res.json({message:'user already exists'})
          }else{
             // const salt =await bcrypt.genSalt(10)
              const hashpassword = await bcrypt.hash(password,10)
            const data = userModel({
                 name,email,password:hashpassword, 
            })
            const result = await data.save()
            res.status(200).json({message:'registered successfully'})

          }
          if(err){
              res.status(400).json({message:'error'})
          }
      })

   } catch (error) {
       res.status(400).json({message:'error'})
   }
}

const login =async(req,res) =>{
    const {email,password} = req.body
    try {
       const user = await userModel.findOne({email:email})
       if(user){
           const validation= await bcrypt.compare(password,user.password)
           if(validation){
               const token = jwt.sign({'email':email,'_id':user._id},process.env.JWT_SECRET)
               res.status(200).json({message:'login successfully','token':token,'user':user})
           }else{
            res.status(400).json({message:'password does not match !'})
              // res.json({message:'password does not match !'})
           }
       }else{
        res.status(400).json({message:'user does not exists!'})
         //  res.json({message:'user does not exists!'})

       }
        
    } catch (error) {
        res.status(500).json({message:'error'})
        
    }
}


const getregisteruser=async(req,res)=>{
    try {
        const data = await userModel.find().populate('blogs')
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json({error})
        
    }
}

const getuserByid= async(req,res)=>{
   const {_id} = req.params
   try {
       const data= await userModel.findById(_id).populate('blogs')
       res.status(200).json(data)
   } catch (error) {
       res.status(400).json({message:'no user exists in this id!'})
       
   }
}

export  {register,login,getregisteruser,getuserByid}