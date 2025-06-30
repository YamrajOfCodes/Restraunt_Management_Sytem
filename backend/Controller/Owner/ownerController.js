const userDb = require("../../Model/User/userSchema");
const OnproductDb = require("../../Model/On_stokes/onnstokesSchema");
const stokesDb = require("../../Model/Stocks/stokesSchema");


const addAdmin = async(req,res)=>{
    const {name,email,password} = req.body;

     try {
       if(!name || !email || !password ){
        return res.status(400).json({error:"all fields are required"});
       }  

       const adminExists = await userDb.findOne({email});
       if(adminExists){
        return res.status(400).json({error:"cook already exists"});
       }

       const newAdmin = new userDb({
        name,email,password,role:'admin'
       })

       await newAdmin.save();
       return res.status(200).json(newAdmin)

    } catch (error) {
        console.log(error);
        
    }
}

const getallAdmins = async(req,res)=>{
    try {
        const admins = await userDb.find({role:'admin'});
        return res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        
    }
}

const deleteAdmin = async(req,res)=>{
    try {
        const {adminId} = req.params;
        const deleteAdmin = await userDb.findOneAndDelete({_id:adminId});
        return res.status(200).json("admin deleted");
    } catch (error) {
        
    }
}

const addtoStokes = async(req,res)=>{
    try {
    const {status} = req.body
    const {productid} = req.params;
    const findProduct = await OnproductDb.findOne({_id:productid});
    const findstokeproduct = await stokesDb.findOne({productname:findProduct.productname});

    console.log(findstokeproduct);
    
    if(!findProduct){
        return res.status(400).json({error:"request does not found"})
    }

       findProduct.status = status
       await findProduct.save();

       if(status == "Approved"){
         findstokeproduct.quantity = Number(findstokeproduct.quantity) + parseInt(findProduct.quantity);
         await findstokeproduct.save();
       }
  
    

    return res.status(200).json({success:`${status} upadated`});

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
addAdmin,
getallAdmins,
deleteAdmin,
addtoStokes
}
