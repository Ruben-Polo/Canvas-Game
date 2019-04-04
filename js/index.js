window.onload = function() {
  document.getElementById("justin").onclick = function() {
    var game = new Game("#myCanvas", 900, 700);
    game.startGame();
  };
 };