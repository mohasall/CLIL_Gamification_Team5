const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

function preload() {
    map = this.load.image('M1L1', 'assets/M1L1.png');
    console.log("Preload gestartet");
}

function create() {
    // Lade die PNG-Karte als Hintergrund
    this.map = this.add.image(0, 0, "M1L1").setOrigin(0, 0);

    // Setze die Weltgröße auf die Kartengröße
    this.physics.world.setBounds(0, 0, this.map.width, this.map.height);

    // Setze die Kamera-Grenzen auf die Kartengröße
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);

    // Erstelle den Spieler
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setCollideWorldBounds(true);  // Spieler kann nicht über die Bildgrenzen hinaus

    // Kamera folgt dem Spieler
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // **Touch-Steuerung: Spieler bewegt sich zur Klick-Position**
    this.input.on("pointerdown", (pointer) => {
        let x = pointer.worldX;
        let y = pointer.worldY;
        this.physics.moveTo(this.player, x, y, 200);
    });
}


function update() {
    console.log("Update läuft");
}