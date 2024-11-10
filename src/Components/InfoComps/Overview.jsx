// import { useEffect, useState } from "react";

// function Overview() {

//     const [investedValue,setInvested] = useState(0);

//     const cards = [
//         {
//             title: "Invested",
//             value: "₹"+ investedValue,
//             change: "15% compared with last month",
//             color: "text-purple-500",
//             changeColor: "text-purple-300",
//             icon: "💼",
//         },
//         {
//             title: "Current",
//             value: "₹30,831.448",
//             change: "10% compared with last month",
//             color: "text-green-500",
//             changeColor: "text-green-300",
//             icon: "📊",
//         },
//         {
//             title: "Total PnL",
//             value: "₹+2000.31",
//             change: "2% compared with last month",
//             color: "text-green-500",
//             changeColor: "text-green-300",
//             icon: "📈",
//         },
//         {
//             title: "Day's PnL",
//             value: "₹-421.0",
//             change: "8% compared with last month",
//             color: "text-red-500",
//             changeColor: "text-red-300",
//             icon: "📉",
//         },
//     ];

//     const fetchUserData = async () => {
//         try {
//           const response = await fetch('http://localhost:5000/api/v1/stocks/getinvestedvalue', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//           });
      
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response}`);
//           }
      
//           const data = await response.json();
//           const investedValue = data.data;
//           setInvested(investedValue);
//         } catch (error) {
//           console.log("Error fetching invested value:", error.message);
//         }
//       };
      

//     useEffect(()=>{
//         fetchUserData();
//     })

//     return (
//         <div className="w-[47%] bg-[#1D1D41] rounded-md p-4">
//             {/* <h2 className="text-white text-xl mb-4">Overview</h2> */}
//             <div className="flex flex-wrap justify-between gap-2"> {/* Flexbox layout */}
//                 {cards.map((card, index) => (
//                     <div
//                         key={index}
//                         className="bg-[#292950] p-3 rounded-lg text-white flex flex-col justify-between shadow-md w-[calc(50%-0.5rem)]" // Adjust width for each card
//                     >
//                         <div className="flex justify-between items-center">
//                             <div className="flex items-center">
//                                 <span className="text-xl mr-2">{card.icon}</span> {/* Reduced icon size */}
//                                 <h3 className="text-xl">{card.title}</h3> {/* Reduced title size */}
//                             </div>
//                             <span className={`text-lg font-bold ${card.color}`}>{card.value}</span> {/* Reduced value size */}
//                         </div>
//                         <div className={`mt-1 text-sm ${card.changeColor}`}> {/* Reduced change text size */}
//                             {card.change}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Overview;

import { useEffect, useState } from "react";

function Overview() {
    const [investedValue, setInvested] = useState(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [totalPnL, setTotalPnL] = useState(0);
    const [percentpnl, setPercentPnl] = useState(0); // Set to null initially to indicate no previous data
    const [daypnl,setDaypnl] = useState(0);

    const cards = [
        {
            title: "Invested",
            value: "₹" + investedValue.toFixed(2),
            change: "Increase it every month",
            color: "text-purple-500",
            changeColor: "text-purple-300",
            icon: "💼",
        },
        {
            title: "Current",
            value: "₹" + currentValue.toFixed(2),
            change: (totalPnL >= 0 ? `+${percentpnl.toFixed(2)}%` : `-${Math.abs(percentpnl).toFixed(2)}%`),
            color: totalPnL >= 0 ? "text-green-500" : "text-red-500",
            changeColor: "text-green-300",
            icon: "📊",
        },
        {
            title: "Total PnL",
            value: "₹" + totalPnL.toFixed(2),
            change: (totalPnL >= 0 ? `+${percentpnl.toFixed(2)}%` : `-${Math.abs(percentpnl).toFixed(2)}%`),
            color: totalPnL >= 0 ? "text-green-500" : "text-red-500",
            changeColor: totalPnL >= 0 ? "text-green-300" : "text-red-300",
            icon: "📈",
        }
        ,
        {
            title: "Day's PnL",
            value: "₹" + daypnl.toFixed(2),
            change: "Stay Invested!",
            color: "text-red-500",
            changeColor: "text-red-300",
            icon: "📉",
        },
    ];

    const fetchHoldingsAndStockPrices = async () => {
        try {
            // Fetch user holdings
            const response = await fetch('http://localhost:5000/api/v1/stocks/getStock', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Failed to fetch holdings");
            }

            const data = await response.json();
            const holdings = data.data;  // User's holdings

            let totalInvestedValue = 0;
            let totalCurrentValue = 0;
            let totalProfitLoss = 0;
            let daychange = 0;

            // For each holding, fetch current price and calculate values
            for (let holding of holdings) {
                const data = await getStockPrice(holding.stock_symbol);
                
                if (data.currentPrice !== null) {
                    // Calculate the invested value and current value
                    const invested = holding.buy_price * holding.quantity;
                    totalInvestedValue += invested;
                    totalCurrentValue += data.currentPrice * holding.quantity;
                    daychange += (data.currentPrice - data.prevPrice)*holding.quantity;
                }

            }

            let percent_pnl = ((totalCurrentValue - totalInvestedValue)/totalInvestedValue)*100;


            // Update previous values for dynamic percentage calculation (You can fetch these values from your backend if stored)
            // setPreviousInvested(investedValue); // Set from backend if available
            // setPreviousCurrent(currentValue); // Set from backend if available
            // setPreviousTotalPnL(totalPnL); // Set from backend if available
            // setPreviousDayPnL(dayPnL); // Set from backend if available

            // Set the state with the calculated values
            setInvested(totalInvestedValue);
            setCurrentValue(totalCurrentValue);
            setTotalPnL(totalCurrentValue - totalInvestedValue);
            setDaypnl(daychange); // Replace with actual day's PnL calculation if needed
            setPercentPnl(percent_pnl);

        } catch (error) {
            console.error("Error fetching holdings or stock prices:", error.message);
        }
    };

    const getStockPrice = async (symbol) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/yahoo/stock/${symbol}`);
            const data = await response.json();
            return data || null;
        } catch (error) {
            console.error("Error fetching stock price:", error.message);
            return null; // Return null if price fetch fails
        }
    };

    useEffect(() => {
        fetchHoldingsAndStockPrices(); // Fetch on component mount
    },[]);

    return (
        <div className="w-[47%] bg-[#1D1D41] rounded-md p-4">
            <div className="flex flex-wrap justify-between gap-2">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-[#292950] p-3 rounded-lg text-white flex flex-col justify-between shadow-md w-[calc(50%-0.5rem)]"
                    >
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-xl mr-2">{card.icon}</span>
                                <h3 className="text-xl">{card.title}</h3>
                            </div>
                            <span className={`text-lg font-bold ${card.color}`}>{card.value}</span>
                        </div>
                        <div className={`mt-1 text-sm ${card.changeColor}`}>
                            {card.change}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Overview;
