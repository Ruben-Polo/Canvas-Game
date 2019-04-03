class Player {
  constructor(game) {
    this.game = game;
    this.x = 450;
    this.y = 500;
    this.movePlayer();
    this.w = 101;
    this.h = 171;
    this.player = new Image();
    this.player.src = "../images/player.png"
  }
  drawPlayer() {
    this.game.ctx.beginPath();
    this.game.ctx.drawImage(this.player, this.x, this.y, this.w,this.h)
    this.game.ctx.closePath();
  }

  movePlayer() {
    document.onkeydown = (e) => {
      switch(e.keyCode) {
        case 37:
          this.x -=20;
          break;
        case 38:
          this.y -=20;
          break;
        case 39:
          this.x +=20;
          break;
        case 40:
          this.y +=20;
          break;
      }
    }
  }
};
