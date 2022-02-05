var ciphers_per_row = 6; ChartMax = 36
var cOption = "English"
var breakCipher, miscContents
var pixelcount = 0; breakArr = []; pArr= []; mArr = []
var opt_Reduce = true; opt_Quotes = true; opt_Summ = true; opt_Breakdown = "Chart"; opt_LetterCount = true
var opt_Chart = true; opt_Shortcuts = true; opt_Headers = true; opt_InTable = false

function Page_Launch() {
	//Header_Load()
	Gem_Launch()
	Populate_MenuBar()
	Build_CharTable(ciphersOn[0])
	breakCipher = ciphersOn[0].Nickname
}

function Populate_MenuBar() {
	var hStr
	var mSpot = document.getElementById("MenuSpot")

	hStr = '<center><div class="MenuLink"><a href="javascript:Open_Ciphers()">Ciphers</a></div>  |  '
	hStr += '<div class="MenuLink"><a href="javascript:Open_Options()">Options</a></div>  |  '
	hStr += '<div class="MenuLink"><a href="javascript:Open_Shortcuts()">Shortcuts</a></div>'
	if (opt_InTable == true) {
		hStr += '  |  ' + '<div class="MenuLink"><a href="javascript:Load_Options(true)">Load My Settings</a></div><BR></center>'
	}
	//hStr += '<div class="MenuLink"><a href="javascript:Open_Help()">Help</a></div><P>'

	hStr += '<BR></center>'
	mSpot.innerHTML = hStr
}

function sVal() {
	var sBox = document.getElementById("SearchField")
	return sBox.value.trim()
}

function navHistory(impNum) {
	var hPlace, tBox
	var newVal = ""; thisTerm = replaceAll(sVal(), "|", "")
	tBox = document.getElementById("SearchField")

	hPlace = sHistory.indexOf(thisTerm)
	switch (impNum) {
		case 13:
			newHistory(true)
			break;
		case 38:
			if (hPlace > 0) {
				newVal = sHistory[hPlace - 1]
			}
			if (newVal !== "") {tBox.value = newVal; Populate_Sums(newVal); Populate_Breakdown()}
			break;
		case 40:
			if (hPlace > -1) {
				if (sHistory.length > (hPlace + 1)) {newVal = sHistory[hPlace + 1]}
			} else {
				if (sHistory.length > 0) {newVal = sHistory[0]}
			}
			if (newVal !== "") {tBox.value = newVal; Populate_Sums(newVal); Populate_Breakdown()}
			break;
	}
}
function newHistory(impOpt = false) {
	var hSpot, isNew
	var x, ys
	var impVal = replaceAll(sVal(), "|", "")

	isNew = false

	if (impVal !== "") {

		if (Number(impVal) > 0) {

		} else {
			hSpot = sHistory.indexOf(impVal);

			if (hSpot > -1) {
				sHistory.splice(hSpot, 1)
			} else {
				isNew = true
			}
			
			if (sHistory.length > 100) {
				sHistory.pop()
			}

			sHistory.unshift(impVal)
		}
	}
	
	if (impOpt == true || miscContents !== "match") {Open_History()}
	if (isNew == true) {AddTerm(); UpdateUserHistory()};
}
function AddTerm() {
	var xhttp = new XMLHttpRequest();
	var x, z, lastSpace
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
      	;
    	}
    };

    qStr = ""; lastSpace = true; sv = sVal()

    for (x = 0; x < sv.length; x++) {
    	z = sv.charCodeAt(x)
    	if (z > 64 && z < 123) {
    		qStr += String.fromCharCode(z)
    		lastSpace = false
    	} else if (z == 32) {
    		if (lastSpace == false) {qStr += "_"}
    		lastSpace = true
    	}
    }

    xhttp.open("POST", "http://www.gematrinator.com/nextgen/addtodatabase.php?phrase=" + qStr, true);
    xhttp.send();
}
function Open_History() {
	var ms, x, y, aCipher, gemSum
	tArea = document.getElementById("MiscSpot")

	if (sHistory.length == 0) {return}

	ms = '<table class="HistoryTable">'

	for (x = 0; x < sHistory.length; x++) {

		if (x % 25 == 0) {
			ms += '<tr><td class="MPhrase"><font style="color: orange;">Word or Phrase</font></td>'
			for (z = 0; z < ciphersOn.length; z++) {
				ms += '<td class="HistoryHead" style="color: RGB(' + ciphersOn[z].RGB.join() +')">'
				ms += ciphersOn[z].Nickname
				ms += "</td>"
			}
			ms += "</tr>"
		}

		ms += '<tr><td class="historyPhrase">' + sHistory[x] + '</td>'

		for (y = 0; y < ciphersOn.length; y++) {

			aCipher = ciphersOn[y]
			gemSum = '<font style="font-size: 115%"><B>' + aCipher.Gematria(sHistory[x], 2, false, true) + '</B></font>'

			ms += '<td><font style="color: RGB(' + aCipher.RGB.join() + '")>' + gemSum + '</font></td>'
		}
		ms += '</tr>'
	}

	ms += '</table>'
	tArea.innerHTML = ms
	miscContents = "history"
}

