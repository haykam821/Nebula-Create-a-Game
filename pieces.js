class Piece {
    constructor() {
        this.started = Date.now();
    }
}

class ColorSwitcher extends Piece {
    constructor() {
        super();
    }
    
    collided(player) {
        player.color = Math.floor(Math.random() * 4);
    }
}

class Rotating extends Piece {
    constructor() {
        super();
    }

    getRotation() {
        return (Date.now() - this.started) / 24 % 360;
    }
}

module.exports = [
    ColorSwitcher,
];