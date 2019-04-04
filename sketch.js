function preload() {
	QuirkPreload();


}

function setup() {
	QuirkSettup();
	textSize(36)
}

function draw() {
	// BackgroungColour = color(255, 0, 0)
	QuirkDraw();
	noLoop();

	let Flip = new QBox(150, 150, 1350, 1350, color(128, 128, 255), color(0, 0, 255));
	Flip.setTransparency(128);
	Flip.draw();
	print(Flip.getCenter())


	Twiddle = new QString("y=(3x+4)+(2x-3)-6*(x+1)/(x+2)", windowHeight / 2);
	Twiddle.draw()
}