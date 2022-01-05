// 這是一個含有音樂及音效開關UI的集合
class SoundButtons extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;

    this.musicButton = new ToggleButton({
      scene: this.scene,
      backKey: "toggleBack",
      onIcon: "musicOn",
      offIcon: "musicOff",
      event: GameConstants.TOGGLE_MUSIC,
    });

    this.soundButton = new ToggleButton({
      scene: this.scene,
      backKey: "toggleBack",
      onIcon: "sfxOn",
      offIcon: "sfxOff",
      event: GameConstants.TOGGLE_SOUND,
    });

    this.add(this.musicButton);
    this.add(this.soundButton);

    // 將音樂設置UI放在最左上角的位置
    this.musicButton.y = this.musicButton.height / 2;
    this.musicButton.x = this.musicButton.width / 2;

    this.soundButton.x = game.config.width - this.soundButton.width / 2;
    this.soundButton.y = this.musicButton.y;

    if (model.musicOn == false) {
      this.musicButton.toggle();
    }
    if (model.soundOn == false) {
      this.soundButton.toggle();
    }

    emitter.on(GameConstants.TOGGLE_MUSIC, this.setGameMusic, this);
    emitter.on(GameConstants.TOGGLE_SOUND, this.setGameSound, this);

    this.scene.add.existing(this);
  }

  setGameMusic() {
    var onOff = model.musicOn;
    model.musicOn = onOff;
  }
  setGameSound() {
    var onOff = model.soundOn;
    model.soundOn = onOff;
  }
}
