var videoElement = document.querySelector('video#camsource');
/*'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
var lastcam;
navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
  alert("we are here and sourceInfos length is"+ sourceInfos.length);
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    
    var option = document.createElement('option');
    
    option.value = sourceInfo.id;
    
    if (sourceInfo.kind === 'audio') {
      
      
    } else if (sourceInfo.kind === 'video') {
      
      lastcam = sourceInfo;

      
    } else {
      console.log('Some other kind of source: ', sourceInfo);
    }
  }
}

if (typeof MediaStreamTrack === 'undefined' ||
    typeof MediaStreamTrack.getSources === 'undefined') {
  alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
} else {
  MediaStreamTrack.getSources(gotSources);
}

function successCallback(stream) {
  window.stream = stream; // make stream available to console
  videoElement.src = window.URL.createObjectURL(stream);
  videoElement.play();
}

function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}

function starter() {
  if (window.stream) {
    
    window.stream.stop();
  }
  
  var constraints = {
    audio: {
      optional: [{
        sourceId: null
      }]
    },
    video: {
      optional: [{
        sourceId: lastcam
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}




starter();*/
function errorCallback(error) {
  console.log('navigator.getUserMedia error: ', error);
}
function successCallback(stream) {
  window.stream = stream; // make stream available to console
  
  videoElement.play();
}
if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
  console.log("enumerateDevices() not supported.");
}


// List cameras and microphones.
var lastcam;
navigator.mediaDevices.enumerateDevices()
  .then(function(devices) {
    devices.forEach(function(device) {
      if(device.kind=="videoinput"){
        lastcam = device;
      }
      console.log(device.kind + ": " + device.label +
        " id = " + device.deviceId);
    });
  })
  .catch(function(err) {
    console.log(err.name + ": " + error.message);
  });
function starter() {
  if (window.stream) {
    
    window.stream.stop();
  }
  
  var constraints = {
    audio: {
      optional: [{
        sourceId: null
      }]
    },
    video: {
      optional: [{
        sourceId: lastcam
      }]
    }
  };
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
starter();