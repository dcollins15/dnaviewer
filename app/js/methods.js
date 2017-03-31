
//sets the title and other gene data for static display
//calls on the d3 function to actually draw diagram
function drawDiagram(gene_data) {
	//first we populate the text display
	
	$("#gene-info").empty();
	
	$("#gene-info").append("<h1>" +  gene_data.name + "</h1>");
	
	$("#gene-info").append("<h2>Species: " +  gene_data.species + "</h2>");
	$("#gene-info").append("<h2>Nuclease: " +  gene_data.nuclease + "</h2>");
	$("#gene-info").append("<h2>Size: " +  gene_data.size + "</h2>");
	
	drawDiagramSVG(gene_data);
}


//populates the Features table into the bottom display
var fillTableFeatures = function(gene_data) {
	
	gene_data.sortOrder();
	
	$("#main-info-container").empty();
	
	var table = '<table><thead><tr id="title-row"> <th>Name</th> <th>Type</th> <th>Direction</th> <th>Start</th> <th>End</th> <th>Size</th> </tr></thead><tbody id="feature-table-body"></tbody></table>';
	
	$("#main-info-container").append(table);
	
	for (var i = 0; i < gene_data.features.length; i++) {
		
		//prefix of id will have match in <path> element allowing them to be easily linked during even handling
		var row = "<tr id='" + gene_data.features[i].name.replace(/\s/g, '') + "-table'> <td>" + gene_data.features[i].name + "</td> <td>" + gene_data.features[i].type + "</td> <td>" + gene_data.features[i].getDirectionString() + "</td> <td>" + gene_data.features[i].start + "</td> <td>" + gene_data.features[i].end + "</td> <td>" + gene_data.features[i].size + "</td> </tr>";
			
		$("#feature-table-body").append(row);
	}
}


//populates the Sequence table into the bottom display
var fillTableSequence = function(gene_data) {
	
	$("#main-info-container").empty();
	
	var sequence_data = gene_data.getSequence();
	
	var table = '<table><thead><tr id="title-row"> <th>Name</th> <th>Sequence</th> </tr></thead><tbody id="sequence-table-body"></tbody></table>';
	
	$("#main-info-container").append(table);
	
	for (var i = 0; i < sequence_data.length; i++) {
		//prefix of id will have match in <path> element allowing them to be easily linked during even handling
		$("#sequence-table-body").append("<tr id='" + sequence_data[i].name.replace(/\s/g, '') + "-table'><td>" + sequence_data[i].name + "</td> <td>" + sequence_data[i].sequence + "</td></tr>");
	}
}


//handles event of diagram segment being clicked on, highligt coresponding <tr>
var diagramSelectEvent = function(e) {
	$(".active").removeClass("active");
	
	//adds active class to all other <paths>, which CSS rules then change color of
	$("path:not(#" + $(e.currentTarget).attr('id') + ")").addClass('active');
	
	//gets id prefix to match with 
	var selector = ($(e.currentTarget).attr('id')).split("-");
	var type = $(e.currentTarget).attr('id');
	
	if ($("#" + selector[0] + "-table").length > 0) {
		$("#" + selector[0] + "-table").addClass('active');
	}
	
	drawLabel(selector[0]);
	
	e.stopPropagation();
}


var tableSelectEvent = function(e) {
	$(".active").removeClass("active");
		
	$(e.currentTarget).addClass('active');
	
	var selector = ($(e.currentTarget).attr('id')).split("-");
	
	if ($("#" + selector[0] + "-diagram").length > 0) {
		$("path:not(#" + selector[0] + "-diagram)").addClass('active');
	}
	
	drawLabel(selector[0]);
	
	e.stopPropagation();
}


var keyEvent = function (e) {
	
	e.preventDefault();
	
	var target;
	
	if (e.keyCode == 37 || e.keyCode == 38) {
		if ($('tr.active').length > 0) {
			
			if ($('tr.active').prev('tr').length > 0) {
			
				target = $('tr.active').prev('tr');
				
				$(".active").removeClass("active");
		
				$(target).addClass('active');
				
				$(target).focus();
	
				var selector = $(target).attr('id').split("-");
	
				if ($("#" + selector[0] + "-diagram").length > 0) {
					$("path:not(#" + selector[0] + "-diagram)").addClass('active');
				}
				
				drawLabel(selector[0]);
			}
		}
	}
	
	if (e.keyCode == 39 || e.keyCode == 40) {
		if ($('tr.active').length > 0) {
			
			if ($('tr.active').next('tr').length > 0) {
			
				target = $('tr.active').next('tr');
				
				$(".active").removeClass("active");
		
				$(target).addClass('active');
	
				var selector = $(target).attr('id').split("-");
	
				if ($("#" + selector[0] + "-diagram").length > 0) {
					$("path:not(#" + selector[0] + "-diagram)").addClass('active');
				}
				
				drawLabel(selector[0]);
			}
		}
	}
	
	e.stopPropagation();
}



var tabSelect = function (e, x) {
	
	$(".active").removeClass("active");

	$("#tab-container").attr('class', "tabbed tabbed-" + x);
		
	if (x == 1) { fillTableFeatures(gene_data); }
	if (x == 2) { fillTableSequence(gene_data); }
		
	e.stopPropagation();	
}
	