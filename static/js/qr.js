

function read(a)
{

    $("#qr-value").text(a);
    alert("we are in read");
    stopReading();

}
    
qrcode.callback = read;