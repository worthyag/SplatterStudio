var stickerTypeMenu, typeSelect, stickerAnimal, stickerEmoji, stickerFood,
stickerActivity, numberOfMenu, numberOf;

// Empty arrays for sticker tool. To push the loaded images to.
var animals = [];
var emojis = [];
var food = [];
var activity = [];

// An array of the names of the categories of the stickers. To avoid manually
// writing, and to make it easier to add more or remove some.
var typeSelectGroupNames = [
	"animals", "emojis", "food", "activity"
];

// A 2d array of the names of the things within each category for the
// stickers.
var typeSelectGroup = [
	[
		"dog", "cat", "mouse", "hamster", "rabbit", "fox", "bear", "panda",
		"koala", "tiger", "lion", "cow", "pig", "frog"
	],
	[
		"angel", "smile", "blow kiss", "embarrassed", "temperature", "clown",
		"alien", "robot", "alien monster", "Splatter Studio"
	],
	[
		"salad", "pizza", "fries", "hamburger", "hotdog", "taco", "burrito",
		"sushi", "bento box", "apple", "pear", "orange", "lemon", "avocado",
		"cheese"
	],
	[
		"skier", "snowboarder", "guitar", "microphone", "medal", "art", "trophy",
		"tennis", "football", "basketball", "rugby", "fishing", "boxing",
		"bowling", "gaming"
	]
];

// A tool that allows the user to select from a range of different stickers
// sorted into categories. The user can control the number of stickers added at
// a time and change the width of the sticker.
function StickerTool() {
	// The icon and name for the sticker tool.
  this.icon = "assets/stickerTool.svg";
	this.name = "stickerTool";

	this.draw = function() {
		// Hide the eraser and tool width slider.
		select("#eraseButton").hide();
		toolMenu.hide();

		updatePixels();

		// Only occurs when the mouse is pressed and numberOf value is on.
		if (mouseIsPressed && (numberOf.value() === "on")) {
			// A for loop that allows the user to add many stickers at time. The user
			// can control it with the slider on the app.
			for (var i = 0; i <=  (select("#nStickerSlider").value()/10); i++) {
				var stickerSize = select("#stickerSizeSlider").value();
				
				var stickerX = random((mouseX - stickerSize/2)-20,
				(mouseX - stickerSize/2)+20);

				var stickerY = random((mouseY - stickerSize/2)-20,
				(mouseY - stickerSize/2)+20);

				// Calling the image returned from the selectedType function.
				image(selectedType(), stickerX, stickerY, stickerSize, stickerSize);
			}
		}

		// Only occurs when the mouse is pressed and numberOf value is off.
		if (mouseIsPressed && (numberOf.value() === "off")) {
			var stickerSize = select("#stickerSizeSlider").value();
			var stickerX = mouseX - stickerSize/2;
			var stickerY = mouseY - stickerSize/2;
			// Calling the image returned from the selectedType function.
			image(selectedType(), stickerX, stickerY, stickerSize, stickerSize);
		}
		loadPixels();
	};

  // When the tool is deselected update the pixels to just show the drawing and
	// clear the options.
	this.unselectTool = function() {
		select("#stickerType").html("");
		select("#stickerSlider").html("");
		select("#nstickerSlider").html("");
	};

	// When the tool is selected populate the options.
	this.populateOptions = function() {
		stickerTypeMenu = select("#stickerType");
		createP("Type: ").style("display: inline; font-size: 16px;").parent(
		stickerTypeMenu);
		
		typeSelect = createSelect(false).parent(stickerTypeMenu).class("select");
		// Using a for loop to populate the select element with the items in the
		// typeSelectGroup array
			for (var i in typeSelectGroupNames) {
				typeSelect.option(typeSelectGroupNames[i]);
			}
		
		createP("  Sticker: ").style("display: inline; font-size: 16px;").parent(
		stickerTypeMenu);

			stickerAnimal = createSelect(false).parent(stickerTypeMenu).class(
			"select");
			// Using a for loop to populate the select element with the items in the
			// animalNames array
				for (var i in typeSelectGroup[0]) {
					stickerAnimal.option(typeSelectGroup[0][i]);
					stickerAnimal.hide();
				}
			
			stickerEmoji = createSelect(false).parent(stickerTypeMenu).class(
			"select");
			// Using a for loop to populate the select element with the items in the
			// emojiNames array
				for (var i in typeSelectGroup[1]) {
					stickerEmoji.option(typeSelectGroup[1][i]);
					stickerEmoji.hide();
				}

			stickerFood = createSelect(false).parent(stickerTypeMenu).class(
			"select");
			// Using a for loop to populate the select element with the items in the
			// foodNames array
				for (var i in typeSelectGroup[2]) {
					stickerFood.option(typeSelectGroup[2][i]);
					stickerFood.hide();
				}
			
			stickerActivity = createSelect(false).parent(stickerTypeMenu).class(
			"select");
			// Using a for loop to populate the select element with the items in the
			// activityNames array
				for (var i in typeSelectGroup[3]) {
					stickerActivity.option(typeSelectGroup[3][i]);
					stickerActivity.hide();
				}
		// Calling the selectedType function
		selectedType();

		// Creating a slider that ranges from 1 and 100. Intially at 20.
		select("#stickerSlider").html(
				`<p style='display: inline; font-size: 16px;'>Width:</p>
				<input type='range' min='1' max='100' value='20' 
				class='slider' id='stickerSizeSlider'>`
			);

		// Creating a slider that ranges from 1 and 100. Intially at 1.
		select("#nstickerSlider").html(
				`<p style='display: inline; font-size: 16px;'>Number:</p>
				<input type='range' min='1' max='100' value='1' class='slider'
				id='nStickerSlider'>
				<p style='display: inline; font-size: 16px;'>Multiple: </p>`
			);

			// Allows the user to switch the multiple sticker feature on and off.
			numberOfMenu = select("#nstickerSlider");
			numberOf = createSelect(false).parent(numberOfMenu).class("select");
				numberOf.option('on');
				numberOf.option('off');
	};
}


