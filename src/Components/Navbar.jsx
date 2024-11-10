import { FaFire } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { NavLink, useNavigate } from "react-router-dom";



function Navbar(){

    const navigate = useNavigate();

    const logOutHandler = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/user/logout",{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if(response.ok){
                localStorage.removeItem('token');
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="h-full w-[14%] bg-[#1D1D41] flex flex-col gap-5 p-4 items-center">
            <div className="flex justify-center gap-1 h-[10%] items-center">
                <FaFire color="#6359E9" className="" size={40}/>
                <h1 className="text-white text-3xl font-bold cursor-pointer">InvesTio</h1>
            </div>
            <div className="flex flex-col justify-center gap-5 w-full">
                <NavLink to="/Dashboard" className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full rounded-lg hover:text-white"><RxDashboard color="white" size={25}/>Dashboard</NavLink>
                <NavLink to="/News" className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full rounded-lg hover:text-white"><RxDashboard color="white" size={25}/>News</NavLink>
                <NavLink to="/Sentiment" className="text-white flex items-center gap-2 text-xl h-14 p-2 w-full rounded-lg hover:text-white"><RxDashboard color="white" size={25}/>Sentiment</NavLink>
            </div>
            <button
                className="text-white flex items-center justify-center gap-2 text-xl h-14 p-2 w-full rounded-lg bg-red-600 transition-all duration-300 ease-in-out transform hover:bg-red-700 hover:shadow-lg active:scale-95"
                onClick={logOutHandler}
            >
                LogOut
            </button>


        </div>
    )
}

export default Navbar