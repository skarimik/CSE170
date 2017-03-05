'use strict';

var videoElement = document.querySelector('video');
var audioSelect = document.querySelector('select#audioSource');
var videoSelect = document.querySelector('select#videoSource');
var sources;
navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function gotSources(sourceInfos) {
  sources = sourceInfos;
  for (var i = 0; i !== sourceInfos.length; ++i) {
    var sourceInfo = sourceInfos[i];
    var option = document.createElement('option');
    option.value = sourceInfo.id;
    if (sourceInfo.kind === 'audio') {
      option.text = sourceInfo.label || 'microphone ' +
        (audioSelect.length + 1);
      audioSelect.appendChild(option);
    } else if (sourceInfo.kind === 'video') {
      option.text = sourceInfo.label || 'camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
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

function start() {
  console.log("sss");
  if (window.stream) {
    videoElement.src = null;
    window.stream.stop();
  }
  var audioSource = audioSelect.value;
  var videoSource = sources[1].id//videoSelect.value;
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

audioSelect.onchange = start;
videoSelect.onchange = start;

start();



var camera = (function(p_vid_id, p_inter, p_scale) {

  if (p_vid_id == undefined) {
    console.log("ERROR: You need to specify the id of the <video> element with the camera data stream.");
    return;
  }

  var vid_id   = p_vid_id;
  var interval = p_inter != undefined ? p_inter : 1000;
  var scale    = p_scale != undefined ? p_scale : 0.5;

    var video    = document.getElementById(vid_id);
    var int_id   = null;

  function start() {
    if(int_id != null){
      stop()
    }
    int_id = setInterval(function(video, scale) { capture() }, interval);
    console.log(int_id);
  }

  function stop() {
    console.log("Clearing interval with id "+int_id);
    clearInterval(int_id);
  }

  function capture() {
    // console.time('capture');
      var w = video.videoWidth * scale;
      var h = video.videoHeight * scale;
      var qr_can = document.getElementById('qr-canvas').getContext('2d');
          qr_can.drawImage(video, 0, 0, w, h);
      try        { qrcode.decode();  }
      catch(err) { $("#qr-value").text(err); }
    // console.timeEnd('capture');

  } 

  return {
    interval:interval,
    scale:scale,
    start:start,
    stop:stop,
    capture:capture
  }

})

