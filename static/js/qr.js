

function read(a)
{

    $("#qr-value").text(a);
    $('#capture').text("Restart Scanning");
    stopReading();

}
    
qrcode.callback = read;