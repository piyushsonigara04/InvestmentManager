import { FaFire } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";

function Navbar(){
    return (
        <div className="h-full w-[14%] bg-[#1D1D41] flex flex-col gap-5 p-4 items-center">
            <div className="flex justify-center gap-1 h-[10%] items-center">
                <FaFire color="#6359E9" className="" size={40}/>
                <h1 className="text-white text-3xl font-bold cursor-pointer">InvesTio</h1>
            </div>
            <div className="flex flex-col justify-center gap-5 w-full">
                <button className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full rounded-lg bg-[#6359E9]"><RxDashboard color="white" size={25}/>Dashboard</button>
                <button className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full"><RxDashboard color="white" size={25}/>Analytics</button>
                <button className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full"><RxDashboard color="white" size={25}/>News</button>
            </div>
        </div>
    )
}

export default Navbar