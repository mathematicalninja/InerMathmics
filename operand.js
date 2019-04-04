class QOper {
	constructor(OPERAND, Qbox) {
		this.string = OPERAND;
		if (Qbox) {
			this.box = Qbox;
			// print(this.box.draw)
			// print(this.box.draw)

		} else {
			this.box = new QBox(10, 10, 50, 50)
		}
		// this.x = x;
	};

	draw() {

		// print(this.box.draw)
		if (this.box.draw == undefined) {
			print(this.string)
		} else {
			this.box.draw()
			// print(this.string)
		}
		push();

		fill(255);
		text(this.string, this.box.left, this.box.top - textDescent() + 1)
		// text(this.string, this.x, 100);

		pop();
	};
	getWidth() {
		return textWidth(this.string);
	};
};