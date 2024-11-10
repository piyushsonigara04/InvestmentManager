import Welcome from "./Welcome"
import Info from "./Info"
import Stocks from "./Stocks"
import Navbar from "./Navbar"

function Content(){
    return(
        <div className="w-screen h-screen flex">
            <Navbar/>
            <div className="w-[86%] min-h-full bg-[#141332] px-5 flex flex-col gap-2">
                <Welcome/>
                <Info/>
                <Stocks/>
            </div>
        </div>
    )
}

export default Content