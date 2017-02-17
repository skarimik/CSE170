// eventgenerator.js


/*
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
*/

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
    $('#qrButton').click(generateQR);
}



function generateQR(e) {
    e.preventDefault();
    var qrcodeTitle = $('#event_title').val();
   // var qrcodeStartTime = $('#datetimepicker6').val();
   // var qrcodeEndTime = $('#datetimepicker7').val();
    var qrcodeLocation = $('#event_location').val();
    var qrcodeDescripion = $('#event_description').val();
    var qrcodeURL = $('#event_URL').val();
    var qrcodeFullText = qrcodeTitle + '%'
        + '%' + qrcodeLocation + '%' + qrcodeDescripion + '%' + qrcodeURL;

    var qrcodeImage = jquery('#generatedQRcode').qrcode({width: 150, height: 150, text:qrcodeFullText});
    $('#generatedQRcode:').prepend($('img')).attr('src', qrcodeImage);
}

