/** @type {CanvasRenderingContext2D} */
class Game {
  constructor(id, width, height) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.setAttribute('width', width);
    this.canvas.setAttribute('height', height);
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.w2 = this.w / 2;
    this.h2 = this.h / 2;
    this.background = new Background(this);
    this.player = new Player(this);
    this.enemies = [];
    this.intervalId;
    this.frameCounter = 0;
    this.time = 80;
    this.gameScore = 0;
    this.lives = 3;
    this.level = 1;
    this.score = document.querySelector('.score > span');
    this.liveLeft = document.querySelector('.lives > span');
    this.levels = document.querySelector('.level > span');
    this.popUp = document.querySelector('.popUp');
  }

  startGame() {
    this.hideHtml();
      this.liveLeft.innerHTML = this.lives;
      this.levels.innerHTML = this.level;
      this.intervalId = setInterval(() => {
      this.frameCounter++;
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.draw();
      this.move();
      this.update();
      this.collision();
      if (this.frameCounter % this.time === 0) {
        this.enemies.push(new Enemy(this, this.h));
        this.frameCounter = 0;
      }
    }, 1000 / 60);
  }

  draw() {
    this.background.drawBackground();
    this.player.drawPlayer();
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].drawEnemies();
    }
  }
  move() {
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].moveEnemies();
      if (this.enemies[i].x >= this.w) {
        this.enemies.splice(i, 1);
      }
    }
  }

  collision() {
    return this.enemies.some(enemy => {
      if (
        this.player.x < enemy.x + enemy.w &&
        this.player.x + this.player.w > enemy.x &&
        this.player.y < enemy.y + enemy.h &&
        this.player.y + this.player.h > enemy.y
      ) {
        this.player.x = (this.w / 2) - this.player.w / 2;
        this.player.y = 600;
        this.lives--;
        this.liveLeft.innerHTML = this.lives;
        if(this.lives === 0) {
        alert("do you want to play again?")
        this.enemies.forEach((enemy) => {
          enemy.x = -150;
        })
        this.reset();
      }
    }
  })
}

  update() {
    if (this.player.x + this.player.w > 900) {
      this.player.x = 815;
    }
    if (this.player.x < 0) {
      this.player.x = 0;
    }
    if (this.player.y + this.player.h >= 700) {
      this.player.y = 635;
    }
    if (this.player.y < 0) {
      this.level ++;
      this.popUp.innerHTML = `Congratulations! Your are at level ${this.level}`;
      this.popUp.style.display = "block";
      setTimeout( () => {
        this.popUp.style.display = "none";
      }, 3000);
      this.player.x = (this.w / 2) - this.player.w / 2;
      this.player.y = 600;
      this.time -= 10;
      this.gameScore ++;
      this.score.innerHTML = this.gameScore * 100;
      this.levels.innerHTML = this.level;
      setTimeout( () => {
        this.enemies.forEach((enemy) => {
          enemy.x = -150;
        })
        this.enemies.forEach((enemy) => {
        enemy.velocity += 3;
        })

      }, 2000);
      
    }
  }
  reset() {
        this.enemies.forEach((enemy) => {
          enemy.velocity = (Math.floor((Math.random() * 15)+1));
        })
        this.time = 80;
        this.lives = 3;
        this.level = 1;
        this.gameScore = 0;
        this.liveLeft.innerHTML = this.lives;
        this.levels.innerHTML = this.level;
        this.score.innerHTML = this.gameScore;
  }
  hideHtml() {
    document.querySelector(".main").setAttribute("id", "ocultar")
    document.querySelector(".game-stats").setAttribute("id", "display")
  }
}

