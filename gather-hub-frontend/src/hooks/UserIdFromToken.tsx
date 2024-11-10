import { jwtDecode } from "jwt-decode"

export const UserIdFromToken = () =>{ 
    const Token:string | null = localStorage.getItem("token")
    let UserID :string = ''

    if(Token){
        const DecodedToken = jwtDecode(Token) as {id :string}
        UserID = DecodedToken.id || " " 
    }
    return UserID
}
