import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

function Allocation() {
    const svgRef = useRef();
    const [holdings, setHoldings] = useState([]);
    const [totalInvestment, setTotalInvestment] = useState(0);

    const fetchHoldings = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/v1/stocks/getStock", {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            const result = await response.json();
            const data = result.data || [];

            if (data.length > 0) {
                console.log("Fetched Holdings", data);
                setHoldings(data);
                
                // Calculate total investment
                const total = data.reduce((acc, stock) => acc + (stock.buy_price * stock.quantity), 0);
                setTotalInvestment(total);
            } else {
                console.error("No holdings found.");
                setHoldings([]);
            }
        } catch (error) {
            console.error("Error fetching holdings:", error);
            setHoldings([]);
        }
    };

    useEffect(() => {
        fetchHoldings();
    }, []);

    useEffect(() => {
        if (holdings.length === 0 || totalInvestment === 0) return;

        const svg = d3.select(svgRef.current);
        const width = 200;
        const height = 200;
        const margin = 15;

        svg.selectAll("*").remove();

        // Custom color scale using two alternating colors
        const color = d3.scaleOrdinal()
            .domain(holdings.map(stock => stock.stock_symbol))
            .range([
                "#1D1D41", // Darker violet-black color
                "#2B294A"  // Lighter but still dark shade of violet
            ]);

        const pie = d3.pie()
            .value(d => d.investment);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(Math.min(width, height) / 2 - margin);

        const pieData = holdings.map(stock => ({
            stock_symbol: stock.stock_symbol,
            investment: stock.buy_price * stock.quantity
        }));

        const g = svg.append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        g.selectAll("path")
            .data(pie(pieData))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", (d, i) => color(i % 2))  // Alternate between two colors
            .attr("stroke", "#FFFFFF")
            .attr("stroke-width", 1)
            .on("mouseover", function(event, d) {
                const investment = d.data.investment;
                const percentage = ((investment / totalInvestment) * 100).toFixed(2);
                tooltip.transition().duration(200).style("opacity", .9);
                tooltip.html(`${d.data.stock_symbol}: ${percentage}%`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function() {
                tooltip.transition().duration(500).style("opacity", 0);
            });

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("position", "absolute")
            .style("padding", "8px")
            .style("background", "#FFFFFF")
            .style("border", "1px solid #ccc")
            .style("border-radius", "4px")
            .style("pointer-events", "none");

    }, [holdings, totalInvestment]);

    return (
        <div className="w-[25%] bg-[#1D1D41] rounded-md pt-5 pb-5 pl-5 pr-2 flex justify-center">
            <svg ref={svgRef} width="80%" height="100%" />
        </div>
    );
}

export default Allocation;