function getSum(total, num) {
    return total + num;
}

function uniCharCode(impChar) {
    var char = impChar.charCodeAt(0)
    return char
}

function uniKeyCode(event) {
    var key = event.keyCode;
    document.getElementById("ResultSpot2").innerHTML = "Unicode KEY code: " + key;
}

function Populate_Breakdown(impName = breakCipher, impBool = false) {
	var x, aCipher, cSpot
	var wCount = 0; pixelCount = 0; zSpot = 0; z = 0
	var rStr, qMark, acw, acl

	if (opt_Quotes == true) {qMark = '"'} else {qMark = ""}

	if (impBool == true) {breakCipher = impName; Populate_Sums(sVal())}
	if (breakCipher == "" && impName == "") {
		document.getElementById("BreakdownSpot").innerHTML = ""
		document.getElementById("ChartSpot").innerHTML = ""
		return;
	}

	for (x = 0; x < ciphersOn.length; x++) {
		if (ciphersOn[x].Nickname == impName) {
			cSpot = x
			Build_CharTable(ciphersOn[x])
			break;
		}
	}
	aCipher = ciphersOn[cSpot]
	aCipher.Breakdown(sVal())

	if (aCipher.sumArr.length > 0) {
		BuildBreaks(aCipher)
		
		if (aCipher.LetterCount > 1) {acl = " letters, "} else {acl = " letter, "}
		if (aCipher.WordCount > 1) {acw = " words"} else {acw = " word"}

		if (opt_LetterCount == true) {
			rStr = '<div class="LetterCounts">(' + aCipher.LetterCount + acl + aCipher.WordCount + acw + ')</div>'
		} else {
			rStr = ''
		}
		if (opt_Summ == true && opt_Breakdown !== "Classic") {
			rStr += '<div id="SimpleBreak">'
			rStr += '<div class="breakPhrase">' + qMark + sVal() + qMark +' = </div><div class="breakSum">' + aCipher.sumArr.reduce(getSum) + '</div>'
			rStr += ' <div class="breakCipher"><font style="color: RGB(' + aCipher.RGB.join() + ')">(' + aCipher.Nickname + ')</font></div><div id="SimpleBreak"></div>'
		}

		if (opt_Breakdown == "Chart") {

			rStr += '<table class="BreakTable"><tr>'
			for (x = 0; x < aCipher.cp.length; x++) {

				if (aCipher.cp[x] !== " ") {
					if (String(aCipher.cp[x]).substring(0, 3) == "num") {
						rStr += '<td class="BreakChar">' + aCipher.cp[x].substring(3, aCipher.cp[x].length) + '</td>'
					} else {
						rStr += '<td class="BreakChar">' + String.fromCharCode(aCipher.cp[x]) + '</td>'
					}
				} else {
					rStr += '<td class="BreakWordSum" rowspan="2"><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.sumArr[wCount] + '</font></td>'

					if (breakArr.indexOf(wCount) > -1) {
						rStr += '</tr><tr>'
						for (z; z < x; z++) {
							if (aCipher.cv[z] !== " ") {
								rStr += '<td class="BreakVal">' + aCipher.cv[z] + '</td>'
							}
						}
						rStr += '</tr></table><BR><table class="BreakTable"><tr>'
					}
					wCount++
				}
			}
			rStr += '<td class="BreakPhraseSum" rowspan="2"><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.sumArr.reduce(getSum) + '</font></td>'
			rStr += '</tr><tr>'
			for (z; z < x; z++) {
				if (aCipher.cv[z] !== " ") {
					rStr += '<td class="BreakVal">' + aCipher.cv[z] + '</td>'
				}
			}
			rStr += '</tr></table>'

		} else if (opt_Breakdown == "Classic") {
			var isFirst = true

			rStr += '<div class="breakPhrase">"' + sVal() + '"</div> <div class="ClassicEq">= '
			for (x = 0; x < aCipher.cv.length; x++) {
				if (aCipher.cv[x] == " " && x + 1 !== aCipher.cv.length) {
					rStr += " + "
					isFirst = true
				} else if (x + 1 !== aCipher.cv.length || aCipher.cv[x] !== " ") {
					if (isFirst == false) {
						rStr += "+"
					}
					rStr += aCipher.cv[x]
					isFirst = false
				}
			}
			rStr += ' = </div> <div class="breakSum">' + aCipher.sumArr.reduce(getSum) + '</div> <div class="breakCipher"><font style="color: RGB(' + aCipher.RGB.join() + ')">(' + aCipher.Nickname + ')</font></div>'

		}
	} else {
		rStr = ""
	}

	document.getElementById("BreakdownSpot").innerHTML = rStr
}

