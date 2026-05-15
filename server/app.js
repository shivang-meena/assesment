import "dotenv/config"  
import  cors from "cors"
import express from "express";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
const app=express();

import route from "./routes/userRoutes.js";


// app.use(cors({
//     origin: ["http://localhost:5173",
//         "https://assesment-murex-rho.vercel.app"
//     ]
// }));
app.use(cors());
app.use(express.json());
connectDB();

app.use("/user",route);

app.get("/",(req,res)=>{
    res.send("server was runnig ");
});


app.listen(process.env.PORT || 3000,()=>{
   console.log("srver is running ");
});