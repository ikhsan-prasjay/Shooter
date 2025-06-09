var sceneGameOver = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: "sceneGameOver" });
    },

    init: function (data) {
        this.finalScore = data.score || 0;

        this.highScore = parseInt(localStorage.getItem('highScore') || '0', 10);
        if (this.finalScore > this.highScore) {
            this.highScore = this.finalScore;
            localStorage.setItem('highScore', this.highScore.toString());
        }
    },

    preload: function () {
        this.load.setBaseURL('assets/');
        this.load.image('BGPlay', 'images/BGPlay.png');
        this.load.image('ButtonPlay', 'images/ButtonPlay.png');
        this.load.audio('snd_gameover', 'audio/music_gameover.mp3');
        this.load.audio('snd_touchshooter', 'audio/fx_touch.mp3');
    },

    create: function () {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;

        // Background
        this.add.image(centerX, centerY, 'BGPlay');

        // Text "Game Over"
        let gameOverText = this.add.text(centerX, centerY - 150, 'Game Over', {
            fontFamily: 'Verdana, Arial',
            fontSize: '60px',
            color: '#ff0000',
            stroke: '#ffffff',
            strokeThickness: 6,
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        // High Score
        let highScoreText = this.add.text(centerX, centerY - 70, 'High Score: ' + this.highScore, {
            fontFamily: 'Verdana, Arial',
            fontSize: '40px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        // Final Score
        let scoreText = this.add.text(centerX, centerY, 'Score: ' + this.finalScore, {
            fontFamily: 'Verdana, Arial',
            fontSize: '40px',
            color: '#ffff00',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setOrigin(0.5).setDepth(10);

        // Play Again Button
        let buttonPlay = this.add.image(centerX, centerY + 100, 'ButtonPlay');
        buttonPlay.setInteractive();
        buttonPlay.setDepth(10);

        // Hover and click effects using arrow functions
        buttonPlay.on('pointerover', () => {
            buttonPlay.setTint(0x999999);
        });

        buttonPlay.on('pointerout', () => {
            buttonPlay.setTint(0xffffff);
        });

        buttonPlay.on('pointerdown', () => {
            buttonPlay.setTint(0x999999);
        });

        buttonPlay.on('pointerup', () => {
            buttonPlay.setTint(0xffffff);

            // Play touch sound
            this.sound.play('snd_touchshooter');

            // Stop music if playing
            if (this.bgMusic && this.bgMusic.isPlaying) {
                this.bgMusic.stop();
            }

            // Go to main menu
            this.scene.start('sceneMenu');
        });

        // Play game over music
        this.bgMusic = this.sound.add('snd_gameover', {
            volume: 0.5,
            loop: true
        });

        if (typeof soundEnabled !== 'undefined' && soundEnabled) {
            this.bgMusic.play();
        }
    },

    update: function () {
        // No updates needed in game over screen
    }
});
