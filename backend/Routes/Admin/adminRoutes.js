const router = require("express").Router();
const adminController = require("../../Controller/Admin/adminController");

router.post("/addproduct",adminController.addProduct)
router.post("/addcook",adminController.addCook)
router.get("/getallcooks",adminController.getCooks);

router.patch("/updatestatus/:productid",adminController.updateStatus)




module.exports = router;