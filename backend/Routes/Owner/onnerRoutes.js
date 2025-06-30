const router = require("express").Router();
const ownerController = require("../../Controller/Owner/ownerController");


router.post("/add-admin",ownerController.addAdmin);
router.get("/getalladmins",ownerController.getallAdmins)
router.delete("/deleteadmin/:adminId",ownerController.deleteAdmin)
router.patch("/updatstatus/:productid",ownerController.addtoStokes)




module.exports = router;