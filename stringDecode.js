let text_x = 50
class QString {
	constructor(STR, y) {
		this.RegOpen = new RegExp("\\(");
		this.RegClose = new RegExp("\\)");
		this.string = STR;
		this.Chuncks = [];
		this.y = y;
		this.Currentleft = (windowWidth - textWidth(this.string)) / 2;

		this.RegExMake()

		this.QNew(STR);

	};

	draw() {
		push();

		for (let Qchunk of this.Chuncks) {
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



	QNew(string) {

		let Left = this.stringSplice(string)[0];
		let Middle = this.stringSplice(string)[1];
		let Right = this.stringSplice(string)[2];

		this.CurrentFunction = false;
		this.Unbraketed(Left);
		if (Middle != "") {
			this.Braketed(Middle);
			this.QNew(Right)
		}


		return this.CurrnetLeft
	};

	stringSplice(string) {

		let Open = matchAll(string, this.RegOpen);
		let Close = matchAll(string, this.RegClose);
		if (!(Open[0])) {
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





	Braketed(string, Name) {
		if (!this.CurrentFunction) {
			Name = ""
		} else {
			Name = this.CurrentFunction
		}

		let top = this.y;
		let left = this.Currentleft;
		let bottom = this.y - theSizeOfText;
		let right = this.Currentleft + textWidth(Name + "(" + string + ")");
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;


		let Temp = new QFunc(Name, string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.Chuncks, Temp);

		this.Currentleft += textWidth(Name + "(" + string + ")")
	};

	Unbraketed(string) {

		this.UnbRegCheck(string)

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


					// add in a clause to match "log" as "log" not "g"
				};
			};
		};

		for (let reg of this.operReg) {
			if (match(string, reg)) {
				let CurrentMatchList = matchAll(string, reg);
				for (let currentMatch of CurrentMatchList) {
					currentMatch.type = "Operation";
					append(matchList, currentMatch);
				};
			};
		};


		for (let reg of this.varReg) {
			if (match(string, reg)) {
				let CurrentMatchList = matchAll(string, reg);
				for (let currentMatch of CurrentMatchList) {
					currentMatch.type = "Variable";
					append(matchList, currentMatch);



					// add in a clause to prevent double matching the
					// "s" in "sin" as a variable and a function
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


		if (matchList[0] == undefined) {} else {
			matchList.sort(this.compare);

			for (let Match of matchList) {

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
		let top = this.y;
		let left = this.Currentleft;
		let bottom = this.y - theSizeOfText;
		let right = this.Currentleft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;

		let Temp = new QNum(string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.Chuncks, Temp);

		this.Currentleft += textWidth(string)
	};

	makeFunction(Match) {
		let string = Match[1]
		let top = this.y;
		let left = this.Currentleft;
		let bottom = this.y - theSizeOfText;
		let right = this.Currentleft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;
		this.CurrentFunction = string
	};

	makeOperation(Match) {
		let string = Match[1]
		let top = this.y;
		let left = this.Currentleft;
		let bottom = this.y - theSizeOfText;
		let right = this.Currentleft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;


		let Temp = new QOper(string, new QBox(top, left, bottom, right, colour, border, show));

		append(this.Chuncks, Temp);
		this.Currentleft += textWidth(string)
	};

	makeVariable(Match) {
		let string = Match[1]
		let top = this.y;
		let left = this.Currentleft;
		let bottom = this.y - theSizeOfText;
		let right = this.Currentleft + textWidth(string);
		let colour = color(255, 0, 255, 10);
		let border = color(0, 255, 255);
		let show = true;

		let Temp = new QVar(string, new QBox(top, left, bottom, right, colour, border, show));
		append(this.Chuncks, Temp);
		this.Currentleft += textWidth(string)
	};


	RegExMake() {

		this.operReg = [];
		let FunctionList = ["sin", "cos", "tan", "(?:!ex)p", "q", "f", "(?:!o)g", "h", "log", "exp"];
		let OperList = ["\\+", "-", "\\*", "\\/", "="];
		let VarList = ["(?:!t)a", "b", "c(?:!os)", "d", "(?:![ai])n", "(?:!co)s(?:!in)", "u", "v", "w", "(?:!e)x", "y", "z", "θ", "α", "β", "γ", "δ", "ε", "φ", "ω", ]
		for (let op of OperList) {
			let Regs = new RegExp("(?:\\s*)(" + op + ")");
			append(this.operReg, Regs);
		};
		this.funcReg = [];
		for (let func of FunctionList) {
			let Regs = new RegExp("(?:\\s*)(" + func + ")(?:\\s*)$");
			append(this.funcReg, Regs);
		};
		this.varReg = [];
		for (let Var of VarList) {
			let Regs = new RegExp("(?:\\s*)(" +
				Var + ")");
			append(this.varReg, Regs);
		};
	};

};