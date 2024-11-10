import { Link } from 'react-router-dom'
import { ButtonComp } from './Button'
import { GrabIcon } from './Icon'

export const Appbar = ({label, onclick, width}:{label?:string, onclick?:()=>void, width?:string }) => {
    return <div className=" flex justify-between px-10 py-4 bg-zinc-900 z-10 relative">
        <div className='flex'>
        <header className="">
            <a href="#" className="">
                <GrabIcon className="h-8 w-8" />
            </a>
        </header>
        <Link to={"/events"}>
        <div className="text-2xl font-bold ml-6 ">
        GatherHub
        </div>
        </Link>
        </div>
        <div className='mr-8 '>
            <ButtonComp width={width} label={label} onclick={onclick} />
        </div>
    </div>
}