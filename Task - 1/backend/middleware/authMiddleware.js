const jwt=require("jsonwebtoken");
const User=require("../models/User");

const authMiddleware=async(req,res,next)=>{
    try{

        const authHeader=req.header("Authorization");
        if(!authHeader){
            return res.json({message:"Access denied."});
        }
        const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;


        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=await User.findById(decoded.id).select("-password");

        if(!req.user){
            return res.json({message:"User not found"});
        }
        next();
    } catch(error){
        res.json({message:"Invalid or expired token"});
    }

};
module.exports=authMiddleware;