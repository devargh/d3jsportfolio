function loadHomeTab(container) {
    container.innerHTML = '<div id="calendar-heatmap"></div>';

    const baseURL = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
      ? 'http://127.0.0.1:5000' : 'https://rsquareds.com';


    // Fetch data from the backend API using D3.js
    d3.json(`${baseURL}/api/home`) 
        .then(data => {
          renderCalendarHeatmap(data);
        })
        .catch(error => console.error('Error fetching data:', error));
  }
  
  function renderCalendarHeatmap(data) {
    const calendarHeatmapDiv = document.getElementById("calendar-heatmap");
    if (!calendarHeatmapDiv) {
      console.error("calendar-heatmap div not found");
      return;
    }
  
    const width = 900, cellSize = 90, height = cellSize * 7;
    // const data = [
    //     { date: "2023-07-01", value: 19.1 },
    //     { date: "2023-07-02", value: 15.3 },
    //     { date: "2023-07-03", value: 16.4 },
    //     { date: "2023-07-04", value: 16.0 },
    //     { date: "2023-07-05", value: 17.9 },
    //     { date: "2023-07-06", value: 15.8 },
    //     { date: "2023-07-07", value: 21.1 },
    //     { date: "2023-07-08", value: 23.3 },
    //     { date: "2023-07-09", value: 24.8 },
    //     { date: "2023-07-10", value: 25.1 },
    //     { date: "2023-07-11", value: 18.2 },
    //     { date: "2023-07-12", value: 14.4 },
    //     { date: "2023-07-13", value: 19.3 },
    //     { date: "2023-07-14", value: 20.2 },
    //     { date: "2023-07-15", value: 15.8 },
    //     { date: "2023-07-16", value: 16.1 },
    //     { date: "2023-07-17", value: 15.7 },
    //     { date: "2023-07-18", value: 19.2 },
    //     { date: "2023-07-19", value: 18.6 },
    //     { date: "2023-07-20", value: 18.3 },
    //     { date: "2023-07-21", value: 15.0 },
    //     { date: "2023-07-22", value: 14.7 },
    //     { date: "2023-07-23", value: 18.8 },
    //     { date: "2023-07-24", value: 17.7 },
    //     { date: "2023-07-25", value: 17.4 },
    //     { date: "2023-07-26", value: 17.0 },
    //     { date: "2023-07-27", value: 18.1 },
    //     { date: "2023-07-28", value: 18.2 },
    //     { date: "2023-07-29", value: 20.3 },
    //     { date: "2023-07-30", value: 16.4 },
    //     { date: "2023-07-31", value: 17.0 }
    //   ];
  
      const parseDate = d3.timeParse("%Y-%m-%d");
      const formattedData = data.map(d => ({ date: parseDate(d.date), value: d.value }));
      const dataMap = new Map(formattedData.map(d => [d.date.getTime(), d.value]));
  
      const colorScale = d3.scaleSequential(d3.interpolateRdYlBu).domain([30, 0]);
  
      const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .style("font", "12px sans-serif");
  
      svg.append("text")
        .attr("x", width / 2)
        .attr("y", 20)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .text("Day Temperature in Oslo, July 2023");
  
      const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      svg.selectAll(".day-label")
        .data(weekDays)
        .join("text")
        .attr("x", (d, i) => i * cellSize + cellSize * 1.5)
        .attr("y", 60)
        .style("font-size", "14px")
        .attr("text-anchor", "middle")
        .style("font-weight", "bold")
        .text(d => d);
  
      const startOfMonth = new Date(2023, 6, 1);
      const days = d3.timeDays(startOfMonth, new Date(2023, 6, 31));
      const offset = startOfMonth.getDay();
  
      svg.selectAll(".day")
        .data(days)
        .join("rect")
        .attr("x", d => ((d.getDate() + offset - 1) % 7) * cellSize + cellSize)
        .attr("y", d => 80 + Math.floor((d.getDate() + offset - 1) / 7) * cellSize)
        .attr("width", cellSize - 2)
        .attr("height", cellSize - 2)
        .attr("fill", d => {
          const value = dataMap.get(d.getTime());
          return value !== undefined ? colorScale(value) : "#eaeaea";
        });
  
      svg.selectAll(".day-number")
        .data(days)
        .join("text")
        .attr("x", d => ((d.getDate() + offset - 1) % 7) * cellSize + cellSize + 4) // Correct column position for the number
        .attr("y", d => 100 + Math.floor((d.getDate() + offset - 1) / 7) * cellSize) // Correct row for the number
        .style("font-size", "12px")
        .style("fill", "black")
        .text(d => d.getDate());
  
      svg.selectAll(".day-value")
        .data(days)
        .join("text")
        .attr("x", d => ((d.getDate() + offset - 1) % 7) * cellSize + cellSize + cellSize / 2) // Correct column position for values
        .attr("y", d => 120 + Math.floor((d.getDate() + offset - 1) / 7) * cellSize) // Correct row for values
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text(d => {
          const value = dataMap.get(d.getTime());
          return value !== undefined ? value.toFixed(1) : "";
        });
  
      // Legend settings
      const legendX = width - 80; // Position of the legend
      const legendY = height - 450; // Position of the legend
      const legendWidth = 20; // Width of the legend
      const legendHeight = 250; // Height of the legend
    
      // Define ranges and interpolate colors within each interval
      const ranges = [
        { rangeStart: 0, rangeEnd: 10, colorStart: d3.interpolateRdYlBu(1.0), colorEnd: d3.interpolateRdYlBu(0.66) },
        { rangeStart: 11, rangeEnd: 20, colorStart: d3.interpolateRdYlBu(0.66), colorEnd: d3.interpolateRdYlBu(0.33) },
        { rangeStart: 21, rangeEnd: 30, colorStart: d3.interpolateRdYlBu(0.33), colorEnd: d3.interpolateRdYlBu(0.0) }
      ];
    
      // Generate gradient stops with narrower white gaps
      const gapSize = 0.005; // Narrow gap size (5% of each range)
      const gradientStops = [];
      ranges.forEach((range, index) => {
        const rangeStart = (index * 10) / 30; // Start percentage for the range
        const rangeEnd = ((index + 1) * 10 - 1) / 30; // End percentage for the range
        const gapStart = ((index + 1) * 10 - 1) / 30; // Start of the white gap
        const gapEnd = gapStart + gapSize; // End of the narrow white gap
      
        // Add gradient for the range
        gradientStops.push(
          { offset: `${rangeStart * 100}%`, color: range.colorStart },
          { offset: `${rangeEnd * 100}%`, color: range.colorEnd }
        );
      
        // Add narrow white gap
        gradientStops.push(
          { offset: `${gapStart * 100}%`, color: "white" },
          { offset: `${gapEnd * 100}%`, color: "white" }
        );
      });
    
      // Append gradient definition
      svg.append("defs").append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%")
        .selectAll("stop")
        .data(gradientStops)
        .join("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);
      
      // Add legend rectangle
      svg.append("rect")
        .attr("x", legendX)
        .attr("y", legendY)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "url(#gradient)");
    
      // Add labels for the legend
      const legendScale = d3.scaleLinear()
        .domain([0, 30]) // Correct domain from 0 to 30
        .range([legendY, legendY + legendHeight - 10]); // Correctly maps to the legend height
    
      // Add axis to the legend
      svg.append("g")
        .attr("transform", `translate(${legendX + legendWidth + 5}, 0)`)
        .call(d3.axisRight(legendScale).ticks(4).tickFormat(d => `${d}`));
    
      // Add labels for "Low" and "High"
      svg.append("text")
        .attr("x", legendX + legendWidth / 2)
        .attr("y", legendY - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .text("Low");
    
      svg.append("text")
        .attr("x", legendX + legendWidth / 2)
        .attr("y", legendY + legendHeight + 15)
        .attr("text-anchor", "middle")
        .style("font-size", "10px")
        .text("High");
  
    calendarHeatmapDiv.appendChild(svg.node());
  }
  