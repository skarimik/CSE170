'use strict';

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
    alert("1");
    var option = document.createElement('option');
    alert("2");
    option.value = sourceInfo.id;
    alert("3");
    if (sourceInfo.kind === 'audio') {
      alert("4");
      
    } else if (sourceInfo.kind === 'video') {
      alert("Here is the sourceInfo", sourceInfo);
      lastcam = sourceInfo;
      alert("5");
      
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




starter();
