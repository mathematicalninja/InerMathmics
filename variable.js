class QVar {
	constructor(STR, Qbox) {
		this.string = STR;
		if (Qbox) {
			this.box = Qbox;
		} else {
			this.box = new QBox(10, 10, 50, 50);
		}
	};

	draw() {
		push();

		this.box.draw();
		fill(255, 255, 255);
		text(this.string, this.box.left, this.box.top - textDescent() + 1);

		pop();
	};
	getWidth() {
		return textWidth(this.string);
	};
};