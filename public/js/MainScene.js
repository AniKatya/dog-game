import Dog from "./Dog.js";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  create() {
    this.dog = new Dog(this);
  }

  update(time) {
    this.dog.update(time);
  }
}
