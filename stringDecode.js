let text_x = 50
class QString {
	constructor(STR, y, x) {
		this.RegOpen = new RegExp("\\(");
		this.RegClose = new RegExp("\\)");
		this.string = STR;
		this.Chuncks = [];
		this.QChuncks = [];
		this.y = y;
		if (x) {
			this.CurrentLeft = x
		} else {
			text_x = (windowWidth - textWidth(this.string)) / 2;
			this.CurrentLeft = (windowWidth - textWidth(this.string)) / 2;
		};
		this.TempLeft = this.CurrentLeft

		// this.QSlow(STR, text_x);

		this.RegExMake()

		this.QNew(STR, this.TempLeft);

	};

	draw() {
		push();

		for (let chunck of this.Chuncks) {
			// chunck.draw(text_x, this.y)
		};
		for (let Qchunk of this.QChuncks) {
			Qchunk.draw();
		};

		pop();
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
			return this.OpenCheck(string, text_x)
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

		this.CurrentLeft = this.OpenCheck(string.substring(0, A), this.CurrentLeft);
		this.CurrentLeft = this.CloseCheck(string.substring(A + 1, B), this.CurrentLeft)
		this.CurrentLeft = this.QSlow(string.substring(B + 1, string.length), this.CurrentLeft)
		return this.CurrentLeft
	};

	QNew(string, CurrnetLeft) {
		// print(string)
		this.CurrnetLeft = CurrnetLeft

		let Left = this.stringSplice(string)[0];
		let Middle = this.stringSplice(string)[1];
		let Right = this.stringSplice(string)[2];

		this.CurrentFunction = false;
		this.CurrnetLeft = this.OpenCheck(Left, this.CurrnetLeft);
		this.Unbraketed(Left);
		if (Middle != "") {
			this.CurrnetLeft = this.CloseCheck(Middle, this.CurrnetLeft)
			this.Braketed(Middle);
			this.CurrnetLeft = this.QNew(Right, this.CurrnetLeft)
			this.QNew(Right);
		}


		return this.CurrnetLeft
	};

	stringSplice(string) {

		let Open = matchAll(string, this.RegOpen);
		let Close = matchAll(string, this.RegClose);
		if (!(Open[0])) {
			// return this.Unbraketed(string)
			return [string, "", ""]
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


		return [
			string.substring(0, A),
			string.substring(A + 1, B),
			string.substring(B + 1, string.length)
		]

	};


	CloseCheck(string, x) {
		let Temp = new QClose(string, x);
		append(this.Chuncks, Temp);
		return x + Temp.getWidth();
	};




	OpenCheck(string, x) {
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
		return x + Temp.getWidth();

	};

	Braketed(string, Name) {
		if (!this.CurrentFunction) {
			Name = ""
		} else {
			Name = this.CurrentFunction
		}

		let top = this.y + 100;
		let left = this.TempLeft;
		let bottom = this.y - theSizeOfText + 100;
		let right = this.TempLeft + textWidth(Name + "(" + string + ")");
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;


		let Temp = new QFunc(Name, string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.QChuncks, Temp);

		this.TempLeft += textWidth(Name + "(" + string + ")")
	};

	Unbraketed(string) {


		this.UnbRegCheck(string)


		// this.TempLeft += textWidth(string)
	};

	UnbRegCheck(string) {
		let currentMatch;
		let matchList = []


		for (let reg of this.funcReg) {
			if (match(string, reg)) {
				let CurrentMatchList = matchAll(string, reg);
				for (let currentMatch of CurrentMatchList) {
					currentMatch.type = "Function";
					append(matchList, currentMatch);
				};
			};
		};

		for (let reg of this.operReg) {
			if (match(string, reg)) {
				let CurrentMatchList = matchAll(string, reg);
				for (let currentMatch of CurrentMatchList) {

					// print(currentMatch)
					currentMatch.type = "Operation";
					append(matchList, currentMatch);
					// print(matchList, currentMatch)
				};
			};
		};

		if (match(string, new RegExp("(?:\\s*)(\\d+)"))) {
			let CurrentMatchList = matchAll(string, new RegExp("(?:\\s*)(\\d+)"));
			for (let currentMatch of CurrentMatchList) {
				currentMatch.type = "Digit";
				append(matchList, currentMatch);
			};
		};


		if (matchList[0] == undefined) {
			// print(matchList);
			// print("NOTHING");
		} else {
			matchList.sort(this.compare);

			for (let Match of matchList) {
				// print(Match);
				// print(Match.type);
				// print(Match[1]);

				switch (Match.type) {
					case "Digit":
						this.makeDigit(Match);
						break;
					case "Operation":
						this.makeOperation(Match);
						break;
					case "Function":
						this.makeFunction(Match);
						break;
					case "Variable":
						this.makeVariable(Match);
						break;
				};
			};
		};
	};

	makeDigit(Match) {

		let string = Match[1]
		let top = this.y + 100;
		let left = this.TempLeft;
		let bottom = this.y - theSizeOfText + 100;
		let right = this.TempLeft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;

		let Temp = new QNum(string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.QChuncks, Temp);

		this.TempLeft += textWidth(string)
	};


	makeFunction(Match) {
		let string = Match[1]
		let top = this.y + 100;
		let left = this.TempLeft;
		let bottom = this.y - theSizeOfText + 100;
		let right = this.TempLeft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;
		this.CurrentFunction = string
		// this.TempLeft += textWidth(string)
	};


	makeOperation(Match) {
		let string = Match[1]
		let top = this.y + 100;
		let left = this.TempLeft;
		let bottom = this.y - theSizeOfText + 100;
		let right = this.TempLeft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;


		let Temp = new QOper(string, new QBox(top, left, bottom, right, colour, border, show));

		append(this.QChuncks, Temp);
		this.TempLeft += textWidth(string)
	};


	makeVariable(Match) {
		let string = Match[1]
		let top = this.y + 100;
		let left = this.TempLeft;
		let bottom = this.y - theSizeOfText + 100;
		let right = this.TempLeft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;

		let Temp = new QVar(string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.QChuncks, Temp);
		this.TempLeft += textWidth(string)
	};



	RegExMake() {

		this.operReg = [];
		let FunctionList = ["sin", "cos", "tan", "p", "q", "f", "g", "h", "log", "exp"];
		let OperList = ["\\+", "-", "\\*", "\\/", "="];
		for (let op of OperList) {
			let Regs = new RegExp("(?:\\s*)(" + op + ")");
			append(this.operReg, Regs);
		};
		this.funcReg = [];
		for (let func of FunctionList) {
			let Regs = new RegExp("(?:\\s*)(" + func + ")(?:\\s*)$");
			append(this.funcReg, Regs);
		};
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