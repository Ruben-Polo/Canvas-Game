class Enemy {
  constructor(game,h) {
    this.game = game;
    this.y = Math.floor(Math.random() * ((this.game.h - 200)-100 + 1)+100);
    this.x = 0;
    this.w = 85;
    this.h = 65;
    this.velocity = (Math.floor((Math.random() * 20)+1));
    this.enemy = new Image();
    this.enemy.src = "./images/enemy.png";
  }

  drawEnemies() {
  this.game.ctx.beginPath();
  this.game.ctx.drawImage(this.enemy,this.x, this.y, this.w, this.h)
  }
  moveEnemies() {
    this.x += this.velocity;
  }
};

