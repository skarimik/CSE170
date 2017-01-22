'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$("#testjs").click(function(e) {
		$('.jumbotron h1').text("Javascript is connected");
	});

	// Add any additional listeners here
	// example: $("#div-id").click(functionToCall);
	$("a.thumbnail").click(projectClick);
}
function projectClick(e){
	e.preventDefault();
	var projectTitle = $(this).find("p").text();
	var jumbotroneHeader = $('.jumbotron h1');
	jumbotroneHeader.text(projectTitle);
	$(this).css("background-color", "#7fff00");
}