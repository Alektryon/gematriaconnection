var ciphers_per_row = 4; ChartMax = 36
var cOption = "English"
var breakCipher
var pixelcount = 0; breakArr = []; pArr= []; mArr = []
var opt_Reduce = false; opt_Quotes = true; opt_Summ = true; opt_Breakdown = "Compact"; opt_LetterCount = true
var opt_Chart = true; opt_Shortcuts = true; opt_Headers = true;

var opt_PhraseLimit = 5 // word limit to enter input as separate phrases, "End" key

var opt_CompactHistoryTable = false; // disable Cipher names, no 25 phrase break, compact mode
var opt_WeightedAutoHlt = false; // color grade matches found with auto highlighter (most frequest is the brightest)
var opt_MatrixCodeRain = false; // set to true to enable by default

// only one active
var opt_filtShowMatchingCiphers = true; // filter shows only ciphers that have matching values
var opt_filtSameCipherMatch = false; // filter shows only phrases that match in the same cipher

// used inside highlighter.js
var avail_match = []; // all matches found with auto highligher
var avail_match_freq = []; // frequency of matches found with auto highligher
var freq = []; // frequency of matches found with auto highlighter

function Page_Launch() {
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
	hStr += '<div class="MenuLink"><a href="https://github.com/Alektryon/gematriaconnection">GitHub (changelog)</a></div>  |  '
	hStr += '<div class="MenuLink"><a href="https://gematrinator.com/index.php">Gematrinator.com</a></div>'

	hStr += '<BR></center>'
	mSpot.innerHTML = hStr
}

function sVal() {
	var phr = document.getElementById("SearchField").value.trim() // get value
	if (ciphersOn.find(o => o.Nickname.includes("RU")) == undefined) { // if Russian ciphers are not enabled (otherwise "е=ё", "и=й")
		phr = phr.normalize('NFD').replace(/[\u0300-\u036f]/g, "") // remove any diacritic marks (works as you type for word breakdown)
	}
	return phr
}

function navHistory(impNum) { // run on each keystroke inside text box - onkeydown="navHistory(event.keyCode) - from index.html
	var hPlace, tBox, tBoxValue
	var newVal = "";
	thisTerm = replaceAll(sVal(), "|", "") // get phrase from SearchField
	tBox = document.getElementById("SearchField")

	hPlace = sHistory.indexOf(thisTerm) // position of phrase in History array
	switch (impNum) {
		case 13: // Enter
			newHistory(thisTerm, true) // enter as single phrase
			if (!shiftIsPressed) tBox.value = "" // clear textbox on Enter, "Shift - Enter" preserves contents
			break;
		case 38: // Up Arrow
			if (hPlace > 0) {
				newVal = sHistory[hPlace - 1]
			}
			if (newVal !== "") {tBox.value = newVal; Populate_Sums(newVal); Populate_Breakdown()}
			break;
		case 40: // Down Arrow
			if (hPlace > -1) {
				if (sHistory.length > (hPlace + 1)) {newVal = sHistory[hPlace + 1]}
			} else {
				if (sHistory.length > 0) {newVal = sHistory[0]}
			}
			if (newVal !== "") {tBox.value = newVal; Populate_Sums(newVal); Populate_Breakdown()}
			break;
		case 46: // Delete, remove entries from history
			if (sHistory.length == 1) {
				sHistory = [] // reinitialize array if there is only one entry
				tArea = document.getElementById("MiscSpot")
				tArea.innerHTML = "" // clear table
			}
			if (hPlace > -1) {
				sHistory.splice(hPlace, 1) // if a match is found, delete entry
			}
			tBox.value = "" // empty text box, so the old value us not added again
			FieldChange(sVal()) // update values and breakdown
			Open_History() // update table
			break;
		case 36: // Home, clear all history
			sHistory = [] // reinitialize array if there is only one entry
			tArea = document.getElementById("MiscSpot")
			tArea.innerHTML = "" // clear table
			break;
		case 35: // End, enter sentence as separate words and phrases
			thisTerm = thisTerm.replace(/\t/g, " ") // replace tab with spaces
			thisTerm = thisTerm.replace(/ +/g, " ") // remove double spaces
			// thisTerm = thisTerm.replace(/(\.|,|:|;|\\|)/g, "") // remove special characters, last are one is "|"
			
			wordarray = thisTerm.split(" ")
			phr_len = opt_PhraseLimit // max phrase length
			var phrase; // init variable outside of for cycle, memory efficient
			// for (i = 0; i < wordarray.length; i++) { // phrases in normal order
				// k = 1 // init variable
				// phrase = wordarray[i]
				// newHistory(phrase, false)
				// while (k < phr_len && i+k < wordarray.length) { // add words to a phrase, check it is within array size
					// phrase += " "+wordarray[i+k]
					// newHistory(phrase, false)
					// k++
				// }
			// }
			for (i = wordarray.length-1; i > -1; i--) { // add phrases in reverse order, so you don't have to read backwards
				k = 1 // init variable
				phrase = wordarray[i]
				
				// remove double spaces, space in the start/end
				//phrase = phrase.replace(/ +/g, " ").replace(/^ /g, "").replace(/ $/g, "")

				newHistory(phrase, false) // true flag doesn't update history after a new phrase is added
				while (k < phr_len && i-k > -1) { // add words to a phrase, check it is within array size
					phrase = wordarray[i-k]+" "+phrase
					newHistory(phrase, false)
					k++
				}
			}
			Open_History() // update table only once after all phrases are added
			break;
	}
}

