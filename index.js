console.log("script.js has loaded");

let init = true,
	playing = false,
	paused = false,
	fps = 0,
	frames = [],
	difficulty;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function refreshLoop() {
	const now = performance.now();
	while (frames.length > 0 && frames[0] <= now - 1000) {
		frames.shift();
	}
	frames.push(now);
	fps = frames.length;
	if (playing) {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.font = "15px Ubuntu";
		ctx.fillStyle = "white";
		ctx.fillText("FPS: " + fps, 10, 20);
	}

	window.requestAnimationFrame(refreshLoop);
}
refreshLoop();

function initFunc() {
	const buttons = document.getElementsByClassName("growButton");
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener("click", function() {
			this.classList.toggle("active");
			const panel = this.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	}
}
window.addEventListener("load", initFunc);

function startGame() {
	const menu = document.getElementById("menuWrapper");
	const canvas = document.getElementById("canvas");
	menu.classList.toggle("menuShrinkOut");
	setTimeout(function() {
		canvas.style.display = "block";
		playing = true;
	}, 450);
}
document.getElementById("endlessButton").addEventListener("click", startGame);

function endGame() {
	const menu = document.getElementById("menuWrapper");
	const canvas = document.getElementById("canvas");
	canvas.style.display = "block";
	playing = false;
	menu.classList.toggle("menuShrinkOut");
}

function pauseGame() {
	const menu = document.getElementById("menuWrapper");
	const canvas = document.getElementById("canvas");
	paused = !paused;
	menu.classList.toggle("menuShrinkOut");
}

document.addEventListener("keydown", function(e) {
	e.preventDefault();
	if (e.keyCode == 27 && playing) {
		pauseGame();
	}
});