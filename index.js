import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dbConnect from "./database/dbConfig.js";
import authrouter from "./Router/authRouter.js"
import serviceRouter from "./Router/serviceRouter.js"
import bookingroute from "./Router/bookingRouter.js"

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());
dbConnect();

const port=process.env.port

app.get("/",(req,res)=>{
    res.status(200).send("welcome to api")
})

app.use("/api/auth",authrouter)

app.use("/api/service",serviceRouter)

app.use("/api/bookingservice",bookingroute)

app.listen(port,()=>{
    console.log("server started");
    
})