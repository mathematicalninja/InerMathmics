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
	Twiddle = new QString("y=(3x+4)+(2x-3)-6*(x+1)/(x+2)", windowHeight / 2);
	Twiddle.draw()

}