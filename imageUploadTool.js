var editImage, fileOptions, sizeOfImage, filterArea, bwArea, bwSlider,
bwSwitch, posterizeArea, posterizeSlider, posterizeSwitch, filterSelectArea,
userFileInputArea;
let userFileInput, imgInput;

// A tool that allows the user to upload pictures to the app, and resize and/or
// add filters to them.
function ImageUploadTool() {
	// The icon and name for the imageUpload tool.
  this.icon = "assets/imageUploadTool.svg";
	this.name = "Image";

	this.draw = function() {
		// Hide the eraser and tool width slider.
		select("#eraseButton").hide();
		toolMenu.hide();

		updatePixels();

		// A function that returns the image that the user uploads.
		let uploadedImage = () => {
			// Sets the the image proportions to make them adjustable by the user and
			// resizes the picture, to make them more likely to fit on the canvas.
			var pictureWidth = (imgInput.width/200) * sizeOfImage.value();
			var pictureHeight = (imgInput.height/200) * sizeOfImage.value();

			// Sets the position of the image, so that when the user clicks, the
			// mouse position is in the center of the image.
			var pictureX = mouseX - (pictureWidth/2);
			var pictureY = mouseY - (pictureHeight/2);

			// Returns the image to be displayed on the canvas.
			return image(imgInput, pictureX, pictureY, pictureWidth, pictureHeight);
		}

		if (mouseIsPressed) {
			// Occurs when imgInput is true.
			if (imgInput) {
				// Calls the function that returns the image uploaded by the user.
				uploadedImage();

				// Black and white filter.
				if (bwSwitch.value() === "on") {
					// The user can adjust the filter using the slider.
					let bw = bwSlider.value()*0.1;
					filter(THRESHOLD, bw);
				}

				// Posterize filter.
				if (posterizeSwitch.value() === "on") {
					// The user can adjust the filter using the slider.
					let posterize = posterizeSlider.value()*1;
					filter(POSTERIZE, posterize);
				}

				// Adjusting filters with keys.
				// The filters below can be used simultaneously with the filters above.
				  (key === "1") ? filter(GRAY) // Gray filter mode.
				: (key === "2") ? filter(BLUR, 8) // Blur filter mode.
				: (key === "3") ? filter(ERODE) // Erode filter mode.
				: (key === "4") ? filter(DILATE) // Dilate filter mode.
				: (key === "c") ? "" // Clear filter.
				: "";
			}
		}
		loadPixels();
	};

  // When the tool is deselected update the pixels to just show the drawing and
	// hide the options.
	this.unselectTool = function() {
		updatePixels();
		userFileInputArea.hide();
		fileOptions.hide();
		editImage.hide();
		filterArea.hide();
		bwArea.hide();
		posterizeArea.hide();
		filterSelectArea.hide(); 
	};

	// When the tool is selected populate the options.
	this.populateOptions = function () {
			userFileInputArea = select("#imageUploadToolOptions").style(`
				display: none; font-size: 16px;`
			);
			userFileInputArea.show();

			// Creating a div to contain the createFileInput element and label.
			fileOptions = createDiv().parent(userFileInputArea);
			createP("File:").parent(fileOptions);
			userFileInput = createFileInput(pictureUpload, "true").parent(fileOptions);
			fileOptions.show();

			// Creating a div to contain the slider that adjusts the image.
			editImage = createDiv().parent(userFileInputArea).style("display: none");
			createP("Image Size:").parent(editImage).style(`
				display: inline; font-size: 16px;`
			);
			// Creating a slider that ranges from 1 and 200. Intially at 10.
			sizeOfImage = createSlider(1, 200, 10).parent(editImage).style(`
			display: inline;`).class("slider");
			editImage.show();

			filterArea = select("#imgFilters");
			filterArea.show();

			// Black and white.
			// Creating a div to contain the slider to adjust the bw filter and
			// toggle between on and off.
			bwArea = createDiv().parent(filterArea).style("display: none;");
			createP("B/W: ").parent(bwArea).style(
				"display: inline; font-size: 16px;"
			);
			// Creating a slider that ranges from 1 and 9. Intially at 0.
			bwSlider = createSlider(1, 9, 0).parent(bwArea).class("slider");
			bwArea.show();

			// Allows user to switch feature on and off.
			bwSwitch = createSelect(false).parent(bwArea).class("select");
				bwSwitch.option('off');
				bwSwitch.option('on');

			// Posterize.
			// Creating a div to contain the slider to adjust the posterize filter
			// and toggle between on and off.
			posterizeArea = createDiv().parent(filterArea).style("display: none;");
			createP("Posterize: ").parent(posterizeArea).style(`display: inline;
			font-size: 16px;`);
			
			// Creating a slider that ranges from 2 and 20. Intially at 4.
			posterizeSlider = createSlider(2, 20, 4).parent(posterizeArea).class(
			"slider");
			posterizeArea.show();

			// Allows user to switch feature on and off.
			posterizeSwitch = createSelect(false).parent(posterizeArea).class(
			"select");
				posterizeSwitch.option('off');
				posterizeSwitch.option('on');

			// Toggle filters.
			// Creating a div to contain the message that tells the users what keys
			// to press to switch between filters.
			filterSelectArea = createDiv().parent(filterArea);
			createP(`Press the keys '1' to '4' to switch between some more filters.
			Press 'c' to clear between filters. `).parent(filterSelectArea).style(
			`display: inline; font-size: 12px; text-transform: none;`);
				
			filterSelectArea.show();
	};
}