import express from "express";
const router = express.Router()
import {insertblog,getBlog,deleteblog,updateblog,getByid} from '../Controller/BlogController.js'
import checklogin from '../Middlewear/CheckLogin.js'
router.post('/blog/post/:_id',insertblog)
router.get('/blog/get', getBlog)
router.delete('/blog/delete/:_id',deleteblog)
router.put('/blog/update/:_id', updateblog)
router.get('/blog/get/:_id',getByid)

export default router