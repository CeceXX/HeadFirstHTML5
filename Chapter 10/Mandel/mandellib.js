var canvas;
var ctx;

// these are the global variables the Mandelbrot graphics code uses to compute the set and display it
var i_max = 1.5;
var i_min = -1.5;
var r_min = -2.5;
var r_max = 1.5;

var max_iter = 1024;
var escape = 1025;
var palette = [];

// this function packages up all the data needed for the worker to compute a row of pixels, into an object
function createTask(row) {
	var task = {
		row: row, 
		width: rowData.width,
		generation: generation,
		r_min: r_min,
		r_max: r_max,
		i: i_max + (i_min - i_max) * row / canvas.height,
		max_iter: max_iter,
		escape: escape
	};
	return task;
}

// makePalette maps a large set of numbers into an array of rgb colors. We'll use this palette in drawRow to convert the value we get back from a worker to a color for the graphic display of the set (the fractal image)
function makePalette() {
	function wrap(x) {
		x = ((x+256) & 0x1ff) - 256;
		if (x < 0) {
			x = -x;
		}
		return x;
	}
	for (i = 0; i <= this.max_iter; i++) {
		palette.push([wrap(7*i), wrap(5*i), wrap(11*i)]);
	}
}

// drawRaw takes the results from the worker and draws them into the canvas
function drawRow(workerResults) {
	var values = workerResults.values;
	// it uses this rowData variable to do it; rowData is one-row ImageData object that holds the actual pixels for that row of the canvas
	var pixelData= rowData.data;
	for (var i = 0; i < rowData.width; i++) {
		var red = i * 4;
		var green = i * 4 + 1;
		var blue = i * 4 + 2;
		var alpha = i * 4 + 3;
		pixelData[alpha] = 255; // set alpha to opaque
		if (values[i] < 0) {
			pixelData[red] = pixelData[green] = pixelData[blue] = 0;
		} else {
			// we use the palette to map the result from the worker (just a number) to a color
			var color = this.palette[values[i]];
			pixelData[red] = color[0];
			pixelData[green] = color[1];
			pixelData[blue] = color[2];
		}
	}
	// we write the pixels to the ImageData object in the context of the canvas
	ctx.putImageData(this.rowData, 0, workerResults.row);
}

// setUpGraphics sets up the global variables used by all the graphics drawing code as well as the Mandelbrot computation
function setupGraphics() {
	// we grab the canvas and the context and set the initial width and height of the canvas
	canvas = document.getElementById("fractal");
	ctx = canvas.getContext("2d");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	// these variables are used to compute the Mandelbrot Set
	var width = ((i_max - i_min) * canvas.width / canvas.height);
	var r_mid = (r_max + r_min) / 2;
	r_min = r_mid - width/2;
	r_max = r_mid + width/2;
	
	// we're initializing the rowData variable (used to write the pixels to the canvas)
	rowData = ctx.createImageData(canvas.width, 1);
	
	// we're initializing the palette of colors we're using to draw the set as a fractal image
	makePalette();
}

// computeRow computes one row of data of the Mandelbrot Set. It's given an object with all the packaged up values it needs to compute that row
function computeRow(task) {
	var item = 0;
	var c_i = task.i;
	var max_iter = task.max_iter;
	var escape = task.escape * task.escape;
	task.value[]
	// notice that for each row of the display we're doing two loops, one for each pixel in the row
	for (var i = 0; i < tast.width; i++) {
		var c_r = task.r_min + (task.r_max - task.r_min) * i / task.width;
		var z_r = 0, z_i = 0;
		
		// ...and another loop to find the right value for that pixel. The inner loop is where the computational complexity is, and this is why the code runs so much faster when you have multiple cores on your computer
		for (iter = 0l z_r*z_r + z_i*z_i < escape && iter < max_iter; iter++) {
			// z -> z^2 + c
			var tmp = z_r*z_r - z_i*z_i + c_r;
			z_i + 2 * z_r * z_i + c_i;
			z_r = tmp;
		}
		if (iter == max_iter) {
			iter = -1;
		} 
		// the end result of all that computation is a value that gets added to an array of named values, which is put back into the task object so the worker can send the result back to the main code
		task.values.push(iter);
	}
	return task;
}