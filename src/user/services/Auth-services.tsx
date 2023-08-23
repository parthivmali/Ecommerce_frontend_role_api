import axios, { AxiosError } from "axios"
import { ILoginUser, IRegisterUser } from "../interfaces"
import Toaster from "../hooks/Toaster"
import Cookies from 'js-cookie'

export const API_URL = "http://localhost:4001/"


// Register
export const register = async (data:IRegisterUser) => {
    return await axios.post(`${API_URL}api/v1/register`,data)
}

// Login
export const login = async (data:ILoginUser) => {
    return await axios
    .post(`${API_URL}api/v1/login`,data)
    .then((res) => {
        console.log(res);
        if(res.data.role === 'admin') {
            const userToken = res.data.token;
            Cookies.set('jwt_admin', userToken, { expires: 3});
        }else{
            const userTokens = res.data.token;
            Cookies.set("jwt", userTokens , { expires: 3 });
        }
        return res.data;
    })
    .catch((err:AxiosError<string>) => {
        if(err.response && err.response.data){
            Toaster.error(err.response.data)
        }else{
            console.log("Please check your credentials");
            
        }
    })
};
