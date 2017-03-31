//class definitions for convenience

//class for representing total gene data read in from JSON
var gene = function (name, species, nuclease, size, sequence) {
	
	this.name = name;
	this.species = species;
	this.nuclease = nuclease;
	
	this.size = size;
	this.sequence = sequence;
	
	this.features = [];
};

//sorts the features of the gene based on their order in the gene
gene.prototype.sortOrder = function () {
	
	this.features.sort(function(a, b) {return a.start - b.start });
}

//returns an array of which each element contains the nucleotide sequence of a feature or the sequence between two features
//effectively merges the gene.sequence attribute with feature.sequence attributes of its features
//also includes some auxillary data used for drawing displays
gene.prototype.getSequence = function () {
	
	this.sortOrder();
	
	var sequence = [];
	
	var i;
	var j;
	
	var chunk = "";
	var start = 0;
	
	//outer loop iterates through the gene's features
	//inner loop iterates on genes sequence up to start next feature
	for (i = 0; i < this.features.length; i++) {
		for (j = start; j < this.features[i].start; j++) {
			//chunk string collects the sequence
			chunk = chunk + this.sequence.charAt(j);
		}
		
		//if the chunk collected an unlabbelled sequence then its contents are appended to return list
		if (chunk.length > 0) { sequence.push({sequence:chunk, name:"no_name" + i, start:start, end:j}); }
		
		//then the next 
		sequence.push(this.features[i]);
		
		chunk = "";
		start = this.features[i].end + 1.0;
	}
	
	//final loop picks up unlabbelled sequence at end of gene
	for (j = start; j < this.size; j++) {
			chunk = chunk + this.sequence.charAt(j);
	}
	
	if (chunk.length > 0) { sequence.push({sequence:chunk, name:"no_name" + i, start:start, end:j}); }
	
	return sequence;
};


//class for representing feature data read in from given JSON
var feature = function(name, type, direction, start, end, size, sequence) {
	
	this.name = name;
	this.type = type
	
	this.direction = direction;
	
	this.start = start;
	this.end = end;
	this.size = size;
	
	this.sequence = sequence;
};

//returns textual translation of direction int
feature.prototype.getDirectionString = function() {
		
	return (this.direction == 1)? "Forward":"Backward"
};