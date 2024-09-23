import { useState } from "react";
import { toast } from "react-toastify";

const AddStockField = () =>{

    const [stockData,setStock] = useState({
        stock_symbol:"",
        buy_price:null,
        buy_date:"",
        quantity:null
    })

    const changeHandler = (event)=>{
        setStock((prev)=>({
            ...prev,
            [event.target.name]:event.target.value
        }))
        console.log(event.target.value);
    }

    const handleform = ()=>{
        setStock({
            stock_symbol:"",
            buy_price:0,
            buy_date:"",
            quantity:0
        });
    }

    const handleAddStock = async () => {
        console.log("inside handleaddstock")
        const response = await fetch('http://localhost:5000/api/v1/stocks/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stockData),
          credentials: 'include', // Include cookies
        });
    
        const result = await response.json();
        console.log(result);
        handleform();
        toast.success("Stock added to your holdings successfully!!")
      };
    

    return(
        <div className="w-5/6 h-4/5 rounded-md flex flex-col items-center justify-evenly">
            <h1 className="text-white font-bold text-xl">
                Add Your Stock
            </h1>

            <form className="flex gap-3 w-full justify-center">
                <div className="flex flex-col gap-14 w-1/3 h-full">
                    <label htmlFor="stock_symbol" className="w-full h-11">
                        <input 
                        required
                        type="text" 
                        name="stock_symbol" 
                        value={stockData.stock_symbol}
                        onChange={changeHandler}
                        placeholder="Enter Stock Symbol"
                        className="p-1 rounded-md bg-[#141332] text-white w-full h-full"/>
                    </label>
                    <label htmlFor="buy_price" className="w-full h-11">
                        <input 
                        required
                        type="number" 
                        name="buy_price" 
                        value={stockData.buy_price}
                        onChange={changeHandler}
                        placeholder="Enter Buy Price"
                        className="p-1 rounded-md bg-[#141332] text-white w-full h-full"/>
                    </label>
                </div>
                
                <div className="flex flex-col gap-14 w-1/3">
                    <label htmlFor="buy_date" className="w-full h-11">
                        <input 
                        required
                        type="date" 
                        name="buy_date" 
                        value={stockData.buy_date}
                        onChange={changeHandler}
                        placeholder="Enter Buy Date"
                        className="p-1 rounded-md bg-[#141332] text-white w-full h-full"/>
                    </label>
                    <label htmlFor="quantity" className="w-full h-11">
                        <input 
                        required
                        type="number" 
                        name="quantity" 
                        value={stockData.quantity}
                        onChange={changeHandler}
                        placeholder="Enter Buy quantity"
                        className="p-1 rounded-md bg-[#141332] text-white w-full h-full" />
                    </label>
                </div>
                
            </form>

            <button className="w-1/4 h-[13%] bg-[#6359E9] rounded-xl text-white hover:bg-violet-400" onClick={handleAddStock}>
                Add Stock
            </button>
        </div>
    )
}

export default AddStockField;