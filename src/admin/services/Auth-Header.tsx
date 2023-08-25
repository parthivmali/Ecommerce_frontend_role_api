import Cookies from "js-cookie"

export const AuthHeader = () => {
    const userToken = Cookies.get('jwt')
    const adminToken = Cookies.get('jwt_admin')
    
    if(userToken || adminToken) {
        return {Authorization: `Bearer ${userToken || adminToken}`}
    }else{
        return {}
    }
}