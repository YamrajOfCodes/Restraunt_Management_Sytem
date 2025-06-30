const express = require("express");
const app = express();
const Dbconnect = require("./Db/DbConnect");
const cors = require("cors");


app.use(cors("*"));

app.use(express.json());


const AdminRouter = require("./Routes/Admin/adminRoutes");
app.use("/admin/api",AdminRouter);


const cookRouter = require("./Routes/Cook/cookroutes");
app.use("/cook/api",cookRouter);

const ownerRouter = require("./Routes/Owner/onnerRoutes");
app.use("/owner/api",ownerRouter);

const CommonRouter = require("./Routes/CommonRoutes/commonRoutes");
app.use("/common/api",CommonRouter);

Dbconnect();


app.listen(4000,()=>{
    console.log("listening");
    
})