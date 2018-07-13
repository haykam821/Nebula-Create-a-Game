console.log("script.js has loaded");

var initiated = true,
playing = false,
paused = false,
challengeLevel = 1,
fps = 0,
frames = [],
difficulty;

(function refreshLoop() {
	window.requestAnimationFrame(function() {
		const now = performance.now();
		while (frames.length > 0 && frames[0] <= now - 1000) {
			frames.shift();
		}
		frames.push(now);
		fps = frames.length;
		if (playing) {
			var canvas = document.getElementById("canvas")
			var ctx = canvas.getContext("2d")
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("FPS: " + fps, 10, 20);
		}
		refreshLoop();
	});
})();

function init() {
	var buttons = document.getElementsByClassName("growButton");
	var boxes = document.getElementsByClassName("boxes");

	// Setup Expandable Buttons
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function() {
			this.classList.toggle("active");
			var panel = this.nextElementSibling;
			if (panel.style.maxHeight){
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			} 
		});
	}
	// Setup Table Buttons / Boxes
	for (var i = 0; i < boxes.length; i++) {
		for (var j = 0; j < boxes[i].children.length; j++) {
			boxes[i].children[j].addEventListener("click", function() {
				startChallenge(this.innerText);
	        });
	    }
	}
	// While playing if escape is pressed, pause!
	document.addEventListener("keydown", function(e) {
		if (e.keyCode == 27 && playing) {
			pauseGame();
		}
	});
}

function startGame() {
	var menu = document.getElementById("menuWrapper");
	var canvas = document.getElementById("canvas");
	menu.classList.toggle("menuShrinkOut");
	setTimeout(function() {
		canvas.style.display = "block";
		playing = true;
	}, 450);
}

function endGame() {
	var menu = document.getElementById("menuWrapper");
	var canvas = document.getElementById("canvas");
	canvas.style.display = "block";
	playing = false;
	menu.classList.toggle("menuShrinkOut");
}

function pauseGame() {
	var menu = document.getElementById("menuWrapper");
	var canvas = document.getElementById("canvas");
	paused = !paused;
	menu.classList.toggle("menuShrinkOut");	
}

function startChallenge(level) {
	challengeLevel = Number(level);
}