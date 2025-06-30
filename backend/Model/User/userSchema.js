const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const USER_SECRET = "djshdi"
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
 name:{
     type: String, 
    required: true, 
 },
  email: { 
    type: String, 
    required: true, 
    unique: true
},
  password: { 
    type: String, 
    required: true 
},
role:{
  type:String,
  required:true
},
tokens:[
    {
     token:{
        type:String
     }
    }
]
});


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.generateToken=async function(req,res){
    try {
     const newtoekn=jwt.sign({_id:this._id},USER_SECRET,{
       expiresIn:"1d"
     });
     this.tokens=this.tokens.concat({token:newtoekn})
     await this.save();
     return newtoekn
   
    } catch (errors) {
    console.log(errors);
    }
   }

const userModel = mongoose.model('user', userSchema);
module.exports =  userModel;