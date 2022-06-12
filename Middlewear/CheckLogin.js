import jwt from 'jsonwebtoken'
const checklogin= (req,res,next)=>{
    const {authorization} = req.headers;
    try {
        const token= authorization.split(' ')[1]
        const decoded= jwt.verify(token,process.env.JWT_SECRET)
        const {email,_id} = decoded
        req._id= _id
        req.email= email
        next()
    } catch (error) {
       // console.log(error)
        next('please provide jwt token!')
    }
}
export default checklogin