let dataset = {"id": "Generacion 0",
	       "children": [
		   {"id": "FALCHETTI Santino",
		    "children": [
			{"id": "TPs cuatrimestre V",
			 "children": [
			     {"id": "tp3"},
			     {"id": "tp2"}
			 ]}
		    ]},
		 {"id": "ALVAREZ FREIJOMIL Facundo Tomas",
		  "children": [
		      {"id": "TPs cuatrimestre V",
		       "children":[
			   {"id": "tp1",
			    "children": [
				{"id": "01.jpg"},
				{"id": "02.jpg"},
				{"id": "03.jpg"}
			    ]},
			   {"id": "tp2"}
		       ]},
		  ]
		 },
		 {"id": "MEDAN FRANZESE Martin Ignacio",
		  "children": [
		      {"id": "TPs cuatrimestre V",
		       "children": [
			   {"id": "tp1"}
		       ]}
		  ]},
		   {"id": "AHUMADA Daniel Gerardo",
		    "children": [
			{"id": "TPs cuatrimestre V",
			 "children": [
			     {"id": "tp1"},
			     {"id": "tp3"},
			     {"id": "tp4"}
			 ]}

		    ]}
	     ]};

const WIDTH = 800;
const HEIGHT = 600;
const margin = {top:0, right: 0, bottom: 70, left: 0}

const innerWidth = WIDTH - margin.left - margin.right;
const innerHeight = HEIGHT - margin.top - margin.bottom;

 let tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden");


let graph = d3.select("#graph");
graph = graph
    .attr("viewBox", `0 0 ${WIDTH + margin.left + margin.right} ${HEIGHT + margin.top + margin.bottom}`)
  .style("max-width", WIDTH)
  .style("max-height", HEIGHT)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const treeLayout = d3.tree().size([innerWidth, innerHeight])
const root = d3.hierarchy(dataset);
const links = treeLayout(root).links();
const linkPaths = d3.linkVertical()
      .x(d => d.x)
      .y(d => HEIGHT - d.y)

graph.append("g")
  .attr("fill", "none")
  .selectAll("path")
  .data(links)
  .join("path").attr("d", linkPaths)
  .data(root.descendants())
  .attr("stroke", "teal")
  .attr("stroke-width", d => 25 - d.depth * 5)
  .attr("opacity", d => 1 - d.depth*0.2);

 graph.append("g")
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr("r", d => 60 - d.depth * 12)
    .attr("transform", d => `translate(${d.x},${HEIGHT - d.y})`)
    .attr("fill", d => d3.hsl(55 * d.depth, 1, 0.2 + d.depth * 0.07))
    .on("mouseover", (_, d) => tooltip.style("visibility", "visible")
	.text(d.data.id).style("font-size", "1.2rem"))
    .on("mousemove", (_, d) => tooltip.style("top", (event.y-10)+"px")
	.style("left",(event.pageX+10)+"px"))
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
