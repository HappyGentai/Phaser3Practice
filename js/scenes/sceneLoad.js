class SceneLoad extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneLoad");
  }
  preload() {
    // 設置讀取監聽和載入進度文字和進度條
    this.bar = new Bar({
      scene: this,
      x: game.config.width / 2,
      y: game.config.height / 2,
    });
    this.progText = this.add.text(
      game.config.width / 2,
      game.config.height / 2,
      "0%",
      { color: "#ffffff", fontSize: game.config.width / 20 }
    );
    this.progText.setOrigin(0.5, 0.5);
    this.load.on("progress", this.onProgress, this);

    //load our images or sounds
    this.load.image("road", "images/road.jpg");
    this.load.spritesheet("cars", "images/cars.png", {
      frameWidth: 60,
      frameHeight: 126,
    });
    this.load.image("line", "images/line.png");
    this.load.image("barrier", "images/barrier.png");
    this.load.image("cone", "images/cone.png");
    this.load.image("pcar1", "images/pcar1.png");
    this.load.image("pcar2", "images/pcar2.png");

    this.load.image("button1", "images/ui/buttons/2/1.png");
    this.load.image("title", "images/ui/title.png");
    this.load.image("titleBack", "images/ui/titleBack.jpg");

    this.load.image("toggleBack", "images/ui/toggles/1.png");
    this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
    this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
    this.load.image("musicOn", "images/ui/icons/music_on.png");
    this.load.image("musicOff", "images/ui/icons/music_off.png");

    this.load.audio("backgroundMusic", [
      "audio/random-race.mp3",
      "audio/random-race.ogg",
    ]);
    this.load.audio("boom", ["audio/boom.mp3", "audio/boom.ogg"]);
    this.load.audio("whoosh", ["audio/whoosh.mp3", "audio/whoosh.ogg"]);
  }

  create() {
    // 切換Scene
    this.scene.start("SceneTitle");
  }

  onProgress(value) {
    this.bar.setPercentX(value);
    var per = Math.floor(value * 100);
    var outPer = per + "%";
    this.progText.setText(outPer);
  }
}
