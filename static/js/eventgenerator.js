/******************************************************************************
 * File name: eventgenerator.js
 *
 *****************************************************************************/
 'use strict';

/*
 * this function prevents the date/time selectors from having an end time which comes before a start time
 */
$(function () {
    $('#datetimepicker6').datetimepicker();
    $('#datetimepicker7').datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $("#datetimepicker6").on("dp.change", function (e) {
        $('label[for=datetimepicker6]').css({color:'black'});
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function (e) {
        $('label[for=datetimepicker7]').css({color:'black'});
        $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    });
});


/*
 * QR Code: 
 * 
 * Include the following in index2.html:
 * <script type="text/javascript" src="js/jquery.qrcode.min.js"></script>
 * 
 * Create a DOM element: <div id="generatedQRcode"></div>
 * Add the qrcode to the container: 
 * jquery('#generatedQRcode').qrcode({width: , height: , text: "to specify QR dimensions"});
 * jquery('#generatedQRcode').qrcode("or simply text");
 *
 */

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
    initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
   
//    $('label[for=event_title]').css({color:'red'});
    $('#event_title').keypress(function(){
        $('label[for=event_title]').css({color:'black'});
    });

//    $('label[for=datetimepicker6]').css({color:'red'});
    $('#datetimepicker6').keypress(function(){
        $('label[for=datetimepicker6]').css({color:'black'});
    });

//    $('label[for=datetimepicker7]').css({color:'red'});
    $('#datetimepicker7').keypress(function(){
        $('label[for=datetimepicker7]').css({color:'black'});
    });

//    $('label[for=event_location]').css({color:'red'});
    $('#event_location').keypress(function(){
        $('label[for=event_location]').css({color:'black'});
    });

//    $('label[for=event_description]').css({color:'red'});
    $('#event_description').keypress(function(){
        $('label[for=event_description]').css({color:'black'});
    });

    $('#generateQRButton').click(generateQR);

}


function generateQR(e) {
    e.preventDefault();

    var qrcodeTitle = $('#event_title').val();
    var qrcodeStartTime = $('#datetimepicker6').data().date;
    var qrcodeEndTime = $('#datetimepicker7').data().date;
    
    var qrcodeLocation = $('#event_location').val();
    var qrcodeDescription = $('#event_description').val();
    var qrcodeURL = $('#event_url .form-control').val();

    // check that inputs are filled: if not, change corresponding field title red
    if (qrcodeTitle === "") {
        $('label[for=event_title]').css({color:'red'});
        $('#event_title').focus();
        return false;
    }
    if (typeof qrcodeStartTime === "undefined") {
        $('label[for=datetimepicker6]').css({color:'red'});
        $('#datetimepicker6').focus();
        return false;
    }
    if (typeof qrcodeEndTime === "undefined") {
        $('label[for=datetimepicker7]').css({color:'red'});
        $('#datetimepicker7').focus();
        return false;
    }
    if (qrcodeLocation === "") {
        $('label[for=event_location]').css({color:'red'});
        $('#event_location').focus();
        return false;
    }
    if (qrcodeDescription === "") {
        $('label[for=event_description]').css({color:'red'});
        $('#event_description').focus();
        return false;
    }

    // change start date formatting --> deconstruct date object into its components
    var startMonth = qrcodeStartTime.substring(0,2);
    var startDay = qrcodeStartTime.substring(3,5);
    var startYear = qrcodeStartTime.substring(6, 10);

    var startHour = qrcodeStartTime.substring(11, 13);
    if (startHour[1] === ":") {
        startHour = startHour[0];
        var startMinutes = qrcodeStartTime.substring(13, 15);
        var startamPM = qrcodeStartTime.substring(16, 18);
    }
    else {
        var startMinutes = qrcodeStartTime.substring(14, 16);
        var startamPM = qrcodeStartTime.substring(17, 19);
    }


    // change end date formatting --> deconstruct date object into its components
    var endMonth = qrcodeEndTime.substring(0,2);
    var endDay = qrcodeEndTime.substring(3,5);
    var endYear = qrcodeEndTime.substring(6, 10);

    var endHour = qrcodeEndTime.substring(11, 13);
    if (endHour[1] === ":") {
        endHour = endHour[0];
        var endMinutes = qrcodeEndTime.substring(13, 15);
        var endamPM = qrcodeEndTime.substring(16, 18);
    }
    else {
        var endMinutes = qrcodeEndTime.substring(14, 16);
        var endamPM = qrcodeEndTime.substring(17, 19);
    }

    // convert to 24hr time
    if (startamPM === "PM") {
        if (startHour != "12") 
            startHour = parseInt(startHour) + 12;
    }
    else if (startamPM === "AM" && startHour === "12")
        startHour = "00";
    if (endamPM === "PM") {
        if (endHour != "12") 
            endHour = parseInt(endHour) + 12;
    }
    else if (endamPM === "AM" && endHour === "12")
        endHour = "00";

    // combine into proper format:
    if (startHour.length === 1) 
        startHour = "0" + startHour;
    var fullStartTime = startHour + ':' + startMinutes + ':00';
    var formattedStartDate = startYear + '-' + startMonth + '-' + startDay + 'T'
        + fullStartTime;

    if (endHour.length === 1)
        endHour = "0" + endHour;
    var fullEndTime = endHour + ':' + endMinutes + ':00';
    var formattedEndDate = endYear + '-' + endMonth + '-' + endDay + 'T'
        + fullEndTime;

    // if no url, ignore:
    if (typeof qrcodeURL === "undefined") {
        var qrcodeFullText = qrcodeTitle + '~' + formattedStartDate + '~' + formattedEndDate
            + '~' + qrcodeLocation + '~' + qrcodeDescription;
    }
    else {
        var qrcodeFullText = qrcodeTitle + '~' + formattedStartDate +  '~' + formattedEndDate
            + '~' + qrcodeLocation + '~' + qrcodeDescription + '~' + qrcodeURL;
    }

    console.log('Printing qrcode text' + qrcodeFullText);
/*
    var x = jQuery("#generatedQRCode").qrcode({width: 200, height: 200, text:qrcodeFullText});

    $('#generatedQRCode canvas').click(function() {
        var qrDownload = $('#generatedQRCode canvas')[0]
        qrDownload = qrDownload.toDataURL("image/png");
        //document.write('<img src="'+img+'"/>');
        //qrDownload = qrDownload.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        $('#generatedQRCode canvas').attr('href',qrDownload);
    });
*/
    jQuery('#generatedQRCode').qrcode({width: 200, height: 200, text:qrcodeFullText});
    $("#generatedQRCode canvas").css("margin", "auto");
//    $("#qrImage").attr("src", $("#generatedQRCode").src);
    $('#qrDescription').html("");
    $('#qrDescription').html("If your browser has not downloaded the image \"qrcode.png\", take a screenshot to save");
    $('#qrTitle').html("");
    $('#qrTitle').html("Your EventQR for the \"" + qrcodeTitle + "\" Event");
    


    // $('#generatedQRCode').attr('src', qrcodeImage.src);
    // $('#generatedQRCode').prepend($('img')).attr('src', qrcodeImage);
    // /*
    //  * this logic links the download selector and the image div
    //  */

    // var qrImageLink = document.createElement('a');
    // // don't show the link on the page
    // qrImageLink.style = "display: none";
    // qrImageLink.href = "data:application/octet-stream," + encodeURIComponent(qrcodeImage);
    // qrImageLink.download = qrcodeTitle + '.jpg';
    // document.body.appendChild(qrImageLink);
    // qrImageLink.click();
    // document.body.removeChild(qrImageLink);

}

