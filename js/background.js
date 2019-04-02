class Background {
  constructor(game) {
    this.game = game;
    this.back = new Image();
    this.back.src = "../images/background.jpg"
  }
  drawBackground() {
    this.game.ctx.beginPath();
    this.game.ctx.drawImage(this.back, 0, 0, this.game.w, this.game.h);
    this.game.ctx.closePath();
  }
};