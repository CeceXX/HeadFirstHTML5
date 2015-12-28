/* notetoself.js */

window.onload = function() {
	var button = document.getElementById("add_button");
	button.onclick = createSticky;
	
	for (var key in localStorage) {	
		if (key.substring(0, 6) == "sticky") {
			var value = localStorage.getItem(key);
			addStickyToDOM(value);
		}
		var value = localStorage[key];
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

function createSticky() {
	var value = document.getElementById("note_text").value;
	if (value != "") {
		var key = "sticky_" + localStorage.length;
		localStorage.setItem(key, value);
		addStickyToDOM(value);
	} else {
		alert("Insert something!");
	}
}

localStorage.setItem("sticky_0", "Pick up dry cleaning");
localStorage.setItem("sticky_1", "Cancel cable tv, who needs it now?");
