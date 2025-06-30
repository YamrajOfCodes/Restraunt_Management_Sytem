import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"



export const updatestatusAPI = async(data,header)=>{
    return await commonrequest("PATCH",`${BASE_URL}/admin/api/updatestatus/${data.id}`,data,header,"");
}

export const addcookAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/addcook`,data,header,"");
}

export const addproductAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/admin/api/addproduct`,data,header,"");
}

export const getallcooksAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/admin/api/getallcooks`,"",header,"");
}

export const updatestockAPI = async(data,header)=>{
    return await commonrequest("PATCH",`${BASE_URL}/owner/api/updatstatus/${data.id}`,data,header,"");
}

export const addAdminAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/owner/api/add-admin`,data,header,"");
}

export const getAdminAPI = async(header)=>{
    return await commonrequest("GET",`${BASE_URL}/owner/api/getalladmins`,"",header,"");
}


export const deleteadminAPI = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/owner/api/deleteadmin/${data}`,{},header,"");
}



