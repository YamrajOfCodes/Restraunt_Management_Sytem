const OnproductDb = require("../../Model/On_stokes/onnstokesSchema");
const stokesDb = require("../../Model/Stocks/stokesSchema");

const requestStoke = async(req,res)=>{
    const {productname,quantity} = req.body;
    console.log(productname,quantity);
    

    try {
      if(!productname || !quantity){
        return res.status(400).json({error:'all the fields are required'});
      }  
      const addOnstokes = new OnproductDb({
        productname,productConfirmation:'2',status:"pending",quantity
      }) 

      await addOnstokes.save();
      return res.status(200).json(addOnstokes)
    } catch (error) {
        console.log(error);
        
    }
}

const getOnStocks = async(req,res)=>{
  try {
     const getOnstaocks = await OnproductDb.find({});
     return res.status(200).json(getOnstaocks);
  } catch (error) {
    console.log(error);
    
  }
}

const reduceStock = async (req, res) => {
  try {
    const { productname, quantity } = req.body;

    const updateproduct = await stokesDb.findOne({ productname });

    if (!updateproduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reduceBy = Number(quantity);
    const currentQty = Number(updateproduct.quantity);

    if (isNaN(reduceBy) || reduceBy <= 0) {
      return res.status(400).json({ message: "Invalid quantity to reduce" });
    }

    if (reduceBy > currentQty) {
      return res.status(400).json({ message: "Cannot reduce more than available stock" });
    }

    updateproduct.quantity = currentQty - reduceBy;

    await updateproduct.save();

    return res.status(200).json(updateproduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = {
    requestStoke,
    getOnStocks,
    reduceStock
}