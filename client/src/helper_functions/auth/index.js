import { useSelector } from "react-redux";

export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.access_token) {
        return `${user.token_type} ${user.access_token}`
    } else {
        return {};
    }
    }


export function AuthStateHeader(){
    const token = useSelector((state)=>state.global.token)
    if(token){
        return token
    }
    return {}
}