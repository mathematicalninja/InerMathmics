class QOper {
	constructor(OPERAND, x) {
		this.string = OPERAND
		this.x = x
	};

	draw(x, y) {
		fill(255)
		text(this.string, this.x, 100)
	};
	getWidth() {
		return textWidth(this.string);
	};
};