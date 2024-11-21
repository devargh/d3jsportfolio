// Section 1: Bar Chart
const data1 = [10, 15, 20, 25, 30];
const svg1 = d3.select("#chart1").append("svg")
  .attr("width", "100%")
  .attr("height", "100%");
svg1.selectAll("rect")
  .data(data1)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 400 - d * 10)
  .attr("width", 50)
  .attr("height", d => d * 10)
  .attr("fill", "steelblue");

// Section 2: Line Chart
const data2 = [5, 10, 15, 10, 20];
const lineSvg = d3.select("#chart2").append("svg")
  .attr("width", "100%")
  .attr("height", "100%");
const line = d3.line()
  .x((d, i) => i * 100)
  .y(d => 400 - d * 10);
lineSvg.append("path")
  .datum(data2)
  .attr("d", line)
  .attr("fill", "none")
  .attr("stroke", "orange")
  .attr("stroke-width", 2);

// Section 3: Pie Chart
const data3 = [30, 70, 50, 100];
const pieSvg = d3.select("#chart3").append("svg")
  .attr("width", "100%")
  .attr("height", "100%");
const radius = 150;
const g = pieSvg.append("g")
  .attr("transform", "translate(250,250)");
const pie = d3.pie();
const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius);
const color = d3.scaleOrdinal(d3.schemeCategory10);
g.selectAll("path")
  .data(pie(data3))
  .enter()
  .append("path")
  .attr("d", arc)
  .attr("fill", (d, i) => color(i));

// Section 4: Scatter Plot
const data4 = [{ x: 30, y: 20 }, { x: 50, y: 90 }, { x: 80, y: 50 }, { x: 100, y: 100 }];
const scatterSvg = d3.select("#chart4").append("svg")
  .attr("width", "100%")
  .attr("height", "100%");
scatterSvg.selectAll("circle")
  .data(data4)
  .enter()
  .append("circle")
  .attr("cx", d => d.x * 4)
  .attr("cy", d => 400 - d.y * 4)
  .attr("r", 10)
  .attr("fill", "purple");

// Section 5: Interactive Chart
const data5 = [10, 20, 30, 40, 50];
const interactiveSvg = d3.select("#chart5").append("svg")
  .attr("width", "100%")
  .attr("height", "100%");
interactiveSvg.selectAll("rect")
  .data(data5)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 60)
  .attr("y", d => 400 - d * 10)
  .attr("width", 50)
  .attr("height", d => d * 10)
  .attr("fill", "green")
  .on("mouseover", function() { d3.select(this).attr("fill", "red"); })
  .on("mouseout", function() { d3.select(this).attr("fill", "green"); });
