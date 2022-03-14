// Matrix code rain (HTML5 canvas)

var height_html = $(window).height();

const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");

// set the width and height of the canvas
const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = height_html;

// draw a plain color rectangle of width and height same as that of the canvas
ctx.fillStyle = '#202020';
ctx.fillRect(0, 0, w, h);

const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

var code_rain; // var to clear interval
var code_rain_active = false; // current state (bugfix for 'Option' menu)
if (!opt_MatrixCodeRain) code_rain_active = true; // if code rain is initially disabled
  
function matrix() {

	// Draw a semitransparent black rectangle on top of previous drawing
	ctx.fillStyle = "#0001"; // rgba(0,0,0,0.04) - leaves traces of dark rows
	ctx.fillRect(0, 0, w, h);

	// Set color to green and font to 15pt monospace in the drawing context
	ctx.fillStyle = "#004400";
	ctx.font = "15pt monospace";

	// for each column put a random character at the end
	ypos.forEach((y, ind) => {
		// generate a random character
		//const text = Math.floor(Math.random() * 10);
		const text = String.fromCharCode(Math.random() * 128);

		// x coordinate of the column, y coordinate is already given
		const x = ind * 20;
		// render the character at (x, y)
		ctx.fillText(text, x, y);

		// randomly reset the end of the column if it's at least 100px high
		if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
		// otherwise just move the y coordinate for the column 20px down,
		else ypos[ind] = y + 20;
	});
}

function toggle_code_rain() {
	if (opt_MatrixCodeRain && !code_rain_active) {
		code_rain = setInterval(matrix, 50)
		document.getElementById("canv").style.display = ""
		code_rain_active = true
	} else if (!opt_MatrixCodeRain && code_rain_active) {
		clearInterval(code_rain);
		ctx.fillStyle = "#202020" // static bg
		ctx.fillRect(0, 0, w, h)
		document.getElementById("canv").style.display = "none"
		code_rain_active = false
	}
}

toggle_code_rain(); // check if enabled by default on page load