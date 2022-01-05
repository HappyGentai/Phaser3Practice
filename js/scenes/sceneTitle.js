class SceneTitle extends Phaser.Scene {
  constructor() {
    super("SceneTitle");
  }
  create() {
    // 建立監聽控制器(來自全域變數-emitter)
    emitter = new Phaser.Events.EventEmitter();
    // 建立遊戲控制器
    controller = new Controller();
    this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
    //this.alignGrid.showNumbers();

    var titleBack = this.add.image(
      game.config.width / 2,
      game.config.height / 2,
      "titleBack"
    );
    var title = this.add.image(0, 0, "title");
    Align.scaleToGameW(title, 0.8);
    this.alignGrid.placeAtIndex(38, title);

    var btnStart = new FlatButton({
      scene: this,
      key: "button1",
      text: "start",
      event: "start_game",
    });
    this.alignGrid.placeAtIndex(93, btnStart);

    emitter.on("start_game", this.startGame, this);

    // 設置音樂音效管理器
    mediaManager = new MediaManager({ scene: this });
    mediaManager.setBackGroundMusic("backgroundMusic");
  }

  startGame() {
    // 切換Scene
    this.scene.start("SceneMain");
  }

  update() {}
}
