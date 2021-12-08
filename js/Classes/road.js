// 繼承自Phaser的容器物件
class Road extends Phaser.GameObjects.Container {
  // 建構子填入遊戲設定(config)以獲取需要的資料(scene, width...)
  constructor(config) {
    super(config.scene);
    this.scene = config.scene;
    // 新增道路貼圖並指定為一個參數
    this.back = this.scene.add.image(0, 0, "road");
    // 將新增之參數添加至容器中(自己)
    this.add(this.back);
    // 將容器顯示在場上?
    this.scene.add.existing(this);
    {
      // 道路細節設置
      // this.back.displayWidth = game.config.width * 0.5;
      //this.back.scaleY = this.back.scaleX;
      // 上面的Code可以理解為對單一物件Back做調整，但並沒有對容器本身設置大小所以看Log時容器的長寬都會顯示為0
      // 利用對齊工具設置好道路寬與遊戲場景之間的縮放比例
      Align.scaleToGameW(this.back, 0.5);
      // 設置容器實際大小
      this.setSize(this.back.displayWidth, game.config.height);
      console.log(this);
    }
    {
      // 道路中心線條設置
      // 建立中心線群組-Group(Phaser原生)並設置在場景上
      this.lineGroup = this.scene.add.group();
      // 設置一值作為中心線移動用的計數器
      this.lineMoveTime = 0;
    }
    {
      // 車車物件設置
      // 新增一車車參數並賦予值(圖片)
      this.car = this.scene.add.sprite(
        this.displayWidth / 4,
        (this.displayHeight / 2) * 0.8,
        "cars"
      );
      // 將車車加入道路群組中，發現原本生成的X和Y在加入容器後並不會校正數值，這是否代表著設置時都得要先想好該物件與容器中心之間的相對位置?
      this.add(this.car);
    }
    {
      // 道路容器互動事件設置
      this.back.setInteractive();
      // 設置點按道路容器(道路,中心線&車車等...)觸發切換車車跑道位置功能
      this.back.on("pointerdown", this.changeLanes, this);
    }
  }
  makeLines() {
    // 設置生成間隔距離(Y)，數值為道路容器之高/10
    this.vSpace = this.displayHeight / 10;
    // 利用迴圈生產20個中心線
    for (var index = 0; index < 20; index++) {
      // 實體化中心線物件
      var newLine = this.scene.add.image(this.x, this.vSpace * index, "line");
      // 為新實體化的中心線追加原始位置Y的參數，幹JS可以這樣?噁心!
      newLine.oy = newLine.y;
      // 將實體化的中心線物件加入中心線群組中
      this.lineGroup.add(newLine);
    }
  }
  moveLines() {
    // 對中心線群組利用迭代的方式(類似Foreach?)呼轎子物件並執行指定方法
    this.lineGroup.children.iterate(
      function (child) {
        child.y += this.vSpace / 20;
      }.bind(this)
    );
    // 每當移動中心線方法執行20次之後，利用迭代的方式將所有的中心線物件位置Y設回初始值。
    this.lineMoveTime++;
    if (this.lineMoveTime === 20) {
      this.lineMoveTime = 0;
      this.lineGroup.children.iterate(
        function (child) {
          child.y = child.oy;
        }.bind(this)
      );
    }
  }
  changeLanes() {
    if (this.car.x > 0) {
      this.car.x = -this.displayWidth / 4;
    } else {
      this.car.x = this.displayWidth / 4;
    }
  }
}
