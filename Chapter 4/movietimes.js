function Movie(title, genre, rating, showtimes) {
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.showtimes = showtimes;
	this.getNextShowing = function() {
		var now = new Date().getTime();
		for (var i = 0; i < this.showtimes.length; i++) {
			var showtime = getTimeFromString(this.showtimes[i]);
			if ((showtime - now) > 0) {
				return "Next showing of " + this.title + " is " + this.showtimes[i];
			}
		}
	};
}


var movie1 = {
	title: "Plan 9 from Outer Space",
	genre: "Cult Classic",
	rating: 2,
	showtimes: ["3:00pm", "7:00pm", "11:00pm"],
};

var movie2 = {
	title: "Forbidden Planet",
	genre: "Classic Sci-fi",
	rating: 5,
	showtimes: ["5:00pm", "9:00pm"],
};
			
function getTimeFromString(timeString) {
	var theTime = new Date();
	var time = timeString.match(/(\d+)(?::(\d\d))?\s*(p?)/);
	theTime.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
	theTime.setMinutes(parseInt(time[2]) || 0);
	return theTime.getTime();
}

var movie1 = new Movie("Plan 9 from Outer Space", "Cult Classic", 2, ["3:00pm", "7:00pm", "11:00pm"]);
var movie2 = new Movie("Forbidden Planet", "Classic Sci-fi", 5, ["5:00pm", "9:00pm"]);
var movie3 = new Movie("BanzaiMovie", "Cult Classic", 5, ["1:00pm", "5:00pm", "7:00pm", "11:00pm"])
alert(movie1.getNextShowing());
alert(movie2.getNextShowing());
alert(movie3.getNextShowing());