// 自訂義Class-場景，繼承自Phaser原生地場景物件
class SceneMain extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneMain");
  }
  create() {
    //define our objects
    // 新增道路Class，建構子原本是要填入config，這邊用大括號是否代表著式只填入config裡的scene參數?
    this.road = new Road({ scene: this });
    // 將道路設在場景正中央，game在這邊是全域變數
    // this.road.x = game.config.width / 2;
    this.road.x = game.config.width * 0.5;
    this.road.y = game.config.height * 0.5;
    // 改用自製小工具設置道路在遊戲場景的正中心。
    //Align.center(this.road);
    // 利用方法量產道路中心線
    this.road.makeLines();

    // 二號跑道
    // this.road2 = new Road({ scene: this });
    // this.road2.x = game.config.width * 0.75;
    // this.road2.y = game.config.height * 0.5;
    // this.road2.makeLines();
    // this.road2.car.setFrame(1);

    // 設置基礎分數(來自全域變數-model)
    model.score = 0;

    // 建立分數UI
    this.scoreBar = new ScoreBox({ scene: this });
    // 設置分數UI位置
    this.scoreBar.setPosition(game.config.width / 2, 50);
    model.gameOver = false;
    model.speed = 1;

    // 會置網格資料
    this.alignGrid = new AlignGrid({ scene: this, rows: 5, cols: 5 });
    //this.alignGrid.showNumbers();

    // 將分數UI放至網格區塊中
    //this.alignGrid.placeAtIndex(4, this.scoreBar);

    // 建立音樂音效設置UI
    var soundButtons = new SoundButtons({ scene: this });

    emitter.on(GameConstants.SCORE_UPDATED, this.scoreUpdate, this);
    console.log("Game Ready!");
  }

  scoreUpdate() {
    if (model.score / 5 == Math.floor(model.score / 5)) {
      model.speed += 0.25;
      if (model.speed > 1.5) {
        model.speed = 1.5;
      }
    }
  }

  update() {
    //constant running loop
    this.road.moveLines();
    this.road.moveObject();
    // this.road2.moveLines();
    //  this.road2.moveObject();
  }
}
