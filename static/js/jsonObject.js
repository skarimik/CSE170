'use strict';

// Call this function when the page loads (the "ready" event)
// $(document).ready(function() {
// 	initializePageihtml();
// })

/*
 * Function that is called when the document is ready.
 */
function initializePageihtml() {
		$('#IndexaddEvents').click(addEventsHere);
}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addEventsHere(e) {
	// Prevent following the link
	e.preventDefault();

	var URL = "/event"

	
	$.get(URL,AddingEventFunction);
	console.log("Url is: "+ URL);
}



/*
* The call back function
*/
function AddingEventFunction(result){
	console.log("we are adding to the page");
	console.log(result);
	var h1Id = '#IndexNewEvent';
	var x = 0;
	var string;
	while(x<result.length){
		string = string + "<h4> Title: "+result[x]['title']+"</h4>"
		+ "<img src = '"+result[x]['image']+"'class ='detailsImage'/>"
		+"<div>Summary: "+result[x]['summary']+"</div>";
		x++;
	}
	
	$(h1Id).html(string);	
	
}
