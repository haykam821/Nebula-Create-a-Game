class ColorSwitcher {
    collided(player) {
        player.color = Math.floor(Math.random() * 4);
    }
}

class Rotating {
    constructor() {
        this.started = Date.now();
    }

    getRotation() {
        return (Date.now() - this.started) / 24 % 360;
    }
}

module.exports = [
    ColorSwitcher,
];