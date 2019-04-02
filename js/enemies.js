class Enemy {
  constructor(game,h) {
    this.game = game;
    this.y = (Math.floor(Math.random() * this.game.h - 100));
    this.x = 0;
    this.w = 30;
    this.h = 30;
    this.velocity = (Math.floor((Math.random() * 3)+1));
  }

  drawEnemies() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle="red";
  this.game.ctx.fillRect(this.x, this.y, this.w, this.h);
  this.game.ctx.closePath();
  }
  moveEnemies() {
    // console.log(this.velocity)
    this.x += this.velocity;
  }
};

