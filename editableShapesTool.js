var editButton, finishShape, finishButton;
var editMode = false;
var currentShape = [];

// A tool that allows the user to draw shapes to the canvas then alter their
// vertices if they choose to do so.
function EditableShapesTool() {
	// The icon and name for the editableShapes tool.
  this.icon = "assets/editableShape.svg";
	this.name = "editableShapes";

	this.draw = function() {
		// Hide the eraser and show the tool width slider.
		select("#eraseButton").hide();
		toolMenu.show();
		
		updatePixels();

		noFill();
		// Occurs when the mouse is pressed and it is on the canvas.
		if (mousePressOnCanvas(c) && mouseIsPressed) {
			// Only happens when the user isn't in edit mode.
			if (!editMode) {
				currentShape.push({
					x: mouseX,
					y: mouseY
				});
			}

			// Runs when the above is not satisfied
			else {
				for (var i in currentShape) {
					if (dist(currentShape[i].x, currentShape[i].y, mouseX, mouseY) < 15){
						currentShape[i].x = mouseX;
						currentShape[i].y = mouseY;
					}
				}
			}
		}

		beginShape();
			for (var i in currentShape) {
				vertex(currentShape[i].x, currentShape[i].y);
				// Only happens when the user is in edit mode.
				if (editMode) {
					fill('#7fbadd');
					ellipse(currentShape[i].x, currentShape[i].y, 8);
					noFill(); 
				} 
			}
		endShape(); 
	};

  // When the tool is deselected update the pixels to just show the drawing and
	// hide the options.
	this.unselectTool = function() {
		updatePixels();
		editButton.hide();
		finishButton.hide();
	};

	// When the tool is selected populate the options.
	this.populateOptions = function() {
		loadPixels();

		// User can use the buttons below to switch between modes
		editButton = createButton('Edit Shape').style('display', 'none').id(
		'editBtn');
		editButton.parent("#editableShapesBtn");
		editButton.show();

		finishButton = createButton('Finish Shape').style('display', 'none').id(
		'finishBtn');
		finishButton.parent("#editableShapesBtn");
		finishButton.show();

		// When the edit button is pressed this occurs.
		editButton.mousePressed(function() {
			// When the edit mode is on, the button displays the text below and
			// switches modes.
			if (editMode) {
				editMode = false;
				editButton.html("Edit Shape");
			}

			// When the edit mode is on, the button displays the text below and
			// switches modes.
			else {
				editMode = true;
				editButton.html("Add Vertices")
			}
		});

		// When the finish button is pressed this occurs.
		finishButton.mousePressed(function() {
			editMode = false;
			draw(); 
			loadPixels(); 
			currentShape = [];
		});
	};
}