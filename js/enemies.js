class Enemy {
  constructor(game,h) {
    this.game = game;
    // this.y = 150;
    // this.h = canvas.height;
    this.y = (Math.floor(Math.random() * h - 150));
    this.x = 0;
    this.velocity = (Math.floor((Math.random() * 10)+1));
  }

  drawEnemies() {
  this.game.ctx.beginPath();
  this.game.ctx.fillStyle="red";
  this.game.ctx.fillRect(this.x, this.y, 30, 30);
  this.game.ctx.closePath();
  }
  moveEnemies() {
    // console.log(this.velocity)
    this.x += this.velocity;
  }
};