function BuildBreaks(impCipher) {
	var x,  lastWord, lastCount
	var newLine = true; words = 0; y = ""; pixelOff = false
	breakArr = []
	
	for (x = 0; x < impCipher.cv.length; x++) {

		if (impCipher.cv[x] !== " ") {
			if (y == "") {y = x}
			if (impCipher.cv[x] > 99) {
				pixelCount += 1.5
			} else {
				pixelCount++
			}

			if (pixelCount > ChartMax && newLine == false) {
				breakArr.push(words - 1)
				pixelCount = 0
				x = y - 1
				newLine = true
			}

		} else {
			pixelCount += 2
			lastCount = pixelCount
			words++
			y = ""
			newLine = false
		}

	}
}

function FieldChange(impVal, skipCase = false) {
	if (opt_Shortcuts == true) {
		switch (impVal.substring(0,2).toLowerCase()) {
			case "s;":
				if (skipCase == false) {
					ToggleCipher(impVal)
				}
				break;
			case "m;":
				if (impVal == "m;u") {
					Slide_Cipher("up")
				} else if (impVal == "m;d") {
					Slide_Cipher("down")
				}
				break;
			default:
				break;
		}
	}

	Populate_Sums(sVal())
	Populate_Breakdown(breakCipher)
}

function ToggleCipher(impVal) {
	var cName, x

	switch (impVal.toLowerCase()) {
		case "s;efr":
			cName = "Full Reduction";
			break;
		case "s;efk":
			cName = "Full Reduction KV";
			break;
		case "s;esr":
			cName = "Single Reduction";
			break;
		case "s;esk":
			cName = "Single Reduction KV";
			break;
		case "s;eo":
			cName = "English Ordinal";
			break;
		case "s;ee":
			cName = "English Extended";
			break;
		case "s;eba":
			cName = "Francis Bacon";
			break;
		case "s;ebc":
			cName = "Franc Baconis";
			break;
		case "s;sat":
			cName = "Satanic";
			break;
		case "s;rfr":
			cName = "Reverse Full Reduction";
			break;
		case "s;rfe":
			cName = "Reverse Full Reduction EP";
			break;
		case "s;rsr":
			cName = "Reverse Single Reduction";
			break;
		case "s;rse":
			cName = "Reverse Single Reduction EP";
			break;
		case "s;ro":
			cName = "Reverse Ordinal";
			break;
		case "s;re":
			cName = "Reverse Extended";
			break;
		case "s;rba":
			cName = "Reverse Francis Bacon";
			break;
		case "s;rbc":
			cName = "Reverse Franc Baconis";
			break;
		case "s;rsat":
			cName = "Reverse Satanic";
			break;
		case "s;je":
			cName = "Jewish";
			break;
		case "s;jr":
			cName = "Jewish Reduction";
			break;
		case "s;jo":
			cName = "Jewish Ordinal";
			break;
		case "s;alw":
			cName = "ALW Kabbalah";
			break;
		case "s;kfw":
			cName = "KFW Kabbalah";
			break;
		case "s;lch":
			cName = "LCH Kabbalah";
			break;
		case "s;esu":
			cName = "English Sumerian";
			break;
		case "s;rsu":
			cName = "Reverse English Sumerian";
			break;
		case "s;pr":
			cName = "Primes";
			break;
		case "s;rpr":
			cName = "Reverse Primes";
			break;
		case "s;tr":
			cName = "Trigonal";
			break;
		case "s;rtr":
			cName = "Reverse Trigonal";
			break;
		case "s;sq":
			cName = "Squares";
			break;
		case "s;rsq":
			cName = "Reverse Squares";
			break;
		case "s;sep":
			cName = "Septenary";
			break;
		case "s;cha":
			cName = "Chaldean";
			break;
		case "s;all":
			Add_AllCiphers();
			RestoreField();
			cName = "Done";
			break;
		case "s;base":
			Add_BaseCiphers();
			RestoreField();
			cName = "Done";
			break;
		default:
			cName = "None";
	}
	if (cName !== "None" && cName !== "Done") {
		if (isCipherOn(cName) > -1) {
			Remove_Cipher(cName)
		} else {
			Add_Cipher(cName)
		}
		RestoreField()
	} else if (cName !== "Done") {
		FieldChange(impVal, true)
	}

}

