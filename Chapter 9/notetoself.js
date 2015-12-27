/* notetoself.js */

localStorage.setItem("sticky_0", "Pick up dry cleaning");
localStorage.setItem("sticky_1", "Cancel cable tv, who needs it now?");

for (var i = 0; i < localStorage.length; i++) {
	var key = localStorage.key(i);
	var value = localStorage[key];
	alert(value);
}