var epicPenMenu, penShape;
// An array of the names of the shapes of the pen, to avoid writing it all
// manually for the select element.
var penTypes = [
	"Line", "Circle", "Rectangle", "Triangle", "Star", "Pentagon"
];

// A pen tool that allows the user to change the shape of its tip, and also
// adjust its colour and width.
function EpicPenTool() {
	// The icon and name for the epicPen tool.
	this.icon = "assets/epicpen.svg";
	this.name = "pen";

	this.draw = function() {
		// Show the eraser and tool width slider.
		select("#eraseButton").show();
		toolMenu.show();

		updatePixels();

		// If the mouse is pressed the following will occur.
		if (mouseIsPressed) {
			// The pen will be in the shape of a line.
			if (penShape.value() === penTypes[0]) {
				stroke(colourPicker.value());
				strokeWeight(toolWidth.value());
				line(mouseX, mouseY, pmouseX, pmouseY);	
			}
			
			// To allow the user to adjust the penWidth with the tool width feature.
			let adjust = toolWidth.value();

			// The pen will be in the shape of a circle.
			if (penShape.value() === penTypes[1]) {
				noStroke();
				ellipse(mouseX, mouseY, adjust*1, adjust*1);
			}

			// The pen will be in the shape of a rectangle.
			if (penShape.value() === penTypes[2]) {
				fill(colourPicker.value());
				noStroke();
				rect(mouseX, mouseY, adjust*1, adjust*1);
			}

			// Adjust how the the toolWidth works with the shapes below. In order to
			// make it more proportional and match the shapes above.
			let penAdjust = adjust/8;

			// The pen will be in the shape of a triangle.
			if (penShape.value() === penTypes[3]) {
				fill(colourPicker.value());
				noStroke();
				triangle(mouseX, mouseY, mouseX+penAdjust*5, 
				mouseY-penAdjust*10, mouseX+penAdjust*10, mouseY);
			}

			// The pen will be in the shape of a star.
			if (penShape.value() === penTypes[4]) {
				fill(colourPicker.value());
				noStroke();
				beginShape();
					// The 1st outward and inward vertices of the star.
					vertex(mouseX, mouseY);
					vertex(mouseX+3.5*penAdjust, mouseY);
					// The 2nd outward and inward vertices of the star.
					vertex(mouseX+5*penAdjust, mouseY-4*penAdjust);
					vertex(mouseX+6.5*penAdjust, mouseY);
					// The 3rd outward and inward vertices of the star.
					vertex(mouseX+10*penAdjust, mouseY);
					vertex(mouseX+7*penAdjust, mouseY+2*penAdjust);
					// The 4th outward and inward vertices of the star.
					vertex(mouseX+8.5*penAdjust, mouseY+6*penAdjust);
					vertex(mouseX+5*penAdjust, mouseY+3.5*penAdjust);
					// The 5th outward and inward vertices of the star.
					vertex(mouseX+1.5*penAdjust, mouseY+6*penAdjust);
					vertex(mouseX+3*penAdjust, mouseY+2*penAdjust);
				endShape(CLOSE);
			}

			// The pen will be in the shape of a pentagon.
			if (penShape.value() === penTypes[5]) {
				fill(colourPicker.value());
				noStroke();
				beginShape();
					// The 5 vertices of the pentagon.
					vertex(mouseX, mouseY);
					vertex(mouseX+5*penAdjust, mouseY-5*penAdjust);
					vertex(mouseX+10*penAdjust, mouseY);
					vertex(mouseX+8.5*penAdjust, mouseY+6*penAdjust);
					vertex(mouseX+1.5*penAdjust, mouseY+6*penAdjust);
				endShape(CLOSE);
			}
			
		}
		loadPixels();
	};

	// When the tool is deselected update the pixels to just show the drawing and
	//clear the options.
	this.unselectTool = function() {
		updatePixels();
		select("#epicPenOptions").html("");
	};

	// When the tool is selected populate the options.
	this.populateOptions = function () {
		// Creating a div to contain all options for the epicPen tool.
		epicPenMenu = createDiv();
		select("#epicPenOptions").child(epicPenMenu);

		createP('Pen Shape: ').parent(epicPenMenu).style(`display: inline;
		font-size: 16px;`);

		penShape = createSelect(false).parent(epicPenMenu).class("select");
		// Using a for loop to populate the select element with the items in the
		// penTypes array
			for (var i in penTypes) {
				penShape.option(penTypes[i]);
			}
    };
}