// Define tabs and their corresponding content
const tabs = [
  { name: "Home", content: "Welcome to the Home tab!" },
  { name: "About", content: "This is the About tab content." },
  { name: "Services", content: "Details about Services can be found here." },
  { name: "Portfolio", content: "Portfolio tab showcasing our work." },
  { name: "Contact", content: "Reach out via the Contact tab." }
];

// Create the tabs
const tabsContainer = d3.select("#tabs");
const contentContainer = d3.select("#content");

tabsContainer.selectAll("div")
  .data(tabs)
  .enter()
  .append("div")
  .attr("class", "tab")
  .text(d => d.name)
  .on("click", function(event, d) {
      // Update the active tab
      tabsContainer.selectAll(".tab").classed("active", false);
      d3.select(this).classed("active", true);

      // Update content area
      contentContainer.text(d.content);
  });

// Set the first tab as active by default
tabsContainer.selectAll(".tab").filter((d, i) => i === 0).classed("active", true);
contentContainer.text(tabs[0].content);
