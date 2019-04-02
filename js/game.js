/** @type {CanvasRenderingContext2D} */
class Game {
  constructor(id, width, height){
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
    this.w= this.canvas.width;
    this.h= this.canvas.height;
    this.w2 = this.w/2;
    this.h2 = this.h/2;   
    this.background = new Background(this);
    this.player = new Player(this);
    this.enemies = [];
    this.intervalId;
    this.frameCounter = 0;
    this.rithm = 120;
  }

  startGame() {
    this.intervalId = setInterval(()=>{
      this.frameCounter++;
      this.ctx.clearRect(0,0,this.w,this.h);
      this.draw();
      this.move();
      this.update();
      this.collision();
      if (this.frameCounter % this.rithm === 0){
        // console.log("mete enemigo");
        this.enemies.push(new Enemy(this,this.h));
        this.frameCounter = 0;
        // console.log(this.enemies);
      }
    }, 1000/60);
  }

  draw() {
    this.background.drawBackground();
    this.player.drawPlayer();
    for (var i = 0; i < this.enemies.length; i++){
      this.enemies[i].drawEnemies();
    }
  }
  move() {
      for (var i = 0; i <this.enemies.length; i++){
        this.enemies[i].moveEnemies();
        if (this.enemies[i].x >= this.w) {
          this.enemies.splice(i,1);
          // console.log("elimina enemigo");
        }
    }
  }

  collision() {
    return this.enemies.some(enemy => {
      if(
        this.player.x < enemy.x + enemy.w &&
        this.player.x + this.player.w > enemy.x &&
        this.player.y < enemy.y + enemy.h &&
        this.player.y + this.player.h > enemy.y
        )
         {
          this.player.x = 450;
          this.player.y = 600;
          // lives --;
          // if(lives === 0) {
            // confirm("Game Over! Do You want to play again?")
            // lives = 3;
          // gameScore = 0;
          }
        })
      }

    update() {
    if(this.player.x+this.player.w > 900) {
      this.player.x = 870;
    }
    if(this.player.x < 0) {
      this.player.x = 0;
    }
    if(this.player.y + this.player.h >= 700) {
      this.player.y = 670;
    }
    if(this.player.y < 0) {
     console.log("ha pasado")
      this.player.x = 450;
      this.player.y = 600;
      this.rithm -= 60;
     console.log("CUIDADO, HAY MAS ENEMIGOS")
    }
    }
}

