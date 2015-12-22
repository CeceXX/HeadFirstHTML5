/* myLoc.js */

window.onload = function() {
	if (navigator.geolocation) {
		assignHandlersToButtons();
	} else {
		alert("Oops, no geolocation support");
	}
};

function assignHandlersToButtons() {
	var getCurrentPositionButton = document.getElementById("getPosition");
	getCurrentPositionButton.onclick = getCurrentPosition;
	var watchButton = document.getElementById("watch");
	watchButton.onclick = watchLocation;
	var clearWatchButton = document.getElementById("clearWatch");
	clearWatchButton.onclick = clearWatch;
}

var options = {enableHighAccuracy: true, timeout: 100, maximumAge: 0};

function getCurrentPosition() {
	navigator.geolocation.getCurrentPosition(
		displayLocation,
		displayError,
		options
	);
}

function watchLocation() {
	watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
}

var map;
var prevCoords = null;

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", longitude: " + longitude + " (with " + position.coords.accuracy + " meters accuracy)." + " Found in " + options.timeout + " milliseconds";
	var ourCoords = {
		latitude: 47.624851,
		longitude: -122.52099
	};
	var km = computeDistance(position.coords, ourCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from WickedlySmart HQ";
	if (map == null) {
		showMap(position.coords);
		prevCoords = position.coords;
	} else {
		var meters = computeDistance(position.coords, prevCoords) * 1000;
		if (meters > 20) {
			scrollMapToPositionAndAddMarker(position.coords);
			prevCoords = position.coords;
		}
	}
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	var radiusEarth = 6371;
	return Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + Math.cos(startLatRads) * Math.cos(destLatRads) * Math.cos(startLongRads - destLongRads)) * radiusEarth;
}

function degreesToRadians(degrees) {
	return (degrees * Math.PI) / 180;
}

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
	var title = "Your Location";
	var content = "You are here: " + coords.latitude + ", " + coords.longitude;
	addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
	var markerOptions = {
		position: latlong,
		map: map,
		title: title,
		clickable: true
	};
	var marker = new google.maps.Marker(markerOptions);
	var infoWindowOptions = {
		content: content,
		position: latlong
	};
	var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	google.maps.event.addListener(marker, "click", function() {
		infoWindow.open(map);
	});
}

function scrollMapToPositionAndAddMarker(coords) {
	var latitude = coords.latitude;
	var longitude = coords.longitude;
	var latlong = new google.maps.LatLng(latitude, longitude);
	map.panTo(latlong);
}

var watchId = null;

function clearWatch() {
	if (watchId != null) {
		navigator.geolocation.clearWatch(watchId);
		watchId = null;
	}
}

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code === 0 || error.code == 2) {
		errorMessage = errorMessage + "" + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
	options.timeout += 100;
	navigator.geolocation.getCurrentPosition(
		displayLocation,
		displayError,
		options
	);
	div.innerHTML += " ... checking again with timeout=" + options.timeout;
}