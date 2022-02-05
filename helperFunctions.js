function HelperFunctions() {
	// Jquery click events. Notice that there is no this. at the start we don't
	// need to do that here because the event will be added to the button and
	// doesn't 'belong' to the object.

	// Initialises the eraseEnable to false.
	let eraserEnable = false;

	// An event handler that controls the actions of the eraser button.
	select("#eraseButton").mouseClicked(function() {
		// Occurs when the conditon is satisfied.
		if (eraserEnable) {
			// Doesn't allow anything on the canvas to be erased.
			noErase();
			select(".transparent").style("background-color: rgba(255, 255, 255, 0);");
			eraserEnable = false;
		}

		else {
			// Allows what is on the canvas to be erased
			erase();
			// When the eraser is active the button will change colour to indicate
			// that.
			select(".transparent").style("background-color: #f05879;");
			eraserEnable = true;
		}
	});

	// Event handler for the clear button event. Clears the screen.
	select("#clearButton").mouseClicked(function() {
		background(bgColourPicker.value());
		loadPixels();
	});

	// The function below allows for detection of position of the users mouse.
	mousePressOnCanvas = function(canvas) {
		if (mouseX > (canvas.elt.offsetLeft) && mouseX < ((canvas.elt.offsetLeft 
		+ canvas.width)-5) && mouseY > (canvas.elt.offsetTop+2)
		&& mouseY < ((canvas.elt.offsetTop + canvas.height))-50) {
			// If the above is true. True is returned and the user can draw on canvas.
			return true;
		}
		return false;
  };

	// Event handler for the save image button. saves the canvas to the local
	// file system.
	select("#saveImageButton").mouseClicked(function() {
		// To allow user input for file name.
		let fileName = window.prompt('What would you like to name your image?', 'myPicture');

		// If there is no user input or the input field is empty, image will not
		// be saved.
		if (fileName == "" || fileName == null) {
			window.alert("File not saved.");
		}

		// If there is user input and file is not empty, image will be saved.
		else {
			if (window.confirm("Save file as '" + fileName + "'") == true) {
				// To allow users to choose a file type.
				let fileType = window.prompt('Type in jpg or png', 'jpg')

				// If they type jpg then the file will be saved as a jpg file.
				if (fileType == "jpg" || fileType == ".jpg" || fileType == "jpeg") {
					saveCanvas(fileName, "jpg");
				}

				// If they type png then the file will be saved as a png file.
				else if (fileType == "png" || fileType == ".png") {
					saveCanvas(fileName, "png");
				}
			}

			// If the clicks cancel after typing a file name, the process will be
			// cancelled.
			else {
				window.alert("Process cancelled.");
			}
		}
	});

	// A function that returns an image, that is to be used by the sticker tool.
	// It is responsible for changing the menu based of the selected type, then
	// returning an image based off the users selection within that particular
	// menu type.
	selectedType = function() {
		// Only occurs when the animal menu is selected.
		if ((typeSelect.value() === typeSelectGroupNames[0])) {
			// Shows the animal menu and hides all other menus.
			stickerAnimal.show().style("display: inline;");
			stickerEmoji.hide();
			stickerFood.hide();
			stickerActivity.hide();
			
			// Using a for loop that checks that for as many iterations as the
			// animals array length, if the value selected by the user within the
			// animal menu is equal to that of the animalNames array. The variable
			// corresponding to that index, returns the image that it is assigned.
			for (var i  in animals) {
				if (stickerAnimal.value() === typeSelectGroup[0][i]) {
					return animals[i];
				}
			}
    }

		// Only occurs when the emoji menu is selected.
		if (typeSelect.value() === typeSelectGroupNames[1]) {
			// Shows the emoji menu and hides all other menus.
			stickerEmoji.show().style("display: inline;");
			stickerAnimal.hide();
			stickerFood.hide();
			stickerActivity.hide();
			
			// Using a for loop that checks that for as many iterations as the emojis
			// array length, if the value selected by the user within the emoji menu 
			// is equal to that of the emojiNames array. The variable corresponding
			// to that index, returns the image that it is assigned.
			for (var i in emojis) {
				if (stickerEmoji.value() === typeSelectGroup[1][i]) {
					return emojis[i];
				}
			}
		}

		// Only occurs when the food menu is selected.
		if (typeSelect.value() === typeSelectGroupNames[2]) {
			// Shows the food menu and hides all other menus.
			stickerFood.show().style("display: inline;");
			stickerAnimal.hide();
			stickerEmoji.hide();
			stickerActivity.hide();
			
			// Using a for loop that checks that for as many iterations as the food
			// array length, if the value selected by the user within the food menu 
			// is equal to that of the foodNames array. The variable corresponding
			// to that index, returns the image that it is assigned.
			for (var i in food) {
				if (stickerFood.value() === typeSelectGroup[2][i]) {
					return food[i];
				}
			}
		}

		// Only occurs when the activity menu is selected.
		if (typeSelect.value() === typeSelectGroupNames[3]) {
			// Shows the activity menu and hides all other menus.
			stickerActivity.show().style("display: inline;");
			stickerAnimal.hide();
			stickerEmoji.hide();
			stickerFood.hide();
			
			// Using a for loop that checks that for as many iterations as the 
			// activity array length, if the value selected by the user within the
			// activity menu is equal to that of the activityNames array. The 
			// variable corresponding to that index, returns the image that it is
			// assigned.
			for (var i in activity) {
				if (stickerActivity.value() === typeSelectGroup[3][i]) {
					return activity[i];
				}
			}
		}
	}

	// A function that returns a font, that is to be used by the text tool. It
	// returns a font based off the users selection.
	fontSelection = function() {
		// Using a for loop that checks that for as many iterations as the fonts
		// array length, if the value selected by the user within the fontType
		// menu is equal to that of the fontTypes array. The variable corresponding
		// to that index, returns the font that it is assigned.
		for (var i in fonts) {
			if (fontTypeMenu.value() === fontTypes[i]) {
				return fonts[i];
			}
		}
	}

	// A function that takes a file and if the file is an image, it assigns the
	// createImg() (including its file data) to imgInput.
	pictureUpload = function (file) {
		if (file.type == 'image') {
			imgInput = createImg(file.data, "");
			// To stop the image from being uploaded below the canvas.
			imgInput.hide();
		}

		// Doesn't occur when the file type is not an image.
		else {
			imgInput = null;
		}
	}
}