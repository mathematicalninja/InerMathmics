let Outside;
let BackgroungColour;

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
};

function QuirkPreload() {
	Outside = selectAll("body");
	BackgroungColour = color(0, 0, 0);
	Outside[0].style('background-color', BackgroungColour);
}

function QuirkSettup() {
	createCanvas(windowWidth, windowHeight)
}

function QuirkDraw() {
	background(BackgroungColour);
	Outside[0].style('background-color', BackgroungColour);
}