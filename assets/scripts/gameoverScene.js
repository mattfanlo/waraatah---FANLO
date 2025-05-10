class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    preload() {
        this.load.image('retryButton', 'assets/images/retryButton.png');
        this.load.image('mainButton', 'assets/images/mainButton.png');
        this.load.image('gameoverBG', 'assets/images/gameOverBG.jpg');

        this.load.audio('gameover', 'assets/music/gameover.mp3');
        this.load.audio('click', 'assets/music/click.mp3');
    }

    create(data) {
        // Background
        this.add.image(0, 0, 'gameoverBG').setOrigin(0, 0).setDisplaySize(1408, 768);

        // Music
        this.music = this.sound.add('gameover');
        this.music.play({ loop: false });

        // Fancy text style
        const textStyle = {
            font: 'bold 64px Arial Black',
            fill: '#FF4C4C',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: {
                offsetX: 4,
                offsetY: 4,
                color: '#333333',
                blur: 4,
                fill: true
            }
        };

        const scoreStyle = {
            font: 'bold 48px Arial Black',
            fill: '#FFFFFF',
            stroke: '#000000',
            strokeThickness: 5,
            shadow: {
                offsetX: 3,
                offsetY: 3,
                color: '#333333',
                blur: 4,
                fill: true
            }
        };

        // Text
        this.add.text(520, 150, `Final Score: ${data.finalScore}`, scoreStyle);

        // Retry Button
        const retryButton = this.add.image(704, 600, 'retryButton').setScale(0.5).setInteractive();
        retryButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('click');
            this.time.delayedCall(200, () => {
                this.scene.start('GameScene');
            });
        });

        // Main Menu Button
        const mainButton = this.add.image(704, 700, 'mainButton').setScale(0.5).setInteractive();
        mainButton.on('pointerdown', () => {
            this.sound.stopAll();
            this.sound.play('click');
            this.time.delayedCall(200, () => {
                this.scene.start('MainMenu');
            });
        });
    }
}
