import axios from "axios"
import { API_URL } from "../../user/services/Auth-services"
import { AuthHeader } from "./Auth-Header"
import { IGetFilterName } from "../interfaces"

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
export const addNewProduct = async (products: FormData) => {
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
export const updateProducts = async (id:string,data:FormData) => {
    try {
        const res = await axios.put(`${API_URL}api/v1/products/${id}`, data, {headers: AuthHeader()});
        return res
    } catch (error) {
        console.log(error);
        
    }
}

//Search Product 
export const searchProducts = async (search:string) => {
    try {
        const res = await axios.get(`${API_URL}api/v1/search?keyword=${search}`);
        return res;
    } catch (error) {
        console.log(error);
        
    }
}

//Filter Product 
export const filterProduct = async (option:IGetFilterName) => {
    console.log(option);
    
    try {
        const res = await axios.get(`${API_URL}api/v1/search?category=${option.name}`);
        console.log("filter res =>",res);
        return res;
    } catch (error) {
        console.log(error);
    }
}