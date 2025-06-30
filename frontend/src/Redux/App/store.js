import {configureStore} from "@reduxjs/toolkit";
import commonSlice from "../Slices/Common/commonSlice"
import cookSlice from "../Slices/Cook/cookSlice"
import adminSlice from "../Slices/Admin/adminSlice"


const store = configureStore({
     reducer:{
        common:commonSlice,
        cook:cookSlice,
        admin:adminSlice
     }
});

export default store