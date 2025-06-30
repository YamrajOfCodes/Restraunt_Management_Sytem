import { addAdminAPI, addcookAPI, addproductAPI, deleteadminAPI, getAdminAPI, getallcooksAPI, updatestatusAPI, updatestockAPI } from "@/API/AdminAPI/adminAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"



export const updateStatus = createAsyncThunk("updatestatus",async(data)=>{
    try {
        const response  = await updatestatusAPI(data);
        if(response.status==200){
            toast.success("status updated");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const addCook = createAsyncThunk("addcook",async(data)=>{
    try {
        const response  = await addcookAPI(data);
        if(response.status==200){
            toast.success("cook added successfully");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})



export const getallCooks = createAsyncThunk("getallcooks",async(data)=>{
    try {
        const response  = await getallcooksAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const addProduct = createAsyncThunk("addproduct",async(data)=>{
    try {
        const response  = await addproductAPI(data);
        if(response.status==200){
            toast.success("product added successfully");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const updateStock = createAsyncThunk("updatestoke",async(data)=>{
    try {
        const response  = await updatestockAPI(data);
        if(response.status==200){
            toast.success("status updated");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const addAdmin = createAsyncThunk("addadmin",async(data)=>{
    try {
        const response  = await addAdminAPI(data);
        if(response.status==200){
            toast.success("admin added");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getallAdmins = createAsyncThunk("getalladmins",async()=>{
    try {
        const response  = await getAdminAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const deleteAdmin = createAsyncThunk("deleteadmin",async(data)=>{
    try {
        const response  = await deleteadminAPI(data);
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})




  const adminSlice  = createSlice({
    name:"adminSlice",
    initialState:{
        updatestatus:[],
        addcook:[],
        getallcooks:[],
        addproduct:[],
        updatestock:[],
        addadmin:[],
        getalladmins:[],
        deleteadmin:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(updateStatus.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(updateStatus.fulfilled,(state,action)=>{
            state.loader = false,
            state.updatestatus = [action.payload]
        })
        .addCase(updateStatus.rejected,(state,action)=>{
            state.error = [action.payload]
        })



         builder.addCase(addCook.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addCook.fulfilled,(state,action)=>{
            state.loader = false,
            state.addcook = [action.payload]
        })
        .addCase(addCook.rejected,(state,action)=>{
            state.error = [action.payload]
        })


        builder.addCase(getallCooks.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getallCooks.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallcooks = [action.payload]
        })
        .addCase(getallCooks.rejected,(state,action)=>{
            state.error = [action.payload]
        })



         builder.addCase(addProduct.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addProduct.fulfilled,(state,action)=>{
            state.loader = false,
            state.addproduct = [action.payload]
        })
        .addCase(addProduct.rejected,(state,action)=>{
            state.error = [action.payload]
        })



         builder.addCase(updateStock.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(updateStock.fulfilled,(state,action)=>{
            state.loader = false,
            state.updatestock = [action.payload]
        })
        .addCase(updateStock.rejected,(state,action)=>{
            state.error = [action.payload]
        })




         builder.addCase(addAdmin.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addAdmin.fulfilled,(state,action)=>{
            state.loader = false,
            state.addadmin = [action.payload]
        })
        .addCase(addAdmin.rejected,(state,action)=>{
            state.error = [action.payload]
        })




        builder.addCase(getallAdmins.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getallAdmins.fulfilled,(state,action)=>{
            state.loader = false,
            state.getalladmins = [action.payload]
        })
        .addCase(getallAdmins.rejected,(state,action)=>{
            state.error = [action.payload]
        })


      
        builder.addCase(deleteAdmin.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(deleteAdmin.fulfilled,(state,action)=>{
            state.loader = false,
            state.deleteadmin = [action.payload]
        })
        .addCase(deleteAdmin.rejected,(state,action)=>{
            state.error = [action.payload]
        })
          



    }
})

export default adminSlice.reducer;