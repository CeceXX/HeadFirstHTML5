/* notetoself.js */

window.onload = function() {
	for (var i = 0; i < localStorage.length; i++) {
		var key = localStorage.key(i);
		if (key.substring(0, 6) == "sticky") {
			var value = localStorage.getItem(key);
			addStickyToDOM(value);
		}
		var value = localStorage[key];
	}	
}

localStorage.setItem("sticky_0", "Pick up dry cleaning");
localStorage.setItem("sticky_1", "Cancel cable tv, who needs it now?");
