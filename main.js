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
    // Lade die Karte
    this.map = this.add.image(0, 0, "M1L1").setOrigin(0, 0);
    this.physics.world.setBounds(0, 0, this.map.width, this.map.height);
    this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);

    // Berechne die Mitte der Karte
    let startX = this.map.width / 2;
    let startY = this.map.height / 2;

    // Erstelle den Spieler in der Mitte der Karte
    this.player = this.physics.add.sprite(startX, startY, "player");
    this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Ziel-Koordinaten (werden aktualisiert, wenn Spieler tippt)
    this.target = new Phaser.Math.Vector2(this.player.x, this.player.y);

    // Touch-Steuerung
    this.input.on("pointerdown", (pointer) => {
        this.target.set(pointer.worldX, pointer.worldY);  
        this.physics.moveTo(this.player, this.target.x, this.target.y, 200);
    });
}

function update() {
    // Stoppe den Spieler, wenn er nah genug am Ziel ist
    if (Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y) < 5) {
        this.player.body.setVelocity(0);
    }
}