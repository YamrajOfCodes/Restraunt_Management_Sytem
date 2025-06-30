import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify"
import { commonLoginAPI, commonLogoutAPI, getallproductAPI, getstocksAPI, userveridyAPI} from "../../../API/CommonAPI/commonAPI.js";



export const Login = createAsyncThunk("login",async(data)=>{
    try {
        const response  = await commonLoginAPI(data);
        if(response.status==200){
            toast.success("login successfull");
            localStorage.setItem("user",response.data.token)
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const Logout = createAsyncThunk("logout",async(data)=>{
    try {
        const response  = await commonLogoutAPI();
        if(response.status==200){
            toast.success("logout successfull");
            localStorage.removeItem("user");
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})

export const userVerify = createAsyncThunk("userverify",async(data)=>{
    try {
        const response  = await userveridyAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})


export const getProducts = createAsyncThunk("getproducts",async()=>{
    try {
        const response  = await getallproductAPI();
        console.log(response);
        
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})




export const getStocks = createAsyncThunk("getstokes",async()=>{
    try {
        const response  = await getstocksAPI();
        if(response.status==200){
            return response.data;
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        console.log(error);
        
    }
})





  const commonSlice  = createSlice({
    name:"userSlice",
    initialState:{
        login:[],
        logout:[],
        userverify:[],
        getallproducts:[],
        getallstocks:[],
        loader:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(Login.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Login.fulfilled,(state,action)=>{
            state.loader = false,
            state.login = [action.payload]
        })
        .addCase(Login.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(Logout.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            state.loader = false,
            state.logout = [action.payload]
            state.userverify = []
        })
        .addCase(Logout.rejected,(state,action)=>{
            state.error = [action.payload]
        })



        builder.addCase(userVerify.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(userVerify.fulfilled,(state,action)=>{
            state.loader = false,
            state.userverify = [action.payload]
        })
        .addCase(userVerify.rejected,(state,action)=>{
            state.error = [action.payload]
        })




           builder.addCase(getProducts.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallproducts = [action.payload]
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.error = [action.payload]
        })



         builder.addCase(getStocks.pending,(state,action)=>{
            state.loader = true
        })
        .addCase(getStocks.fulfilled,(state,action)=>{
            state.loader = false,
            state.getallstocks = [action.payload]
        })
        .addCase(getStocks.rejected,(state,action)=>{
            state.error = [action.payload]
        })


    }
})

export default commonSlice.reducer;