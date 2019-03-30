class QNum {
	constructor(INT) {
		this.x = windowWidth / 2;
		this.y = windowHeight / 2;
		this.text = INT.toString();
	};

	draw() {
		fill(255, 255, 255);
		text(this.text, this.x, this.y)
	};
};