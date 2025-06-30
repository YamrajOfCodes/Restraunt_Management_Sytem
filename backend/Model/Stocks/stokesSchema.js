const mongoose = require("mongoose");

const stokesSchema =  new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
})

const stokesModel = mongoose.model("stokesModel",stokesSchema);
module.exports = stokesModel