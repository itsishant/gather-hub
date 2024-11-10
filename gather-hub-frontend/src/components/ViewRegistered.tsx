import { useEffect, useState } from "react"
import { Heading } from "./Heading"
import { registrationsSchema } from "../hooks/Registrations"

export const ViewRigestered = ({ registrations }: {registrations : registrationsSchema[]}) =>{

    const [UserCount, setUserCount] = useState<number>(0)
    useEffect(()=>{
        setUserCount(registrations.length)
    },[registrations])
    

    return <div className=" bg-zinc-800 w-full h-full text-white px-4 py-3 rounded-xl">
        <div className="flex items-center ">
            <Heading label="Registered Users :" font="font-semibold" />
            <div className="text-4xl pl-3 p-2 pb-4 font-medium">
                {UserCount}
            </div>
        </div>
        {registrations.length == 0? null : <div className="bg-zinc-900 p-1 text-xl overflow-y-auto max-h-64 rounded-3xl px-3">
        {registrations.map((reg : registrationsSchema , index: number) => (
                    <div key={index} className="py-2">
                        • {reg.user.name}
                    </div>
                ))}
        </div>}
    </div>
}