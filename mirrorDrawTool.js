var mirrorOptions, mirrorMenu;
// An array of the names of patterns, to avoid writing it all manually for the
// select element.
var mirrorTypes = [
	"no pattern", "circles", "polygons"
];

// A tool where the user can select from a variety of patterns or choose to
// draw freely, and have what ever they are drawing mirrored in either the
// horizontal or vertical plane.
function MirrorDrawTool() {
	// The icon and name for the mirrorDraw tool.
	this.name = "mirrorDraw";
	this.icon = "assets/mirrorDraw.svg";

	// Which axis is being mirrored (x or y) x is default.
	this.axis = "x";

	// Line of symmetry is halfway across the screen.
	this.lineOfSymmetry = width / 2;

	// This changes in the jquery click handler. So storing it as variable self
	// now means we can still access it in the handler.
	var self = this;

	// Where was the mouse on the last time draw was called set it to -1 to begin
	// with.
	var previousMouseX = -1;
	var previousMouseY = -1;

	// Mouse coordinates for the other side of the Line of symmetry.
	var previousOppositeMouseX = -1;
	var previousOppositeMouseY = -1;

	this.draw = function() {
		// Show the eraser and tool width slider.
		select("#eraseButton").show();
		toolMenu.show();

		// Display the last save state of pixels.
		updatePixels();

		// Do the drawing if the mouse is pressed.
		if (mouseIsPressed) {
			// If the previous values are -1 set them to the current mouse location
			// and mirrored positions.
			if (previousMouseX == -1) {
				previousMouseX = mouseX;
				previousMouseY = mouseY;
				previousOppositeMouseX = this.calculateOpposite(mouseX, "x");
				previousOppositeMouseY = this.calculateOpposite(mouseY, "y");
			}

			// If there are values in the previous locations
			// draw a line between them and the current positions.
			else {
				// Using toolWidth value for the below shapes, so that the shape
				// sizes are responsive to the user

				// A line is drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[0]) {
					line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}

				// A pattern of circles are drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[1]) {
					// Using random to set the fill (user has control over stroke shade).
					fill(round(random(0, 255)), round(random(0, 255)), 
					round(random(0, 255)));
					strokeWeight(toolWidth.value()/4);

					circle(previousOppositeMouseX, previousOppositeMouseY, 
					toolWidth.value());

					// Using random to position shapes to offer variety.
					circle(previousOppositeMouseX + random(-5,30), previousOppositeMouseY
					+ random(5,30), toolWidth.value()*4);

					circle(previousOppositeMouseX + random(-10,10), 
					previousOppositeMouseY, toolWidth.value()*2);

					circle(previousOppositeMouseX, previousOppositeMouseY + random(30,40)
					,toolWidth.value()*1.5);

					previousOppositeMouseX = mouseX;
					previousOppositeMouseY = mouseY;
				}

				// A pattern of various shapes drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[2]) {
					triSize = toolWidth.value()/8;
					// Using random to set the fill (user has control over stroke shade).
					fill(round(random(0, 255)), round(random(0, 255)), 
					round(random(0, 255)));
					strokeWeight(toolWidth.value()/4);

					// Using random to position shapes to offer variety.
					rect(previousOppositeMouseX + random(-10, 30), previousOppositeMouseY
					+ random(-20, 50), toolWidth.value()*5, toolWidth.value()*2);

					triangle(previousOppositeMouseX + random(-10, 30), 
					previousOppositeMouseY + random(-10, 30), 
					previousOppositeMouseX+triSize*15,
					previousOppositeMouseY-triSize*10, previousOppositeMouseX+triSize*20,
					previousOppositeMouseY);

					circle(previousOppositeMouseX + random(1,10), previousOppositeMouseY, 
					toolWidth.value()*2);

					triangle(previousOppositeMouseX, previousOppositeMouseY,
					previousOppositeMouseX+triSize*5,previousOppositeMouseY-triSize*10,
					previousOppositeMouseX+triSize*10, previousOppositeMouseY);

					previousOppositeMouseX = mouseX;
					previousOppositeMouseY = mouseY;
				}

				// These are for the mirrored drawing the other side of the line of
				// symmetry.
				var oX = this.calculateOpposite(mouseX, "x");
				var oY = this.calculateOpposite(mouseY, "y");

				// Using toolWidth value for the below shapes, so that the shape
				// sizes are responsive to the user

				// A line is drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[0]) {
					line(previousOppositeMouseX, previousOppositeMouseY, oX, oY);
					previousOppositeMouseX = oX;
					previousOppositeMouseY = oY;
				}

				// A pattern of circles are drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[1]) {
					// Using random to set the fill (user has control over stroke shade).
					fill(round(random(0, 255)), round(random(0, 255)), 
					round(random(0, 255)));
					strokeWeight(toolWidth.value()/4);

					circle(previousOppositeMouseX, previousOppositeMouseY, 
					toolWidth.value());

					// Using random to position shapes to offer variety.
					circle(previousOppositeMouseX + random(-5,30), previousOppositeMouseY
					+ random(5,30), toolWidth.value()*4);

					circle(previousOppositeMouseX + random(-10,10), 
					previousOppositeMouseY, toolWidth.value()*2);

					circle(previousOppositeMouseX, previousOppositeMouseY + random(30,40)
					,toolWidth.value()*1.5);

					previousOppositeMouseX = oX;
					previousOppositeMouseY = oY;
				}

				// A pattern of various shapes drawn when the user selects this mode.
				if (mirrorMenu.value() === mirrorTypes[2]) {
					// Using random to set the fill (user has control over stroke shade).
					fill(round(random(0, 255)), round(random(0, 255)), 
					round(random(0, 255)));
					strokeWeight(toolWidth.value()/4);
					
					// Using random to position shapes to offer variety.
					rect(previousOppositeMouseX + random(-10, 30), previousOppositeMouseY
					+ random(-20, 50), toolWidth.value()*5, toolWidth.value()*2);

					triangle(previousOppositeMouseX + random(-10, 30), 
					previousOppositeMouseY + random(-10, 30), 
					previousOppositeMouseX+triSize*15,
					previousOppositeMouseY-triSize*10, previousOppositeMouseX+triSize*20, 
					previousOppositeMouseY);

					circle(previousOppositeMouseX + random(1,10), previousOppositeMouseY, 
					toolWidth.value()*2);

					triangle(previousOppositeMouseX, previousOppositeMouseY,
					previousOppositeMouseX+triSize*5, previousOppositeMouseY-triSize*10,
					previousOppositeMouseX+triSize*10, previousOppositeMouseY);

					previousOppositeMouseX = oX;
					previousOppositeMouseY = oY;
				}
			}
		}

		// If the mouse isn't pressed reset the previous values to -1.
		else {
			previousMouseX = -1;
			previousMouseY = -1;

			previousOppositeMouseX = -1;
			previousOppositeMouseY = -1;
		}

		// After the drawing is done save the pixel state. We don't want the line
		// of symmetry to be part of our drawing.
		loadPixels();

		// Push the drawing state so that we can set the stroke weight and colour.
		push();

		strokeWeight(3);
		stroke("red");
		
		// Draw the line of symmetry.
		this.axis == "x" ? line(width / 2, 0, width / 2, height) : 
		line(0, height / 2, width, height / 2);
		
		// Return to the original stroke.
		pop();
	};

	/* 
	 *Calculate an opposite coordinate the other side of the symmetry line.
	 *@param n number: location for either x or y coordinate.
	 *@param a [x,y]: the axis of the coordinate (y or y).
	 *@return number: the opposite coordinate.
	 */
	this.calculateOpposite = function(n, a) {
		// If the axis isn't the one being mirrored return the same value.
		if (a != this.axis) { return n; }

		// If n is less than the line of symmetry return a coorindate that is far
		// greater than the line of symmetry by the distance from n to that line.
		if (n < this.lineOfSymmetry) {
			return this.lineOfSymmetry + (this.lineOfSymmetry - n);
		}

		// Otherwise a coordinate that is smaller than the line of symmetry by the
		// distance between it and n.
		else {
			return this.lineOfSymmetry - (n - this.lineOfSymmetry);
		}
	};


	// When the tool is deselected update the pixels to just show the drawing and
	// hide the line of symmetry. Also clear options.
	this.unselectTool = function() {
		updatePixels();
		select(".options").html("");
		select("#mirrorOptions").html("");
	};

	// Adds a button and click handler to the options area. When clicked toggle
	// the line of symmetry between horizontal to vertical.
	this.populateOptions = function() {
		select(".options").html(
			"<button id='directionButton'>Make Horizontal</button>"
		);

		// Click handler. Toggles between horizonatal and vertical.
		select("#directionButton").mouseClicked(function() {
			var button = select("#" + this.elt.id);

			if (self.axis == "x") {
				self.axis = "y";
				self.lineOfSymmetry = height / 2;
				button.html('Make Vertical');
			}

			else {
				self.axis = "x";
				self.lineOfSymmetry = width / 2;
				button.html('Make Horizontal');
			}
		});

		// Creating a div to contain all options for the mirror tool.
		mirrorOptions = createDiv();
		select("#mirrorOptions").child(mirrorOptions);

		createP("Patterns: ").parent(mirrorOptions).style(`display: inline;
		font-size: 16px;`);

		mirrorMenu = createSelect(false).parent(mirrorOptions).class("select");
		// Using a for loop to populate the select element with the items in the
		// mirrorTypes array
			for (var i in mirrorTypes) {
				mirrorMenu.option(mirrorTypes[i]);
			}
	};
}