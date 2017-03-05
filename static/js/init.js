/* JavaScript code */


var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var cam_video_id = "camsource"
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

  if (window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }

  var audioSource = audioSelect.value;
  var videoSource = videoSelect.value;//sources[1].id
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

    $('#capture').text("Scanning");
    if(cam == null){
      
       cam = camera(cam_video_id);


    }

    cam.start();
    
}
