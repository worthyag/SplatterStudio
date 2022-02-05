// Global variables that will store the toolbox colour palette and the helper
// functions.
var toolbox = null;
var helpers = null;
// To save the canvas proportions.
var c; 
// Variables for colour and width.
var bgColourPickerLabel, bgColourPicker, colourPicker, bgRefresh, toolWidth, 
toolMenu;

function preload() {

	// Loaded animal images assigned to variables.
	dog = loadImage('assets/stickers/sticker-dog.svg');
	cat = loadImage('assets/stickers/sticker-cat.svg');
	mouse = loadImage('assets/stickers/sticker-mouse.svg');
	hamster = loadImage('assets/stickers/sticker-hamster.svg');
	rabbit = loadImage('assets/stickers/sticker-rabbit.svg');
	fox = loadImage('assets/stickers/sticker-fox.svg');
	bear = loadImage('assets/stickers/sticker-bear.svg');
	panda = loadImage('assets/stickers/sticker-panda.svg');
	koala = loadImage('assets/stickers/sticker-koala.svg');
	tiger = loadImage('assets/stickers/sticker-tiger.svg');
	lion = loadImage('assets/stickers/sticker-lion.svg');
	cow = loadImage('assets/stickers/sticker-cow.svg');
	pig = loadImage('assets/stickers/sticker-pig.svg');
	frog = loadImage('assets/stickers/sticker-frog.svg');

	// Pushing variables assigned to the animal images to the animal array.
	animals.push(
		dog, cat, mouse, hamster, rabbit, fox, bear, panda, koala, tiger, lion,
		cow, pig, frog
	);

	// Loaded emoji images assigned to variables.
	angel = loadImage('assets/stickers/sticker-angel-emoji.svg');
	smile = loadImage('assets/stickers/sticker-smile-emoji.svg');
	blowkiss = loadImage('assets/stickers/sticker-blowkiss-emoji.svg');
	embarrassed = loadImage('assets/stickers/sticker-embarrassed-emoji.svg');
	temp = loadImage('assets/stickers/sticker-temperature-emoji.svg');
	clown = loadImage('assets/stickers/sticker-clown-emoji.svg');
	alien = loadImage('assets/stickers/sticker-alien-emoji.svg');
	robot = loadImage('assets/stickers/sticker-robot-emoji.svg');
	alienMonster = loadImage('assets/stickers/sticker-alien-monster-emoji.svg');
	splatterStudio = loadImage('assets/stickers/sticker-splatter-logo.svg');

	// Pushing variables assigned to the emoji images to the emoji array.
	emojis.push(
		angel, smile, blowkiss, embarrassed, temp, clown, alien, robot,
		alienMonster, splatterStudio
	);

	// Loaded food images assigned to variables.
	salad = loadImage('assets/stickers/sticker-salad.svg');
	pizza = loadImage('assets/stickers/sticker-pizza.svg');
	fries = loadImage('assets/stickers/sticker-fries.svg');
	hamburger = loadImage('assets/stickers/sticker-hamburger.svg');
	hotdog = loadImage('assets/stickers/sticker-hotdog.svg');
	taco = loadImage('assets/stickers/sticker-taco.svg');
	burrito = loadImage('assets/stickers/sticker-burrito.svg');
	sushi = loadImage('assets/stickers/sticker-sushi.svg');
	bentoBox = loadImage('assets/stickers/sticker-bento-box.svg');
	apple = loadImage('assets/stickers/sticker-apple.svg');
	pear = loadImage('assets/stickers/sticker-pear.svg');
	orange = loadImage('assets/stickers/sticker-orange.svg');
	lemon = loadImage('assets/stickers/sticker-lemon.svg');
	avocado = loadImage('assets/stickers/sticker-avocado.svg');
	cheese = loadImage('assets/stickers/sticker-cheese.svg');

	// Pushing variables assigned to the food images to the food array.
	food.push(
		salad, pizza, fries, hamburger, hotdog, taco, burrito, sushi, bentoBox,
		apple, pear, orange, lemon, avocado, cheese
	);


	// Loaded activity images assigned to variables.
	skier = loadImage('assets/stickers/sticker-skier.svg');
	snowboarder = loadImage('assets/stickers/sticker-snowboarder.svg');
	guitar = loadImage('assets/stickers/sticker-guitar.svg');
	microphone = loadImage('assets/stickers/sticker-microphone.svg');
	medal = loadImage('assets/stickers/sticker-medal.svg');
	art = loadImage('assets/stickers/sticker-artist-palette.svg');
	trophy = loadImage('assets/stickers/sticker-trophy.svg');
	tennis = loadImage('assets/stickers/sticker-tennis-ball.svg');
	football = loadImage('assets/stickers/sticker-football.svg');
	basketball = loadImage('assets/stickers/sticker-basketball.svg');
	rugby = loadImage('assets/stickers/sticker-rugby.svg');
	fishing = loadImage('assets/stickers/sticker-fishing.svg');
	boxing = loadImage('assets/stickers/sticker-boxing-glove.svg');
	bowling = loadImage('assets/stickers/sticker-bowling.svg');
	gaming = loadImage('assets/stickers/sticker-game-controller.svg');

	// Pushing variables assigned to the activity images to the activity array.
	activity.push(
		skier, snowboarder, guitar, microphone, medal, art, trophy, tennis,
		football, basketball, rugby, fishing, boxing, bowling, gaming
	);


	// Loaded fonts assigned to variables.
	akronim = loadFont('fonts/Akronim.ttf');
	areYouSerious = loadFont('fonts/AreYouSerious.ttf');
	bungeeShade = loadFont('fonts/BungeeShade.ttf');
	codystar = loadFont('fonts/Codystar.ttf');
	creepster = loadFont('fonts/Creepster.ttf');
	dawningOfANewDay = loadFont('fonts/DawningOfANewDay.ttf');
	fasterOne = loadFont('fonts/FasterOne.ttf');
	frijole = loadFont('fonts/Frijole.ttf');
	homemadeApple = loadFont('fonts/HomemadeApple.ttf');
	libreBarcode = loadFont('fonts/LibreBarcode.ttf');
	meddon = loadFont('fonts/Meddon.ttf');
	megrim = loadFont('fonts/Megrim.ttf');
	monoton = loadFont('fonts/Monoton.ttf');
	monsieurLaDoulaise = loadFont('fonts/MonsieurLaDoulaise.ttf');
	montserrat = loadFont('fonts/Montserrat.ttf');
	nosifer = loadFont('fonts/Nosifer.ttf');
	oi = loadFont('fonts/Oi.ttf');
	pressStart = loadFont('fonts/PressStart.ttf');
	rampart = loadFont('fonts/Rampart.ttf');
	roboto = loadFont('fonts/RobotoBold.ttf');
	robotoMono = loadFont('fonts/RobotoMono.ttf');
	rubikBeastly = loadFont('fonts/RubikBeastly.ttf');
	tourney = loadFont('fonts/Tourney.ttf');
	yomogi = loadFont('fonts/Yomogi.ttf');
	zillaSlabHighlighter = loadFont('fonts/ZillaSlabHighlighter.ttf');

	// Pushing variables assigned to the fonts to the fonts array.
	fonts.push(
		akronim, areYouSerious, bungeeShade, codystar, creepster, dawningOfANewDay,
		fasterOne, frijole, homemadeApple, libreBarcode, meddon, megrim, monoton,
		monsieurLaDoulaise, montserrat, nosifer, oi, pressStart, rampart, roboto,
		robotoMono, rubikBeastly, tourney, yomogi, zillaSlabHighlighter
	);

	// Extra loaded images to use for the spray tool.
	star = loadImage('assets/star.svg');
	logo = loadImage('assets/splatter-studio-logo-hover.svg');

}

