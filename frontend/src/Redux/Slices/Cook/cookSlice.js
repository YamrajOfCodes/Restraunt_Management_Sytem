import { addrequestAPI, getOnstockAPI, reduceStockAPI } from "@/API/CookAPI/cookAPI";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"



export const addRequest = createAsyncThunk("addrequest",async(data)=>{
    try {
        const response  = await addrequestAPI(data);
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getOnstocks = createAsyncThunk("getOnstocks",async(data)=>{
    try {
        const response  = await getOnstockAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const updateStock = createAsyncThunk("reducestocks",async(data)=>{
    try {
        const response  = await reduceStockAPI(data);
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})



  const cookSlice  = createSlice({
    name:"cookSlice",
    initialState:{
        addrequest:[],
        getonstocks:[],
        reducestocks:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(addRequest.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(addRequest.fulfilled,(state,action)=>{
            state.loader = false,
            state.login = [action.payload]
        })
        .addCase(addRequest.rejected,(state,action)=>{
            state.error = [action.payload]
        })



          builder.addCase(getOnstocks.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getOnstocks.fulfilled,(state,action)=>{
            state.loader = false,
            state.getonstocks = [action.payload]
        })
        .addCase(getOnstocks.rejected,(state,action)=>{
            state.error = [action.payload]
        })


          builder.addCase(updateStock.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(updateStock.fulfilled,(state,action)=>{
            state.loader = false,
            state.reducestocks = [action.payload]
        })
        .addCase(updateStock.rejected,(state,action)=>{
            state.error = [action.payload]
        })



    }
})

export default cookSlice.reducer;