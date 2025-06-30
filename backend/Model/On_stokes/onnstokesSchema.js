const mongoose = require("mongoose");


const onstokesSchema  = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    productConfirmation:{
       type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    }
})

const onstokesModel = mongoose.model("onstokesModel",onstokesSchema);
module.exports = onstokesModel;