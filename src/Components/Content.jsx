import Welcome from "./Welcome"
import Info from "./Info"
import Stocks from "./Stocks"

function Content(){

    return(
        <div className="w-[86%] min-h-full bg-[#141332] px-5 flex flex-col gap-2">
            <Welcome/>
            <Info/>
            <Stocks/>
        </div>
    )
}

export default Content