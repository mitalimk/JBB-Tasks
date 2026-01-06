const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");
const authRoute=require("./routes/authRoute");


const app=express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);

mongoose.connect(process.env.MONGO_URI).then(()=>
    console.log("Database Connected")).catch((err)=>
    console.log(err));

app.get("/",(req,res)=>{
    res.send("Running");
});
app.listen(5000,()=>{
    console.log("Server running on port 5000");
});
