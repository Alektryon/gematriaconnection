$(document).ready(function(){
	
	$("#Highlight").bind('contextmenu', function() { // ".bind" for existing elements, ".live" for future
		show_hltPanel();
		show_overlay();
		return false; // don't show menu
	});
	
	$("#overlay").click(function () {
		hide_overlay();
		hide_hltPanel();
	});
	
});

function show_overlay() {
  document.getElementById("overlay").style.display = "block";
}

function hide_overlay() {
  document.getElementById("overlay").style.display = "none";
}

function show_hltPanel() {
	var panel = document.getElementById("highlight_panel")
	
	var o = ""
	
	o += '<div class="overlay-inner">'
	o += '<p class="top-bar">test</p>'
	o += '<input type="text" id="overlayform" name="test" placeholder="something">'
	o += '</div>'
	
	console.log(o)
	panel.innerHtml = o
	panel.style.display = ""
}

function hide_hltPanel() {
	document.getElementById("highlight_panel").style.display = "none";
}