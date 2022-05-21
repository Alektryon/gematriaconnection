var opt_loadUserHistCiphers = true // load ciphers found in text file

$(document).ready(function(){
	// change element style on drag-enter event
	$("body").on("dragenter", "#SearchField", function () {
		$(this).addClass("dragOver");
	});
	$("body").on("dragleave", "#SearchField", function () {
		$(this).removeClass("dragOver");
	});
});

var userhist = "" // user history table

function dropHandler(ev) {
	// console.log('File(s) dropped')
	$("#SearchField").removeClass("dragOver")
	
	ev.preventDefault() // prevent default behavior (Prevent file from being opened)

	if (ev.dataTransfer.items) {
		// use DataTransferItemList interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			// if dropped items aren't files, reject them
			if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile()
				console.log('... "FILE" file[' + i + '].name = ' + file.name)
				//console.log(file)
				//console.log(ev)
			}
		}
	} else {
		// use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name)
		}
	}
	
	var file = ev.dataTransfer.files[0] // first file
	var reader = new FileReader()
	
	var sb = "" // string builder
	reader.onload = (event) => { // actions to perform after file is read
		var file = event.target.result // full file contents
		userhist = file.split(/\r\n|\n/) // to string array, line break as separator
		
		if (typeof databaseMode !== 'undefined' && databaseMode) { exportDatabaseCSV(userhist); return } // line by line, only phrases
		//userhist.forEach((line) => { // print line by line
		//	console.log(line)
		//})
		
		var uCiph = [] // user saved ciphers
		uCiph = userhist[0].split(";") // table header to array, semicolon separator
		
		if (opt_loadUserHistCiphers) { // enable ciphers available in user history
			// uCiph = uCiph.slice(1, uCiph.length) // remove "Work or Phrase"
			
			openCiphers = [] // clear active ciphers

			for (z = 0; z < allCiphers.length; z++) {
				if (uCiph.indexOf(allCiphers[z].Nickname) > -1) { // load cipher if name is correct and it is available
					openCiphers.push(allCiphers[z].Nickname)
				}
			}
			Build_Open_Ciphers() // update ciphers
			//Open_Ciphers()
		}

		var uPhr = []
		var a = 0
		if (uCiph[0] == "Word or Phrase") a = 1 // ignore table header

		for (i = a; i < userhist.length; i++) { // add lines in reverse order, so you don't have to read backwards
    		uPhr = userhist[i].split(";") // user phrase, load as array
    		newHistory(uPhr[0], false) // load only phrase (first item), false flag doesn't update history
    		//newHistory(userhist[i], false) // false flag doesn't update history after a new phrase is added
    		//console.log(i+": "+userhist[i])
		}
		
		Open_History() // update table after all lines are added
	}

	reader.onerror = (event) => {
		alert(event.target.error.name)
	};

	reader.readAsText(file) // issue command to start reading file
}

function dragOverHandler(ev) {
	//console.log('File(s) in drop zone')
	ev.preventDefault() // Prevent default drag behavior (Prevent file from being opened)
}

function saveHistory() {
	if (sHistory.length == 0) {
		alert("Can't save an empty table!")
		return
	}
	
	// table header (csv format, semicolon as separator)
	var t = "Word or Phrase"
	for (i = 0; i < ciphersOn.length; i++) {
		t += ";"+ciphersOn[i].Nickname // list of enabled ciphers
	}
	t += "\n" // line break
	
	// table contents
	for (i = 0; i < sHistory.length; i++) {
		t += sHistory[i].replace(";", "") // add phrase, remove semicolons (it is a separator)
		for (n = 0; n < ciphersOn.length; n++) {
			t += ";"+ciphersOn[n].Gematria(sHistory[i], 2, false, true) // gematria value for each enabled cipher
		}
		if (i+1 < sHistory.length) t += "\n" // line break, exclude last line
	}
	
	// phrases only
	//var t = ""
	//for (i = 0; i < sHistory.length-1; i++) {
	//	t += sHistory[i]+"\n"
	//}
	//t += sHistory[sHistory.length-1] // add last line manually, so there is no empty line
	
	t = 'data:text/plain;charset=utf-8,'+encodeURIComponent(t) // format as text file
	download(getTimestamp()+"_gematria.txt", t); // download file
}

function exportDatabaseCSV(phrArrData) {

	// table header (csv format, semicolon as separator)
	var t = "Word or Phrase"
	for (i = 0; i < ciphersOn.length; i++) {
		t += ";"+ciphersOn[i].Nickname // list of enabled ciphers
	}
	t += "\n" // line break
	
	// table contents
	for (i = 0; i < phrArrData.length; i++) {
		t += phrArrData[i].replace(";", "") // add phrase, remove semicolons (it is a separator)
		for (n = 0; n < ciphersOn.length; n++) {
			t += ";"+ciphersOn[n].Gematria(phrArrData[i], 2, false, true) // gematria value for each enabled cipher
		}
		if (i+1 < phrArrData.length) t += "\n" // line break, exclude last line
	}
	
	t = 'data:text/plain;charset=utf-8,'+encodeURIComponent(t) // format as text file
	download(getTimestamp()+"_gemDatabase.csv", t); // download file
}