function RestoreField() {
	if (sHistory.length > 0) {
		document.getElementById("SearchField").value = sHistory[0]
		document.getElementById("SearchField").focus()
		document.getElementById("SearchField").select()
	} else {
		document.getElementById("SearchField").value = ""
	}
}

function cipherHead_mouseOver(impName) {
	var x, aCipher
	for (x = 0; x < ciphersOn.length; x++) {
		if (ciphersOn[x].Nickname == impName) {
			aCipher = ciphersOn[x]
			Populate_Breakdown(aCipher.Nickname, false)
		}
	}
	newHistory()
}

function cipherHead_click(impName) {
	var x, aCipher
	for (x = 0; x < ciphersOn.length; x++) {
		if (ciphersOn[x].Nickname == impName) {
			aCipher = ciphersOn[x]
			Populate_Breakdown(aCipher.Nickname, true)
		}
	}
}

function Populate_CharCodes() {
	var resSpot = document.getElementById("ResultSpot")
	var pStr = ""
	var x, z, sv

	sv = sVal()
	for (x = 0; x < sv.length; x++) {
		pStr += sv.charCodeAt(x) + ", "
	}

	resSpot.innerHTML = pStr
}

function Build_Table(impBool = true) {
	var retStr = '<center><table id="GemTable"><tr>'
	var x, y, z, aCipher

	if (impBool == true) {
		x = 0; y = 0
		while (x < ciphersOn.length) {
			aCipher = ciphersOn[x]
			retStr += '<td' + HeadClass() + HeadID(aCipher) + CipherColor(aCipher) + '>'
			retStr += HeadLink(aCipher)
			retStr += '</td>'
			if (x > 0 && (x + 1) / ciphers_per_row == Math.floor((x + 1) / ciphers_per_row)) {
				retStr += '</tr><tr>'
				for (y; y <= x; y++) {
					aCipher = ciphersOn[y]
					retStr += '<td' + ValClass() + ValID(aCipher) + CipherColor(aCipher) + '>0'
					retStr += '</td>'
				}
				retStr += '</tr><tr>'
			}
			x++
		}
		retStr += '</tr><tr>'
		for (y; y < x; y++) {
			aCipher = ciphersOn[y]
			retStr += '<td' + ValClass() + ValID(aCipher) + CipherColor(aCipher) + '>0'
			retStr += '</td>'
		}
	} else {
		retStr = '<center><table id="GemTable2"><tr>'
		x = 0
		while (x < ciphersOn.length) {
			if (x > 0 && x / ciphers_per_row == Math.floor(x / ciphers_per_row)) {
				retStr += '</tr><tr>'
			}
			aCipher = ciphersOn[x]
			retStr += '<td' + ValClass(2) + ValID(aCipher) + CipherColor(aCipher) + '>0'
			retStr += '</td>'
			x++
		}
	}

	retStr += '</tr></table></center>'
	document.getElementById("Gematria_Table").innerHTML = retStr
	Populate_Sums(sVal())
}

function Build_CharTable(impCipher) {
	var x, y, halfL
	var rStr

	if (opt_Chart == false) {
		document.getElementById("ChartSpot").innerHTML = ""
		return
	}

	if (impCipher.Nickname == "Francis Bacon" || impCipher.Nickname == "Franc Baconis" || impCipher.Nickname == "Reverse Francis Bacon" || impCipher.Nickname == "Reverse Franc Baconis") {
		rStr = '<center><table id="ChartTableThin"><tr>'
	} else {
		rStr = '<table id="ChartTable"><tr>'
	}

	rStr += '<td colspan="' + impCipher.cArr.length + '">'
	rStr += '<button id="MoveUp" class="CipherButton" onclick="Slide_Cipher(' + "'up'" + ')" value="Move Up" style="float: left"><B>Move Up</B></button>'
	rStr += '<B><font style="font-size: 150%; color: RGB(' + impCipher.RGB.join() +')">' + impCipher.Nickname + '</font></B>'
	rStr += '<button id="MoveDown" class="CipherButton" onclick="Slide_Cipher(' + "'down'" + ')" value="Move Down" style="float: right"><B>Move Down</B></button></B>'
	rStr += '</td></tr><tr>'

	if (impCipher.cArr.length < 30 && impCipher.vArr.reduce(getSum) < 200) {
		for (x = 0; x < impCipher.cArr.length; x++) {
			rStr += '<td class="ChartChar">' + String.fromCharCode(impCipher.cArr[x]) + '</td>'
		}
		rStr += '</tr><tr>'
		for (x = 0; x < impCipher.cArr.length; x++) {
			rStr += '<td class="ChartVal">' + impCipher.vArr[x] + '</td>'
		}
	} else {
		x = 0; y = 0; halfL = impCipher.cArr.length / 2
		for (x = 0; x < impCipher.cArr.length; x++) {
			if (x - halfL == 0 || x - halfL == 0.5) {
				rStr += '</tr><tr>'
				for (y; y < x; y++) {
					rStr += '<td class="ChartVal">' + impCipher.vArr[y] + '</td>'
				}
				rStr += '</tr><tr>'
			}
			rStr += '<td class="ChartChar">' + String.fromCharCode(impCipher.cArr[x]) + '</td>'
		}
		rStr += '</tr><tr>'
		for (y; y < x; y++) {
			rStr += '<td class="ChartVal">' + impCipher.vArr[y] + '</td>'
		}
	}

	document.getElementById("ChartSpot").innerHTML = rStr + '</center>'
}

