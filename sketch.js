function preload() {
	QuirkPreload();


}
let theSizeOfText = 36

function setup() {
	QuirkSettup();
	textSize(theSizeOfText)
}

function draw() {
	// BackgroungColour = color(255, 0, 0)
	QuirkDraw();
	noLoop();

	let Flip = new QBox(150, 150, 1350, 1350, color(128, 128, 255), color(0, 0, 255));
	Flip.setTransparency(128);
	// Flip.draw();


	Twiddle = new QString("y=(3y+4) + (2x-3)-6*   +  3*11(x+1)/sin(x+2)", windowHeight / 2);
	// Twiddle = new QString("66-55+32", windowHeight / 2);
	// Twiddle = new QString("(3+(x+4)+2)", windowHeight / 2);
	Twiddle.draw()
}