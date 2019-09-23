var wCam = 400;
var hCam = 300;

var videoInput = document.getElementById('videoCam');
		
var ctracker = new clm.tracker();
ctracker.init(pModel);

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
// check for camerasupport
if (navigator.getUserMedia) {
	// set up stream
	var videoSelector = {video : {mandatory: { minAspectRatio: 1.333, maxAspectRatio: 1.334 }}};
	if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
		var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
		if (chromeVersion < 20) {
			videoSelector = "video";
		}
	};
	navigator.getUserMedia(videoSelector, function( stream ) {
		if (videoInput.mozCaptureStream) {
			videoInput.mozSrcObject = stream;
		} else {
			videoInput.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
		}
		videoInput.play();
	}, function() {
		alert("There was a problem trying to fetch video from your webcam.");
	});
} else {
	alert("There was a problem trying to fetch video from your webcam.");
}

videoCam.addEventListener('canplay', enablestart, false);

function enablestart() {
	// start tracking
	ctracker.start(videoInput);
	// start loop to draw face
	drawLoop();
}

function updateEyePositions(xRight, xLeft){
	f = 400;
	d = 0.114; // distance of webcam to center of screen
	ipd = 0.064;
	
	var Kinv_xRight = [(xRight[0] - wCam/2)/f, (xRight[1] - hCam/2)/f];
	var Kinv_xLeft = [(xLeft[0] - wCam/2)/f, (xLeft[1] - hCam/2)/f];
	
	distEye = Math.sqrt((xRight[0]-xLeft[0])*(xRight[0]-xLeft[0])+(xRight[1]-xLeft[1])*(xRight[1]-xLeft[1]))
	zEye = ipd * f / distEye;
	
	xEye = -zEye * (Kinv_xLeft[0]+Kinv_xRight[0])/2;
	yEye = zEye * (Kinv_xLeft[1]+Kinv_xRight[1])/2;
}

var canvasInput = document.getElementById('drawCanvas');
var cc = canvasInput.getContext('2d');
function drawLoop() {
	requestAnimationFrame(drawLoop);
	var positions = ctracker.getCurrentPosition();
	if(positions){
    	xRight = positions[27];
    	xLeft = positions[32];
    	updateEyePositions(xRight, xLeft);
    	cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
    	//ctracker.draw(canvasInput);
    	var context = canvasInput.getContext('2d');
      	var radius = 5;
      	context.beginPath();
      	context.arc(xRight[0], xRight[1], radius, 0, 2 * Math.PI, false);
      	context.arc(xLeft[0], xLeft[1], radius, 0, 2 * Math.PI, false);
      	context.fillStyle = 'red';
      	context.fill();
      	
      }
}