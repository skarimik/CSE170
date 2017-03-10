

function read(a)
{
	 var parts = a.split('~');
	$('#eventSummary').val(parts[0]);
	$('#eventStartDateTime').val(parts[1]);
	$('#eventEndDateTime').val(parts[2]);
	$('#eventLocation').val(parts[3]);
	$('#eventDescription').val(parts[4]);
	$('#firstEl').text("Event Summary: "+parts[0]);
	$('#secondEl').text("Start Date: "+parts[1]);
	$('#thirdEl').text("End Date: "+parts[2]);
	$('#fourthEl').text("Location: "+(parts[3]);
	$('#fifthEl').text("Description: "+parts[4]);
  
    $('#capture').text("Restart Scanning");
    stopReading();
    alert("Scanning Completed");

}
    
qrcode.callback = read;