function setup() {
	// Creating a canvas to fill the content div from index.html.
	canvasContainer = select('#content');
	c = createCanvas(canvasContainer.size().width, 
	canvasContainer.size().height);
	c.parent("content");

	// Setting the background intially to white.
	background(255);

	// Creating helper functions.
	helpers = new HelperFunctions();

	// Creating a toolbox for storing the tools.
	toolbox = new Toolbox();

	// Adding the tools to the toolbox.
	toolbox.addTool(new EpicPenTool());
	toolbox.addTool(new LineToTool());
	toolbox.addTool(new SprayCanTool());
	toolbox.addTool(new MirrorDrawTool());
	toolbox.addTool(new StickerTool());
	toolbox.addTool(new EditableShapesTool());
	toolbox.addTool(new ScissorTool());
	toolbox.addTool(new TextTool());
	toolbox.addTool(new ImageUploadTool());

	// Switching the mode of angles to degrees, to use when drawing shapes
	// with loops
	angleMode(DEGREES);
	// Another way to add randomness.
  noiseDetail(4);

	// Colour picker tool to change the colour of all tools.
	// Label for tool written in html.
	colourPicker = createColorPicker('#000000');
	colourPicker.parent("#colourPickerArea");

	// Displaying the label for the background (bg) colour picker.
	bgColourPickerLabel = createP("Background Colour: ");
	bgColourPickerLabel.parent("#colourPickerArea").style(
		`display: inline; font-size: 16px; margin-left: 70px;`
	);

	// Bg colour picker tool to change the background colour.
	bgColourPicker = createColorPicker('#ffffff');
	bgColourPicker.parent("#colourPickerArea");

	// Bg update button, to trigger the bg change.
	bgRefresh = createButton("").style(
		`padding: 10px; margin-left: 5px; border: 2px solid #fff;
		background-color: #ff7f50;
		background-image: url('/assets/splatter-studio-icon-plain.svg');
		width: 40px; height: 40px; background-size: 38px 38px;`
	);
	bgRefresh.parent("#colourPickerArea");


	// Windows prompt for bg.
	var bgMessageUserBox = createDiv();
	bgMessageUserBox.parent("#colourPickerArea");
	bgMessageUserBox.style("margin-left: 70px; margin-right: 10px;");

	// Text to let users know how to set the bg.
	var bgMessageUser = createP(
		`Click the orange button to confirm the background colour.`
	).style(`
		font-size: 10px; text-transform: none;`
	);
	bgMessageUser.parent(bgMessageUserBox);

	// Windows confirm to let users decide whether they want to change the bg
	// or not.
	bgRefresh.mouseReleased(function () {
		let bgMessage = window.confirm(
			`By changing the background you will lose all current drawing on the
			Canvas. Would you like to continue?`
		);

		if (bgMessage == true) {
			// Updating the bg colour.
			background(bgColourPicker.value());
			loadPixels();
		}

		else {
			updatePixels();
		}
	});

	// Label for the tool width feature.
	toolMenu = createP('Tool Width: ').parent("#colourPickerArea").style(`
	display: inline; font-size: 16px; margin-left: 70px;`
	);
	// Creating a slider that ranges from 1 and 58. Intially at 4. Increments
	// of 0.
	toolWidth = createSlider(1, 80, 4, 0).parent(toolMenu).class("slider");
}

function draw() {
	// Call the draw function from the selected tool.
	// hasOwnProperty is a javascript function that tests if an object contains a
	// particular method or property.
	
	// If there isn't a draw method the app will alert the user.
	if (toolbox.selectedTool.hasOwnProperty("draw")) {
		toolbox.selectedTool.draw();
	}
	
	else {
		alert("it doesn't look like your tool has a draw method!");
	}

	// Setting the colour of the tools.
	strokeWeight(toolWidth.value());
	stroke(colourPicker.value());
	fill(colourPicker.value());
}