/* tweetshirt.js */

window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
}

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	
	if (canvas.getContext) {		
		var context = canvas.getContext("2d");
		fillBackground(canvas, context);		
		var selectObj = document.getElementById("shape");
		var index = selectObj.selectedIndex;
		var shape = selectObj[index].value;
		
		if (shape == "squares") {
			for (var squares = 0; squares < 20; squares++) {
				drawSquare(canvas, context);
			}
		} else if (shape == "circles") {
			for (var squares = 0; squares < 20; squares++) {
				drawCircle(canvas, context);
			}
		}
		
	} else {
		alert("Upgrade your browser to support canvas!");
	}	
}

function drawSquare(canvas, context) {
	var width = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.fillStyle = "#ccccff";
	context.fillRect(x, y, width, width);
}

function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 40);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);
	context.fillStyle = "lightblue";
	context.fill();
}

function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}


function fillBackground(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj.options[index].value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}