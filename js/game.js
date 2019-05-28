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
    this.time = 60;
    this.gameScore = 0;
    this.lives = 3;
    this.level = 1;
    this.score = document.querySelector('.score > span');
    this.liveLeft = document.querySelector('.lives > span');
    this.levels = document.querySelector('.level > span');
    this.popUp = document.querySelector('.popUp');
    this.body = document.querySelector("body");
    this.audio = new Audio("./sounds/backstreetboys-everybody.mp3");
    this.audio1 = new Audio("./sounds/jingle-win.wav");
    this.audioCollision = new Audio("./sounds/tbone-doorhit.wav");
    this.audioDead = new Audio("./sounds/daleonfire-dead.wav");
  }

  startGame() {
      this.hideHtml();
      this.body.style.backgroundImage = "url('./images/justin.gif')"
      this.body.style.backgroundRepeat = "repeat";
      this.body.style.backgroundSize = "20%";
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
        this.audioCollision.play();
        this.player.x = (this.w / 2) - this.player.w / 2;
        this.player.y = 600;
        this.lives--;
        this.liveLeft.innerHTML = this.lives;
        if(this.lives === 0) {
          this.audioDead.play();
          this.popUp.innerHTML = 'Eres un perdedor, pero podría ser peor, podrías ser Justin Bieber...y Ahora...¡LA CANCIÓN DE LAS MARIQUITAS!';
          this.popUp.style.display = "block";
          setTimeout( () => {
            this.popUp.style.display = "none";
            location.reload()
          }, 6000);

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
      this.audio1.play();
      this.level ++;
      this.popUp.innerHTML = `NIVEL ${this.level}`;
      this.popUp.style.display = "block";
      setTimeout( () => {
        this.popUp.style.display = "none";
      }, 4000);
      this.player.x = (this.w / 2) - this.player.w / 2;
      this.player.y = 600;
      this.time -= 5;
      this.gameScore ++;
      this.score.innerHTML = this.gameScore * 100;
      this.levels.innerHTML = this.level;
      this.enemies.forEach((enemy) => {
      enemy.x = -150;
      })
      this.enemies.forEach((enemy) => {
      enemy.velocity += 3;
      })

      if(this.gameScore === 3 &&  this.lives > 0) {
        this.audio.play();
        this.popUp.innerHTML = `¡ENHORABUENA TITÁN, TU MADRE ESTARÁ ORGULLOSA!...EN VERDAD NO, PERO ALGO HAY QUE DECIR`;
        this.popUp.style.display = "block";
        setTimeout( () => {
        this.congratulations.style.display = "none";
        }, 8000);
        this.reset();
            } 
    }
  }
  reset() {
        this.enemies.forEach((enemy) => {
          enemy.velocity = (Math.floor((Math.random() * 20)+1));
        })
        this.time = 60;
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

