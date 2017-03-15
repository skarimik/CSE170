/* JavaScript code */
var time = 0;

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var x = 0;
var cam_video_id = "camsource";
var localstream;

var cam = null;

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();

}

function errorCallback(error) {
  alert('navigator.getUserMedia error: ', error);
}
function toggle(){
  var val;
  if(x == 0){
    x = 1;
    val = $('select#videoSource option:eq(1)').val()
    alert($('select#videoSource option:eq(1)').val())
    
  }
  else if(x == 1){
    x = 0
   
    val = $('select#videoSource option:eq(0)').val()
    alert($('select#videoSource option:eq(0)').val())
    
  }

  $('select#videoSource').val(val);
  starting();
}
function starting() {

  window.stream = null; // I might not need this here this is for the ap testing
  if (window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }

  var audioSource = audioSelect.value;
  var videoSource = videoSelect.value;
  var constraints = {
    audio: {
      optional: [{
        sourceId: audioSource
      }]
    },
    video: {
      optional: [{
        sourceId: videoSource
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}

audioSelect.onchange = starting;
videoSelect.onchange = starting;

function stopCamera(){

     window.stream.getTracks()[1].stop()
     window.stream = null;

  console.log("Vid off");

}
function startReading(){

    starting();
}
function stopReading(){
 
    elapseTime();
    cam.stop();
}
function startScan(){

    $('#capture').text('Scanning ');
    $('#capture').append('| <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> |');


    if(cam == null){

       cam = camera(cam_video_id);


    }

    cam.start();

}
function stopScan(){
    if(cam != null){
        $('#capture').text('Restart Scanning');
        $('#qr-value').text('You Need To Restart Scanning');
        $('#qr-value').attr('style','color:red');
        cam.stop();
        // elapseTime();
    }
    else{
        console.log("No camera is scanning");
    }
}

function elapseTime() {
      var elapse = new Date() - time; //gives elsapsed time
      console.log("elapse initial time ", time);
      // ga('send', 'timing', 'scan', elapse, elapse);
      console.log("elapse time ", elapse);
}

// AB TESTING FUNCTION
function timeABtest() {
  time = Math.round(new Date());
  console.log("initial time ", time);
}
