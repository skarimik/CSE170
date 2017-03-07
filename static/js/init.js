/* JavaScript code */
var time = 0;

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

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
        $('#capture').text('Start Scanning');
        $('#qr-value').text('');
        cam.stop();
        elapseTime();
    }
    else{
        console.log("No camera is scanning");
    }
}

function elapseTime() {
      var elapse = new Date() - time; //gives elsapsed time
      ga('send', 'timing', 'JS Dependencies', elapse);
}

// AB TESTING FUNCTION
function timeABtest() {
  time = Math.round(new Date());
}
