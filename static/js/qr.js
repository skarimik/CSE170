

function read(a)
{

    $("#qr-value").text(a);
    stopReading();

}
    
qrcode.callback = read;