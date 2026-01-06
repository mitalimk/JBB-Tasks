const express=require("express");
const router=express.Router();
const{registerUser,loginUser,changePassword,updateProfile}=require("../controllers/AuthControl");
const authMiddleware=require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", authMiddleware, changePassword);
router.put("/update-profile", authMiddleware, updateProfile);



module.exports=router;

// router.get("/register",(req,res)=>{
//     res.send("Register route working");
// });

// router.get("/login",(req,res)=>{
//     res.send("Login route working");
// });
// router.get("/change-password",(req,res)=>{
//     res.send("Change password route working");
// });
// router.get("/update-password",(req,res)=>{
//     res.send("Update route working");
// });

