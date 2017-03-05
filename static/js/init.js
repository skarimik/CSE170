/* JavaScript code */


var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var cam_video_id = "camsource"
var localstream;

function xabc(){
     // Assign the <video> element to a variable
    var video = document.getElementById(cam_video_id);
    var options = {
        "audio": false,
        "video": true
    };
    // Replace the source of the video element with the stream from the camera
    if (navigator.getUserMedia) {
        navigator.getUserMedia(options, function(stream) {

            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
            localstream = stream;

        }, function(error) {
            console.log(error)
        });
        // Below is the latest syntax. Using the old syntax for the time being for backwards compatibility.
        // navigator.getUserMedia({video: true}, successCallback, errorCallback);
    } else {
        $("#qr-value").text('Sorry, native web camera streaming (getUserMedia) is not supported by this browser...')
        return;
    }
}
/*window.addEventListener('DOMContentLoaded', function() {
    // Assign the <video> element to a variable
    var video = document.getElementById(cam_video_id);
    var options = {
        "audio": false,
        "video": true
    };
    // Replace the source of the video element with the stream from the camera
    if (navigator.getUserMedia) {
        navigator.getUserMedia(options, function(stream) {

            video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;

        }, function(error) {
            console.log(error)
        });
        // Below is the latest syntax. Using the old syntax for the time being for backwards compatibility.
        // navigator.getUserMedia({video: true}, successCallback, errorCallback);
    } else {
        $("#qr-value").text('Sorry, native web camera streaming (getUserMedia) is not supported by this browser...')
        return;
    }
}, false);
*/
/*$(document).ready(function() {
    if (!navigator.getUserMedia) return;
    cam = camera(cam_video_id);
    cam.start()
})*/
var cam = null;

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
  alert("success");
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
    //if(localstream == undefined){consolereturn;}
     //var video = document.getElementById(cam_video_id);
     window.stream.getTracks()[1].stop()
     window.stream = null;
     //clearInterval(theDrawLoop);
  //ExtensionData.vidStatus = 'off';
  // video.pause();
  // video.src = "";
 
  //localstream.getTracks()[0].stop();
  console.log("Vid off");

}








function startReading(){
    // stopCamera();
    // xabc();
    // cam = camera(cam_video_id);
    // cam.start();
    starting();
}
function stopReading(){
    //xabc();

    //cam = camera(cam_video_id);
    cam.stop();
}
function startScan(){

    $('#capture').text("Scanning");
    if(cam == null){
        //xabc();
       cam = camera(cam_video_id);













    }

    cam.start();
    
}
