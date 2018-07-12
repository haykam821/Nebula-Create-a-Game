console.log("script.js has loaded");

let init = true,
	playing = false,
	paused = false,
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
			const canvas = document.getElementById("canvas");
			const ctx = canvas.getContext("2d");
			canvas.width = innerWidth;
			canvas.height = innerHeight;
			ctx.font = "15px Arial";
			ctx.fillStyle = "white";
			ctx.fillText("FPS: " + fps, 10, 20);
		}
		refreshLoop();
	});
}());