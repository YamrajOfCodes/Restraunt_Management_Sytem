import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"



export const commonLoginAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/common/api/login`,data,header,"");
}

export const commonLogoutAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/common/api/logout`,{},header,"admin");
}

export const userveridyAPI = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/common/api/userverify`,"",header,"user");
}

export const  getallproductAPI = async(data,header)=>{
return await commonrequest("GET",`${BASE_URL}/common/api/getallproducts`,{},header,"");
}

export const getstocksAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/common/api/getstocks`,data,header,"");
}

