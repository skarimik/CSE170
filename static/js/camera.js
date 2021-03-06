var camera = (function(p_vid_id, p_inter, p_scale) {

	if (p_vid_id == undefined) {
		console.log("ERROR: You need to specify the id of the <video> element with the camera data stream.");
		return;
	}
	var x = 0;
	var vid_id   = p_vid_id;
	var interval = p_inter != undefined ? p_inter : 1000;
	var scale    = p_scale != undefined ? p_scale : 0.5;

    var video    = document.getElementById(vid_id);
    var int_id   = null;

	function start() {
		if(int_id == null){
			int_id = setInterval(function(video, scale) { capture() }, interval);
			setTimeout(stop, 20000);
			x = x+1;
		}
		console.log(int_id);
		
	}

	function stop() {
		if(x<1){return}
		$('#capture').text('Restart Scanning');
		console.log("Clearing interval with id "+int_id);
		clearInterval(int_id);
		int_id = null;
		x = x -1;
	}
	function capture() {
	
	    var w = video.videoWidth * scale;
	    var h = video.videoHeight * scale;
	    var qr_can = document.getElementById('qr-canvas').getContext('2d');
	        qr_can.drawImage(video, 0, 0, w, h);
	    try        { qrcode.decode();  }
	    catch(err) { console.log(err); }
	
	} 
	return {
		interval:interval,
		scale:scale,
		start:start,
		stop:stop,
		capture:capture
	}

})