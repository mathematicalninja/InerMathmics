let text_x = 50
class QString {
	constructor(STR, y) {
		this.RegOpen = new RegExp("\\(");
		this.RegClose = new RegExp("\\)");
		this.string = STR;
		this.Chuncks = [];
		this.y = y
		text_x = (windowWidth - textWidth(this.string)) / 2;
		this.QSlow(STR, text_x);
	};

	draw() {
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


	QSlow(string, CurrentLeft) {
		// print(string)
		this.CurrentLeft = CurrentLeft

		let Open = matchAll(string, this.RegOpen);
		let Close = reverse(matchAll(string, this.RegClose));
		if (!(Open[0])) {
			this.OpenCheck(string, text_x)
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

		print(this.CurrentLeft);
		print(string.substring(0, A), text_x)
		this.CurrentLeft = this.OpenCheck(string.substring(0, A), text_x);
		print(this.CurrentLeft);
		this.CurrentLeft = this.CloseCheck(string.substring(A + 1, B), text_x)
		print(this.CurrentLeft);
		this.CurrentLeft = this.QSlow(string.substring(B + 1, string.length))


	};



	CloseCheck(string, x) {
		print("Close")
		let Temp = new QClose(string, x);
		append(this.Chuncks, Temp);
		return x + Temp.getWidth();
	};




	OpenCheck(string, x) {
		print("Open")
		// let FunctionList = ["sin","cos","tan","p","q","f","g","h","log","exp"]
		let OperList = ["\\+", "-", "\\*", "\\/", "="]
		// let Rolling = 0
		for (let op of OperList) {
			let Regs = new RegExp(op);
			let Match = string.match(Regs);
			if (Match) {
				// let Temp = new QOper(Match[0], x + Rolling)
				let Temp = new QOper(Match[0], x);
				append(this.Chuncks, Temp);
			};
		};
		let Temp = new QOpen(string, x)
		append(this.Chuncks, Temp);
		print(x)
		print(x + Temp.getWidth())
		return x + Temp.getWidth();

	};

};



class QOpen {
	constructor(string, x, y) {
		this.string = string;
		this.colour = color(255, 255, 255);
		this.x = x;
		this.y = y;
	};
	draw(x, y) {
		fill(this.colour);
		text(this.string, x, y);
		text_x = text_x + textWidth(this.string);
	};
	getWidth() {
		return textWidth(this.string);
	};
};


class QClose {
	constructor(string, x, y) {
		this.string = string;
		this.x = x;
		this.y = y;
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
	getWidth() {
		return textWidth(this.string);
	};

};