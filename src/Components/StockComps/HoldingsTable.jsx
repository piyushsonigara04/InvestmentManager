import React, { useEffect } from "react";
import { MdDelete } from "react-icons/md";


const HoldingsTable = ({ data, currPrices, fetchHoldings }) => {
    useEffect(() => {
        console.log("Data:", data);
        console.log("Current Prices:", currPrices);
    }, [data, currPrices]);

    const deleteHandler = async (stock_symbol) => {
        try {
            console.log('Inside delete');
            console.log(stock_symbol)
            
            // Send stockSymbol as an object
            const response = await fetch('http://localhost:5000/api/v1/stocks/deleteStock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ stock_symbol }), // send stockSymbol in an object
                credentials: 'include', // Include cookies
            });
    
            const result = await response.json();
            console.log(result);
            fetchHoldings();
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete stock.");
        }
    };
    


    return (
        <div className="w-full h-full p-2 overflow-y-auto max-h-[500px] scrollbar">
            <table className="min-w-full shadow-md rounded-lg">
                <thead className="bg-[#1D1D41]">
                    <tr>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Symbol</th> 
                        <th className="py-4 px-3 text-base text-left text-gray-400">Buy Price</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Quantity</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Total Value</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Buy Date</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Current Price</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">Current Value</th>
                        <th className="py-4 px-3 text-base text-left text-gray-400">% Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((stock, index) => {
                        const currentPrice = currPrices[stock.stock_symbol] || 0;
                        const totalValue = parseFloat((stock.buy_price * stock.quantity).toFixed(2));
                        const currentValue = parseFloat((currentPrice * stock.quantity).toFixed(2));
                        const profitPercentage = ((currentValue - totalValue) / totalValue) * 100 || 0;

                        const profitClass = profitPercentage >= 0 ? "text-green-500" : "text-red-500";
                        const rowBackgroundColor = profitPercentage >= 0 ? "hover:bg-green-800" : "hover:bg-red-800";

                        return (
                            <tr
                                key={stock.stock_symbol}
                                className={`text-white ${index % 2 === 0 ? 'bg-[#141332]' : 'bg-[#1D1D41]'} ${rowBackgroundColor}`}
                            >
                                <td className="py-4 px-3 text-base">{stock.stock_symbol}</td> 
                                <td className="py-4 px-3 text-base">{stock.buy_price}</td>
                                <td className="py-4 px-3 text-base">{stock.quantity}</td>
                                <td className="py-4 px-3 text-base">{totalValue}</td>
                                <td className="py-4 px-3 text-base">{stock.buy_date.slice(0, 10)}</td>
                                <td className="py-4 px-3 text-base">{currentPrice}</td>
                                <td className="py-4 px-3 text-base">{currentValue}</td>
                                <td className={`py-4 px-3 text-base ${profitClass}`}>
                                    {profitPercentage.toFixed(2)}%
                                </td>
                                <td>
                                    <MdDelete className="hover:text-red-700 cursor-pointer text-2xl" onClick={()=>deleteHandler(stock.stock_symbol)}></MdDelete>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HoldingsTable;
