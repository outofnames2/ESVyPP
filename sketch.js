let materias = ["Estructuras Sonoras y Visuales", "Taller de Produccion y Postproduccion"]
let dataset = {"id": "Año 2020",
	       "children": [
		   {"id": "FALCHETTI Santino",
		    "children": [
			{"id": "Tp06_T_Recuerdo.pdf"
			 , "archivos": 1
			 , "url": "https://drive.google.com/file/d/15UXdnx74zdXGmwwTVVRGlEQ5fyBBlRb0"
			 , "materia": materias[1]},
			{"id": "herbario"
			 , "archivos":11,
			 "url": "https://drive.google.com/drive/folders/18n0FqYa1gQBogRD0Ry2PLP1V_LKj08K2"
			 ,"materia": materias[0]}
		    ]},
		   {"id": "ALVAREZ FREIJOMIL Facundo Tomas",
		    "children": [
			{"id": "Alvarez_Facundo_Tp_08_T_Transformaciones"
			 , "archivos":10
			 , "url": "https://drive.google.com/drive/folders/1163zusXN4K1m_qDq12wKeziZBuw3gB99"
			 , "materia": materias[1]},
			{"id": "Alvarez_Facundo_Tp04_E_Codex_Vegetal"
			 , "archivos":11
			 , "url": "https://drive.google.com/drive/folders/1XSxkged5u6AD8vV_fPzpO3OXWrDoUMGq"
			 , "materia": materias[0]}
		    ]},
		   {"id": "MEDAN FRANZESE Martin Ignacio",
		    "children": [
			{"id": "Tp7"
			 ,"archivos":11
			 ,"url": "https://drive.google.com/drive/folders/1its4uymKEchEBWxB2lMKvioEytQ49qOC"
			 ,"materia": materias[1]},
			{"id": "Tp10"
			 ,"archivos": 1
			 ,"url": "https://drive.google.com/file/d/1Ee2dvwMNiRq0pRr9wmZh96s7uwe1CckK/view"
			 ,"materia": materias[1]}
		    ]},
		   {"id": "AHUMADA Daniel Gerardo",
		    "children": [
			{"id": "proyecto flash"
			 , "archivos":1
			 , "url":  "https://drive.google.com/file/d/1saur2QY9QH8Y0I7komQMXVXNlDEV3yiZ/view"
			 , "materia": materias[0]},
			{"id": "TP 6 RECUERDO"
			 , "archivos":18
			 , "url": "https://drive.google.com/drive/folders/1nz5DkGTNDVEyIAN5sm75w9GEoSN7O_KY"
			 , "materia": materias[1]},
			{"id": "TP3_E_AUTORETRATO"
			 , "archivos":1
			 , "url": "https://drive.google.com/file/d/1F5NvQq7bi_HW0u2SHiyMF4hEEvP2ITnO/view"
			 , "materia": materias[0]}
		    ]}
	       ]};

const WIDTH = 800;
const HEIGHT = 600;
const margin = {top:0, right: 0, bottom: 70, left: 0};

const innerWidth = WIDTH - margin.left - margin.right;
const innerHeight = HEIGHT - margin.top - margin.bottom;

let tooltip = d3.select("#tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("white-space", "pre-line")

    .style("background-color", "white")
    .style("opacity", "0.7");

let palette = ["black", "#b20000", "#00cc99"];
let graph = d3.select("#graph");
graph = graph
    .attr("viewBox", 
	  `0 0 ${WIDTH + margin.left + margin.right} ${HEIGHT + margin.top + margin.bottom}`)
    .attr("xmlns","http://www.w3.org/2000/svg" )
    .attr("xmlns:xlink","http://www.w3.org/1999/xlink" )
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
    .join("svg:a").attr("xlink:href", d => d.data.url)
    .append("circle")
    .attr("r", d => d.children ? 20 : 10 + (d.data.archivos * 1.6))
    .attr("transform", d => `translate(${d.x},${HEIGHT - d.y})`)
    .attr("fill", d => palette[d.depth])


    .on("mouseover", (_, d) => {
	let id = d.data.id,
	    archivos = d.data.archivos,
	    materia = d.data.materia;
	tooltip.style("visibility", "visible")
	    .text(d.children ? id : `TP: ${id}\n Cantidad de archivos: ${archivos}\n Materia: ${materia}`)
	    .style("font-size", "1.2rem")
      })
    .on("mousemove", (_, d) => {
	  let x = event.pageX,
	      y = event.pageY;
	  tooltip
	      .style("top", (y-10)+"px")
	      .style("left",(x+10)+"px")
      })
    .on("mouseout", () => tooltip.style("visibility", "hidden"));
