let dataset = {"id": "Año 2020",
	       "children": [
		   {"id": "FALCHETTI Santino",
		    "children": [
			{"id": "tp3", "value": 3},
			{"id": "tp2", "value":11}
		    ]},
		   {"id": "ALVAREZ FREIJOMIL Facundo Tomas",
		    "children": [
			{"id": "tp1", "value":6},
			{"id": "tp2", "value":8}
		    ]},
		   {"id": "MEDAN FRANZESE Martin Ignacio",
		    "children": [
			{"id": "tp1", "value":5}
		    ]},
		   {"id": "AHUMADA Daniel Gerardo",
		    "children": [
			{"id": "tp1", "value":4},
			{"id": "tp3", "value":6},
			{"id": "tp4", "value":8}
		    ]}
	       ]};

const WIDTH = 800;
const HEIGHT = 600;
const margin = {top:0, right: 0, bottom: 70, left: 0};

const innerWidth = WIDTH - margin.left - margin.right;
const innerHeight = HEIGHT - margin.top - margin.bottom;

let tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");

let palette = ["#397168", "#5ca9b9", "#6be2aa"];
let graph = d3.select("#graph");
graph = graph
    .attr("viewBox", 
	  `0 0 ${WIDTH + margin.left + margin.right} ${HEIGHT + margin.top + margin.bottom}`)
    .style("max-width", WIDTH)
    .style("max-height", HEIGHT)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const treeLayout = d3.tree().size([innerWidth, innerHeight])
const root = d3.hierarchy(dataset);
const links = treeLayout(root).links();
const linkPaths = d3.linkVertical()
      .x(d => d.x)
      .y(d => HEIGHT - d.y);

graph.append("g")
    .attr("fill", "none")
    .attr("stroke", "teal")
    .attr("stroke-width", 8)

    .selectAll("path")
    .data(root.descendants())
    .join("path")

    .data(links)
    .attr("d", linkPaths);





  graph.append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("r", d => d.children ? 20 : 20 + (d.data.value * 1.6))
      .attr("transform", d => `translate(${d.x},${HEIGHT - d.y})`)
      .attr("fill", d => palette[d.depth])

      .on("mouseover", (_, d) => {
	  let text = d.data.id,
	      files = d.data.value; 
	  tooltip.style("visibility", "visible")
	      .text(text).style("font-size", "1.2rem")
      })
      .on("mousemove", (_, d) => {
	  let x = event.pageX,
	      y = event.pageY;
	  tooltip
	      .style("top", (y-10)+"px")
	      .style("left",(x+10)+"px")
      })
      .on("mouseout", () => tooltip.style("visibility", "hidden"));

     // graph.append("g")
     //     .attr("font-family", "sans-serif")
     //     .attr("text-anchor", "middle")
     //     .selectAll("text")
     //     .data(root.descendants())
     //     .join("text")
     //     .attr("transform", d => `translate(${d.x},${HEIGHT - d.y})`)
     //     .text(d => d.data.id)
     //     .attr("font-size", d => 2 - (d.depth * 0.4) + "rem");
