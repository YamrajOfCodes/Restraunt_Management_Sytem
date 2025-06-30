const productDb = require("../../Model/Product/productSchema");
const userDb = require('../../Model/User/userSchema')
const stokesDb = require("../../Model/Stocks/stokesSchema")
const OnproductDb = require("../../Model/On_stokes/onnstokesSchema");



const addProduct = async(req,res)=>{
    
    const {productname,productprice} = req.body;
    try {
       if(!productname || !productprice){
        return res.status(400).json({error:"all fields are required"});
       }  

       const productExists = await productDb.findOne({productname});
       if(productExists){
        return res.status(400).json({error:"product already exists"});
       }

       const newProduct = new productDb({
        productname,price:productprice
       })

       const existingStokes = await stokesDb.findOne({productname});
       if(!existingStokes){
        const addStoke = new stokesDb({
            productname,quantity:'0'
        });

        await addStoke.save();
       }


       await newProduct.save();
       return res.status(200).json(newProduct);

    } catch (error) {
        console.log(error);
        
    }
}

const getProducts = async(req,res)=>{
    try {
        const getallproducts = await productDb.find({});
        return res.status(200).json(getallproducts)
    } catch (error) {
        console.log(error);
        
    }
}

const addCook = async(req,res)=>{
    const {name,email,password} = req.body;

     try {
       if(!name || !email || !password){
        return res.status(400).json({error:"all fields are required"});
       }  

       const cookExists = await userDb.findOne({email});
       if(cookExists){
        return res.status(400).json({error:"cook already exists"});
       }

       const newCook = new userDb({
        name,email,password,role:'cook'
       })

       await newCook.save();
       return res.status(200).json(newCook)

    } catch (error) {
        console.log(error);
        
    }
}

const getCooks = async(req,res)=>{
    try {
        const getallcooks = await userDb.find({role:"cook"});
        return res.status(200).json(getallcooks)
    } catch (error) {
        console.log(error);
        
    }
}


const updateStatus = async(req,res)=>{
    const {productid} = req.params;
    const {status} = req.body
    console.log(status);
    
    const findProduct = await OnproductDb.findOne({_id:productid});
    console.log(findProduct);
    
    if(!findProduct){
        return res.status(400).json({error:"request does not found"})
    }

    if(status == "Approved"){
        findProduct.status = "processing";
        findProduct.productConfirmation = "3";
        await findProduct.save();
       return res.status(200).json("request forward to owner");
    }else{
       findProduct.status = "Rejected";
       await findProduct.save();
       return res.status(200).json("request rejected");
    }


     



}



module.exports  = {
    addProduct,
    addCook,
    getProducts,
    getCooks,
    updateStatus
}