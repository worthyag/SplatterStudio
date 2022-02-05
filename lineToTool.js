var lineOptions, lineMenu;
// An array of the names of the different line types to avoid writing it all
// manually for the select element.
var lineTypes = [
	"line", "double", "cross", "tapered", "zigzag"
];

// A tool for drawing different lines to the screen. The user can pick from a 
// selection of different lines. It allows the user to preview the ine to
// the current mouse position before drawing the line to the pixel array.
function LineToTool() {
	// The icon and name for the lineTo tool.
	this.icon = "assets/lineTo.svg";
	this.name = "LineTo";

	var startMouseX = -1;
	var startMouseY = -1;
	var drawing = false;

	// Draws the line to the screen.
	this.draw = function() {
		select("#eraseButton").show();
		toolMenu.show();

		// Only draw when mouse is clicked.
		if(mouseIsPressed){

			// If it is the start of drawing a new line.
			if(startMouseX == -1){
				startMouseX = mouseX;
				startMouseY = mouseY;
				drawing = true;

				// Saves the current pixel array.
				loadPixels();
			}

			else {
				// Updates the screen with the saved pixels to hide any previous line
				// between mouse pressed and released.
				updatePixels();

				// Draws a regular line when this mode is selected.
				(lineMenu.value() === lineTypes[0]) ? line(startMouseX, startMouseY, 
					mouseX, mouseY) : "";

				// Draws a double line when this mode is selected.
				if (lineMenu.value() === lineTypes[1]) {
					line(startMouseX, startMouseY, mouseX, mouseY);
					line(startMouseX + (8*(toolWidth.value()*0.2)), 
					startMouseY + (8*(toolWidth.value()*0.2)), 
					mouseX + (8*(toolWidth.value()*0.2)), 
					mouseY + (8*(toolWidth.value()*0.2)));
				}

				// Draws a crossed line when this mode is selected.
				if (lineMenu.value() === lineTypes[2]) {
					line(startMouseX, startMouseY, mouseX, mouseY);
					line(startMouseX, mouseY + (5*(toolWidth.value()*0.2)),
					mouseX, startMouseY + (5*(toolWidth.value()*0.2)));
				}

				// Draws a tapered line when this mode is selected.
				(lineMenu.value() === lineTypes[3]) ? triangle(startMouseX, 
					startMouseY, mouseX, mouseY, mouseX+10, mouseY+10) : "";

				// Draws a zigzag when this mode is selected.
				if (lineMenu.value() === lineTypes[4]) {
					updatePixels();
					line(mouseX, mouseY, pmouseX+(10*(toolWidth.value())), 
					pmouseY+(10*(toolWidth.value())));
					loadPixels();
				}	
			}

		}

		else if (drawing) {
			// Saves the pixels with the most recent line and reset the drawing bool
			// and start locations.
			loadPixels();
			drawing = false;
			startMouseX = -1;
			startMouseY = -1;
		}
	};

	// When the tool is deselected update the pixels to just show the drawing and
	// clear the options.
	this.unselectTool = function() {
		updatePixels();
		select("#lineToOptions").html("");
	};

	// When the tool is selected populate the options.
	this.populateOptions = function () {
		lineOptions = createDiv();
		select("#lineToOptions").child(lineOptions);

		createP("Line type: ").parent(lineOptions).style(`display: inline;
		font-size: 16px;`);

		lineMenu = createSelect(false).parent(lineOptions).class("select");
		// Using a for loop to populate the select element with the items in the
		// lineTypes array
			for (var i in lineTypes) {
				lineMenu.option(lineTypes[i]);
			}
    };
}
