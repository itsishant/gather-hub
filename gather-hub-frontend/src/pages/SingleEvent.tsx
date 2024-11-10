import { useNavigate, useParams } from "react-router-dom"
import { SingleEvent } from "../components/SingleEventCard"
import { useSingleEvent } from "../hooks/SingleEvent"
import { Appbar } from "../components/Appbar"
import { useCustomTitle } from "../hooks/CustomTitle"
export const FullEvent = () =>{
    useCustomTitle('GatherHub | Event')

    const Navigate = useNavigate()
    const {id} = useParams()
    const {loading, SingleEventdata} = useSingleEvent({id : id || ""})

    if(loading || !SingleEventdata){
        return <div className="w-full h-screen flex items-center bg-black justify-center text-white font-bold text-xl md:text-3xl">
            Loading.....
        </div>
    }

    return <div className="bg-black w-full min-h-screen overflow-x-hidden text-white">
        <div className="sticky top-0 z-10">
            <Appbar width="w-full md:w-20" label="Logout" onclick={()=>{
                localStorage.removeItem("token")
                Navigate("/login")
            }}/>
        </div>
        <div className="p-4 md:p-8">
            <SingleEvent hello={SingleEventdata} />
        </div>
    </div>
}