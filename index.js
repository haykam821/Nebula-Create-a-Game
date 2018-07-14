const $ = require("jquery-browserify");

let init = true,
	playing = false,
	paused = false,
	fps = 0,
	frames = [],
	difficulty;

const canvas = $("#canvas");
const ctx = canvas.get(0).getContext("2d");

function refreshLoop() {
	const now = performance.now();
	while (frames.length > 0 && frames[0] <= now - 1000) {
		frames.shift();
	}
	frames.push(now);
	fps = frames.length;
	if (playing) {
		canvas.attr("width", window.innerWidth);
		canvas.attr("height", window.innerHeight);
		ctx.font = "15px Ubuntu";
		ctx.fillStyle = "white";
		ctx.fillText("FPS: " + fps, 10, 20);
	}

	window.requestAnimationFrame(refreshLoop);
}
refreshLoop();

function initFunc() {
	const buttons = $(".growButton");
	buttons.each(function() {
		$(this).on("click", () => {
			$(this).classList.toggle("active");
			const panel = $(this).nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	});
}
$(window).on("load", initFunc);

const menu = $("#menuWrapper");

function startGame() {
	menu.classList.toggle("menuShrinkOut");
	setTimeout(function() {
		canvas.style.display = "block";
		playing = true;
	}, 450);
}
$("#endlessButton").on("click", startGame);

function endGame() {
	canvas.style.display = "block";
	playing = false;
	menu.classList.toggle("menuShrinkOut");
}

function pauseGame() {
	paused = !paused;
	menu.classList.toggle("menuShrinkOut");
}

$(document).on("keydown", (event) => {
	// event.preventDefault();
	if (event.keyCode == 27 && playing) {
		pauseGame();
	}
});