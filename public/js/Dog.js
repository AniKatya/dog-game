export default class Dog {
  constructor(scene) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 200;
    this.fragmentSize = 16;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          this.fragmentSize,
          this.fragmentSize,
          0xff0000
        )
        .setOrigin(0)
    );
    // this.body.push(this.scene.add.rectangle(0, 0, 16, 16, 0x0000ff).setOrigin(0));
    this.sausage = this.scene.add
      .rectangle(0, 0, this.fragmentSize, this.fragmentSize, 0x00ff00)
      .setOrigin(0);
    this.positionSausage();
    scene.input.keyboard.on("keydown", (e) => {
      this.keydown(e);
    });
  }

  positionSausage() {
    this.sausage.x =
      Math.floor((Math.random() * this.scene.game.config.width) / this.fragmentSize) *
      this.fragmentSize;
    this.sausage.y =
      Math.floor((Math.random() * this.scene.game.config.height) / this.fragmentSize) *
      this.fragmentSize;
  }

  keydown(event) {
    switch (event.keyCode || event.which) {
      case 37:
        this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38:
        this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39:
        this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40:
        this.direction = Phaser.Math.Vector2.DOWN;
        break;
    }
  }
  update(time) {
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }
  move() {
    let x = this.body[0].x + this.direction.x * this.fragmentSize;
    let y = this.body[0].y + this.direction.y * this.fragmentSize;

    if (this.sausage.x === x && this.sausage.y === y) {
        console.log("food")
      //eaten the sausage
      this.body.push(
        this.scene.add.rectangle(0, 0, this.fragmentSize, this.fragmentSize, 0xffffff).setOrigin(0)
      );
      this.positionSausage();
    }

    for (let index = 1; index < this.body.length; index++) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;

    //game over if going off screen
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.scene.game.config.height
    ) {
    }

    //game over if eating own tail
    let tail = this.body.slice(1);
    if(tail.some(s=>s.x===this.body[0].x && s.y===this.body[0].y)){
        console.log("eaten itself")
    }
  }
}
