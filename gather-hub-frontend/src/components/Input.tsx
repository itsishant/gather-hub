import { ChangeEvent } from "react"

interface LabelledInput {
    label: string
    placeholder: string
    type? : string
    options? : [string, string]
    onchange?: (e : React.ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>)=>void
 
}

export const InputBox2 = ({ placeholder, label, type = "text", options, onchange}: LabelledInput) => {
    return (
        <div className="text-white">
            <div>
                {label && <label className="block mb-0.5 text-lg pt-2">{label}</label>}
                {options ? (
                    <select onChange={onchange} className="bg-black w-full p-2.5 my-1" defaultValue={options[0]}
                    style={{ boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)' }}
                    >
                        <option value={options[0]}>{options[0]}</option>
                        <option value={options[1]}>{options[1]}</option>
                    </select>
                ) : (
                    <input
                        onChange={onchange}
                        className="  bg-black w-full p-2.5 my-1 rounded-xl"
                        type={type}
                        placeholder={placeholder}
                        style={{ boxShadow: '0 4px 6px rgba(255, 255, 255, 0.1)' }}
                    />
                )}
            </div>
        </div>
    );
}


// export const InputBox = ({placeholder, label, type} : LabelledInput) =>{
//     return <div className="text-white ">
//         <div>
//             <label className="block mb-2 text-lg pt-4">{label}</label>
//             <input className="bg-black w-80 p-1 my-1 mx-2" type={type || "text"}  placeholder= {placeholder} />
//         </div>
//     </div>
// }