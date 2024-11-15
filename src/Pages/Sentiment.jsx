import { useEffect, useState } from "react";
import { Loader } from 'semantic-ui-react';
import Navbar from "../Components/Navbar";

const Sentiment = () => {
    const [symb, setSymb] = useState({ symbol: "" });
    const [loader, setLoader] = useState(false);
    const [sentiment, setSentiment] = useState("");
    const [topStocks, setTopStocks] = useState([]); // State to hold top 5 stocks

    const changeHandler = (event) => {
        setSymb({ ...symb, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);
        try {
            const response = await fetch(`http://localhost:5000/api/v1/sentiment/getstocksentiment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symbol: symb.symbol }),
            });
            const result = await response.json();
            setSentiment(result.average_sentiment);
        } catch (error) {
            console.error("Error fetching sentiment:", error);
        } finally {
            setLoader(false);
        }
    };

    const fetchTopStocks = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/sentiment/gettopsentiments`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setTopStocks(result.top_sentiments.map(stock => stock.stock_symbol)); // Storing only the stock symbols
        } catch (error) {
            console.error("Error fetching top stocks:", error);
        } 
    };

    useEffect(() => {
        console.log("Sentiment:", sentiment);
    }, [sentiment]);

    // Function to map sentiment score (-1 to 1) to percentage (0% to 100%)
    const getSentimentPosition = (score) => {
        return ((score + 1) / 2) * 100;
    };

    return (
        <div className="w-screen h-screen flex">
            <Navbar/>
            <div className="w-[86%] min-h-full bg-[#141332] px-5 flex flex-col items-center">
                <form className="w-full flex justify-center mt-10 gap-3" onSubmit={submitHandler}>
                    <input
                        type="text"
                        className="w-1/2 h-14 bg-[#1D1D41] text-white p-2 rounded-lg"
                        name="symbol"
                        placeholder="Enter Symbol For Sentiment"
                        value={symb.symbol}
                        onChange={changeHandler}
                    />
                    <button type="submit" className="w-44 h-14 bg-[#6359E9] text-white rounded-lg">Get Sentiment</button>
                </form>

                {
                    loader ? (
                        <Loader size="huge" className="active" style={{ backgroundColor: '#141332', color: 'white' }}>Loading</Loader>
                    ) : sentiment === "" ? (
                        <div className="text-white text-2xl mt-24">No sentiment searched yet</div>
                    ) : (
                        <div className="text-white text-2xl mt-20 flex flex-col items-center w-full">
                            <div className="w-full max-w-lg h-6 mt-6 relative">
                                {/* Sentiment Bar with Gradient */}
                                <div
                                    className="w-full h-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-lg"
                                    style={{ position: "relative" }}
                                ></div>

                                {/* Sentiment Marker */}
                                <div
                                    className="absolute top-0 h-6 w-1 bg-black"
                                    style={{
                                        left: `${getSentimentPosition(sentiment)}%`,
                                        transform: "translateX(-50%)"
                                    }}
                                ></div>
                            </div>

                            {/* Sentiment Labels */}
                            <div className="w-full max-w-lg flex justify-between mt-2 px-1">
                                <span className="text-red-500">Negative</span>
                                <span className="text-yellow-400">Neutral</span>
                                <span className="text-green-500">Positive</span>
                            </div>

                            {/* Sentiment Score */}
                            <div className="text-white mt-3">
                                Sentiment Score: {sentiment.toFixed(2)}
                            </div>
                        </div>
                    )
                }

                {/* Button to fetch top 5 stocks */}
                <button 
                    onClick={fetchTopStocks} 
                    className="w-44 h-14 bg-[#6359E9] text-white rounded-lg mt-5"
                >
                    Get Top 5 Stocks
                </button>

                {topStocks.length > 0 && (
                    <div className="mt-5 w-full max-w-lg bg-[#1D1D41] p-5 rounded-lg shadow-lg">
                        <h2 className="text-xl text-white mb-4">Top 5 Stocks:</h2>
                        <ul className="space-y-2 overflow-y-scroll">
                            {topStocks.map((stock, index) => (
                                <li key={index} className="text-lg text-white p-3 bg-[#2E2E53] rounded-lg hover:bg-[#3D3D70] transition-colors duration-300">
                                    {stock}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Sentiment;
