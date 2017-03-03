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
        $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function (e) {
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
    $('#generateQRButton').click(generateQR);
}


function generateQR(e) {
    e.preventDefault();

    var qrcodeTitle = $('#event_title').val();
    var qrcodeStartTime = $('#datetimepicker6').data().date;
    var qrcodeEndTime = $('#datetimepicker7').data().date;
    
    var qrcodeLocation = $('#event_location').val();
    var qrcodeDescription = $('#event_description').val();
    var qrcodeURL = $('#event_URL').val();

    // check that inputs are filled: if not, change corresponding field title red
    if (qrcodeTitle === "") {
        $('label[for=event_title]').css({color:'red'});
        $('#event_title').focus();
        return false;
    }
    if (qrcodeStartTime === "") {
        $('label[for=datetimepicker6]').css({color:'red'});
        $('#datetimepicker6').focus();
        return false;
    }
    if (qrcodeEndTime === "") {
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
    // if no url, ignore:
    if (qrcodeURL === "") {
        var qrcodeFullText = qrcodeTitle + '~' + qrcodeStartTime
            + '~' + qrcodeEndTime + '~' + qrcodeLocation
            + '~' + qrcodeDescription;
    }
    else {
        var qrcodeFullText = qrcodeTitle + '~' + qrcodeStartTime
            + '~' + qrcodeEndTime + '~' + qrcodeLocation
            + '~' + qrcodeDescription + '~' + qrcodeURL;
    }

    console.log('Printing qrcode text' + qrcodeFullText);
    jQuery("#generatedQRCode").qrcode({width: 200, height: 200, text:qrcodeFullText});

    $('#generatedQRCode canvas').click(function() {
        var qrDownload = $("#generatedQRCode")
        qrDownload = qrDownload.toDataURL("image/png");
        qrDownload = qrDownload.replace(/^data:image\/[^;]/, 'data:application/octet-stream');
        this.href = qrDownload;
    });

    
    $('#qrDescription').html("");
    $("#qrDescription").html("Press and hold the image to save to your mobile");
    
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

