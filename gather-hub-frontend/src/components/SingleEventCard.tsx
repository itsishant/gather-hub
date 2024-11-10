import { SingleEventProps } from "../hooks/SingleEvent"
import { format } from 'date-fns';
import { ButtonComp } from "./Button";
import { TokenRole } from "../hooks/TokenRole";
import { UserIdFromToken } from "../hooks/UserIdFromToken";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ViewRigestered } from "./ViewRegistered";
import { useRegistrations } from "../hooks/Registrations";
    
export const SingleEvent = ({hello}:{hello:SingleEventProps}) =>{
    const formatDate = (isoDate: string) => {
        const dateObj = new Date(isoDate);
        const day = dateObj.getDate();
        const month = format(dateObj, 'MMMM');
        const suffix = ['th', 'st', 'nd', 'rd'][
            (day % 10 <= 3 && Math.floor(day / 10) !== 1) ? day % 10 : 0
        ];
    
        return `${month} ${day}${suffix}`;
    };

    const DecodedRole = TokenRole()
    const DecodedUserId = UserIdFromToken()  
    const EventID = useParams() as {id : string}
    const Navigate = useNavigate()
    const organizerId = hello.organizerId
    const [EventOwner, setEventOwner] = useState(false)
    
    const{registrations} = useRegistrations({id : EventID.id || ""})

    const [isRegistered, setisRegistered] = useState<boolean>(false)

    interface ApiResponse {
        registered : boolean
    }

    useEffect(()=>{
        const CheckIsRegistered = async () =>{
        try {
            const response = await axios.get<ApiResponse>(`${import.meta.env.VITE_BACKEND_URL}/registrations/${EventID.id}/${DecodedUserId}`, {
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
            })
            setisRegistered(response.data.registered)
        
            if(organizerId == DecodedUserId){
                setEventOwner(true)
            }

        } catch (error) {
                console.error("Error checking the registration" + error)

        }
    }

    CheckIsRegistered()

},[EventID.id, DecodedUserId])

    const eventhandler =  async () =>{
            if(isRegistered){
                return
            }
           try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/registrations/${EventID.id}`,{}, {
                headers:{
                    Authorization : "Bearer " + localStorage.getItem("token")
                }
                
            })       
                setisRegistered(true);
                alert("Successfully registered for the event");

           } catch (error) {
                alert("You are already registered / An error has been occured")
           } 
         }

         return <div className="min-h-screen flex flex-col md:flex-row items-start justify-center w-full p-4 space-y-8 md:space-y-0 md:space-x-8">
         <div className="rounded-2xl w-full md:w-1/2 lg:w-1/3 min-h-[600px] flex flex-col bg-zinc-900">
             <div className="flex-grow p-3">  
                 <div className="p-4 text-2xl md:text-4xl font-bold font-serif">
                     {hello.title}
                 </div>
                 <div className="mb-6 px-6 py-1 h-36 overflow-y-auto font-mono text-sm md:text-base"
                 style={{
                     scrollbarWidth: 'thin',
                     scrollbarColor: '#555 #2d2d2d',
                 }}>
                     {hello.description} 
                 </div>
                 <div className="border-t-2 mt-4">
                     <div className="mt-4 text-center grid grid-cols-2 grid-rows-2 gap-4 md:gap-8 text-sm md:text-md font-semibold font-serif">
                         <div>
                             Category 
                             <div className="font-mono font-thin">
                             {hello.category} 
                             </div>
                         </div>
                         <div>
                             Location
                             <div className="font-mono font-thin">
                             {hello.location}
                             </div>
                         </div>
                         <div>
                             Date
                             <div className="font-mono font-thin">
                             {formatDate(hello.date)}
                             </div>
                         </div>
                         <div>
                             Organizer
                             <div className="font-mono font-thin">
                             {hello.organizer.name}
                             </div>
                         </div>
                     </div>
                 </div>    
             </div>
             <div className="p-4 flex justify-center">
                 {DecodedRole == 'VIEWER' ? (
                     !isRegistered ? 
                     <ButtonComp onclick={eventhandler} label={"Register"} width="w-40"/> :
                     <ButtonComp label={"Registered"} width="w-40"/>
                 ) : null}
                 {DecodedRole == 'ORGANIZER' && EventOwner ? (
                     <ButtonComp onclick={async ()=>{
                         try {
                             await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/event/${EventID.id}`,{
                                 headers:{
                                     Authorization : "Bearer " + localStorage.getItem("token")
                                 }
                             })
                             alert("Event Deleted Successfully")
                             Navigate("/events")
                         } catch (error) {
                             console.error(error)
                             alert("You are not authorized / Error deleting event")
                         }
                     }} label= "Delete" width="w-40"/> 
                 ) : null}
             </div>
         </div>
         <div className="w-full md:w-1/3">
             <ViewRigestered registrations={registrations} />
         </div>
     </div>
 }