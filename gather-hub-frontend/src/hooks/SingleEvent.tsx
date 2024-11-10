import axios from "axios"
import { useEffect, useState } from "react"

export interface SingleEventProps {
    "id" : string
    "title" : string
    "description" : string
    "location" : string
    "category" : string
    "date" : string
    "organizerId" : string 
    "organizer" :{
        "name" : string
    }
    "registrations" :{
        "user" :{
            "name" : string
        }
    } 
}

interface ApiResponse {
    SpecificEvent : SingleEventProps
}

export const useSingleEvent = ({id} : { id: string}) =>{

    const [loading, setLoading] = useState(true)
    const [SingleEventdata , setSingleEvent] = useState<SingleEventProps | null >(null)

    useEffect(()=>{
        axios.get<ApiResponse>(`${import.meta.env.VITE_BACKEND_URL}/event/${id}`, {
            headers:{
                Authorization : "Bearer " + localStorage.getItem("token")
            }
        })
        .then((response)=>{
            setSingleEvent(response.data.SpecificEvent)
            setLoading(false)
        })
    },[])

    return {
        loading,
        SingleEventdata
    }
}