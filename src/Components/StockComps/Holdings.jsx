import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import HoldingsTable from "./HoldingsTable";
import AddStockField from "./AddStockField";



function Holdings(){

    const [holding,setHolding] = useState(true);
    const [holdings,setHoldings] = useState([]);

    const handleAddHolding = () => {
        setHolding(!holding);
    }


    const fetchHoldings = async () =>{
        try {
            const response = await fetch("http://localhost:5000/api/v1/stocks/getStock",{
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:'include'
            });
    
            const {data} = await response.json();
            console.log(data);
            setHoldings(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
            fetchHoldings();
        },[]
    )



    return(
        <div className="min-h-full bg-[#1D1D41] w-[74%] relative flex justify-center items-center p-4">
                <FaPlusCircle className="text-2xl text-white absolute bottom-1 right-1 cursor-pointer" onClick={handleAddHolding}/>
                {
                    holding?<HoldingsTable data={holdings}/>:<AddStockField/>
                }
        </div>
    )
}

export default Holdings