import * as d3 from "d3";

// Sample data
const data = [30, 86, 168, 281, 303, 365];

// Create SVG container
const width = 600;
const height = 400;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create bars
svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 100)
    .attr("y", d => height - d)
    .attr("width", 50)
    .attr("height", d => d)
    .attr("fill", "steelblue");

d3.csv("data/data.csv").then(data => {
    console.log(data);
    // Use data to create charts
});
    
