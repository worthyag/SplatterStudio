var selectButton, selectMode, selectedArea, selectedPixels; 
selectMode = 0; 
// An object that contains parameters for the selected area.
selectedArea = {x: 0, y: 0, w: 100, h: 100 };

// A tool where the user can cut parts of the canvas and paste them wherever
// they see fit.
function ScissorTool() {
	// The icon and name for the scissor tool.
  this.icon = "assets/scissorTool.svg";
	this.name = "scissor";

	this.draw = function() {
		// Show the eraser and tool width slider.
		select("#eraseButton").show();
		toolMenu.show();

		noFill();
		stroke(colourPicker.value());
		if (mouseIsPressed) {
			// Occurs when the user is in selectMode 0.
			if(selectMode == 0) {
				// Check if they previousX and Y are -1. set them to the current mouseX
				// and Y if they are.
				if (previousMouseX == -1) {
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				}

				// If we already have values for previousX and Y we can draw a
				// line from there to the current mouse location.
				else {
					stroke(colourPicker.value());
					noFill();
					line(previousMouseX, previousMouseY, mouseX, mouseY);
					previousMouseX = mouseX;
					previousMouseY = mouseY;
				} 
			}

			// Occurs when the user is in selectMode 1.
			else if (selectMode == 1) {
				updatePixels();

				noStroke();
				fill(0, 250, 154, 100);
				rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
			}
		}

		else {
			// If the user has released the mouse we want to set the previousMouse
			// values back to -1.
			previousMouseX = -1;
			previousMouseY = -1;
		}
	};

	mousePressed = () => {
		// Occurs when the user is in selectMode 1.
		if (selectMode == 1) {
			selectedArea.x = mouseX; 
			selectedArea.y = mouseY; 
		}

		// Occurs when the user is in selectMode 2.
		else if (selectMode == 2) {
			// Pasting the image when the user presses the mouse.
			// Pasting at the position of mouseX and mouseY.
			image(selectedPixels, mouseX - (selectedArea.w/2), mouseY - (selectedArea.h/2));
		}
	};

	mouseDragged = () => {
		// Occurs when the user is in selectMode 1.
		if (selectMode == 1) {
			var w = mouseX - selectedArea.x;
			var h = mouseY - selectedArea.y;

			// Setting the selectedArea dimensions to the newly calculated ones.
			selectedArea.w = w;
			selectedArea.h = h;
		}   
	};

  // When the tool is deselected update the pixels to just show the drawing and
	// hide the options.
	this.unselectTool = function() {
		updatePixels();
		selectButton.hide();
	};

	// When the tool is selected populate the options.
	this.populateOptions = function() {
		selectButton = createButton('Select Area').style('display', 'none').id(
		'selectBtn');
		selectButton.parent("#scissorToolBtn");
		selectButton.show();

		selectButton.mousePressed(function() {
			// Occurs when the user is in selectMode 0.
			if (selectMode == 0) {
				// Add 1 to change the modes, then chnage the text on the button.
				selectMode += 1; 
				selectButton.html("cut");

				// Store current frame.
				loadPixels();
			}

			// Occurs when the user is in selectMode 1.
			else if (selectMode == 1) {
				// Add 1 to change the modes, then chnage the text on the button.
				selectMode += 1;
				selectButton.html("End Paste");

				// Refresh the screen and hides rectangle.
				updatePixels();

				// Stores the pixels.
				selectedPixels = get(
					selectedArea.x, selectedArea.y,selectedArea.w, selectedArea.h
				);

				// Draw a rectangle over it.
				fill(bgColourPicker.value());
				noStroke();
				rect(selectedArea.x, selectedArea.y, selectedArea.w, selectedArea.h);
			}

			// Occurs when the user is in selectMode 2.
			else if (selectMode == 2) {
				// Sets the user back to selectMode to restart or move on from the
				// process.
				selectMode = 0;
				loadPixels();
				selectedArea = {x: 0, y: 0, w: 100, h: 100};
				selectButton.html("Select Area"); 
			}
		});
	};
}