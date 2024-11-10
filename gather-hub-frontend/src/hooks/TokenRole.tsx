import { jwtDecode } from "jwt-decode"

export const TokenRole = () => {

let role :string =''
const Token :string | null = localStorage.getItem("token")
if(Token){
    const decodedToken = jwtDecode(Token) as {role? :string}
    role = decodedToken.role || ''
}
    return role
}