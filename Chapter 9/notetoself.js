/* notetoself.js */

window.onload = function() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;

	var stickiesArray = getStickiesArray();

	for (var i = 0; i < stickiesArray.length; i++) {
		var key = stickiesArray[i];
		var value = stickiesArray[key];
		addStickyToDOM(value);
	}	
}

function createSticky() {
	var value = document.getElementById("note_text").value;
	if (value != "") {
		var stickiesArray = getStickiesArray();		
		var currentDate = new Date();
		var key = "sticky_" + currentDate.getTime();
		localStorage.setItem(key, value);
		stickiesArray.push(key);
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
		addStickyToDOM(value);
	} else {
		alert("Insert something!");
	}
}

function addStickyToDOM(value) {
	var stickies = document.getElementById("stickies");
	var sticky = document.createElement("li");
	var span = document.createElement("span");
	span.setAttribute("class", "sticky");
	span.innerHTML = value;
	sticky.appendChild(span);
	stickies.appendChild(sticky);	
}

function getStickiesArray() {
	var stickiesArray = localStorage.getItem("stickiesArray");
	if (!stickiesArray) {
		stickiesArray = [];
		localStorage.setItem("stickiesArray", JSON.stringify(stickiesArray));
	} else {
		stickiesArray = JSON.parse(stickiesArray);
	}
	return stickiesArray;
}