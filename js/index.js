window.onload = function() {
  this.mainAudio = new Audio("../sounds/mariquita-mariquita-canciones-infantiles-littlebabybum-[AudioTrimmer.com].mp3");
  this.mainAudio.play();
  document.getElementById("justin").onclick = function() {
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
 };