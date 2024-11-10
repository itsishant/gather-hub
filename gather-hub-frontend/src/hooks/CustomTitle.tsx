import { useEffect } from "react"

export const useCustomTitle = (title:string) =>{
    useEffect(()=>{
        document.title = title
    },[title])
}