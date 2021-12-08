// 自訂義Class-場景，繼承自Phaser原生地場景物件
class SceneMain extends Phaser.Scene {
  constructor() {
    // 使用繼承父親的建構函式
    super("SceneMain");
  }
  preload() {
    //load our images or sounds
    this.load.image("road", "images/road.jpg");
    this.load.spritesheet("cars", "images/cars.png", {
      frameWidth: 60,
      frameHeight: 126,
    });
    this.load.image("line", "images/line.png");
  }
  create() {
    //define our objects
    // 新增道路Class，建構子原本是要填入config，這邊用大括號是否代表著式只填入config裡的scene參數?
    this.road = new Road({ scene: this });
    // 將道路設在場景正中央，game在這邊是全域變數
    // road.x = game.config.width / 2;
    // 改用自製小工具設置道路在遊戲場景的正中心。
    Align.center(this.road);
    // 利用方法量產道路中心線
    this.road.makeLines();
    console.log("Ready!");
  }
  update() {
    //constant running loop
    this.road.moveLines();
  }
}
