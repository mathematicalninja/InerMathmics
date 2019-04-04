class QFunc {
	constructor(FunName, Core, Qbox) {
		this.name = FunName;
		this.inside = Core;
		if (Qbox) {
			this.box = Qbox;
		} else {
			this.box = new QBox(10, 10, 50, 50);
		}
	};

	draw() {
		push();

		this.box.draw();
		fill(255);
		text(this.name + "(" + this.inside + ")", this.box.left, this.box.top - textDescent() + 1);

		pop();
	};
	getWidth() {
		return textWidth(this.string);
	};
};