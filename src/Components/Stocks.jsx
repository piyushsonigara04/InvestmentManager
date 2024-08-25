import Holdings from "./StockComps/Holdings"
import Watchlist from "./StockComps/Watchlist"

function Stocks(){
    return (
        <div className="w-full h-[49%] mb-2 mt-2 flex justify-between">
            <Holdings/>
            <Watchlist/>
        </div>
    )
}

export default Stocks