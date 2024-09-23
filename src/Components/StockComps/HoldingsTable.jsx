

const HoldingsTable = ({data}) =>{


    const [currprice,setcurrprice] = 


    return(
        <div className="w-full h-full p-4">
            <table className="min-w-full border-b border-gray-400">
                <thead className="">
                    <tr>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Symbol</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Buy Price</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Quantity</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Total Value</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Buy Date</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">Current Price</th>
                        <th className="py-2 px-4 border-b text-left text-gray-400">% Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((stock) => (
                            <tr key={stock.symbol} className=" text-white">
                                <td className="py-2 px-4 border-b">{stock.stock_symbol}</td>
                                <td className="py-2 px-4 border-b">{stock.buy_price}</td>
                                <td className="py-2 px-4 border-b">{stock.quantity}</td>
                                <td className="py-2 px-4 border-b">{parseFloat((stock.buy_price*stock.quantity).toFixed(2))}</td>
                                <td className="py-2 px-4 border-b">{stock.buy_date.slice(0,10)}</td>
                                <td className="py-2 px-4 border-b">currentPrice</td>
                                <td className="py-2 px-4 border-b">percentProfit</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default HoldingsTable;