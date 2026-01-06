const User=require("../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

exports.registerUser=async(req,res)=>{
    try{
        const { name, email, password } = req.body;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists!"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({
            name,
            email,
            password:hashedPassword,
        });
        await user.save();
        res.json({message:"User registered successfully!"});
    } catch(error){
        res.json({message:"Registration failed",error});
    }
};

exports.loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.json({message: "Invalid email or password"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({message:"Invalid email or password"});
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        
        res.json({
            message:"Login successful", 
            token,
            name:user.name,
        });
    } catch(error){
        res.json({mesage:"Login failed",error});
    }
};

exports.changePassword=async(req,res)=>{
    try{
        const {oldPass, newPass}=req.body;
        const user=await User.findById(req.user._id);
        const isMatch=await bcrypt.compare(oldPass, user.password);
        if(!isMatch){
            return res.json({message:"Old password is incorrect"});
        }

        const hashedPassword=await bcrypt.hash(newPass,10);
        user.password=hashedPassword;
        await user.save();

        res.json({message:"Password changed successfully"});
    } catch(error){
        res.json({message:"Password change failed"});
    }
};

exports.updateProfile=async(req,res)=>{
    try{
        const{name,email}=req.body;
        const user=await User.findById(req.user._id);

        if(!user){
            return res.json({message:"User not found"});
        }
        user.name=name || user.name;
        user.email=email || user.email;
        await user.save();

        res.json({message:"Profile updated successfully!",
        user:{
            name:user.name,
            email:user.email
        }
    });
}catch(error){
    res.json({message:"Profile update failed!"});
}
};
