import { commonrequest } from "../commonrequest"
import {BASE_URL} from "../helper"



export const addrequestAPI = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/cook/api/add-request`,data,header,"");
}


export const getOnstockAPI = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/cook/api/getonstocks`,data,header,"");
}


export const reduceStockAPI = async(data,header)=>{
    return await commonrequest("PATCH",`${BASE_URL}/cook/api/reducestock`,data,header,"");
}



