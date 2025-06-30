const SECRET_KEY = "djshdi";
const jwt = require("jsonwebtoken")
const userDb = require("../Model/User/userSchema");

const adminauthenticate = async(req,res,next)=>{
  
    const token = req.headers.authorization;
    if(!token){
    return res.status(200).json({error:"token is required"})
    }
    
    const verifyToken = jwt.verify(token,SECRET_KEY);
    
    const rootUser = await userDb.findOne({_id:verifyToken._id});
    
    if(!rootUser){throw new Error("user not found")}

    req.token = token
    req.rootUser = rootUser
    req.userId = rootUser._id

    next();

   
} 

module.exports = adminauthenticate;