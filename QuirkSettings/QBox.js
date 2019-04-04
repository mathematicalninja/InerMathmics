class QBox {
	constructor(top, left, bottom, right, colour, border) {
		this.top = top;
		this.bottom = bottom;
		this.left = left;
		this.right = right;
		if (colour) {
			this.colour = colour;
		} else {
			this.colour = color(255)
		};
		if (border) {
			this.border = border;
		} else {
			this.border = color(255)
		};
	};

	draw() {
		print(this.left, this.top, this.right - this.left, this.bottom - this.top)

		push()
		fill(this.colour);
		stroke(this.border)
		rect(this.left, this.top, this.right - this.left, this.bottom - this.top)
		pop()
	};

	getCoords() {
		return [this.left, this.top, this.right, this.bottom]
	};

	getCenter() {
		return [(this.right + this.left) / 2, (this.bottom + this.top) / 2]
	};

	setTransparency(Val) {
		this.colour.setAlpha(Val)
	};
};