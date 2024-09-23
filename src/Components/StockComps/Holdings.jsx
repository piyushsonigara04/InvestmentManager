import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import HoldingsTable from "./HoldingsTable";
import AddStockField from "./AddStockField";
import "./HoldingsTable.css"

function Holdings() {
    const [holding, setHolding] = useState(true);
    const [holdings, setHoldings] = useState([]);
    const [currPrices, setCurrPrices] = useState({});

    const handleAddHolding = () => {
        setHolding(!holding);
    };

    const fetchHoldings = async () => {
        try {
            console.log("Fetching Holdings");
            const response = await fetch("http://localhost:5000/api/v1/stocks/getStock", {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await response.json();
            const data = result.data || [];  // Handle the case where data might not exist

            if (data.length > 0) {
                console.log("Fetched Holdings", data);
                setHoldings(data);
            } else {
                console.error("No holdings found.");
                setHoldings([]);  // Set to empty if no data
            }
        } catch (error) {
            console.error("Error fetching holdings:", error);
            setHoldings([]);  // Set to empty on error
        }
    };

    const getStockPrice = async (symbol) => {
        try {
            console.log("Fetching stock price from Yahoo Finance");
            const response = await fetch(`http://localhost:5000/api/v1/yahoo/stock/${symbol}`);
            const data = await response.json();

            if (response.ok) {
                const currPrice = data.currentPrice;
                console.log(`Current price for ${symbol}: ${currPrice}`);
                return currPrice;
            } else {
                throw new Error(data.error || "Failed to fetch stock price");
            }
        } catch (error) {
            console.error("Error fetching stock price:", error);
            return null; // Return null on error
        }
    };

    const getCurrentPrices = async () => {
        console.log("Fetching current prices for holdings");
        const prices = {};

        for (const stock of holdings) {
            const symbol = stock.stock_symbol;
            const price = await getStockPrice(symbol);
            prices[symbol] = price;
        }

        setCurrPrices(prices); // Set state
        console.log("Current Prices (inside getCurrentPrices):", prices); // Log right before setting state
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchHoldings();
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (holdings.length > 0) {
            getCurrentPrices();  // Call this only if holdings are fetched
        }
    }, [holdings]);

    useEffect(() => {
        console.log("Updated currPrices:", currPrices); // Log currPrices when it changes
    }, [currPrices]);

    return (
        <div className="min-h-full bg-[#1D1D41] w-[74%] relative flex justify-center items-center p-2 overflow-y-scroll scrollbar">
            <FaPlusCircle className="text-2xl text-white absolute bottom-1 right-1 cursor-pointer" onClick={handleAddHolding} />
            {holding ? <HoldingsTable data={holdings} currPrices={currPrices} /> : <AddStockField />}
        </div>
    );
}

export default Holdings;