function Open_Options () {
	var cSpot = document.getElementById("MenuSpot")
	var os = ""
	var oC, oR, oQ, oSC, oH, oS, oLW

	if (opt_Chart == true) {oC = " checked"}
	if (opt_LetterCount == true) {oLW = " checked"}
	if (opt_Reduce == true) {oR = " checked"}
	if (opt_Quotes == true) {oQ = " checked"}
	if (opt_Shortcuts == true) {oSC = " checked"}
	if (opt_Headers == true) {oH = " checked"}
	if (opt_Summ == true) {oS = " checked"}

	os += '<center><table id="OptionsTable"><tr><td colspan="2"><center>'
	//os += '<button id="SaveOptions" onclick="UpdateOptions()" value="Save Options"><B>Save Settings</B></button>  '
	//os += '<div id="SaveMsg"></div>'
	os += '<div class="MenuLink" style="float: right;"><font style="font-size: 90%;"><a href="javascript:Populate_MenuBar()">Close Options</a></font></div></center></td></tr><tr><td>'
	os += 'Show Letter/Word Count <input type="checkbox" id="o_LWBox" value="Show Letter/Word Count" onclick="click_Opt()"' + oLW + '></input><BR>'
	os += 'Show Reduction <input type="checkbox" id="o_RBox" value="Show Reductions" onclick="click_Opt()"' + oR + '></input><BR>'
	os += 'Keyboard Shortcuts <input type="checkbox" id="o_SCBox" value="Keyboard Shortcuts" onclick="click_Opt()"' + oSC + '></input><P>'
	os += '<center>' + OBox_Ciphers() + '</center><p>'
	os += '<center>' + OBox_NumCalc() + '</center>'

	os += '</td><td>'

	os += '<font style="color: orange; font-size: 90%"><U>Breakdown Type:</U></font><BR>'
	os += '<center>' + OBox_Breakdown() + '</center><P>'
	os += 'Simple Result <input type="checkbox" id="o_SBox" value="Simple Result" onclick="click_Opt()"' + oS + '></input><BR>'
	os += 'Cipher Chart <input type="checkbox" id="o_CBox" value="Show Chart" onclick="click_Opt()"' + oC + '></input><BR>'
	os += 'Cipher Names <input type="checkbox" id="o_HBox" value="Show Names" onclick="click_Opt()"' + oH + '></input><BR>'
	os += 'Show Quotes <input type="checkbox" id="o_QBox" value="Show Quotes" onclick="click_Opt()"' + oQ + '></input>'

	os += '</td></tr></table></center>'
	
	cSpot.innerHTML = os
}
function click_Opt() {
	var QBox, EBox, LBox
	RBox = document.getElementById("o_RBox")
	SCBox = document.getElementById("o_SCBox")
	SBox = document.getElementById("o_SBox")
	CBox = document.getElementById("o_CBox")
	HBox = document.getElementById("o_HBox")
	QBox = document.getElementById("o_QBox")
	LWBox = document.getElementById("o_LWBox")

	if (RBox.checked == true) {
		opt_Reduce = true
	} else {
		opt_Reduce = false
	}
	if (SCBox.checked == true) {
		opt_Shortcuts = true
	} else {
		opt_Shortcuts = false
	}
	if (SBox.checked == true) {
		opt_Summ = true
	} else {
		opt_Summ = false
	}
	if (CBox.checked == true) {
		opt_Chart = true
	} else {
		opt_Chart = false
	}
	if (HBox.checked == true) {
		opt_Headers = true
	} else {
		opt_Headers = false
	}
	if (QBox.checked == true) {
		opt_Quotes = true
	} else {
		opt_Quotes = false
	}
	if (LWBox.checked == true) {
		opt_LetterCount = true
	} else {
		opt_LetterCount = false
	}
	Set_ChartMax()
	Build_Table(opt_Headers)
	Populate_Sums(sVal())
	Populate_Breakdown()
}
function Set_ChartMax() {
	if (opt_Headers == true && ciphers_per_row > 7) {
		ChartMax = ((ciphers_per_row - 7) * 7) + 36
	} else {
		ChartMax = 36
	}
}

