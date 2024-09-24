import { useEffect, useState } from "react";

const Sentiment = () => {
    const [symb, setSymb] = useState({
        symbol: ""
    });

    const [loader, setLoader] = useState(false);
    const [sentiment, setSentiment] = useState("");

    const changeHandler = (event) => {
        setSymb({ ...symb, [event.target.name]: event.target.value });
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true); // Start loader
        try {
            const response = await fetch(`http://localhost:5000/api/v1/sentiment/getsentiment/${symb.symbol}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();
            setSentiment(result.avg_sentiment); // Extracting avg_sentiment from result
        } catch (error) {
            console.error("Error fetching sentiment:", error);
        } finally {
            setLoader(false); // Stop loader
        }
    };

    useEffect(() => {
        console.log("Sentiment:", sentiment);
    }, [sentiment]);

    return (
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

            {loader ? (
                <div className="text-white text-2xl mt-24">Loading sentiment...</div>
            ) : sentiment === "" ? (
                <div className="text-white text-2xl mt-24">No sentiment searched yet</div>
            ) : (
                <div className="text-white text-2xl mt-24">Sentiment: {sentiment}</div>
            )}
        </div>
    );
};

export default Sentiment;
