// Define tabs and their corresponding content
const tabs = [
  { name: "Home", content: "Welcome to the Home tab!" },
  { name: "About", content: "This is the About tab content." },
  { name: "Services", content: "Details about Services can be found here." },
  { name: "Portfolio", content: "Portfolio tab showcasing our work." },
  { name: "Contact", content: "Reach out via the Contact tab." }
];

const tabsContainer = document.getElementById('tabs');
const contentContainer = document.getElementById('content');

// Add event listeners to each tab
tabsContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('tab')) {
      // Set the active tab
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
      event.target.classList.add('active');

      // Change content based on the clicked tab
      const tabIndex = Array.from(event.target.parentElement.children).indexOf(event.target);
      contentContainer.textContent = tabs[tabIndex].content;

      // Render calendar heatmap when the Home tab is clicked
      if (event.target.textContent === "Home") {
          renderCalendarHeatmap();
      } else {
          // Optionally, clear the calendar if not in Home tab
          document.getElementById("calendar-heatmap").innerHTML = '';
      }
  }
});

// Initialize first tab and content
document.querySelector('.tab').classList.add('active');
contentContainer.textContent = tabs[0].content;

// Function to render the calendar heatmap
function renderCalendarHeatmap() {
  console.log("Rendering calendar heatmap...");

  const width = 900; // Adjust chart width
  const cellSize = 90; // Size of each day cell
  const height = cellSize * 7; // Adjust height for weeks, labels, and legend

  // Data: Replace this array with your dataset
  const data = [
      { date: "2023-07-01", value: 19.1 },
      { date: "2023-07-02", value: 15.3 },
      { date: "2023-07-03", value: 16.4 },
      { date: "2023-07-04", value: 16.0 },
      { date: "2023-07-05", value: 17.9 },
      { date: "2023-07-06", value: 15.8 },
      { date: "2023-07-07", value: 21.1 },
      { date: "2023-07-08", value: 23.3 },
      { date: "2023-07-09", value: 24.8 },
      { date: "2023-07-10", value: 25.1 },
      { date: "2023-07-11", value: 18.2 },
      { date: "2023-07-12", value: 14.4 },
      { date: "2023-07-13", value: 19.3 },
      { date: "2023-07-14", value: 20.2 },
      { date: "2023-07-15", value: 15.8 },
      { date: "2023-07-16", value: 16.1 },
      { date: "2023-07-17", value: 15.7 },
      { date: "2023-07-18", value: 19.2 },
      { date: "2023-07-19", value: 18.6 },
      { date: "2023-07-20", value: 18.3 },
      { date: "2023-07-21", value: 15.0 },
      { date: "2023-07-22", value: 14.7 },
      { date: "2023-07-23", value: 18.8 },
      { date: "2023-07-24", value: 17.7 },
      { date: "2023-07-25", value: 17.4 },
      { date: "2023-07-26", value: 17.0 },
      { date: "2023-07-27", value: 18.1 },
      { date: "2023-07-28", value: 18.2 },
      { date: "2023-07-29", value: 20.3 },
      { date: "2023-07-30", value: 16.4 },
      { date: "2023-07-31", value: 17.0 }
  ];

  // Parse the date and create a map for faster lookup
  const parseDate = d3.timeParse("%Y-%m-%d");
  const formattedData = data.map(d => ({ date: parseDate(d.date), value: d.value }));
  const dataMap = new Map(formattedData.map(d => [d.date.getTime(), d.value]));

  // Create color scale
  const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
      .domain([30, 0]); // Adjust the domain for your temperature range

  // Create the SVG container
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .style("font", "12px sans-serif");

  // Add title
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

  const startOfMonth = new Date(2023, 6, 1); // July 1, 2023
  const days = d3.timeDays(startOfMonth, new Date(2023, 6, 31));
  const offset = startOfMonth.getDay(); // Friday = 5

  // Place days correctly
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
      .attr("x", d => ((d.getDate() + offset - 1) % 7) * cellSize + cellSize + 4)
      .attr("y", d => 100 + Math.floor((d.getDate() + offset - 1) / 7) * cellSize)
      .style("font-size", "12px")
      .style("fill", "black")
      .text(d => d.getDate());

  svg.selectAll(".day-value")
      .data(days)
      .join("text")
      .attr("x", d => ((d.getDate() + offset - 1) % 7) * cellSize + cellSize + cellSize / 2)
      .attr("y", d => 120 + Math.floor((d.getDate() + offset - 1) / 7) * cellSize)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("font-weight", "bold")
      .text(d => {
          const value = dataMap.get(d.getTime());
          return value !== undefined ? value.toFixed(1) : "";
      });

  document.getElementById("calendar-heatmap").appendChild(svg.node());
}

// Call renderCalendarHeatmap when the Home tab is clicked initially
document.addEventListener("DOMContentLoaded", function() {
  // Initialize tabs and render the calendar heatmap when Home tab is clicked
  const tabsContainer = document.getElementById('tabs');
  const contentContainer = document.getElementById('content');

  tabsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('tab')) {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        contentContainer.textContent = `Content for ${event.target.textContent} tab`;

        if (event.target.textContent === "Home") {
            renderCalendarHeatmap(); // Render calendar heatmap when Home tab is clicked
        } else {
            document.getElementById("calendar-heatmap").innerHTML = ''; // Clear calendar for other tabs
        }
    }
  });

  // Render the calendar heatmap
  function renderCalendarHeatmap() {
      const calendarHeatmapDiv = document.getElementById("calendar-heatmap");
      if (!calendarHeatmapDiv) {
          console.error('calendar-heatmap div not found');
          return;
      }

      const width = 900;
      const cellSize = 90;
      const height = cellSize * 7;
      const data = [
          { date: "2023-07-01", value: 19.1 },
          { date: "2023-07-02", value: 15.3 },
          { date: "2023-07-03", value: 16.4 },
          // Add more data...
      ];

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

      // Add week days and grid
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

      const startOfMonth = new Date(2023, 6, 1); // July 1, 2023
      const days = d3.timeDays(startOfMonth, new Date(2023, 6, 31));
      const offset = startOfMonth.getDay();

      // Render days and values in the calendar
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

      calendarHeatmapDiv.appendChild(svg.node());
  }

  // Call renderCalendarHeatmap when the page loads
  renderCalendarHeatmap();
});

