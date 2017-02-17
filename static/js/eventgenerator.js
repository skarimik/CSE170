// eventgenerator.js


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



var qrcodeText = 

jQuery('#generatedQRcode').qrcode({width: 150, height: 150, text:"sample qr code"});