function newHistory(phr, upd_table) { // called from function navHistory(impNum) -> case 13
	var hSpot

	if (phr !== "") { // if input is not empty
	
		if (Number(phr) > 0) { // if a number is entered, do not add it to history

		} else {
			
			hSpot = sHistory.indexOf(phr);
			if (hSpot > -1) { // if element is in history
				sHistory.splice(hSpot, 1) // remove it from array
			}
		/*	sHistory.unshift(phr) // insert in the beginning of array	*/
			sHistory.push(phr) // insert it at the top
		}
	}
	
	if (upd_table) Open_History() // update table or not
}
function Open_History() {
	var ms, x, y, aCipher, gemSum
	tArea = document.getElementById("MiscSpot")
	
	if (sHistory.length == 0) {return}

	ms = '<table class="HistoryTable" id="HistoryTable_scr"><tbody>'
	highlt = document.getElementById("Highlight").value // value of Highlight textbox
	
	hlt = false
	if (highlt !== "") {
		highlt_num = highlt.split(" "); // create array, space delimited numbers
		hlt = true
	}
	
	for (x = 0; x < sHistory.length; x++) {

		if (x % 25 == 0 && !opt_CompactHistoryTable) {
			ms += '<tr><td class="MPhrase"><font style="color: orange;">Word or Phrase</font></td>'
			for (z = 0; z < ciphersOn.length; z++) {
				ms += '<td class="HistoryHead" style="color: RGB(' + ciphersOn[z].RGB.join() +')">' // color of cipher displayed in the table
				ms += ciphersOn[z].Nickname
				ms += "</td>"
			}
			ms += "</tr>"
		}

		ms += '<tr><td class="historyPhrase">' + sHistory[x] + '</td>'

		if (opt_WeightedAutoHlt && freq.length !== 0) { // if option is enabled and array is initialized
			
			max_match = freq[freq.length-1][1]; // last value, array is sorted
			
			for (y = 0; y < ciphersOn.length; y++) {
			
				aCipher = ciphersOn[y]
				gemSum = '<font style="font-size: 115%"><b class="cellvalue"> ' + aCipher.Gematria(sHistory[x], 2, false, true) + ' </b></font>' // actual value displayed
				gemVal = aCipher.Gematria(sHistory[x], 2, false, true) // value only

				// r = aCipher.R;
				// g = aCipher.G;
				// b = aCipher.B;
				//col = aCipher.RGB
				col = "0,255,0"
				a = 1.0
				
				//console.log("highlt_num.includes('"+aCipher.Gematria(sHistory[x], 2, false, true)+"'))")
				//console.log(highlt_num.indexOf((aCipher.Gematria(sHistory[x], 2, false, true)).toString()))
				//console.log(highlt_num)
				
				if (hlt && !highlt_num.includes((aCipher.Gematria(sHistory[x], 2, false, true)).toString()) ) { // if highlight not empty and doesn't match value
					// r *= 0.3
					// g *= 0.3
					// b *= 0.3
					a = 0 // invisible
				}
				
				for (i = 0; i < freq.length; i++) { // weighted coloring
					if (freq[i][0] == gemVal) {
						a = freq[i][1]/max_match // if max - value 1.0
						a = a*a*a // less significant values are darker, "gamma curve"
					}
				}
			
				// numcol = r+','+g+','+b+','+a
				numcol = col+','+a
				
				//ms += '<td><font style="color: RGB(' + aCipher.RGB.join() + '")>' + gemSum + '</font></td>'
				//ms += '<td><font style="color: RGB(' + numcol + '")>' + gemSum + '</font></td>'
				//ms += '<td class="phraseValue" onclick="tdToggleHighlight('+gemVal+')"><font style="color: rgba('+numcol+')">' + gemSum + '</font></td>'
				ms += '<td class="phraseValue"><font style="color: rgba('+numcol+')">' + gemSum + '</font></td>'
			}
		}

		if (!opt_WeightedAutoHlt || freq.length == 0) {
			for (y = 0; y < ciphersOn.length; y++) {
			
				aCipher = ciphersOn[y]
				gemSum = '<font style="font-size: 115%"><b class="cellvalue"> ' + aCipher.Gematria(sHistory[x], 2, false, true) + ' </b></font>' // actual value displayed
				gemVal = aCipher.Gematria(sHistory[x], 2, false, true) // value only

				// r = aCipher.R;
				// g = aCipher.G;
				// b = aCipher.B;
				col = aCipher.RGB
				a = 1.0
				
				//console.log("highlt_num.includes('"+aCipher.Gematria(sHistory[x], 2, false, true)+"'))")
				//console.log(highlt_num.indexOf((aCipher.Gematria(sHistory[x], 2, false, true)).toString()))
				//console.log(highlt_num)
				
				if (hlt && !highlt_num.includes((aCipher.Gematria(sHistory[x], 2, false, true)).toString()) ) { // if highlight not empty and doesn't match value
					// r *= 0.3
					// g *= 0.3
					// b *= 0.3
					a = 0.3
				}
				// numcol = r+','+g+','+b+','+a
				numcol = col+','+a
				
				//ms += '<td><font style="color: RGB(' + aCipher.RGB.join() + '")>' + gemSum + '</font></td>'
				//ms += '<td><font style="color: RGB(' + numcol + '")>' + gemSum + '</font></td>'
				//ms += '<td class="phraseValue" onclick="tdToggleHighlight('+gemVal+')"><font style="color: rgba('+numcol+')">' + gemSum + '</font></td>'
				ms += '<td class="phraseValue"><font style="color: rgba('+numcol+')">' + gemSum + '</font></td>'
			}
		}
		ms += '</tr>'
	}

	ms += '</tbody></table>'
	tArea.innerHTML = ms
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

			rStr += '<table class="BreakTable"><tbody class="printBreakTable"><tr>'
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
						rStr += '</tr></tbody></table><br><table class="BreakTable"><tbody class="printBreakTable"><tr>'
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
			rStr += '</tr></tbody></table>'

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

		} else if (opt_Breakdown == "Compact") {
			var tdCount
			tdCount = 0

			rStr += '<table class="BreakTable"><tbody class="printBreakTable"><tr>'
			for (x = 0; x < aCipher.cp.length; x++) {

				if (aCipher.cp[x] !== " ") {
					if (String(aCipher.cp[x]).substring(0, 3) == "num") {
						rStr += '<td class="BreakChar2">' + aCipher.cp[x].substring(3, aCipher.cp[x].length) + '</td>'
					} else {
						rStr += '<td class="BreakChar2">' + String.fromCharCode(aCipher.cp[x]) + '</td>'
					}
				} else {
					rStr += '<td class="BreakWordSum" rowspan="2"><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.sumArr[wCount] + '</td>'

					/*if (breakArr.indexOf(wCount) > -1) {
						for (z; z < x; z++) {
							if (aCipher.cv[z] !== " ") {
								rStr += '<td class="BreakVal">' + aCipher.cv[z] + '</td>'
							}
						}
					}*/
					wCount++
				}
				tdCount++
			}
			rStr += '<td class="BreakPhraseSum" rowspan="2"><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.sumArr.reduce(getSum) + '</font></td>'
			rStr += '</tr><tr>'
			tdCount++
			for (z; z < x; z++) {
				if (aCipher.cv[z] !== " ") {
					rStr += '<td class="BreakVal">' + aCipher.cv[z] + '</td>'
				}
			}
			rStr += '</tr><tr><td colspan=' + tdCount + ' class="CipherEnd"><font style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.Nickname + '</font></td></tr></table>'
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
		case "s;aq":
			cName = "Alphanumeric Qabbala";
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

	if (impCipher.cArr.length > 40) {
		rStr = '<center><table id="ChartTableThin">'
	} else {
		rStr = '<table id="ChartTable">'
	}
	
	// gradient table background based on cipher color
	rStr += '<tr>'

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
		if (impCipher.cArr.length % 2 == 1) { rStr += '<td class="ChartChar"></td>' } // empty character cell to make even rows
		rStr += '</tr><tr>'
		for (y; y < x; y++) {
			rStr += '<td class="ChartVal">' + impCipher.vArr[y] + '</td>'
		}
		if (impCipher.cArr.length % 2 == 1) { rStr += '<td class="ChartVal"></td>' } // empty value cell to make even rows
	}

	document.getElementById("ChartSpot").innerHTML = rStr + '</center>'
}

