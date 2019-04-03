class Enemy {
  constructor(game,h) {
    this.game = game;
    this.y = (Math.floor(Math.random() * this.game.h + 171));
    this.x = 0;
    this.w = 101;
    this.h = 171;
    // this.velocity = 150 + Math.floor(Math.random() * 800)
    this.velocity = (Math.floor((Math.random() * 15)+1));
    this.enemy = new Image();
    this.enemy.src = "../images/enemy.png";
  }

  drawEnemies() {
  this.game.ctx.beginPath();
  this.game.ctx.drawImage(this.enemy,this.x, this.y, this.w, this.h)
  }
  moveEnemies() {
    // console.log(this.velocity)
    this.x += this.velocity;
  }
};

