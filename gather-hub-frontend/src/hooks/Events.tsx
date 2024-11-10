import axios from "axios"
import { useEffect, useState } from "react"

export interface EVENTS {
    "title" : string
    "description" : string
    "date" : string
    "category" : string
    "location" : string
    "organizer" :{
        "name" : string
    }
    "registrations" :{
        "user":{
            "name": string
        }
    }
    "id": string
}

interface ApiResponse {
    AllEvents: EVENTS[];
}

export const useEvents = () =>{
    const [loading , setloading] = useState(true)
    const [events , setevents] = useState<EVENTS[]>([])

    useEffect(()=>{
        axios.get<ApiResponse>(`${import.meta.env.VITE_BACKEND_URL}/event`, {
            headers:{
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setevents(response.data.AllEvents)
            setloading(false)
        })
        
    },[])

    return {
        loading,
        events
    }
}