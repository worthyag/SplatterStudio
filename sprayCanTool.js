var sprayOptions, sprayMenu, pointsSliderMenu, pointsSlider, spreadSliderMenu,
spreadSlider, star, logo;
// An array of the names of the shapes of the sprayCan, to avoid writing it all
// manually for the select element.
var sprayTypes = [
	"dots", "lines", "squares", "stars", "icon", "logo", "lion"
];

// A tool that allows the users to change the shape of the particles they are
// spraying, while also enabling them to adjust points and the spread value.
function SprayCanTool() {
	// The icon and name for the sprayCan tool.
	this.name = "sprayCanTool";
	this.icon = "assets/sprayCan.svg";

	this.draw = function() {
		// Hides the eraser and shows the tool width slider.
		select("#eraseButton").hide();
		toolMenu.show();

		// Sets the value of the points to the value of the pointsSlider.
		var points = pointsSlider.value();
		// Sets the value of the spread to the value of the spreadSlider.
		var spread = spreadSlider.value();
		
		// Only happens when the mouse is pressed.
		if (mouseIsPressed) {
			updatePixels();

			// The points of the spray will be in the shape of dots.
			if (sprayMenu.value() === sprayTypes[0]) {
				for (var i = 0; i < points; i++) {
					point(random(mouseX-spread, mouseX + spread),
					random(mouseY-spread, mouseY+spread));
				}
			}

			// The points of the spray will be in the shape of lines.
			if (sprayMenu.value() === sprayTypes[1]) {
				for (var i = 0; i < points; i++) {
					line(random(mouseX-spread, mouseX + spread),
					random(mouseY-spread, mouseY+spread),
					random(pmouseX-spread, pmouseX + spread), 
					random(pmouseY-spread, pmouseY+spread));
				}
			}

			// The points of the spray will be in the shape of squares.
			if (sprayMenu.value() === sprayTypes[2]) {
				for (var i = 0; i < points; i++) {
					rect(random(mouseX-spread, mouseX + spread), 
					random(mouseY-spread, mouseY+spread),
					toolWidth.value(), toolWidth.value()*0.2);
				}
			}

			// The points of the spray will be in the shape of stars.
			if (sprayMenu.value() === sprayTypes[3]) {
				for (var i = 0; i < points; i++) {
					// Calling the logo image.
					image(star, random(mouseX-spread*5, mouseX + spread*10),
					random(mouseY-spread*2, mouseY+spread*5), 
					toolWidth.value(), toolWidth.value());
				}
			}

			// The points of the spray will be the app icon.
			if (sprayMenu.value() === sprayTypes[4]) {
				for (var i = 0; i < points; i++) {
					// Calling the icon image.
					image(splatterStudio, random(mouseX-spread*5, mouseX + spread*10),
					random(mouseY-spread*2, mouseY+spread*5), 
					toolWidth.value(), toolWidth.value());
				}
			}

			// The points of the spray will be the app logo.
			if (sprayMenu.value() === sprayTypes[5]) {
				for (var i = 0; i < points/2; i++) {
					// Calling the logo image.
					image(logo, random(mouseX-spread*15, mouseX + spread*20),
					random(mouseY-spread*12, mouseY+spread*15), 
					toolWidth.value(), toolWidth.value());
				}
			}

			// The points of the spray will be lion emojis.
			if (sprayMenu.value() === sprayTypes[6]) {
				for (var i = 0; i < points; i++) {
					// Calling the lion emoji.
					image(lion, random(mouseX-spread*5, mouseX + spread*10),
					random(mouseY-spread*2, mouseY+spread*5), 
					toolWidth.value(), toolWidth.value());
				}
			}
			loadPixels();
		}
	};

	// When the tool is deselected update the pixels to just show the drawing and
	// clear the options.
	this.unselectTool = function() {
		updatePixels();
		select("#sprayCanOptions").html("");
	};

	// When the tool is selected populate the options.
	this.populateOptions = function() {
		// Creating a div to contain select options for the sprayCan tool.
		sprayOptions = createDiv();
		select("#sprayCanOptions").child(sprayOptions);

		createP("Spray shape: ").parent(sprayOptions).style(`display: inline;
		font-size: 16px;`);

		sprayMenu = createSelect(false).parent(sprayOptions).class("select");
		// Using a for loop to populate the select element with the items in the
		// sprayTypes array
			for (var i in sprayTypes) {
				sprayMenu.option(sprayTypes[i]);
			}

		// Creating a div to contain slider that controls the number of points.
		pointsSliderMenu = createDiv();
		select("#sprayCanOptions").child(pointsSliderMenu);

		createP("No. points: ").parent(pointsSliderMenu).style(`display: inline;
		font-size: 16px;`);

		// Creating a slider that ranges from 2 and 50. Intially at 13.
		pointsSlider = createSlider(2, 50, 13).parent(pointsSliderMenu).class(
		"slider");

		// Creating a div to contain slider that controls the number of spread.
		spreadSliderMenu = createDiv();
		select("#sprayCanOptions").child(spreadSliderMenu);

		createP("Spread: ").parent(spreadSliderMenu).style(
			"display: inline; font-size: 16px;"
		);
		
		// Creating a slider that ranges from 2 and 50. Intially at 10.
		spreadSlider = createSlider(2, 50, 10).parent(spreadSliderMenu).class(
		"slider");
  };
}