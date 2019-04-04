class QNum {
	constructor(INT, Qbox) {
		this.string = INT.toString();
		if (Qbox) {
			this.box = Qbox;
		} else {
			this.box = new QBox(10, 10, 50, 50)
		}
	};

	draw() {
		push();

		fill(255, 255, 255);
		this.box.draw()
		text(this.string, this.box.left, this.box.top - textDescent() + 1)

		// text(this.text, x, y)

		pop();
	};
	getWidth() {
		return textWidth(this.string);
	};
};