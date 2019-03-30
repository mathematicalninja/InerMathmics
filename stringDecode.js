let text_x
class QString {
	constructor(STR, y) {
		this.RegOpen = new RegExp("\\(");
		this.RegClose = new RegExp("\\)");
		this.string = STR;
		this.Chuncks = [];
		this.y = y
		this.QSlow(STR);
	};

	draw() {
		text_x = (windowWidth - textWidth(this.string)) / 2;
		for (let chunck of this.Chuncks) {
			chunck.draw(text_x, this.y)
		};


	};

	compare(a, b) {
		if (a.index < b.index) {
			return -1;
		};
		if (a.index > b.index) {
			return 1;
		};
		return 0;
	};


	QSlow(string) {
		// print(string)

		let Open = matchAll(string, this.RegOpen);
		let Close = reverse(matchAll(string, this.RegClose));
		if (!(Open[0])) {
			append(this.Chuncks, new QOpen(string))
			return
		}
		let List = [];
		for (let i of Open) {
			append(List, i)
		};
		for (let i of Close) {
			append(List, i)
		};
		List.sort(this.compare);
		for (let i = 0; i < List.length; i++) {
			if (List[i] == "\(") {
				if (List[i + 1] == "\(") {

				} else if (List[i + 1] == "\)") {
					this.i = i + 1
					break
				};
			};
		};

		let check = new RegExp("\\)\{" + this.i + "\}")
		let BrakStr = ""
		for (let i = 0; i < List.length; i++) {
			BrakStr = BrakStr + List[i]
		}
		let NewList = subset(List, 0, BrakStr.search(check) + this.i);
		let A = NewList[0].index;
		let B = NewList[NewList.length - 1].index
		append(this.Chuncks, new QOpen(string.substring(0, A)));
		this.Left = string.substring(0, A)
		append(this.Chuncks, new QClose(string.substring(A + 1, B)));
		this.Close = new QClose(string.substring(A + 1, B))
		this.QSlow(string.substring(B + 1, string.length))
		this.Right = string.substring(B + 1, string.length)
	};

};

class QOpen {
	constructor(string) {
		this.string = string;
		this.colour = color(255, 255, 255);
	};
	draw(x, y) {
		fill(this.colour);
		text(this.string, x, y);
		text_x = text_x + textWidth(this.string);
	};
};


class QClose {
	constructor(string) {
		this.string = string;
		this.colour = color(128, 0, 128);
		this.brakCol = color(0, 128, 128);
	};
	draw(x, y) {
		fill(this.brakCol);
		text("(", x, y);
		fill(this.colour);
		text(this.string, x + textWidth("("), y);
		fill(this.brakCol);
		text(")", x + textWidth("(" + this.string), y);
		text_x = text_x + textWidth("(" + this.string + ")");
	};

};