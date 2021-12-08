var game;
// 瀏覽器讀取完成時觸發之方法，這裡拿來新建Phaser遊戲核心並啟動
window.onload = function () {
  // 遊戲設定設置
  var config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: "phaser-game",
    // 匯入自製的場景"SceneMain"
    scene: [SceneMain],
  };
  // 新建遊戲核心
  game = new Phaser.Game(config);
};
