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
		
		drawText(canvas, context);
		drawBird(canvas, context);
				
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
	var width = Math.floor(Math.random() * 20);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.fillStyle = "#ccccff";
	context.fillRect(x, y, width, width);
}

function drawCircle(canvas, context) {
	var radius = Math.floor(Math.random() * 20);
	var x = Math.floor(Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	context.beginPath();
	context.arc(x, y, radius, 0, degreesToRadians(360), true);
	context.fillStyle = "lightblue";
	context.fill();
}

function drawText(canvas, context) {
	var selectObj = document.getElementById("foregroundColor");
	var index = selectObj.selectedIndex;
	var fgColor = selectObj[index].value;
	
	context.fillStyle = fgColor;
	context.font = "bold 1em sans-serif";
	context.textAlign = "left";
	context.fillText("I saw this tweet", 20, 40);
	
	var selectObj = document.getElementById("tweets");
	var index = selectObj.selectedIndex;
	var tweet = selectObj[index].value;
	context.font = "italic 1.2em serif";
	context.fillText(tweet, 30, 100);

	context.font = "bold 1em sans-serif";
	context.textAlign = "right";
	context.fillText("and all I got was this lousy t-shirt!", canvas.width-20, canvas.height-40);

}

function drawBird(canvas, context) {
	var twitterBird = new Image();
	twitterBird.src = "twitterBird.png";
	twitterBird.onload = function() {
		context.drawImage(twitterBird, 20, 120, 70, 70);
	}
}

function degreesToRadians(degrees) {
	return (degrees * Math.PI)/180;
}

function updateTweets(tweets) {
	var tweetsSelection = document.getElementById("tweets");
	for (var i = 0; i < tweets.length; i++) {
		tweet = tweets[i];
		var option = document.createElement("option");
		option.text = tweet.text;
		option.value = tweet.text.replace("\"", "'");
		tweetsSelection.options.add(option);
	}
	tweetsSelection.selectedIndex = 0;
}

function fillBackground(canvas, context) {
	var selectObj = document.getElementById("backgroundColor");
	var index = selectObj.selectedIndex;
	var bgColor = selectObj.options[index].value;
	context.fillStyle = bgColor;
	context.fillRect(0, 0, canvas.width, canvas.height);
}