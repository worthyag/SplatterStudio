var textMenuArea, sizeOfTextArea, sizeOfText, userTextInputArea, userTextInput,
fontTypeArea, fontTypeMenu, fontMsgArea, fontMsg;

// An empty array to push all the loaded fonts to.
var fonts = [];
// An array of the names of the fonts for the text tool. To avoid manually
// adding them, making it easier to add and remove.
var fontTypes = [
	"Akronim", "AreYouSerious", "BungeeShade", "Codystar", "Creepster",
	"DawningOfANewDay", "FasterOne", "Frijole", "HomemadeApple", "LibreBarcode",
	"Meddon", "Megrim", "Monoton", "MonsieurLaDoulaise", "Montserrat", "Nosifer",
	"Oi", "PressStart", "Rampart", "Roboto", "RobotoMono", "RubikBeastly",
	"Tourney", "Yomogi", "ZillaSlabHighlighter"
];

// A text tool that allows users to add text to the canvas, while also
// providing a range of fonts to choose from. The user can adjust both the font
// size and the font width, while also changing the colour.
function TextTool() {
	// The icon and name for the text tool.
  this.icon = "assets/textTool.svg";
	this.name = "text";

	this.draw = function() {
		// Show the eraser and tool width slider.
		select("#eraseButton").show();
		toolMenu.show();

		updatePixels();

		// Occurs when the mouse is pressed.
		if (mousePressOnCanvas(c) && mouseIsPressed) {
			// Calling the font returned from the fontSelection function.
			textFont(fontSelection());
			// Allows the user to adjust size of the text with a slider.
			textSize(sizeOfText.value());
			// Allows the user to input the text that they would like.
			text(userTextInput.value(), mouseX, mouseY);
		}
		loadPixels();
	};

  // When the tool is deselected update the pixels to just show the drawing and
	// hide the options.
	this.unselectTool = function() {
		updatePixels();
		textMenuArea.hide();
		sizeOfTextArea.hide();
		userTextInputArea.hide();
		fontTypeArea.hide();
		fontMsg.hide();
	};

	// When the tool is selected populate the options.
	this.populateOptions = function() {
		textMenuArea = select("#textToolOptions");
		textMenuArea.show();

		// Creating a div to display the font size slider.
		sizeOfTextArea = createDiv().parent(textMenuArea);
			createP("Font Size:").parent(sizeOfTextArea).style(
				"display: inline; font-size: 16px;"
			);
			// Creating a slider that ranges from 1 and 200. Intially at 40.
			sizeOfText = createSlider(1, 200, 40).parent(sizeOfTextArea).style(`
			display: inline;`).class("slider");

		sizeOfTextArea.show();

		// Creating a div to display the input text box.
		userTextInputArea = createDiv().parent(textMenuArea);
			createP("Input text: ").parent(userTextInputArea).style(`
			display: inline; font-size: 16px;`);
			userTextInput = createInput().parent(userTextInputArea).class(
			"inputText");

		userTextInputArea.show();

		// Creating a div to display the font family selection.
		fontTypeArea = createDiv().parent(textMenuArea);
			createP("Font Family: ").parent(fontTypeArea).style(
				"display: inline; font-size: 16px;"
			);
			fontTypeMenu = createSelect(false).parent(fontTypeArea).class("select");
			// Using a for loop to populate the select element with the items in the
			// fontTypes array
				for (var i in fontTypes) {
					fontTypeMenu.option(fontTypes[i]);
				}

		fontTypeArea.show(); 
		
		// Creating a div to display the sidenote for the user.
		fontMsg = createDiv();
			select("#textNote").child(fontMsg);
			createP("Note: you may want to adjust the tool width.").style(
				`font-size: 12px; display: inline;
				text-transform: none; padding-top: 20px; padding-left: 10px;`
			).parent(fontMsg);

		fontMsg.show();
  };
}