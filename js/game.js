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
  }

  startGame() {
    this.intervalId = setInterval(()=>{
      this.frameCounter++;
      this.ctx.clearRect(0,0,this.w,this.h);
      this.draw();
      this.move();
      if (this.frameCounter % 60 == 0){
        console.log("mete enemigo");
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
        console.log("elimina enemigo");
      }
    }
  }
}

