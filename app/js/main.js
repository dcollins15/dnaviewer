//GLOBALS
//global variable to hold read in data
var gene_data;

//globals for svg canvas and use in d3 functions
var svg;
var width;
var height;

$(document).ready(function() {
console.log( "ready Freddy" );

	//instantiate the svg global variables once DOM is populated
	svg = d3.select("#svg");
	width = parseInt(svg.style("width"));
	svg.style("height", width * 0.6);
	height = parseInt(svg.style("height"));

	
	//reads in the given JSON doc and parses its content into gene and feature classes defined in classes.js
	$.getJSON("fixtures/dnamolecule.json", function(data) {
		
		gene_data = new gene(data.name, data.properties.species, data.properties.nuclease, data.length, data.sequence.bases);
		
		for (var i = 0; i < data.dnafeatures.length; i++) {
			gene_data.features.push(new feature(data.dnafeatures[i].dnafeature.name, data.dnafeatures[i].dnafeature.category.name, data.dnafeatures[i].strand, data.dnafeatures[i].start, data.dnafeatures[i].end, data.dnafeatures[i].dnafeature.length, data.dnafeatures[i].dnafeature.pattern.bases));
		}
		
		//populates the content of the displays when data is available
		//all method declarations in methods.js
		fillTableFeatures(gene_data);
		drawDiagram(gene_data);
		
	}).fail( function(d, textStatus, error) { console.error("getJSON failed, status: " + textStatus + ", error: "+error)});

	
	//Event Listeners/Handlers//

	$("#features-tab").on('click', function(e) { tabSelect(e, 1)});

	$('body').on('click', '#features-tab', null, function (e) { tabSelect(e, 1) });

	$("#sequence-tab").on('click', function(e) { tabSelect(e, 2)});

	$('body').on('click', '#sequence-tab', null, function (e) { tabSelect(e, 2)});


	$('tr').on('click', null, function(e) { tableSelectEvent(e); });

	$('body').on('click', 'tr', null, function(e) { tableSelectEvent(e); });


	$('body').on('click', 'path', null, function(e) { diagramSelectEvent(e); });

	$('path').on('click', null, function(e) { diagramSelectEvent(e); });


	$('body').on('dblclick', null, function (e) { $('.active').removeClass('active'); e.stopPropagation(); });


	$('body').on('keydown', null, function(e) { keyEvent(e); });
});