function OBox_Ciphers() {
	var cs = ""
	cs += '<font style="color: orange; size: 90%">Ciphers per Row:</font><BR>'
	cs += '<select style="width: 50px" id="Row_Drop" onchange="Set_Rows()">'
	for (x = 2; x < 13; x++) {
		cs += '<option value="' + x + '"'
		if (x == ciphers_per_row) {cs += ' selected="selected"'}
		cs += '>' + x + '</option>'
	}
	cs += '</select>'
	return cs
}
function OBox_NumCalc() {
	var ns = ""
	var nArr = ["Off", "Full", "Reduced"]
	var nArr2 = [" ", " (123 = 123)", " (123 = 1+2+3 = 6)"]
	ns += '<font style="color: orange; size: 90%">Number Calculation:</font><BR>'
	ns += '<select id="Num_Calc" onchange="Set_NumCalc()">'
	for (x = 0; x < nArr.length; x++) {
		if (nArr[x] == opt_NumCalculation) {
			ns += '<option value="' + nArr[x] + '" selected="selected">' +  nArr[x] + nArr2[x] + '</option>'
		} else {
			ns += '<option value="' + nArr[x] + '">' +  nArr[x] + nArr2[x] + '</option>'
		}
	}
	ns += '</select>'
	return ns
}
function OBox_Breakdown() {
	var ns = ""
	var nArr = ["Chart", "Classic", "Off"]
	ns += '<select id="Breakdown_Type" onchange="Set_Breakdown()">'
	for (x = 0; x < nArr.length; x++) {
		if (nArr[x] == opt_Breakdown) {
			ns += '<option value="' + nArr[x] + '" selected="selected">' +  nArr[x] + '</option>'
		} else {
			ns += '<option value="' + nArr[x] + '">' +  nArr[x] + '</option>'
		}
	}
	ns += '</select>'
	return ns
}
function Set_Rows() {
	var rDrop = document.getElementById("Row_Drop")
	ciphers_per_row = Number(rDrop.value)
	Set_ChartMax()
	Build_Table(opt_Headers)
	Populate_Breakdown()
}
function Set_NumCalc() {
	var nCalc = document.getElementById("Num_Calc")
	opt_NumCalculation = nCalc.value
	Build_Table(opt_Headers)
	Populate_Breakdown()
}
function Set_Breakdown() {
	var bdType = document.getElementById("Breakdown_Type")
	opt_Breakdown = bdType.value
	Build_Table(opt_Headers)
	Populate_Breakdown()
}

