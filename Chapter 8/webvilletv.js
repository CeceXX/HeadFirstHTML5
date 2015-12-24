var position = 0;
var playlist;
var video;

window.onload = function() {
	playlist = ["video/preroll.mp4",
				"video/areyoupopular.mp4",
				"video/destinationearth.mp4"];
	video = document.getElementById("video");
	video.addEventListener("ended", nextVideo, false);
	video.src = playlist[position];
	video.load();
	video.play();
}

function nextVideo() {
	position++;
	if (position >= playlist.length) {
		position = 0;
	}
	video.src = playlist[position];
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