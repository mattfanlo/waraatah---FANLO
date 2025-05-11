class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Background and UI
        this.load.image('background', 'assets/images/background.jpg');
        this.load.image('bullet', 'assets/images/bullet.png');
        this.load.image('enemy1', 'assets/images/enemy1.png');
        this.load.image('enemy2', 'assets/images/enemy2.png');

        // Player SpriteSheet
        this.load.spritesheet('player', 'assets/images/player.png', {
            frameWidth: 280,
            frameHeight: 498
        });

        // Music and SFX
        this.load.audio('bgm', 'assets/music/bgm.mp3');
        this.load.audio('explosion', 'assets/music/explosion.m4a');
        this.load.audio('gameover', 'assets/music/gameover.mp3');
        this.load.audio('win', 'assets/music/win.mp3');
    }

    create() {
        // Music
        this.bgm = this.sound.add('bgm', { loop: true });
        this.bgm.play();

        // Background scrolling
        this.background = this.add.tileSprite(0, 0, 1408, 768, 'background')
            .setOrigin(0, 0)
            .setScrollFactor(0);

        // Score
        this.score = 0;
        this.textScore = this.add.text(30, 30, 'Score: 0' + '/100', {
            fontSize: '32px',
            fill: '#ffffff'
        });

        // Player setup
        this.player = this.physics.add.sprite(700, 600, 'player').setScale(0.4);
        this.anims.create({
            key: 'playerIdle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 35 }),
            frameRate: 30,
            repeat: -1
        });
        this.player.play('playerIdle');
        this.player.setCollideWorldBounds(true);
        this.player.setSize(100, 185);
        this.player.setOffset(90, 230);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Bullets
        this.bullets = this.physics.add.group();

        // Enemies
        this.enemies = this.physics.add.group();
        this.spawnTimer = this.time.addEvent({
            delay: 1000,
            callback: this.spawnEnemy,
            callbackScope: this,
            loop: true
        });

        // Collisions
        this.physics.add.overlap(this.bullets, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.gameOver, null, this);
    }

    update() {
        // Scroll background
        this.background.tilePositionY -= 1;

        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(300);
        } else {
            this.player.setVelocityX(0);
        }

        // Shooting
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBullet();
        }
    }

    shootBullet() {
        const bullet = this.bullets.create(this.player.x, this.player.y - 50, 'bullet');
        bullet.setVelocityY(-500);
        bullet.setScale(0.05);
    }

    spawnEnemy() {
        const enemyTypes = ['enemy1', 'enemy2'];
        const type = Phaser.Utils.Array.GetRandom(enemyTypes);
        const x = Phaser.Math.Between(100, 1300);
        const enemy = this.enemies.create(x, 0, type).setScale(0.5);
        enemy.setVelocityY(150);
    }

    hitEnemy(bullet, enemy) {
        bullet.destroy();
        enemy.destroy();
        this.sound.play('explosion');
        this.score += 5;
        this.textScore.setText('Score: ' + this.score);

        // Optional win condition
        if (this.score >= 100) {
            this.winGame();
        }
    }

    gameOver() {
        this.bgm.stop();
        this.sound.play('gameover');
        this.scene.start('GameOverScene', { finalScore: this.score });
    }

    winGame() {
        this.bgm.stop();
        this.sound.play('win');
        this.scene.start('WinScene', { finalScore: this.score });
    }
}
