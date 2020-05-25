function preload() {

}

function setup() {
	socket = io.connect(window.location.origin)
	
	socket.on('connected', data => {
		
	})
}

function draw() {
	
}

function keyPressed() { // in 'keyCode' is the key

}