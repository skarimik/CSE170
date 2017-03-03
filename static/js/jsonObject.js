'use strict';

// Call this function when the page loads (the "ready" event)
// $(document).ready(function() {
//  	initializePageihtml();
//  	console.log("hello Soheil");
// })

/*
 * Function that is called when the document is ready.
 */
 var oneTimeToDo = 0;
function MakingTheButtonsReady() {
	if(oneTimeToDo == 0){
		
		$('#IndexaddEvents').click(addEventsHere);
		$('#SaveResultQR').click(insertTolist);
		oneTimeToDo = 1;
	}
	console.log("changing the click");
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

function insertTolist(e) {
	
	// Prevent following the link
	e.preventDefault();
	
	var URL = "/event"

	
	$.get(URL,insertingFunction);
	console.log("Url is: "+ URL);
}
function insertingFunction(result){
	var value = $('#qr-value').text();
	console.log(value);
	var parts = value.split('~');
	$('#eventSummery').val(parts[0]);
	$('#eventStartDateTime').val(parts[1]);
	$('#eventEndDateTime').val(parts[2]);
	$('#eventLocation').val(parts[3]);
	$('#eventDescription').val(parts[4]);
	//$('#thisIsNew').append("<h4><li>"+value+"</li></h4>");
	result[result.length] = value;
	alert("QR Event successfully scanned!");
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