function Open_Shortcuts() {
	window.open("http://www.gematrinator.com/nextgen/Shortcuts.png", 'Keyboard Shortcuts')
}
function Open_Ciphers(impOpt = cOption, impBool = false) {
	var mSpot = document.getElementById("MenuSpot")
	var hStr = '<center><table id="CipherChart"><tr>'
	var x, y, thisCat, key, keyOn, aCipher

	cOption = impOpt
	hStr += '<td class="CategoryList">'

	hStr += Category_Links()

	hStr += '</td><td class="CategoryList2"><a href="javascript:Toggle_All()">Toggle All</a>'

	hStr += '<div class="BottomDweller"><a href="javascript:Populate_MenuBar()">Close Ciphers</a></div><P>'

	for (key in cipherArray) {
		thisCat = cipherArray[key]
		if (thisCat == cOption) {
			keyOn = "unchecked"
			for (x = 0; x < ciphersOn.length; x++) {
				if (ciphersOn[x].Nickname == key) {
					keyOn = "checked"
					break;
				}
			}
			for (y = 0; y < allCiphers.length; y++) {
				if (allCiphers[y].Nickname == key) {
					aCipher = allCiphers[y]
					break;
				}
			}
			hStr += '<input type="checkbox" id="' + replaceAll(key, " ", "") + '_Box" onclick="set_Ciphers()" value="' + key + '" '
			hStr += keyOn + '><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.Nickname + '</font></input><BR>'
		}
	}

	hStr += '<div class="ButtonSection"><button class="CipherButton" onclick="Add_BaseCiphers(true)" value="BaseCiphers"><B>Base Ciphers</B></button>'
	hStr += '<button class="CipherButton" onclick="Add_AllCiphers(true)" value="AllCiphers"><B>All Ciphers</B></button><BR>'
	hStr += '</td></tr></table></center>'

	mSpot.innerHTML = ""
	mSpot.innerHTML = hStr
}
function Category_Links() {
	var x, thisCat, rStr
	rStr = ""
	for (x = 0; x < catArr.length; x++) {
		thisCat = catArr[x]
		if (thisCat == cOption) {
			rStr += '<font style="color: RGB(255, 255, 0)">' + thisCat + '</font><P>'
		} else {
			rStr += '<a href="javascript:Open_Ciphers('
			rStr += "'" + thisCat + "')"
			rStr += '" onmouseover="javascript:Open_Ciphers('
			rStr += "'" + thisCat + "')"
			rStr += '">' + thisCat + '</a><P>'
		}
	}
	return rStr
}
function set_Ciphers() {
	var cipherBox, x, y, isOn, cName

	for (x = 0; x < allCiphers.length; x++) {
		cName = allCiphers[x].Nickname
		switch (BoxStatus(cName)) {
			case "checked":
				if (isCipherOn(cName) < 0) {
					Add_Cipher(cName)
				}
				break;
			case "unchecked":
				if (isCipherOn(cName) > -1) {Remove_Cipher(cName)}
				break;
			case "na":
				break;
		}
	}
	Build_Table(opt_Headers)
}
function Toggle_All() {
	var cipherBox, x, y, allOn, cName

	allOn = true
	for (x = 0; x < allCiphers.length; x++) {
		cName = allCiphers[x].Nickname
		if (BoxStatus(cName) == "unchecked") {
			allOn = false
			break;
		}
	}

	if (allOn) {
		for (y = 0; y < allCiphers.length; y++) {
			cName = allCiphers[y].Nickname
			if (BoxStatus(cName) !== "na") {
				ToggleBox(cName, false)
				if (isCipherOn(cName) > -1) {Remove_Cipher(cName, false)}
			}
		}
	} else {
		for (y = 0; y < allCiphers.length; y++) {
			cName = allCiphers[y].Nickname
			if (BoxStatus(cName) !== "na") {
				ToggleBox(cName, true)
				if (isCipherOn(cName) < 0) {Add_Cipher(cName, false)}
			}
		}
	}
	Build_Table(opt_Headers)
}
function BoxStatus(impName) {
	var cipherBox = document.getElementById(replaceAll(impName, " ", "") + "_Box")
	if (cipherBox) {
		if (cipherBox.checked == true) {
			return "checked"
		} else {
			return "unchecked"
		}
	} else {
		return "na"
	}
}
function ToggleBox(impName, impBool) {
	var cipherBox = document.getElementById(replaceAll(impName, " ", "") + "_Box")
	if (cipherBox) {
		cipherBox.checked = impBool
	}
}
function isCipherOn(impName) {
	var x, isOn
	isOn = false
	x = openCiphers.indexOf(impName)
	return x
}

function Get_Matches() {
	var cVal, tText
	var tArea = document.getElementById("MiscSpot")
	
	if (ciphersOn.length < 13) {
		tArea.innerHTML = "Loading..."

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
	    	if (this.readyState == 4 && this.status == 200) {
	      		cVal = xhttp.responseText;
	      		mArr = cVal.split("-");
	      		Match_Table2()
	    	}
		};

		if (NumberArray() == true) {
			xhttp.open("GET", "http://www.gematrinator.com/nextgen/numbermatch.php?search=" + SearchNumbers(), true);
			xhttp.send();
		} else {
			xhttp.open("GET", "http://www.gematrinator.com/nextgen/getmatch.php?search=" + SearchString(), true);
			xhttp.send();
		}
	} else {
		tText = '<font style="font-size: 150%; color: RGB(223, 0, 0)">Select 12 or fewer ciphers</font><BR>'
		tText += '<div class="MenuLink"><a href="javascript:Open_History()">Show History</a></div>'
		tArea.innerHTML = tText
	}
}
function SearchString() {
	var x, aCipher
	var ss = ""
	pArr = []

	for (x = 0; x < ciphersOn.length; x++) {
		aCipher = ciphersOn[x]
		if (ss !== "") {ss += "-"}
		ss += replaceAll(aCipher.Nickname, " ", "_") + "-"
		ss += gemArr[x]
	}

	return ss
}
function SearchNumbers() {
	var ss = "-"

	for (x = 0; x < ciphersOn.length; x++) {
		aCipher = ciphersOn[x]
		ss += replaceAll(aCipher.Nickname, " ", "_") + "-"
	}
	ss = pArr.join("-") + ss
	return ss.slice(0, ss.length - 1)
}
function NumberArray() {
	var x, isNum

	pArr = sVal().split(" ")
	isNum = true
	for (x = 0; x < pArr.length; x++) {
		if (isNaN(pArr[x])) {
			isNum = false
			break;
		} else {
			pArr[x] = Number(pArr[x])
		}
	}
	return isNum
}

