class QNum {
	constructor(INT) {
		this.text = INT.toString();
	};

	draw(x, y) {
		fill(255, 255, 255);
		text(this.text, x, y)
	};
	getWidth() {
		return textWidth(this.string);
	};
};