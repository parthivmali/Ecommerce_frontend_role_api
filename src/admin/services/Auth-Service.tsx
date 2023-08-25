import axios from "axios"
import { API_URL } from "../../user/services/Auth-services"
import { AuthHeader } from "./Auth-Header"
import { IAddProduct, IUpdateProduct } from "../interfaces"

// Get All Products
export const getAllProduct = async () => {
    try {
        const res = await axios.get(`${API_URL}api/v1/products`,{
            headers: AuthHeader()
        })
        return res
    } catch (error) {
        console.log(error);
                
    }
}

// Add New Products
export const addNewProduct = async (products:IAddProduct) => {
    return await axios.post(`${API_URL}api/v1/products/new`,products)
}


// Delete clickable Product
export const deleteProduct = async (id: string) => {
    try {
        const res = await axios.delete(`${API_URL}api/v1/products/${id}`);    
        return res
    } catch (error) {
        console.log(error);
        
    }
}

//Update Clickable Product
export const updateProducts = async (id:string,data:IUpdateProduct) => {
    try {
        const res = await axios.put(`${API_URL}api/v1/products/${id}`, data, {headers: AuthHeader()});
        return res
    } catch (error) {
        console.log(error);
        
    }
}