class MenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Images
        this.load.image('menuBG', 'assets/images/mainMenu.jpg'); // Replace with your actual background image
        this.load.image('startButton', 'assets/images/playButton.png');
        this.load.image('creditsButton', 'assets/images/creditsButton.png');
        this.load.image('exitButton', 'assets/images/exitButton.png')

        // Audio
        this.load.audio('bgm', 'assets/music/bgm.mp3');
        this.load.audio('click', 'assets/music/click.mp3');
    }

    create() {
        // Background
        this.add.image(0, 0, 'menuBG').setOrigin(0, 0).setDisplaySize(1408, 768);

        // Music
        this.bgm = this.sound.add('bgm', { loop: true, volume: 0.5 });
        this.bgm.play();

        // Start Button
        const startBtn = this.add.image(300, 550, 'startButton').setScale(0.4).setInteractive();
        startBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.bgm.stop();
            this.scene.start('GameScene');
        });

        // Credits Button
        const creditsBtn = this.add.image(1150, 550, 'creditsButton').setScale(0.6).setInteractive();
        creditsBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.bgm.stop();
            this.scene.start('CreditsScene');
        });
        
        const exitBtn = this.add.image(70, 55, 'exitButton').setScale(0.35).setInteractive();
        exitBtn.on('pointerdown', () => {
            this.sound.play('click');
            this.bgm.stop();
            alert("Thank you for playing")

        
        });
    }
}
