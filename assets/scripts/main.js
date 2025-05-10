const config = {
    type: Phaser.AUTO,
    width: 1408,
    height: 768,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [MenuScene, GameScene, CreditsScene, WinScene, GameOverScene, ]
};

const game = new Phaser.Game(config);
