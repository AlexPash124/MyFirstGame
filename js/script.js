
let config = {
    type: Phaser.AUTO,//webgl or canvas
    withC:1200,
    heightC:800,
    col: 5,
    row:2,
    cards: [1,2,3,4,5],
    timeout: 5,
    scene: new GameScene()
};

let game = new Phaser.Game(config);
