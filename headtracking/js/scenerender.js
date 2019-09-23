function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;
  
    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }
    return { x: xPosition, y: yPosition };
}

var screenDiag = 0.4318;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({canvas: document.getElementById('renderCanvas')});
var w = window.innerWidth;
var h = window.innerHeight;
renderer.setSize( window.innerWidth, window.innerHeight );
//document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
var materialGreen = new THREE.MeshPhongMaterial( { color: 0x00ff00, ambient: 0x00ff00 } );
var materialWhite = new THREE.MeshPhongMaterial( { color: 0xffffff, ambient: 0xffffff } );

var cube = new THREE.Mesh( geometry, materialGreen );
scene.add( cube );
cube.rotation.x = 45 * Math.PI / 180;
cube.rotation.y = 45 * Math.PI / 180;
cube.position.z = 0;

var geometrySmall = new THREE.BoxGeometry( 0.02, 0.02, 0.02 );
for(var i=-5; i<3; i++){
	for(var j=-4; j<5; j++){
		var cube2 = new THREE.Mesh( geometrySmall, materialWhite );
		scene.add( cube2 );
		cube2.position.z = 0.1*i;
		cube2.position.x = 0.1*j;
	}
}
/*var cube2 = new THREE.Mesh( geometrySmall, materialWhite );
scene.add( cube2 );
cube2.position.z = 0.1;
cube2.position.x = 0.1;
var cube3 = new THREE.Mesh( geometrySmall, materialWhite );
scene.add( cube3 );
cube3.position.z = 0.1;
cube3.position.x = -0.1;
var cube4 = new THREE.Mesh( geometrySmall, materialWhite );
scene.add( cube4 );
cube4.position.z = 0.0;
cube4.position.x = 0.1;
var cube5 = new THREE.Mesh( geometrySmall, materialWhite );
scene.add( cube5 );
cube5.position.z = 0.0;
cube5.position.x = -0.1;*/

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
directionalLight.position.set( 1, 0.8, 0.6 );
scene.add( directionalLight );
var light = new THREE.AmbientLight( 0x202020 );
scene.add( light );

function updateViewpoint(x, y, z) {
	var metersToPx = Math.sqrt(screen.width * screen.width + screen.height * screen.height)/screenDiag;
	var hFactor = 0;
	var wFactor = 0.5*Math.sin(new Date().getTime()/1000);
	//camera.setLens(z * metersToPx, w, h);
	camera.fov = 2 * 180 / Math.PI * Math.atan(h/2/z/metersToPx);
	camera.updateProjectionMatrix();
	camera.position.x = x;
	camera.position.y = -y;
	camera.position.z = z;
	var offsetWindowX = window.screenX + getPosition(renderer.domElement).x + w/2 - screen.width/2;
	var offsetWindowY = window.screenY + window.outerHeight - window.innerHeight + getPosition(renderer.domElement).y + h/2 - screen.height/2;
	camera.setViewOffset(w, h, -metersToPx * x + offsetWindowX, -metersToPx * y + offsetWindowY, w, h);
}

var xEye = 0.0;
var yEye = 0.0;
var zEye = 0.6;

function render() {
	requestAnimationFrame( render );
	//cube.rotation.x += 0.02;
	//cube.rotation.y += 0.02;
	updateViewpoint(xEye, yEye, zEye);
	//updateViewpoint(0.0, 0.0, 0.6);
	renderer.render( scene, camera );
}
render();
		