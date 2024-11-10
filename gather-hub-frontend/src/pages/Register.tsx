import { useNavigate } from "react-router-dom"
import { Appbar } from "../components/Appbar"
import { Heading, SubHeading } from "../components/Heading"
import { InputBox2 } from "../components/Input"
import { useEffect, useState } from "react"
import axios from "axios"
import { ButtonComp } from "../components/Button"
import { useCustomTitle } from "../hooks/CustomTitle"

export const Register = () =>{
    
    useCustomTitle('GatherHub | Register')

    interface RegisterResponse {
        token: string;
    }

    const[username , SetName] = useState("")
    const[Email, SetEmail] = useState("")
    const[Password , SetPassword] = useState("")
    const[role , Setrole] = useState("VIEWER")

    const Navigate = useNavigate()
    const TokenValue :string | null = localStorage.getItem("token")
    useEffect(()=>{
        if(TokenValue){
            Navigate("/events")
        }
    },[])

    return <div className="w-full h-screen bg-black text-white overflow-hidden">
        <div>
            <Appbar width="w-20" onclick={()=>{
                Navigate("/login")
            }} label="Log in" />
        </div>
     <div className="flex justify-center items-center w-full h-full bg-black text-white">
        
    <div  className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-auto bg-zinc-900 p-9 rounded-xl"
                    style={{
                        boxShadow: '0 4px 6px rgba(255, 255, 255, 0.4)',  
                        position: 'absolute',  
                        top: '50%', 
                        left: '50%',
                        transform: 'translate(-50%, -50%)'  
                    }}>        
        <div className="mb-6">
        <Heading  label="Create your account" />
        <div className="max-w-sm">
        <SubHeading label="Join the GatherHub community and start discovering exclusive events" />
        </div>
        </div>
    
        <div >
            <InputBox2 onchange={(e)=>{
                SetName(e.target.value)
            }} placeholder="Your Name..." label="Name"  />

            <InputBox2 onchange={(e)=>{
                SetEmail(e.target.value)
            }} placeholder="example@domain.com" label="Email" />

            <InputBox2 onchange={(e)=>{
                SetPassword(e.target.value)
            }} placeholder="******" type="password" label="Password" />

            <InputBox2 onchange={(e)=>{
                Setrole(e.target.value)
            }} placeholder="role" label="Role" type="list" options={['VIEWER','ORGANIZER']} /> 
           
            


            <div className="flex flex-col items-center mt-8">
                <div className="w-full">
                <ButtonComp  onclick={async ()=>{
                    try {
                        const response = await axios.post<RegisterResponse>(`${import.meta.env.VITE_BACKEND_URL}/auth/register`, {
                            name : username,
                            email : Email,
                            password : Password,
                            role : role
                        })
                        localStorage.setItem("token", response.data.token)
                        Navigate("/events")    
                    } catch (error) {
                        console.log(error)
                        alert("Invalid inputs")
                    }
                    
                }} label="Register" /> 
                </div>
            </div>
        </div>
        </div>
        
    </div>
</div>
}