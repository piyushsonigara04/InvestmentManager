import { FaSearch } from "react-icons/fa";


function Welcome(){
    return (
        <div className="h-20 p-3 mt-2 flex justify-between">
            <div className="text-lg">
                <p className="text-white font-bold">Welcome Back , Piyush 👋</p>
                <p className="text-gray-500">Here's whats going on with your investments</p>
            </div>
            
            <div className="h-full w-1/3 relative">
                <input type="text" className="h-full w-full bg-[#1D1D41] rounded-lg p-2" placeholder="Search For Anything....."/>
                <FaSearch color="white" size={20} className="absolute right-3 top-[18px] cursor-pointer"/>
            </div>
            
        </div>
    )
}

export default Welcome