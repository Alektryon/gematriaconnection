// var element = $(".ChartTable"); // global variable
// var getCanvas; // global variable

function addScrInterface() {
	var ScrInt = document.getElementById("screenshotToolbar");
	
	// buttons
	var o = '<input id="btn-print-cipher-png" type="button" value="Print Cipher Table" />' // cipher breakdown preview
	o += '<input id="btn-print-history-png" type="button" value="Print History Table" />' // history table preview
	o += '<input id="btn-print-word-break-png" type="button" value="Print Word Breakdown" />' // print word breakdown table
	o += '<input id="btn-save-history-png" type="button" value="Save History (CSV)" />' // save history as text file
	//o += '<input id="btn-save-png" type="button" value="Save Image" </>' // save image
	
	ScrInt.innerHTML = o
}

//$("#btn-Preview-Image").on('click', function () {
$("body").on("click", "#btn-print-cipher-png", function () { // for future elements
	var el	= "";
	if ( $( "#ChartTable" ).length ) { // if element exists
		el = "#ChartTable";
	}
	if ( $( "#ChartTableThin" ).length ) {
		el = "#ChartTableThin";
	}
	if (el == "") { return; } // do nothing
	open_img_window(el);
});

$("body").on("click", "#btn-print-history-png", function () {
	open_img_window("#HistoryTable_scr");
});

$("body").on("click", "#btn-print-word-break-png", function () {
	// open_img_window(".BreakTable");
	open_img_window(".printBreakTable");
});

$("body").on("click", "#btn-save-history-png", function () {
	saveHistory();
});

//$("body").on("click", "#btn-save-png", function () {
//	console.log("download");
//	var imageData = getCanvas.toDataURL("image/png");
//	// Now browser starts downloading it instead of just showing it
//	var newData = imageData.replace(/^data:image\/png/, "data:application/octet-stream");
//	// $("#btn-Convert-Html2Image").attr("download", Date.now()+".png").attr("href", newData); // for <a> element
//	download(Date.now()+".png", newData);
//});

function download(fileName, fileData) {

	//creating an invisible element
	var element = document.createElement('a');
	
	//element.setAttribute('href', 'data:text/plain;charset=utf-8, '+encodeURIComponent(filedata));
	element.setAttribute('href', fileData);
	element.setAttribute('download', fileName);

	// Above code is equivalent to
	// <a href="path of file" download="file name">

	document.body.appendChild(element);

	//onClick property
	element.click();

	document.body.removeChild(element);
}

function open_img_window(element) {
	var imageURL,imgName, wnd
	if ( $(element).length ) { // if specified element exists
		html2canvas($(element)[0], {allowTaint: true, backgroundColor: "rgba(30,30,30,0)", width: $(element).outerWidth(), height: $(element).outerHeight()} ).then((canvas) => { // e.g. html2canvas($("#ChartTable")[0]).then ...
			//allowTaint: true, backgroundColor: "rgba(0,0,0,0)" - render white bg as transparent
			//width: $(element).width(), height: $(element).height() - get proper element dimensions
			//console.log("done ... ");
			//$("#previewImage").append(canvas);
			
			imageURL = canvas.toDataURL("image/png"); // canvas to "data:image/png;base64, ..."
			imgName = getTimestamp()+".png"; // filename for download button

			wnd = window.open(""); // open new window
			// add download button and image data inside centered <div>
			wnd.document.body.innerHTML = "<div style='max-height: 100%; max-width: 100%; position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%,-50%); transform: translate(-50%,-50%);'><center><br><a href='"+imageURL+"' download='"+imgName+"' style='font-family: arial, sans-serif; color: #dedede' >Download</a></center><br><img src="+canvas.toDataURL("image/png")+"></div>";
			wnd.document.body.style.backgroundColor = "#000000"; // black background
		});
	}
}

function getTimestamp() {
	var ts = new Date().toISOString() // 2016-02-18T23:59:48.039Z
	var regexp = new RegExp("\\..*?$", 'g') // remove all after dot
	ts = ts.replace("T", "_").replaceAll(/:/g, "-").replace(regexp, "") // format
	//console.log(ts)
	return ts
}

addScrInterface();