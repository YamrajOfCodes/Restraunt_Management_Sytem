const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
})


const productModel = mongoose.model("productModel",productSchema);
module.exports = productModel;