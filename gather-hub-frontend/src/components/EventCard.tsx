
import { Link } from "react-router-dom"
import { format } from 'date-fns';
 
interface EventsProps {
  title : string
  description : string
  date : string
  category : string
  location : string
  organizerName? : string
  id?: string
}

export const EventCard = ({id, title, description, date, category, location, organizerName} : EventsProps) => {
  const formatDate = (isoDate: string) => {
    const dateObj = new Date(isoDate);
    const day = dateObj.getDate();
    const month = format(dateObj, 'MMMM');
    const suffix = ['th', 'st', 'nd', 'rd'][
        (day % 10 <= 3 && Math.floor(day / 10) !== 1) ? day % 10 : 0
    ];

    return `${month} ${day}${suffix}`;
};


    return(
      <Link to={`/event/${id}`} className="block max-w-sm w-full h-96 ">
       <div className="rounded-2xl max-w-sm w-full h-64 bg-zinc-900 text-white grid grid-rows-[70%_40%] font-mono ">
        <div className="p-4 hover:bg-zinc-950">
          <div className="text-center font-bold text-xl line-clamp-1 font-serif">
            {title}
            </div>
          <div className="text-center mt-4 line-clamp-4 m-2 ">
            {description}  
          </div>
        </div>
        <div className="  items-center bg-zinc-800">
         <div className="grid grid-cols-2 text-center text-lg p-4 "> 
          <div className="flex justify-center"> <svg className="w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" id="Calendar-Date--Streamline-Micro" ><desc>{"Calendar Date Streamline Icon: https://streamlinehq.com"}</desc><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M8.5 1.5h-7a1 1 0 0 0 -1 1v6a1 1 0 0 0 1 1h7a1 1 0 0 0 1 -1v-6a1 1 0 0 0 -1 -1Z" strokeWidth={1} /><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M2.5 0.5v2" strokeWidth={1} /><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M7.5 0.5v2" strokeWidth={1} /><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M0.5 4.5h9" strokeWidth={1} /></svg> {formatDate(date)}</div>

          <div className="grid grid-cols-5 justify-center"> 
            <div className=" content-center"> <svg className="w-5 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10" id="Location-Pin--Streamline-Micro" ><desc>{"Location Pin Streamline Icon: https://streamlinehq.com"}</desc><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M5 9.5s4 -2.5 4 -5a4 4 0 1 0 -8 0c0 2.5 4 5 4 5Z" strokeWidth={1} /><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M5 4.5a0.5 0.5 0 0 1 0 -1" strokeWidth={1} /><path stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" d="M5 4.5a0.5 0.5 0 0 0 0 -1" strokeWidth={1} /></svg></div>
             <div className="col-span-4 justify-center line-clamp-1"> {location} </div> </div>
          </div>
          <div className="grid grid-cols-2 rounded-b-lg text-center bg-zinc-700 p-3 text-lg">
          <div className="text-center line-clamp-1">
            {category}
          </div>
          <div className="text-center">
             By {organizerName} 
          </div>
          </div>
          
        </div>
      </div>
      </Link>
  )
  };
