const mongoose = require("mongoose")


     
     const  dbConnect = async()=>{
        let DB_URL = 'mongodb+srv://kundan:9960322509@cluster0.k4tndq4.mongodb.net/Restraunt?retryWrites=true&w=majority&appName=Cluster0'
       const connect =  await mongoose.connect(DB_URL);

       if(connect){
        console.log("connected");
       }else{
        console.log("error while connect");
        
       }
    }
    

   module.exports = dbConnect;