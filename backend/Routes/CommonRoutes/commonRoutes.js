const router = require("express").Router();
const commonController = require("../../Controller/CommonContoller/CommonController");
const userauthenticate = require("../../Middleware/userAuthenticate");


router.post("/login",commonController.Login);
router.post("/logout",userauthenticate,commonController.Logout);
router.get("/userverify",userauthenticate,commonController.userVerify);


router.get("/getallproducts",commonController.getProducts);
router.get("/getstocks",commonController.getStocks)




module.exports = router;