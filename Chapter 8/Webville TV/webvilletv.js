/* webville.js */

var position = 0;
var playlist;
var playlistNames;
var video;

window.onload = function() {
	playlist = ["video/preroll",
				"video/areyoupopular",
				"video/destinationearth"];
	playlistNames = ["Preroll",
					 "Are you popular?",
					 "Destination Earth"];
	video = document.getElementById("video");
	video.addEventListener("ended", nextVideo, false);
	video.addEventListener("play", updateProgramName, false);
	video.src = playlist[position] + getFormatExtension();
	video.load();
	video.play();
	video.addEventListener("error", errorHandler, false);
	assignImagesToButtons();
}

function nextVideo() {
	position++;
	if (position >= playlist.length) {
		position = 0;
	}
	video.src = playlist[position] + getFormatExtension();
	video.load();
	video.play();
}

function getFormatExtension() {
	if (video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} else if (video.canPlayType("video/webm") != "") {
		return ".webm";
	} else if (video.canPlayType("video/ogg") != "") {
		return ".ogv";
	}
}

function errorHandler() {
	var video = document.getElementById("video");
	if (video.error) {
		video.poster = "images/technicaldifficulties.jpg";
		alert(video.error.code);
	}
}

function updateProgramName() {
	var p = document.getElementById("programName");
	p.innerHTML = playlistNames[position];
}

function assignImagesToButtons() {
	var playButton = document.getElementById("playButton");
	playButton.style.backgroundImage = "url(images/playButton.png)"; 
}