function Open_Options () {
	var cSpot = document.getElementById("MenuSpot")
	var os = ""
	var oC, oR, oQ, oSC, oH, oS, oLW, oCHT, oWH, oMCR, oLUHC, oFSMS, oFSCM

	if (opt_Chart == true) {oC = " checked"}
	if (opt_LetterCount == true) {oLW = " checked"}
	if (opt_Reduce == true) {oR = " checked"}
	if (opt_Quotes == true) {oQ = " checked"}
	if (opt_Shortcuts == true) {oSC = " checked"}
	if (opt_Headers == true) {oH = " checked"}
	if (opt_Summ == true) {oS = " checked"}
	if (opt_CompactHistoryTable == true) {oCHT = " checked"}
	if (opt_WeightedAutoHlt == true) {oWH = " checked"}
	if (opt_MatrixCodeRain == true) {oMCR = " checked"}
	if (opt_loadUserHistCiphers == true) {oLUHC = " checked"}
	if (opt_filtShowMatchingCiphers == true) {oFSMS = " checked"}
	if (opt_filtSameCipherMatch == true) {oFSCM = " checked"}

	os += '<center><table id="OptionsTable"><tr><td colspan="2"><center>'

	os += '<div class="MenuLink" style="float: right;"><font style="font-size: 90%;"><a href="javascript:Populate_MenuBar()">Close Options</a></font></div></center></td></tr><tr><td>'
	os += 'Show Letter/Word Count <input type="checkbox" id="o_LWBox" value="Show Letter/Word Count" onclick="click_Opt()"' + oLW + '></input><BR>'
	os += 'Show Reduction <input type="checkbox" id="o_RBox" value="Show Reductions" onclick="click_Opt()"' + oR + '></input><BR>'
	os += 'Keyboard Shortcuts <input type="checkbox" id="o_SCBox" value="Keyboard Shortcuts" onclick="click_Opt()"' + oSC + '></input><BR>'
	os += 'Compact History Table <input type="checkbox" id="o_CHTBox" value="Compact History Table" onclick="click_Opt()"' + oCHT + '></input><BR>'
	os += 'Weighted Auto Highlighter <input type="checkbox" id="o_WHBox" value="Weighted Auto Highlighter" onclick="click_Opt()"' + oWH + '></input><BR>'
	os += 'Matrix Code Rain <input type="checkbox" id="o_MCRBox" value="Matrix Code Rain" onclick="click_Opt()"' + oMCR + '></input><P>'
	os += 'Load User History Ciphers <input type="checkbox" id="oLUHCBox" value="Load User History Ciphers" onclick="click_Opt()"' + oLUHC + '></input><BR>'
	os += 'Filter - Show Matching Ciphers <input type="checkbox" id="oFSMSBox" value="Filter - Show Matching Ciphers" onclick="click_Opt()"' + oFSMS + '></input><BR>'
	os += 'Filter - Same Cipher Match <input type="checkbox" id="oFSCMBox" value="Filter - Same Cipher Match" onclick="click_Opt()"' + oFSCM + '></input><P>'
	os += '<center>' + OBox_Ciphers() + '</center><p>'
	os += '<center>' + OBox_NumCalc() + '</center><p>'
	os += '<center>' + OBox_PhraseLimit() + '</center>'

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
	CHTBox = document.getElementById("o_CHTBox")
	WHBox = document.getElementById("o_WHBox")
	MCRBox = document.getElementById("o_MCRBox")
	LUHCBox = document.getElementById("oLUHCBox")
	FSMSBox = document.getElementById("oFSMSBox")
	FSCMBox = document.getElementById("oFSCMBox")

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
	if (CHTBox.checked == true) {
		opt_CompactHistoryTable = true
		Open_History()
	} else {
		opt_CompactHistoryTable = false
		Open_History()
	}
	if (WHBox.checked == true) {
		opt_WeightedAutoHlt = true
		Open_History()
	} else {
		freq = [] // reset previously found matches
		opt_WeightedAutoHlt = false
		Open_History()
	}
	if (MCRBox.checked == true && !code_rain_active) { // menu is buggy, any option toggled above, reloads all previous settings
		opt_MatrixCodeRain = true
		toggle_code_rain()
	}
	if (MCRBox.checked == false && code_rain_active) {
		opt_MatrixCodeRain = false
		toggle_code_rain()
	}
	if (LUHCBox.checked == true) {
		opt_loadUserHistCiphers = true
	} else {
		opt_loadUserHistCiphers = false
	}
	if (FSMSBox.checked == true) {
		opt_filtShowMatchingCiphers = true
		// opt_filtSameCipherMatch = false // both can't be active
		// FSCMBox.checked = false // uncheck
	} else {
		opt_filtShowMatchingCiphers = false
	}
	if (FSCMBox.checked == true) {
		opt_filtSameCipherMatch = true
		// opt_filtShowMatchingCiphers = false
		// FSMSBox.checked = false
	} else {
		opt_filtSameCipherMatch = false
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
function OBox_PhraseLimit() {
	var ns = ""
	var nArr = [1,2,3,4,5,6,7,8,9,10]
	ns += '<font style="color: orange; size: 90%">Phrase Limit ("End"):</font><BR>'
	ns += '<select id="PhraseLimit" onchange="Set_PhraseLimit()">'
	for (x = 0; x < nArr.length; x++) {
		ns += '<option value="' + nArr[x] + '"'
		if (nArr[x] == opt_PhraseLimit) {ns += ' selected="selected"'}
		if (nArr[x] == 1) {ns += '>'+nArr[x]+' word</option>'}
		else {ns += '>'+nArr[x]+' words</option>'}
	}
	ns += '</select>'
	return ns
}
function OBox_Breakdown() {
	var ns = ""
	var nArr = ["Chart", "Classic", "Compact", "Off"]
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
function Set_PhraseLimit() {
	var pLimit = document.getElementById("PhraseLimit")
	opt_PhraseLimit = pLimit.value
}
function Set_Breakdown() {
	var bdType = document.getElementById("Breakdown_Type")
	opt_Breakdown = bdType.value
	Build_Table(opt_Headers)
	Populate_Breakdown()
}

//function PromptCustomCharacters() {
//	if (customcharset.length < 1) { examplecharset = "a b c d e f g h i j k l m n o p q r s t u v w x y z"; }
//	var retVal = prompt("Enter custom set of comma delimited characters: ", customcharset)
//    console.log("You have entered : " + retVal)
//	split = retVal.split(",")
//	console.log(split)
//}

function PromptCustomValues() { // English Custom cipher
	//empty = false
	if (customvalues[0] == null) {
		examplevalues = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26";
		empty = true // otherwise else condition becomes immediately valid
	//} else if (!empty) {
	} else {
		//string = JSON.stringify(customvalues).replace(/","/g, "\n");
		string = JSON.stringify(customvalues);
		examplevalues = string.substring(1, string.length - 1);
	}
	
	var retVal = prompt("Enter custom set of comma delimited values: ", examplevalues) // user input prompt
	console.log("You have entered : " + retVal)
	split = retVal.split(",") // string to string array, comma delimited
	console.log(split)

	result = split.map(function (x) { // parse string array as integer array to exclude quotes
		return parseInt(x, 10); 
	});
	customvalues = result
	
	console.log(customvalues)
	if (split == "") {
		customvalues = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26] // reinitialize array to Ordinal
	}
	
	pop_zero = customvalues.length // populate missing values with zeroes so there is no "undefined" if less than 26 values are specified
	if (pop_zero < 26) {
		for (i = pop_zero; i < 26; i++) {
				customvalues.push(0)
		};
	}
	
	cipherArray = [] // clear cipher array
	catArr = [] // clear categories
	allCiphers = [] // clear ciphers
	gemArr = []

	Page_Launch() // rebuild ciphers and categories
	
	Open_History() // update history table values
	Open_Ciphers() // open Cipher options
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
		if (thisCat == cOption && thisCat !== "Custom") { // all categories except for custom
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
			hStr += keyOn + '><span class="checkboxCipherFont" style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.Nickname + '</span></input><BR>'
		}
		if (thisCat == cOption && thisCat == "Custom") { // special menu for Custom category
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
				hStr += keyOn + '><span class="checkboxCipherFont" style="color: RGB(' + aCipher.RGB.join() + ')">' + aCipher.Nickname + '</span></input><BR>'
		}
	}

	if (cOption == "Custom") {
		//hStr += '<div class="ButtonSection"><button class="CipherButton" onclick="PromptCustomCharacters()" value="CustomCharacters"><B>Characters</B></button>'
		hStr += '<div class="ButtonSection"><button class="CipherButton" onclick="PromptCustomValues()" value="CustomValues"><B>Custom</B></button>'
		hStr += '<button class="CipherButton" onclick="No_Ciphers(true)" value="NoCiphers"><B>Empty</B></button>'
		hStr += '<button class="CipherButton" onclick="Add_BaseCiphers(true)" value="BaseCiphers"><B>Default</B></button>'
		hStr += '<button class="CipherButton" onclick="Add_AllCiphers(true)" value="AllCiphers"><B>All Ciphers</B></button>'
		hStr += '<BR></td></tr></table></center>'
	}
	
	if (cOption !== "Custom") { // populate buttons for all categories except custom
		hStr += '<div class="ButtonSection"><button class="CipherButton" onclick="No_Ciphers(true)" value="NoCiphers"><B>Empty</B></button>'
		hStr += '<button class="CipherButton" onclick="Add_BaseCiphers(true)" value="BaseCiphers"><B>Default</B></button>'
		hStr += '<button class="CipherButton" onclick="Add_AllCiphers(true)" value="AllCiphers"><B>All Ciphers</B></button>'
		hStr += '<button class="CipherButton" onclick="Add_RussianCiphers(true)" value="RussianCiphers"><B>Russian</B></button><BR>'
		hStr += '</td></tr></table></center>'
	}

	mSpot.innerHTML = ""
	mSpot.innerHTML = hStr
}
function Category_Links() {
	var x, thisCat, rStr
	rStr = ""
	for (x = 0; x < catArr.length; x++) {
		thisCat = catArr[x]
		if (thisCat == cOption) {
			rStr += '<span class="cipherCategoryActive">' + thisCat + '</span><br>'
		} else {
			rStr += '<a class="cipherCategory" href="javascript:Open_Ciphers('
			rStr += "'" + thisCat + "')"
			rStr += '" onmouseover="javascript:Open_Ciphers('
			rStr += "'" + thisCat + "')"
			rStr += '">' + thisCat + '</a><br>'
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

function ValClass(impType = 1) {if (impType == 1) {return ' class="GemVal"'} else {return ' class="GemVal2"'}}
function ValID (impCipher) {return ' id="' + impCipher.Nickname + '_Sum"'}
function CipherColor(impCipher) {
	if (opt_MatrixCodeRain) {
		return ' style="color: RGB(' + impCipher.RGB.join() +'); text-shadow: 0px 0px 20px rgb('+impCipher.RGB.join()+');"'
	} else {
		return ' style="color: RGB(' + impCipher.RGB.join() +');"' // no shadow for static background
	}
}
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
