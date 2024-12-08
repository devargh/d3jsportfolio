function loadAboutTab(container) {
    container.innerHTML = '<div id="sankey-chart"></div>';
    renderSankeyChart();
}
  
function renderSankeyChart() {
    const sankeyChartDiv = document.getElementById("sankey-chart");
    if (!sankeyChartDiv) {
      console.error("sankey-chart div not found");
      return;
    }
  
    const data = {
      nodes: [
        { name: "Net Import" },
        { name: "Petroleum" },
        { name: "Solar" },
        { name: "Geothermal" },
        { name: "Natural Gas" },
        { name: "Biomass" },
        { name: "Electricity & Heat" },
        { name: "Residential" },
        { name: "Commercial" },
        { name: "Industrial" },
        { name: "Transportation" },
        { name: "Rejected Energy" },
        { name: "Energy Services" },
        { name: "Nuclear" },
        { name: "Hydro" },
        { name: "Wind" },
        { name: "Coal" }
      ],
      links: [
        { source: 0, target: 6, value: 0.14 },
        { source: 1, target: 6, value: 0.24 },
        { source: 6, target: 7, value: 5.19 },
        { source: 2, target: 7, value: 0.4 },
        { source: 3, target: 7, value: 0.04 },
        { source: 4, target: 7, value: 5.17 },
        { source: 5, target: 7, value: 0.48 },
        { source: 1, target: 7, value: 0.98 },
        { source: 6, target: 8, value: 4.69 },
        { source: 2, target: 8, value: 0.16 },
        { source: 3, target: 8, value: 0.02 },
        { source: 4, target: 8, value: 3.65 },
        { source: 16, target: 8, value: 0.02 },
        { source: 5, target: 8, value: 0.15 },
        { source: 1, target: 8, value: 0.88 },
        { source: 6, target: 9, value: 3.44 },
        { source: 2, target: 9, value: 0.04 },
        { source: 4, target: 9, value: 10.8 },
        { source: 16, target: 9, value: 0.99 },
        { source: 5, target: 9, value: 2.27 },
        { source: 1, target: 9, value: 9.13 },
        { source: 13, target: 6, value: 8.05 },
        { source: 6, target: 10, value: 0.02 },
        { source: 4, target: 10, value: 1.29 },
        { source: 5, target: 10, value: 1.57 },
        { source: 1, target: 10, value: 24.6 },
        { source: 6, target: 11, value: 24.3 },
        { source: 7, target: 11, value: 4.29 },
        { source: 8, target: 11, value: 3.35 },
        { source: 9, target: 11, value: 13.6 },
        { source: 10, target: 11, value: 21.7 },
        { source: 7, target: 12, value: 7.97 },
        { source: 14, target: 6, value: 2.31 },
        { source: 8, target: 12, value: 6.22 },
        { source: 9, target: 12, value: 13.1 },
        { source: 10, target: 12, value: 5.77 },
        { source: 15, target: 6, value: 3.84 },
        { source: 3, target: 6, value: 0.15 },
        { source: 4, target: 6, value: 12.5 },
        { source: 16, target: 6, value: 8.9 },
        { source: 5, target: 6, value: 0.41 }
      ]
    };
  
    // Set dimensions
    const width = 960;
    const height = 500;
  
    // Create the Sankey layout
    const sankey = d3.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 5]]);
  
    // Compute the Sankey layout
    const sankeyData = sankey({
      nodes: data.nodes.map(d => Object.assign({}, d)),
      links: data.links.map(d => Object.assign({}, d))
    });
  
    // Define a color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);
  
    // Create an SVG container
    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);
  
    // Add links
    const link = svg.append("g")
      .selectAll("path")
      .data(sankeyData.links)
      .join("path")
      .attr("d", d3.sankeyLinkHorizontal())
      .attr("fill", "none")
      .attr("stroke", d => color(d.source.name))
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", d => Math.max(1, d.width))
      .on("mouseover", function (event, d) {
        // Dim all nodes except the source and target
        node.attr("fill", "#ccc");
  
        // Highlight the hovered link
        d3.select(this).attr("stroke-opacity", 1);
  
        // Highlight the source and target nodes
        d3.select(sankeyData.nodes[d.source.index].rect)
          .attr("fill", d => color(d.name)); // Keep source node's original color

        // Highlight the target node with its original color (no change)
        d3.select(sankeyData.nodes[d.target.index].rect)
          .attr("fill", d => color(d.name)); // Keep target node's original color
      })
      .on("mouseout", function () {
        // Reset all links and nodes
        link.attr("stroke-opacity", 0.5); // Reset all links
        node.attr("fill", d => color(d.name)); // Reset node colors to original
      });
  
    // Add nodes and store reference to rect element
    const node = svg.append("g")
      .selectAll("rect")
      .data(sankeyData.nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", d => color(d.name))
      .each(function (d) {
        // Store the reference to the rect element in the node data
        d.rect = this;
      })
      .on("mouseover", function (event, d) {
        // Highlight links connected to the hovered node
        link.attr("stroke-opacity", 0.1); // Dim all links
        link.filter(l => l.source === d || l.target === d)
          .attr("stroke-opacity", 1); // Highlight links connected to the node
      })
      .on("mouseout", function () {
        link.attr("stroke-opacity", 0.5); // Reset all links to original opacity
      });
  
    // Add node labels
    svg.append("g")
      .selectAll("text")
      .data(sankeyData.nodes)
      .join("text")
      .attr("x", d => d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(d => d.name)
      .filter(d => d.x0 < width / 2)
      .attr("x", d => d.x1 + 6)
      .attr("text-anchor", "start");
  
    sankeyChartDiv.appendChild(svg.node());
  }
  