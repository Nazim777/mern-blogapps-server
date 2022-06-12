import express from "express";
const app = express()
import cors from 'cors'
import dotenv from 'dotenv'
const hello = dotenv.config()
import databaseconnect from "./DB/Database.js";
import router from "./Routes/BlogRouter.js";
import userrouter from './Routes/UserRouter.js'




app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json())
app.use(router,userrouter)
app.use(express.urlencoded({extended:false}))
//app.use(userrouter)
databaseconnect()

app.get('/',(req,res)=>{
    res.send('hello this is node server')
})

const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})

