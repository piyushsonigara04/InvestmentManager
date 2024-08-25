import Overview from "./InfoComps/Overview"
import Allocation from "./InfoComps/Allocation"
import Chart from "./InfoComps/Chart"

function Info(){
    return (
        <div className="h-1/3 flex justify-between">
            <Overview/>
            <Allocation/>
            <Chart/>
        </div>
    )
}

export default Info