export const ButtonComp =({label, onclick, width}: {label?:string, onclick?:()=> void, width?:string }) =>{
    return <div className="w-full">
        <button onClick={onclick} className={`bg-white text-black text-center ${width || "w-full"} py-2 md:py-3 text-sm md:text-base font-semibold rounded-xl hover:bg-zinc-300 transition duration-300`}>{label}</button>
    </div>
}