function Match_Table() {
	var ms, x, y, aCipher, gemSum, cs, isBold, isSame

	ms = '<div class="MenuLink"><a href="javascript:Open_History()">Show History</a></div><BR>'
	ms += '<table class="MTable"><tr><td>'

	for (x = 0; x < mArr.length - 1 && x < 250; x++) {

		if (x % 25 == 0) {
			ms += '<tr><td class="MPhrase"><font style="color: orange;">Word or Phrase</font></td>'
			for (z = 0; z < ciphersOn.length; z++) {
				ms += '<td class="CipherHead" style="color: RGB(' + ciphersOn[z].RGB.join() +')">'
				ms += ciphersOn[z].Nickname
				ms += "</td>"
			}
			ms += "</tr>"
		}

		ms += '<tr><td class="MPhrase">' + mArr[x] + '</td>'

		for (y = 0; y < ciphersOn.length; y++) {

			aCipher = ciphersOn[y]
			gemSum = aCipher.Gematria(mArr[x], 1)
			cs = replaceAll(aCipher.Nickname, " ", "_")

			if (gemArr[y] == gemSum || pArr.indexOf(gemSum) > -1) {isSame = true} else {isSame = false}
			if (gemArr.indexOf(gemSum) > -1) {isBold = true} else {isBold = false}

			ms += '<td class="MSum'
			if (isSame == true) {
				ms += ' MSumFull'
			} else if (isBold == true) {
				ms += ' MSumPart'
			}
			ms += '">'

			if (isSame == true) {ms += '<font style="color: RGB(' + aCipher.RGB.join() + '")>'}
			ms += gemSum
			if (isSame == true) {ms += '</font>'}
			ms += '</td>'
		}
		ms += '</tr>'
	}

	ms += '</table>'
	return ms
}
function Match_Table2() {
	tArea = document.getElementById("MiscSpot")
	if (mArr.length > 0) {
		tArea.innerHTML = Match_Table()
	} else {
		tArea.innerHTML = '<font style="color: RGB(223, 0, 0)">You must first click "Match" to build this table</font>'
	}
	miscContents = "match"
}

function ValClass(impType = 1) {if (impType == 1) {return ' class="GemVal"'} else {return ' class="GemVal2"'}}
function ValID (impCipher) {return ' id="' + impCipher.Nickname + '_Sum"'}
function CipherColor(impCipher) {return ' style="color: RGB(' + impCipher.RGB.join() +')"'}
function HeadClass() {return ' class="GemHead"'}
function HeadID(impCipher) {return ' id="'+ impCipher.Nickname + '_Head"'}
function HeadLink(impCipher) {
	var rStr = ""
	rStr += '<a onmouseover="javascript:cipherHead_mouseOver('
	rStr += "'" + impCipher.Nickname + "', false)"
	rStr += '" onmouseout="Populate_Breakdown()" href="javascript:cipherHead_click('
	rStr += "'" + impCipher.Nickname + "', true"
	rStr += ')">' + impCipher.Nickname + '</a>'
	return rStr
}
function replaceAll(sS, fS, rS) {
  return sS.replace(new RegExp(fS, 'g'), rS);
}
function UpdateUserHistory() {
	var cString, x

	cString = sHistory[0]

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {}
    };
    xhttp.open("POST", "http://www.gematrinator.com/usersettings/updatehistory.php?history=" + cString, true);
    xhttp.send();
}
function UpdateOptions() {
	var oString, cString, x

	cString = ""
	for (x = 0; x < openCiphers.length; x++) {
		cString += openCiphers[x] + "|"
	}

	tempArr = [cString, opt_NumCalculation, opt_Breakdown, ciphers_per_row, opt_Reduce, opt_Quotes, opt_Summ, opt_Chart, opt_Shortcuts, opt_Headers]
	oString = tempArr.join(";")

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		respText = xhttp.responseText
    		document.getElementById("SaveMsg").innerHTML = respText
    	}
    };
    xhttp.open("POST", "http://www.gematrinator.com/usersettings/updateoptions.php?options=" + oString, true);
    xhttp.send();
}