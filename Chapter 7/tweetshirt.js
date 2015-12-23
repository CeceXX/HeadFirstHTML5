/* tweetshirt.js */

window.onload = function() {
	var button = document.getElementById("previewButton");
	button.onclick = previewHandler;
}

function previewHandler() {
	var canvas = document.getElementById("tshirtCanvas");
	
	if (canvas.getContext) {
		var context = canvas.getContext("2d");
		var selectObj = document.getElementById("shape");
		var index = selectObj.selectedIndex;
		var shape = selectObj[index].value;
		
		if (shape == "squares") {
			for (var squares = 0; squares < 20; squares++) {
				drawSquare(canvas, context);
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
	context.fillStyle = "lightblue";
	context.fillRect(x, y, width, width);
}