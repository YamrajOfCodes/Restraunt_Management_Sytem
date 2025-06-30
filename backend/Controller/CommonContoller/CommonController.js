const userDb = require("../../Model/User/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const productDb = require("../../Model/Product/productSchema");
const stocksDb = require("../../Model/Stocks/stokesSchema");

const Login = async (req,res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Both fields are required" });
    }

    const validUser = await userDb.findOne({ email });
    if (!validUser) {
        return res.status(400).json({ error: "invalid credentials" });
    }

    const validpassword = await bcrypt.compare(password, validUser.password);
    console.log('Password comparison result:', validpassword);

    if (!validpassword) {
        return res.status(400).json({ error: "Password is incorrect" });
    }

    const token = await validUser.generateToken();
    console.log(token);
    
    const result = {
        validUser,
        token
    };

    res.status(200).json(result);
} catch (error) {
    console.error('Error during login process:', error);
    res.status(500).json({ error: "Internal Server Error" });
}

    
}


const userVerify = async(req,res)=>{
 try {

        const validUser = await userDb.findOne({_id:req.userId});
        console.log(validUser);
        
        
        if(validUser){
            return res.status(200).json(validUser)
        }else{
            res.status(400).json({error:"invalid user"})
        }
        
    } catch (error) {
        return res.status(200).json(error)
    }
}

const Logout = async (req,res) => {
     try {
        
        req.rootUser.tokens = req.rootUser.tokens.filter((element)=>{
            return req.rootUser.tokens !== req.token
        })

        await req.rootUser.save();

        res.status(200).json("user is logout")

    } catch (error) {
    return res.status(200).json(error);
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

const getStocks = async(req,res)=>{
 try {
        const getallstokes = await stocksDb.find({});
        return res.status(200).json(getallstokes)
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {
    Login,
    Logout,
    userVerify,
    getProducts,
    getStocks
}