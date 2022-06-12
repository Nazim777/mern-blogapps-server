import express from "express";
const router = express.Router()
import {register,login,getregisteruser,getuserByid} from "../Controller/UserController.js";
router.post('/user/register',register)
router.get('/user/alluser',getregisteruser)
router.post('/user/login',login)
router.get('/user/getuserbyid/:_id',getuserByid)
export default router