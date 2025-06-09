var sceneMenu = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, { key: "sceneMenu" });
    },

    init: function () {
        // Tidak ada inisialisasi spesifik yang diperlukan di sini saat ini.
    },

    preload: function () {
        this.load.setBaseURL('assets/');
        this.load.image('BGPlay', 'images/BGPlay.png');
        this.load.image('Title', 'images/Title.png');
        this.load.image('ButtonPlay', 'images/ButtonPlay.png');
        this.load.image('ButtonSoundOn', 'images/ButtonSoundOn.png');
        this.load.image('ButtonSoundOff', 'images/ButtonSoundOff.png');
        this.load.audio('snd_menu', 'audio/music_menu.mp3');
        this.load.audio('snd_touchshooter', 'audio/fx_touch.mp3');
    },

    create: function () {
        const centerX = this.sys.game.config.width / 2;
        const centerY = this.sys.game.config.height / 2;
        const gameWidth = this.sys.game.config.width;
        const gameHeight = this.sys.game.config.height;

        // Menampilkan background dan UI
        this.add.image(centerX, centerY, 'BGPlay');
        var titleGame = this.add.image(centerX, centerY - 150, 'Title');
        var buttonPlay = this.add.image(centerX, centerY + 150, 'ButtonPlay');
        // Posisi tombol sound relatif terhadap sudut kanan bawah
        var buttonSound = this.add.image(gameWidth - 70, gameHeight - 70, soundEnabled ? 'ButtonSoundOn' : 'ButtonSoundOff');

        buttonPlay.setInteractive();
        buttonSound.setInteractive();

        // Hover effect untuk ButtonPlay
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
            // Mainkan suara hanya jika soundEnabled true
            if (soundEnabled) {
                this.sound.play('snd_touchshooter');
            }
            // Hentikan musik menu saat beralih scene
            if (this.bgMusic && this.bgMusic.isPlaying) {
                this.bgMusic.stop();
            }
            this.scene.start('scenePilihHero');
        });

        // Hover effect dan klik untuk ButtonSound
        buttonSound.on('pointerover', () => {
            buttonSound.setTint(0x999999);
        });
        buttonSound.on('pointerout', () => {
            buttonSound.setTint(0xffffff);
        });
        buttonSound.on('pointerdown', () => {
            buttonSound.setTint(0x999999);
        });
        buttonSound.on('pointerup', () => {
            buttonSound.setTint(0xffffff);
            
            // Toggle nilai soundEnabled
            soundEnabled = !soundEnabled;
            
            // Update tekstur tombol
            buttonSound.setTexture(soundEnabled ? 'ButtonSoundOn' : 'ButtonSoundOff');

            if (soundEnabled) {
                // Jika suara diaktifkan, mainkan musik menu
                if (this.bgMusic && !this.bgMusic.isPlaying) {
                    this.bgMusic.play();
                }
                // Mainkan suara sentuhan
                this.sound.play('snd_touchshooter');
            } else {
                // Jika suara dimatikan, hentikan semua suara
                this.sound.stopAll();
            }
        });

        // Musik latar
        this.bgMusic = this.sound.add('snd_menu', {
            volume: 0.5,
            loop: true
        });

        // Memainkan musik menu jika soundEnabled
        if (typeof soundEnabled !== 'undefined' && soundEnabled) {
            this.bgMusic.play();
        }
    },

    update: function () {
        // Tidak ada yang perlu diupdate secara terus-menerus pada scene menu
    }
});