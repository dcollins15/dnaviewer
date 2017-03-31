//for all methods relating to the svg visual and d3 library

var drawDiagramSVG = function (gene_data) {
	
	//gets the gene_data's full sequence as array of feature sequences
	var draw_data = gene_data.getSequence();
	
	//calculates the required circumfrance of gene circle to facilitate gaps between
	var c = gene_data.size + gene_data.size * 0.1;
	//sets gap size
	var gap = gene_data.size * 0.1 / draw_data.length;
	
	
	//draws the genes in loop with each arc length proportional to the feature sizes
	for (var i = 0; i < draw_data.length; i++) {
		
		var arc = d3.svg.arc()
					.outerRadius(height/2.2)
					.innerRadius(height/2.2 - 3)
					.startAngle((i * gap + draw_data[i].start) * 2 * Math.PI / c)
					.endAngle((i * gap + draw_data[i].end) * 2 * Math.PI / c);
					
		svg.append("path")
						 .attr("class", "arc")
						 .attr("id", draw_data[i].name.replace(/\s/g, '') + "-diagram") //prefix of id will have match in <tr> element allowing them to be easily linked during even handling
						 .attr("d", arc)
						 .attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	}
}
	
//adds the feature name to the graph when its highlighted
var drawLabel = function (name) {

	svg.selectAll("text")
	   .remove();

	//draws the name and feature type of the highlighted feature in the center of the diagram
	if (name.substring(0, 7) != 'no_name' && name != 'title') {
		
		svg.append("text")
	   	   .attr("text-anchor", "middle")
	   	   .attr("x", width/2)
	   	   .attr("y", height/2)
	   	   .attr("font-size", width/50)
	   	   .text(name);
	}
}