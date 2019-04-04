class Player {
  constructor(game) {
    this.game = game;
    this.movePlayer();
    this.w = 85;
    this.x = (this.game.w / 2) - this.w / 2;
    this.y = 600;
    this.h = 75;
    this.player = new Image();
    this.player.src = "../images/player.png";
    this.audio = new Audio("../sounds/464903__plasterbrain__arcade-ui-move-cursor.flac");
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
        this.audio.play();
          this.x -=80;
          break;
        case 38:
        this.audio.play();
          this.y -=80;
          break;
        case 39:
        this.audio.play();
          this.x +=80;
          break;
        case 40:
        this.audio.play();
          this.y +=80;
          break;
      }
    }
  }
};
