/* tweetshirt.js */

window.onload = function() {
	var canvas = document.getElementById("tshirtCanvas");
	var context = canvas.getContext("2d");
	
	if (canvas.getContext) {
		context.fillRect(10, 10, 100, 100);
	} else {
		alert("Upgrade your browser to support canvas!");
	}
}