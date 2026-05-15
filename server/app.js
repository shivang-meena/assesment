import "dotenv/config"  
import  cors from "cors"
import express from "express";
import mongoose from "mongoose";
const app=express();

import route from "./routes/userRoutes.js";

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
main().then(()=>{
    console.log("mongodb connectd");
}).catch((err)=>{
console.log(err);
});
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/UserDetails");
}

app.use("/user",route);

app.get("/",(req,res)=>{
    res.send("server was runnig ");
});

app.listen(3000,()=>{
   console.log("srver is running ");
});