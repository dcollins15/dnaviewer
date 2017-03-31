——————————————————————————————————————————
Run Instruction
——————————————————————————————————————————

this mini-app can be run using a python simple http server
cd into this file using command prompt or terminal
run following command:

python -m SimpleHTTPServer

the app should be available at localhost:8000 (or whichever host specified in python call)

——————————————————————————————————————————
Design Motivations (visuals)
——————————————————————————————————————————
When designing any visualization I always try to keep in mind the principles laid out in Edward Tufte’s ‘The Visual Display of Quantitative Information’. Trying to maximize the density of information displayed in the visual while minimizing the use of ‘ink’ is what resulted in my design. The length of each arc making up the circle is proportionate to the sizes of each of the features which are displayed sequentially. Thus size, start, and end are all represented. Unfortunately I was unable to implement a design that incorporated feature type or direction information however these would be my first additions if I were to expand the app. 


——————————————————————————————————————————
Directions for Expansion
——————————————————————————————————————————
Addition of gene direction indicator 
	Implemented by updating getSequence of gene class to include direction info
	That info included in html object attributes accessed when .activated
	Added to display as arrow on plasmid or below label

Addition of icons in center of plasmid circle (type info)
	SBOL visuals displayed at center
	Implemented by updating getSequence of gene class to include type info
	Didn’t have full breadth of possible gene.type values so couldn’t really 		properly implement
	Use type info to select appropriate svg path file to add to display 

Sorting features
	Implemented by addition of similar methods to gene.prototype.sortOrder() in 	classes and then a call to redraw the appropriate table

Searching of tables
	Implemented via query filter and hide methods

Filling in additional information based on what is available
	i.e mol mass of genes based on their sequences
	mark the values as inferred

Editing nucleotide sequence
	Only briefly considered
	Could be very compelling given a good inferred value completion 			functionality (one which could reference a database of known features or 		other dna pieces
	Well out of the scope of this project
	