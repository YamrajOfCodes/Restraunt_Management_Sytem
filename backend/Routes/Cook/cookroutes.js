const router = require("express").Router();
const cookController = require("../../Controller/Cook/cookController")

router.post("/add-request",cookController.requestStoke);
router.get("/getonstocks",cookController.getOnStocks)
router.patch("/reducestock",cookController.reduceStock);


module.exports = router;